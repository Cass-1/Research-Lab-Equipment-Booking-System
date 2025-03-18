CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(50) CHECK (role IN ('student', 'teacher', 'lab_manager', 'system_admin'))
);

CREATE TABLE students (
    student_id INT PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
    major VARCHAR(100),
    enrollment_year INT
    );

CREATE TABLE teachers (
    teacher_id INT PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
    department VARCHAR(100)
);

CREATE TABLE lab_managers (
    lab_manager_id INT PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
    department VARCHAR(100)
);

CREATE TABLE system_admins (
    system_admin_id INT PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
    department VARCHAR(100),
    access_level VARCHAR(50)
);

CREATE TABLE lab_sections (
    lab_section_id SERIAL PRIMARY KEY,
    teacher_id INT REFERENCES teachers(teacher_id) ON DELETE SET NULL,
    lab_manager_id INT REFERENCES lab_managers(lab_manager_id) ON DELETE SET NULL
);

CREATE TABLE equipment (
    equipment_id SERIAL PRIMARY KEY,
    equipment_name VARCHAR(255) NOT NULL,
    equipment_type VARCHAR(100) NOT NULL,
    status VARCHAR(50) CHECK (status IN ('available', 'in_use', 'maintenance')),
    lab_section_id INT REFERENCES lab_sections(lab_section_id) ON DELETE CASCADE
);


CREATE TABLE bookings (
    booking_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    equipment_id INT REFERENCES equipment(equipment_id) ON DELETE CASCADE,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    status VARCHAR(50) CHECK (status IN ('pending', 'approved', 'cancelled'))
);

CREATE TABLE student_sections (
    student_id INT REFERENCES students(student_id) ON DELETE CASCADE,
    lab_section_id INT REFERENCES lab_sections(lab_section_id) ON DELETE CASCADE,
    PRIMARY KEY (student_id, lab_section_id)
);

CREATE TABLE analytics_reports (
    report_id SERIAL PRIMARY KEY,
    report_type VARCHAR(100),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data JSONB
);
