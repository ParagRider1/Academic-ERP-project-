package com.academicerp.repo;

import com.academicerp.entity.CourseSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseScheduleRepo extends JpaRepository<CourseSchedule, Long> {
  @Query("select cs from CourseSchedule cs where cs.course.id = :courseId")
  List<CourseSchedule> findByCourseId(@Param("courseId") Long courseId);
}
