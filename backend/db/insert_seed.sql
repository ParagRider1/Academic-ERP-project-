-- Seed lookup tables
INSERT INTO departments (name) VALUES
  ('Computer Science and Engineering')
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO specialisations (code, name) VALUES
  ('CSE', 'Computer Science and Engineering'),
  ('AIDS', 'Artificial Intelligence & Data Science')
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Seed faculty (employee)
INSERT INTO employees (first_name, last_name, email, department_id)
VALUES ('Ada','Lovelace','prof1@iiitb.ac.in', (SELECT department_id FROM departments WHERE name='Computer Science and Engineering'))
ON DUPLICATE KEY UPDATE first_name=VALUES(first_name), last_name=VALUES(last_name), department_id=VALUES(department_id);

-- Seed courses
INSERT INTO courses (course_code, name, year, term, credits, specialisation_id) VALUES
  ('ESD101','Engineering Software Design',2025,'Spring',4,(SELECT specialisation_id FROM specialisations WHERE code='CSE')),
  ('DS201','Data Structures',2025,'Spring',4,(SELECT specialisation_id FROM specialisations WHERE code='CSE')),
  ('AI310','Intro to AI',2025,'Spring',3,(SELECT specialisation_id FROM specialisations WHERE code='AIDS'))
ON DUPLICATE KEY UPDATE name=VALUES(name), year=VALUES(year), term=VALUES(term), credits=VALUES(credits), specialisation_id=VALUES(specialisation_id);

-- Assign faculty to courses
INSERT INTO faculty_courses (faculty_id, course_id)
SELECT e.employee_id, c.course_id
FROM employees e CROSS JOIN courses c
WHERE e.email='prof1@iiitb.ac.in'
  AND NOT EXISTS (
    SELECT 1 FROM faculty_courses fc WHERE fc.faculty_id=e.employee_id AND fc.course_id=c.course_id
  );

-- Seed course schedules (3 per week per course)
-- ESD101
INSERT INTO course_schedule (course_id, day, time, room, building)
SELECT c.course_id, v.day, v.time, v.room, v.building
FROM courses c
JOIN (
  SELECT 'MON' AS day, '10:00-11:00' AS time, '201' AS room, 'Main' AS building UNION ALL
  SELECT 'WED', '10:00-11:00', '201', 'Main' UNION ALL
  SELECT 'FRI', '10:00-11:00', '201', 'Main'
) v ON c.course_code='ESD101'
WHERE NOT EXISTS (
  SELECT 1 FROM course_schedule cs WHERE cs.course_id=c.course_id AND cs.day=v.day AND cs.time=v.time
);

-- DS201
INSERT INTO course_schedule (course_id, day, time, room, building)
SELECT c.course_id, v.day, v.time, v.room, v.building
FROM courses c
JOIN (
  SELECT 'TUE' AS day, '14:00-15:00' AS time, '105' AS room, 'Block A' AS building UNION ALL
  SELECT 'THU', '14:00-15:00', '105', 'Block A' UNION ALL
  SELECT 'SAT', '10:00-11:00', '105', 'Block A'
) v ON c.course_code='DS201'
WHERE NOT EXISTS (
  SELECT 1 FROM course_schedule cs WHERE cs.course_id=c.course_id AND cs.day=v.day AND cs.time=v.time
);

-- AI310
INSERT INTO course_schedule (course_id, day, time, room, building)
SELECT c.course_id, v.day, v.time, v.room, v.building
FROM courses c
JOIN (
  SELECT 'MON' AS day, '15:00-16:00' AS time, '310' AS room, 'Innovation' AS building UNION ALL
  SELECT 'WED', '15:00-16:00', '310', 'Innovation' UNION ALL
  SELECT 'FRI', '15:00-16:00', '310', 'Innovation'
) v ON c.course_code='AI310'
WHERE NOT EXISTS (
  SELECT 1 FROM course_schedule cs WHERE cs.course_id=c.course_id AND cs.day=v.day AND cs.time=v.time
);

