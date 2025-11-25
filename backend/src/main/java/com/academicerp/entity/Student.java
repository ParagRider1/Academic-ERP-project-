package com.academicerp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "students")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Student {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "student_id")
  private Long id;

  @Column(unique = true)
  private String rollNumber;

  private String firstName;
  private String lastName;
  private String email;

  @ManyToOne
  @JoinColumn(name = "specialisation_id")
  private Specialisation specialisation;
}
