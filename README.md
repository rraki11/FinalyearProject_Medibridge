MediBridge
Project Overview

MediBridge is a front-end web application developed as an academic project. It simulates a basic doctor-patient consultation platform with three user roles: Admin, Doctor, and Patient.

The project is built using HTML, CSS, and JavaScript. All data is stored locally in the browser using localStorage, which is used to simulate backend functionality.

The main objective of this project is to demonstrate role-based access, user authentication, and interactive UI design without using a server-side backend.

Features

Role-based system (Admin, Doctor, Patient)

User registration and login

Dashboard for each role

Patient consultation request system

Doctor view and approval of consultation requests

Admin overview of users, consultations, and help requests

Help & Support page with FAQ

Dark-themed modern UI design

Custom-styled dropdowns and interactive elements

Technical Details

Frontend: HTML, CSS, JavaScript

Data Storage: Browser localStorage

Authentication: JavaScript-based validation

Role Management: Conditional rendering based on logged-in user role

Design: Dark glass-style interface using CSS effects

No external frameworks or backend technologies were used.

Folder Structure

/MediBridge
|-- css/
|   |-- style.css
|-- js/
|   |-- script.js
|-- assets/
|-- index.html
|-- login.html
|-- signup.html
|-- admin.html
|-- doctor.html
|-- patient.html
|-- help.html
|-- README.md
|-- run_medibridge.bat
How to Run

Open the MediBridge folder.

On Windows, double-click run_medibridge.bat.

On macOS/Linux, open index.html directly in a web browser.

Demo Credentials

For testing purposes:

Admin
Email: admin@medibridge.com

Password: admin123

Doctor
Email: shubh@medibridge.com

Password: doctor123

Patient
Email: patient@medibridge.com

Password: patient123

Limitations

All data is stored in the browser using localStorage.

No backend server or database is implemented.

Data is not shared between devices.

Passwords are stored in plain text (for demonstration purposes only).

This project is intended for academic and learning use only.