-- Seed students (16)
INSERT INTO students (roll_number, first_name, last_name, email, specialisation_id) VALUES
  ('MT2025001', 'Aayank', 'Singhai', 'Aayank.Singhai@iiitb.ac.in', (SELECT specialisation_id FROM specialisations WHERE code='CSE')),
  ('MT2025081', 'Pankaj', 'Deopa', 'Pankaj.Deopa@iiitb.ac.in', (SELECT specialisation_id FROM specialisations WHERE code='CSE')),
  ('MT2025032', 'Chaitanya', 'Nemade', 'Chaitanya.Nemade@iiitb.ac.in', (SELECT specialisation_id FROM specialisations WHERE code='CSE')),
  ('MT2025122', 'Siddhesh', 'Mahajan', 'Siddhesh.Mahajan@iiitb.ac.in', (SELECT specialisation_id FROM specialisations WHERE code='CSE')),
  ('MT2025722', 'Saatvik', 'Sinha', 'Saatvik.Sinha@iiitb.ac.in', (SELECT specialisation_id FROM specialisations WHERE code='AIDS')),
  ('MT2025016', 'Affan', 'Shaikh', 'Affan.Shaikh@iiitb.ac.in', (SELECT specialisation_id FROM specialisations WHERE code='CSE')),
  ('MT2025111', 'Rohit', 'Sandiri', 'Rohit.Sandiri@iiitb.ac.in', (SELECT specialisation_id FROM specialisations WHERE code='CSE')),
  ('MT2025100', 'Rahul', 'Raman', 'Rahul.Raman@iiitb.ac.in', (SELECT specialisation_id FROM specialisations WHERE code='CSE')),
  ('MT2025124', 'Suchir', 'Okram', 'Suchir.Okram@iiitb.ac.in', (SELECT specialisation_id FROM specialisations WHERE code='CSE')),
  ('MT2025040', 'Yuvraj', 'Deshmukh', 'Yuvraj.Deshmukh@iiitb.ac.in', (SELECT specialisation_id FROM specialisations WHERE code='CSE')),
  ('MT2025135', 'Yash', 'Parande', 'Yash.Parande@iiitb.ac.in', (SELECT specialisation_id FROM specialisations WHERE code='CSE')),
  ('MT2025024', 'Ashwin', 'Suthar', 'Ashwin.Suthar@iiitb.ac.in', (SELECT specialisation_id FROM specialisations WHERE code='CSE')),
  ('MT2025064', 'Kautilya', 'Singh', 'Kautilya.Singh@iiitb.ac.in', (SELECT specialisation_id FROM specialisations WHERE code='CSE')),
  ('MT2025117', 'Shreyas', 'Gangurde', 'Shreyas.Gangurde@iiitb.ac.in', (SELECT specialisation_id FROM specialisations WHERE code='CSE')),
  ('MT2025019', 'Aniket', 'Kumar', 'Aniket.Kumar@iiitb.ac.in', (SELECT specialisation_id FROM specialisations WHERE code='CSE')),
  ('MT2025030', 'Bhavy', 'Gupta', 'Bhavy.Gupta@iiitb.ac.in', (SELECT specialisation_id FROM specialisations WHERE code='CSE'))
ON DUPLICATE KEY UPDATE first_name=VALUES(first_name), last_name=VALUES(last_name), email=VALUES(email), specialisation_id=VALUES(specialisation_id);

-- Enroll all 16 students into all courses (skip duplicates)
INSERT INTO student_courses (student_id, course_id)
SELECT s.student_id, c.course_id
FROM students s
JOIN courses c
LEFT JOIN student_courses sc ON sc.student_id=s.student_id AND sc.course_id=c.course_id
WHERE s.roll_number IN (
  'MT2025001','MT2025081','MT2025032','MT2025122','MT2025722','MT2025016',
  'MT2025111','MT2025100','MT2025124','MT2025040','MT2025135','MT2025024',
  'MT2025064','MT2025117','MT2025019','MT2025030'
) AND sc.id IS NULL;
