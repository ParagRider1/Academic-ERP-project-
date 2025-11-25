package com.academicerp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "course_schedule")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CourseSchedule {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(optional = false)
  @JoinColumn(name = "course_id")
  private Course course;

  private String day; // e.g., MON, TUE
  private String time; // e.g., 10:00-11:00
  private String room;
  private String building;
}
