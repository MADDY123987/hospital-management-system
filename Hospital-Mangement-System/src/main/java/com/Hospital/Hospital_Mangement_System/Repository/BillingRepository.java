package com.Hospital.Hospital_Mangement_System.Repository;


import com.Hospital.Hospital_Mangement_System.Model.Billing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BillingRepository extends JpaRepository<Billing, Long> {
}