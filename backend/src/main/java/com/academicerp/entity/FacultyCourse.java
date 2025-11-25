package com.academicerp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "faculty_courses")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class FacultyCourse {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(optional = false)
  @JoinColumn(name = "faculty_id")
  private Employee faculty;

  @ManyToOne(optional = false)
  @JoinColumn(name = "course_id")
  private Course course;
}
