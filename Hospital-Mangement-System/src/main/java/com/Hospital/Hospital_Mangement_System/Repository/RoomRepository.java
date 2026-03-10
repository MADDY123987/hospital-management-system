package com.Hospital.Hospital_Mangement_System.Repository;

import com.Hospital.Hospital_Mangement_System.Model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    List<Room> findByOccupiedFalse();
}
