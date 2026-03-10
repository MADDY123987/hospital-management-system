package com.Hospital.Hospital_Mangement_System.Service;

import com.Hospital.Hospital_Mangement_System.Model.*;
import com.Hospital.Hospital_Mangement_System.Repository.*;
import com.Hospital.Hospital_Mangement_System.Dto.*;
import com.Hospital.Hospital_Mangement_System.exception.ResourceNotFoundException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class HospitalService {

    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final RoomRepository roomRepository;
    private final AppointmentRepository appointmentRepository;
    private final BillingRepository billingRepository;

    public HospitalService(PatientRepository patientRepository,
                           DoctorRepository doctorRepository,
                           RoomRepository roomRepository,
                           AppointmentRepository appointmentRepository,
                           BillingRepository billingRepository) {
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.roomRepository = roomRepository;
        this.appointmentRepository = appointmentRepository;
        this.billingRepository = billingRepository;
    }

    // ================= PATIENT =================

    public Patient registerPatient(PatientRequestDTO dto) {

        Patient patient = new Patient();
        patient.setName(dto.getName());
        patient.setAge(dto.getAge());
        patient.setDisease(dto.getDisease());
        patient.setAdmitted(false);

        return patientRepository.save(patient);
    }

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    // ================= DOCTOR =================

    public Doctor addDoctor(DoctorRequestDTO dto) {

        Doctor doctor = new Doctor();
        doctor.setName(dto.getName());
        doctor.setSpecialization(dto.getSpecialization());
        doctor.setActive(true);

        return doctorRepository.save(doctor);
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    // ================= ROOM =================

    public Room addRoom(RoomRequestDTO dto) {

        Room room = new Room();
        room.setRoomNumber(dto.getRoomNumber());
        room.setRoomType(dto.getRoomType());
        room.setPricePerDay(dto.getPricePerDay());
        room.setOccupied(false);

        return roomRepository.save(room);
    }

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public List<Room> getAvailableRooms() {
        return roomRepository.findByOccupiedFalse();
    }

    // ================= APPOINTMENT =================

    public Appointment bookAppointment(Long patientId, Long doctorId, LocalDateTime time) {

        if (!patientRepository.existsById(patientId))
            throw new ResourceNotFoundException("Patient not found");

        if (!doctorRepository.existsById(doctorId))
            throw new ResourceNotFoundException("Doctor not found");

        Appointment appointment = new Appointment();
        appointment.setPatientId(patientId);
        appointment.setDoctorId(doctorId);
        appointment.setAppointmentTime(time);
        appointment.setStatus("BOOKED");

        return appointmentRepository.save(appointment);
    }

    // ================= ADMIT =================

    public void admitPatient(Long patientId, Long doctorId, Long roomId) {

        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found"));

        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));

        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        if (room.getOccupied()) {
            throw new RuntimeException("Room already occupied");
        }

        patient.setAdmitted(true);
        patient.setDoctorId(doctor.getId());
        patient.setRoomId(room.getId());
        patient.setAdmittedAt(LocalDateTime.now());

        room.setOccupied(true);

        patientRepository.save(patient);
        roomRepository.save(room);
    }

    // ================= DISCHARGE + BILL =================

    public Billing dischargePatient(Long patientId, Double deposit) {

        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found"));

        if (!patient.getAdmitted()) {
            throw new RuntimeException("Patient not admitted");
        }

        Room room = roomRepository.findById(patient.getRoomId())
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        LocalDateTime dischargeTime = LocalDateTime.now();
        patient.setDischargedAt(dischargeTime);
        patient.setAdmitted(false);

        long days = java.time.Duration.between(
                patient.getAdmittedAt(), dischargeTime).toDays();

        if (days == 0) days = 1;

        double totalAmount = days * room.getPricePerDay();
        double pending = totalAmount - deposit;

        Billing billing = new Billing();
        billing.setPatientId(patientId);
        billing.setTotalAmount(totalAmount);
        billing.setDeposit(deposit);
        billing.setPendingAmount(pending);
        billing.setGeneratedAt(LocalDateTime.now());

        room.setOccupied(false);

        patientRepository.save(patient);
        roomRepository.save(room);

        return billingRepository.save(billing);
    }
}