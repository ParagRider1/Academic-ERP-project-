package com.academicerp.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class TimetableItemDto {
  private Long courseId;
  private String courseCode;
  private String courseName;
  private String day;
  private String time;
  private String room;
  private String building;
  private String specialisationCode;
  private String specialisationName;
}
