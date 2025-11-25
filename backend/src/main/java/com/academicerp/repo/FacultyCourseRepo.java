package com.academicerp.repo;

import com.academicerp.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FacultyCourseRepo extends JpaRepository<FacultyCourse, Long> {
  @Query("select fc from FacultyCourse fc where fc.faculty.id = :facultyId")
  List<FacultyCourse> findByFacultyId(@Param("facultyId") Long facultyId);
}
