package com.academicerp.repo;

import com.academicerp.entity.StudentCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StudentCourseRepo extends JpaRepository<StudentCourse, Long> {
  @Query("select sc from StudentCourse sc where sc.course.id = :courseId")
  List<StudentCourse> findByCourseId(@Param("courseId") Long courseId);
}
