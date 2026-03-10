package com.Hospital.Hospital_Mangement_System.Repository;

import com.Hospital.Hospital_Mangement_System.Model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
}