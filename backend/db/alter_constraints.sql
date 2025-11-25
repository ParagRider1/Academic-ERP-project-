-- Add constraints, indexes, and foreign keys
SET FOREIGN_KEY_CHECKS = 0;

-- Unique keys
ALTER TABLE employees ADD UNIQUE KEY uk_employees_email (email);
ALTER TABLE specialisations ADD UNIQUE KEY uk_specialisations_code (code);
ALTER TABLE courses ADD UNIQUE KEY uk_courses_course_code (course_code);
ALTER TABLE students ADD UNIQUE KEY uk_students_roll_number (roll_number);

-- Foreign keys
ALTER TABLE employees
  ADD CONSTRAINT fk_employees_department
  FOREIGN KEY (department_id) REFERENCES departments(department_id)
  ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE courses
  ADD INDEX idx_courses_specialisation (specialisation_id),
  ADD CONSTRAINT fk_courses_specialisation
  FOREIGN KEY (specialisation_id) REFERENCES specialisations(specialisation_id)
  ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE students
  ADD INDEX idx_students_specialisation (specialisation_id),
  ADD CONSTRAINT fk_students_specialisation
  FOREIGN KEY (specialisation_id) REFERENCES specialisations(specialisation_id)
  ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE faculty_courses
  ADD INDEX idx_faculty_courses_faculty (faculty_id),
  ADD INDEX idx_faculty_courses_course (course_id),
  ADD CONSTRAINT fk_faculty_courses_faculty
  FOREIGN KEY (faculty_id) REFERENCES employees(employee_id)
  ON UPDATE CASCADE ON DELETE CASCADE,
  ADD CONSTRAINT fk_faculty_courses_course
  FOREIGN KEY (course_id) REFERENCES courses(course_id)
  ON UPDATE CASCADE ON DELETE CASCADE,
  ADD UNIQUE KEY uk_faculty_courses_faculty_course (faculty_id, course_id);

ALTER TABLE student_courses
  ADD INDEX idx_student_courses_student (student_id),
  ADD INDEX idx_student_courses_course (course_id),
  ADD CONSTRAINT fk_student_courses_student
  FOREIGN KEY (student_id) REFERENCES students(student_id)
  ON UPDATE CASCADE ON DELETE CASCADE,
  ADD CONSTRAINT fk_student_courses_course
  FOREIGN KEY (course_id) REFERENCES courses(course_id)
  ON UPDATE CASCADE ON DELETE CASCADE,
  ADD UNIQUE KEY uk_student_courses_student_course (student_id, course_id);

ALTER TABLE course_schedule
  ADD INDEX idx_course_schedule_course (course_id),
  ADD CONSTRAINT fk_course_schedule_course
  FOREIGN KEY (course_id) REFERENCES courses(course_id)
  ON UPDATE CASCADE ON DELETE CASCADE;

SET FOREIGN_KEY_CHECKS = 1;
