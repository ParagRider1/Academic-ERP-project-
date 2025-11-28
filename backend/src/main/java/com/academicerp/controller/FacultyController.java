package com.academicerp.controller;

import com.academicerp.dto.CourseDto;
import com.academicerp.dto.StudentDto;
import com.academicerp.dto.TimetableItemDto;
import com.academicerp.entity.Employee;
import com.academicerp.service.EmployeeService;
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
  private final EmployeeService employeeService;

  @GetMapping("/me")
  public Map<String, Object> me(@AuthenticationPrincipal OidcUser user) {
    if (user == null || user.getEmail() == null) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
    }
    
    // Check if user exists in the employees table
    Employee employee = employeeService.findByEmail(user.getEmail())
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN, "User not authorized to access this application"));
    
    return Map.of(
      "email", user.getEmail(),
      "name", user.getFullName()
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
