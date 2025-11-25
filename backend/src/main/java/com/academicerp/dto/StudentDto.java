package com.academicerp.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class StudentDto {
  private Long id;
  private String rollNumber;
  private String firstName;
  private String lastName;
  private String email;
  private String specialisationCode;
}
