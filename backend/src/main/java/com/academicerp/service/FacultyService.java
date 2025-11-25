package com.academicerp.service;

import com.academicerp.dto.CourseDto;
import com.academicerp.dto.StudentDto;
import com.academicerp.dto.TimetableItemDto;

import java.util.List;

public interface FacultyService {
  List<TimetableItemDto> getFacultyTimetable(String facultyEmail);
  List<CourseDto> getFacultyCourses(String facultyEmail);
  List<StudentDto> getStudentsForCourse(String facultyEmail, Long courseId);
}
