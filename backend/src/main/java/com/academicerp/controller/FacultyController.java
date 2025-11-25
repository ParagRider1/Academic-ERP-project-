package com.academicerp.controller;

import com.academicerp.dto.CourseDto;
import com.academicerp.dto.StudentDto;
import com.academicerp.dto.TimetableItemDto;
import com.academicerp.service.FacultyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class FacultyController {

  private final FacultyService facultyService;

  @GetMapping("/me")
  public Map<String, Object> me(@AuthenticationPrincipal OidcUser user) {
    return Map.of(
      "email", user != null ? user.getEmail() : null,
      "name", user != null ? user.getFullName() : null
    );
  }

  @GetMapping("/faculty/timetable")
  public List<TimetableItemDto> timetable(@AuthenticationPrincipal OidcUser user) {
    if (user == null || user.getEmail() == null) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
    }
    return facultyService.getFacultyTimetable(user.getEmail());
  }

  @GetMapping("/faculty/courses")
  public List<CourseDto> courses(@AuthenticationPrincipal OidcUser user) {
    if (user == null || user.getEmail() == null) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
    }
    return facultyService.getFacultyCourses(user.getEmail());
  }

  @GetMapping("/faculty/courses/{courseId}/students")
  public ResponseEntity<List<StudentDto>> students(@AuthenticationPrincipal OidcUser user, @PathVariable("courseId") Long courseId) {
    if (user == null || user.getEmail() == null) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
    }
    return ResponseEntity.ok(facultyService.getStudentsForCourse(user.getEmail(), courseId));
  }
}
