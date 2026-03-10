package com.Hospital.Hospital_Mangement_System.Dto;




public class AppointmentRequestDTO {

    private Long patientId;
    private Long doctorId;

    public AppointmentRequestDTO() {
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }
}