package com.academicerp.mapper;

import com.academicerp.dto.*;
import com.academicerp.entity.*;

public class Mappers {
  public static CourseDto toCourseDto(Course c) {
    if (c == null) return null;
    return CourseDto.builder()
      .id(c.getId())
      .courseCode(c.getCourseCode())
      .name(c.getName())
      .specialisationCode(c.getSpecialisation() != null ? c.getSpecialisation().getCode() : null)
      .specialisationName(c.getSpecialisation() != null ? c.getSpecialisation().getName() : null)
      .build();
  }

  public static StudentDto toStudentDto(Student s) {
    if (s == null) return null;
    return StudentDto.builder()
      .id(s.getId())
      .rollNumber(s.getRollNumber())
      .firstName(s.getFirstName())
      .lastName(s.getLastName())
      .email(s.getEmail())
      .specialisationCode(s.getSpecialisation() != null ? s.getSpecialisation().getCode() : null)
      .build();
  }
}
