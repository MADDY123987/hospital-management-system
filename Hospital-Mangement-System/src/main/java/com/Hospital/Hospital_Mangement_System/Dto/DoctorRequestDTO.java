package com.Hospital.Hospital_Mangement_System.Dto;



public class DoctorRequestDTO {

    private String name;
    private String specialization;

    public DoctorRequestDTO() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }
}
