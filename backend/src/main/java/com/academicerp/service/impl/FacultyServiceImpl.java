package com.academicerp.service.impl;

import com.academicerp.dto.CourseDto;
import com.academicerp.dto.StudentDto;
import com.academicerp.dto.TimetableItemDto;
import com.academicerp.entity.*;
import com.academicerp.mapper.Mappers;
import com.academicerp.repo.*;
import com.academicerp.service.FacultyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FacultyServiceImpl implements FacultyService {

  private final EmployeeRepo employeeRepo;
  private final FacultyCourseRepo facultyCourseRepo;
  private final CourseScheduleRepo courseScheduleRepo;
  private final StudentCourseRepo studentCourseRepo;

  private Employee getEmployeeByEmailOrThrow(String email) {
    return employeeRepo.findByEmail(email)
      .orElseThrow(() -> new IllegalArgumentException("Employee not found for email: " + email));
  }

  @Override
  public List<TimetableItemDto> getFacultyTimetable(String facultyEmail) {
    Employee emp = getEmployeeByEmailOrThrow(facultyEmail);
    List<FacultyCourse> fcs = facultyCourseRepo.findByFacultyId(emp.getId());
    List<TimetableItemDto> result = new ArrayList<>();
    for (FacultyCourse fc : fcs) {
      Course c = fc.getCourse();
      var schedules = courseScheduleRepo.findByCourseId(c.getId());
      for (CourseSchedule cs : schedules) {
        result.add(TimetableItemDto.builder()
          .courseId(c.getId())
          .courseCode(c.getCourseCode())
          .courseName(c.getName())
          .day(cs.getDay())
          .time(cs.getTime())
          .room(cs.getRoom())
          .building(cs.getBuilding())
          .specialisationCode(c.getSpecialisation() != null ? c.getSpecialisation().getCode() : null)
          .specialisationName(c.getSpecialisation() != null ? c.getSpecialisation().getName() : null)
          .build());
      }
    }
    return result;
  }

  @Override
  public List<CourseDto> getFacultyCourses(String facultyEmail) {
    Employee emp = getEmployeeByEmailOrThrow(facultyEmail);
    List<FacultyCourse> fcs = facultyCourseRepo.findByFacultyId(emp.getId());
    return fcs.stream().map(fc -> Mappers.toCourseDto(fc.getCourse())).toList();
  }

  @Override
  public List<StudentDto> getStudentsForCourse(String facultyEmail, Long courseId) {
    // ensure the course belongs to the faculty
    Employee emp = getEmployeeByEmailOrThrow(facultyEmail);
    boolean teaches = facultyCourseRepo.findByFacultyId(emp.getId()).stream()
      .anyMatch(fc -> fc.getCourse().getId().equals(courseId));
    if (!teaches) throw new IllegalArgumentException("Forbidden: course not taught by faculty");

    return studentCourseRepo.findByCourseId(courseId).stream()
      .map(sc -> Mappers.toStudentDto(sc.getStudent()))
      .toList();
  }
}
