package com.Hospital.Hospital_Mangement_System.Repository;

import com.Hospital.Hospital_Mangement_System.Model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

    @Procedure(procedureName = "sp_admit_patient")
    void admitPatient(@Param("p_patient_id") Long patientId,
                      @Param("p_doctor_id") Long doctorId,
                      @Param("p_room_id") Long roomId);

    @Procedure(procedureName = "sp_discharge_patient")
    void dischargePatient(@Param("p_patient_id") Long patientId,
                          @Param("p_deposit") Double deposit);
}