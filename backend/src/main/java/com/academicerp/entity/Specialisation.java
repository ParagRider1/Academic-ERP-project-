package com.academicerp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "specialisations")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Specialisation {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "specialisation_id")
  private Long id;

  @Column(nullable = false, unique = true)
  private String code;

  private String name;
}
