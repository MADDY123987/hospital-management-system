package com.Hospital.Hospital_Mangement_System.Repository;


import com.Hospital.Hospital_Mangement_System.Model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    @Procedure(procedureName = "sp_book_appointment")
    void bookAppointment(@Param("p_patient_id") Long patientId,
                         @Param("p_doctor_id") Long doctorId,
                         @Param("p_time") java.time.LocalDateTime time);
}
