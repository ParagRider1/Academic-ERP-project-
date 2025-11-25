package com.academicerp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "courses")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Course {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "course_id")
  private Long id;

  @Column(nullable = false, unique = true)
  private String courseCode;

  private String name;

  private Integer year;

  private String term;

  private Integer credits;

  @ManyToOne
  @JoinColumn(name = "specialisation_id")
  private Specialisation specialisation;
}
