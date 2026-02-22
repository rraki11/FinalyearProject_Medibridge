_This document was authored by Manus, an autonomous AI agent._

# MediBridge – Premium Dark Glassmorphism Healthcare Web App (UI Refinement & Cursor Enhancement)

## Project Overview

MediBridge has undergone a final UI refinement, transforming into a premium front-end web application with an enhanced **Dark Glassmorphism** aesthetic. This academic project provides a sophisticated and visually striking platform for doctor-patient consultations, built with **HTML**, **CSS**, and **JavaScript**. It emphasizes an enhanced user interface and experience, supporting three distinct user roles: **Admin**, **Doctor**, and **Patient**, each with tailored dashboards and functionalities. All data continues to be managed locally using the browser's `localStorage` for simulated backend operations.

## Features

The refined MediBridge project includes a range of enhanced features:

-   **Premium Dark Glassmorphism Design**: Implemented with `backdrop-filter: blur(20px)`, subtle semi-transparent cards (`rgba(255, 255, 255, 0.08)`), crisp white borders (`rgba(255, 255, 255, 0.18)`), deep layered shadows (`0 8px 32px rgba(0, 0, 0, 0.25)`), and smooth hover animations for a modern, high-contrast look.
-   **Dynamic Animated Gradient Background**: A rich, slowly moving CSS animated background using a palette of Deep Blue Green (`#0F2027`), Dark Teal Green (`#134E4A`), Forest Green (`#1B4332`), and Rich Green (`#2D6A4F`), creating a serene and immersive visual experience.
-   **Refined Custom Cursor UI**: The distracting custom cursor has been replaced with a subtle, soft oval background glow that follows the natural system cursor. This light green glow (`#2D6A4F` similar) has a slight blur and opacity (0.15–0.25), smoothly trailing the cursor and subtly enlarging on hover over interactive elements, providing an elegant and non-intrusive visual feedback.
-   **Custom Styled Dropdowns**: All HTML `<select>` elements have been replaced with custom-styled dropdowns that perfectly match the glassmorphism theme. They feature transparent backgrounds with blur, rounded corners (16px–20px), white text on dark glass, a minimal custom arrow icon, and smooth open/close animations, ensuring a consistent and premium UI.
-   **Improved Text Visibility**: Enhanced readability across all sections with stronger white text, subtle text shadows where needed, proper spacing, and clear heading hierarchies.
-   **Admin Page UI Improvement**: Tables now feature subtle glass backgrounds within their containers, improved row hover effects, better-styled role badges, and consistent rounded corners. Dashboard cards appear more layered and elevated.
-   **Premium UI/UX**: Inspired by modern SaaS applications, featuring clean spacing, generous padding, and rounded corners (20px radius) for a polished and intuitive user experience.
-   **Role-Based User System**: Separate registration, login, and dashboard views for Admins, Doctors, and Patients.
-   **User Authentication**: Secure sign-up, sign-in, and logout functionality using `localStorage` for session management.
-   **Patient Dashboard**: Allows patients to submit personal and medical details, request consultations for various health issues, and view the status of their requests.
-   **Doctor Dashboard**: Enables doctors to view their profile, see pending patient consultation requests, and accept them.
-   **Admin Dashboard**: Provides an administrative overview of all registered users, doctors, consultation records, and help requests in a clean, table-based layout.
-   **Updated Doctor List**: Features a curated list of 8 doctors with static ratings, integrated consistently across all relevant pages (Home, Patient Dashboard, Admin Dashboard).
-   **Help & Support Page**: A dedicated page for users to submit queries and find answers in a FAQ section.

### Key Technical Implementations

| Feature | Implementation | Description |
| :--- | :--- | :--- |
| **Design Style** | Dark Glassmorphism (CSS `backdrop-filter`) | Achieves a modern, translucent UI with blurred backgrounds and deep, high-contrast shadows. |
| **Animated Background** | CSS `linear-gradient` & `@keyframes` | Creates a slowly shifting gradient background using a rich green palette for a premium feel. |
| **Custom Cursor** | CSS `cursor` & JavaScript | Implements a subtle, glowing oval that follows the system cursor, reacting to interactive elements. |
| **Custom Dropdowns** | CSS & HTML `<select>` styling | Replaces default browser dropdowns with glassmorphism-themed, animated custom controls. |
| **Data Persistence** | `localStorage` | Simulates a database by storing user, consultation, and help request data in the browser. |
| **Authentication** | JavaScript | Custom JavaScript functions handle user registration, login, and session state. |
| **Role-Based Access** | JavaScript | Page access is restricted based on the logged-in user's role. |
| **Typography** | System Font Stack | Utilizes `-apple-system`, `BlinkMacSystemFont`, etc., for an Apple-like, clean, and readable font style, with strong contrast. |

## Folder Structure

The project is organized into a clear and maintainable folder structure:

```
/MediBridge
|-- css/
|   |-- style.css         # Global stylesheet with all design rules, dark glassmorphism effects, custom cursor styles, and custom dropdown styling
|-- js/
|   |-- script.js         # Global JavaScript for authentication, dynamic logic, custom cursor logic, and updated doctor list
|-- assets/               # Directory for images and other media (currently empty)
|-- index.html            # Home Page
|-- login.html            # Login Page
|-- signup.html           # Signup Page
|-- admin.html            # Admin Dashboard
|-- doctor.html           # Doctor Dashboard
|-- patient.html          # Patient Dashboard ("Me" page)
|-- help.html             # Help & Support Page
|-- README.md             # This file
|-- run_medibridge.bat    # Batch file to run the project
```

## How to Run

To run the MediBridge project, follow these simple steps:

1.  **Extract the Project**: Unzip the `MediBridge_Project_Final_Refined.zip` file to a location of your choice on your computer.
2.  **Navigate to the Folder**: Open the extracted `MediBridge` folder.
3.  **Run the Batch File**:
    -   **On Windows**: Simply double-click the `run_medibridge.bat` file. This will automatically open the `index.html` file in your default web browser.
    -   **On other Operating Systems (macOS, Linux)**: Open the `index.html` file directly in your web browser (e.g., Chrome, Firefox, Safari).

Once the `index.html` page is open, you can navigate through the website, register new users, and test the functionalities for each role.

### Demo Credentials

For quick testing, you can use the following pre-configured demo accounts:

-   **Admin**: `admin@medibridge.com` / `admin123`
-   **Doctor**: `shubh@medibridge.com` / `doctor123`
-   **Patient**: `patient@medibridge.com` / `patient123`
