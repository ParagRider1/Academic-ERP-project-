package com.academicerp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "student_courses")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class StudentCourse {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(optional = false)
  @JoinColumn(name = "student_id")
  private Student student;

  @ManyToOne(optional = false)
  @JoinColumn(name = "course_id")
  private Course course;
}
