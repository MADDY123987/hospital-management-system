package com.Hospital.Hospital_Mangement_System.Controller;

import com.Hospital.Hospital_Mangement_System.Dto.*;
import com.Hospital.Hospital_Mangement_System.Model.*;
import com.Hospital.Hospital_Mangement_System.Service.HospitalService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
public class HospitalController {

    private final HospitalService hospitalService;

    public HospitalController(HospitalService hospitalService) {
        this.hospitalService = hospitalService;
    }

    // -------- PATIENT --------

    @PostMapping("/patients")
    public ResponseEntity<Patient> registerPatient(
            @RequestBody PatientRequestDTO dto) {

        return ResponseEntity.ok(
                hospitalService.registerPatient(dto)
        );
    }

    @GetMapping("/patients")
    public ResponseEntity<List<Patient>> getPatients() {
        return ResponseEntity.ok(
                hospitalService.getAllPatients()
        );
    }

    // -------- DOCTOR --------

    @PostMapping("/doctors")
    public ResponseEntity<Doctor> addDoctor(
            @RequestBody DoctorRequestDTO dto) {

        return ResponseEntity.ok(
                hospitalService.addDoctor(dto)
        );
    }

    @GetMapping("/doctors")
    public ResponseEntity<List<Doctor>> getDoctors() {
        return ResponseEntity.ok(
                hospitalService.getAllDoctors()
        );
    }

    // -------- ROOM --------

    @PostMapping("/rooms")
    public ResponseEntity<Room> addRoom(
            @RequestBody RoomRequestDTO dto) {

        return ResponseEntity.ok(
                hospitalService.addRoom(dto)
        );
    }

    @GetMapping("/rooms")
    public ResponseEntity<List<Room>> getRooms() {
        return ResponseEntity.ok(
                hospitalService.getAllRooms()
        );
    }

    @GetMapping("/rooms/available")
    public ResponseEntity<List<Room>> getAvailableRooms() {
        return ResponseEntity.ok(
                hospitalService.getAvailableRooms()
        );
    }

    // -------- APPOINTMENT --------

    @PostMapping("/appointments")
    public ResponseEntity<Appointment> bookAppointment(
            @RequestBody AppointmentRequestDTO dto) {

        return ResponseEntity.ok(
                hospitalService.bookAppointment(
                        dto.getPatientId(),
                        dto.getDoctorId(),
                        LocalDateTime.now()
                )
        );
    }

    // -------- ADMIT --------

    @PutMapping("/patients/{patientId}/admit/{doctorId}/{roomId}")
    public ResponseEntity<String> admitPatient(
            @PathVariable Long patientId,
            @PathVariable Long doctorId,
            @PathVariable Long roomId) {

        hospitalService.admitPatient(patientId, doctorId, roomId);
        return ResponseEntity.ok("Patient admitted successfully");
    }

    // -------- DISCHARGE --------

    @PutMapping("/patients/{patientId}/discharge")
    public ResponseEntity<Billing> dischargePatient(
            @PathVariable Long patientId,
            @RequestBody DischargeRequestDTO dto) {

        return ResponseEntity.ok(
                hospitalService.dischargePatient(
                        patientId,
                        dto.getDeposit()
                )
        );
    }
}
