package com.academicerp.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CourseDto {
  private Long id;
  private String courseCode;
  private String name;
  private String specialisationCode;
  private String specialisationName;
}
