/* ============================================
   MediBridge - Global JavaScript
   Authentication & Navigation Logic
   ============================================= */

// ============================================
// DOCTOR LIST (FINAL - EXACT LIST)
// ============================================

const DOCTORS_LIST = [
  { name: "Dr. Shubh Babu", specialty: "General Physician", rating: 4.9 },
  { name: "Dr. Vaishnavi Reddy", specialty: "Dermatologist", rating: 4.2 },
  { name: "Dr. Yogitha Sharma", specialty: "Pediatrician", rating: 4.5 },
  { name: "Dr. Laxmiganesh Rao", specialty: "Orthopedic", rating: 4.6 },
  { name: "Dr. Manideep Varma", specialty: "Cardiologist", rating: 4.8 },
  { name: "Dr. Shivaji Kumar", specialty: "Neurologist", rating: 4.3 },
  { name: "Dr. Manoj Kulkarni", specialty: "ENT Specialist", rating: 4.4 },
  { name: "Dr. Nikhil Chandra", specialty: "Gynecologist", rating: 4.7 },
];

// ============================================
// SOFT CURSOR GLOW EFFECT
// ============================================

const CursorGlow = {
  init() {
    // Create cursor glow element
    const glow = document.createElement("div");
    glow.id = "cursor-glow";
    document.body.appendChild(glow);

    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;

    // Track mouse position
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Smooth trailing animation using requestAnimationFrame
    const animateGlow = () => {
      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;

      // Center the glow properly (offset by half width and height)
      glow.style.left = glowX - 25 + "px";
      glow.style.top = glowY - 35 + "px";

      requestAnimationFrame(animateGlow);
    };

    animateGlow();

    // Enlarge glow on interactive element hover
    const interactiveElements = document.querySelectorAll(
      ".btn, button, a[class*='btn'], select, .doctor-card, input, textarea"
    );
    
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        glow.style.width = "60px";
        glow.style.height = "85px";
        glow.style.opacity = "0.9";
      });

      element.addEventListener("mouseleave", () => {
        glow.style.width = "50px";
        glow.style.height = "70px";
        glow.style.opacity = "0.8";
      });
    });
  },
};

// ============================================
// LOCAL STORAGE MANAGEMENT
// ============================================

const AuthManager = {
  init() {
    
    // Initialize users if not exists
    if (!localStorage.getItem("medibridge_users")) {
      const defaultUsers = [
    {
      name: "Admin",
      email: "admin@medibridge.com",
      password: "admin123",
      role: "admin"
    },
    {
      name: "Doctor",
      email: "shubh@medibridge.com",
      password: "doctor123",
      role: "doctor"
    },
    {
      name: "Patient",
      email: "patient@medibridge.com",
      password: "patient123",
      role: "patient"
    }
  ];
      localStorage.setItem("medibridge_users", JSON.stringify(defaultUsers));
    }
  },

  // Register user
  register(name, email, password, role) {
    const users = JSON.parse(localStorage.getItem("medibridge_users")) || [];

    // Check if user already exists
    if (users.find((u) => u.email === email)) {
      return { success: false, message: "Email already registered" };
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role,
      createdAt: new Date().toLocaleString(),
      isBanned: false,
    };

    users.push(newUser);
    localStorage.setItem("medibridge_users", JSON.stringify(users));

    return { success: true, message: "Registration successful" };
  },

  // Login user
  login(email, password, role) {
    const users = JSON.parse(localStorage.getItem("medibridge_users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password && u.role === role
    );

    if (user) {
      if (user.isBanned) {
        return { success: false, message: "This account has been banned by the administrator" };
      }
      localStorage.setItem("medibridge_current_user", JSON.stringify(user));
      return { success: true, user };
    }

    return { success: false, message: "Invalid credentials" };
  },

  // Get current user
  getCurrentUser() {
    const user = localStorage.getItem("medibridge_current_user");
    return user ? JSON.parse(user) : null;
  },

  // Logout user
  logout() {
    localStorage.removeItem("medibridge_current_user");
  },

  // Check if user is logged in
  isLoggedIn() {
    return !!this.getCurrentUser();
  },

  // Get user role
  getUserRole() {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  },

  // Get all users
  getAllUsers() {
    return JSON.parse(localStorage.getItem("medibridge_users")) || [];
  },

  // Ban user
  banUser(userId) {
    const users = JSON.parse(localStorage.getItem("medibridge_users")) || [];
    const user = users.find((u) => u.id === userId);
    if (user) {
      user.isBanned = true;
      localStorage.setItem("medibridge_users", JSON.stringify(users));
      return true;
    }
    return false;
  },

  // Unban user
  unbanUser(userId) {
    const users = JSON.parse(localStorage.getItem("medibridge_users")) || [];
    const user = users.find((u) => u.id === userId);
    if (user) {
      user.isBanned = false;
      localStorage.setItem("medibridge_users", JSON.stringify(users));
      return true;
    }
    return false;
  },

  // Delete user
  deleteUser(userId) {
    const users = JSON.parse(localStorage.getItem("medibridge_users")) || [];
    const index = users.findIndex((u) => u.id === userId);
    if (index > -1) {
      users.splice(index, 1);
      localStorage.setItem("medibridge_users", JSON.stringify(users));
      return true;
    }
    return false;
  },
};

// ============================================
// NAVIGATION MANAGEMENT
// ============================================

const NavigationManager = {
  updateNavigation() {
    const user = AuthManager.getCurrentUser();
    const navButtons = document.querySelector(".nav-buttons");

    if (!navButtons) return;

    if (user) {
      navButtons.innerHTML = `
        <span style="color: #D1FAE5; font-weight: 700; letter-spacing: 0.3px;">
          ${user.name} (${user.role.toUpperCase()})
        </span>
        <button class="btn btn-outline btn-small" onclick="AuthManager.logout(); window.location.href='index.html';">
          Logout
        </button>
      `;
    } else {
      navButtons.innerHTML = `
        <a href="login.html" class="btn-login">Login</a>
        <a href="signup.html" class="btn-signup">Signup</a>
      `;
    }
  },

  updateNavLinks() {
    const user = AuthManager.getCurrentUser();
    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");

      if (href === "admin.html" && user?.role !== "admin") {
        link.style.display = "none";
      }
      if (href === "doctor.html" && user?.role !== "doctor") {
        link.style.display = "none";
      }
      if (href === "patient.html" && user?.role !== "patient") {
        link.style.display = "none";
      }
    });
  },

  checkAccess(requiredRole) {
    const user = AuthManager.getCurrentUser();

    if (!user) {
      window.location.href = "login.html";
      return;
    }

    if (user.role !== requiredRole) {
      window.location.href = "index.html";
      return;
    }
  },
};

// ============================================
// FILE MANAGEMENT
// ============================================

const FileManager = {
  // Convert file to Base64
  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },

  // Store file with consultation
  async storeFile(consultationId, file) {
    if (!file) return null;

    try {
      const base64 = await this.fileToBase64(file);
      const fileData = {
        name: file.name,
        type: file.type,
        size: file.size,
        data: base64,
        uploadedAt: new Date().toLocaleString(),
      };

      // Store in files collection
      const files = JSON.parse(localStorage.getItem("medibridge_files")) || {};
      files[consultationId] = fileData;
      localStorage.setItem("medibridge_files", JSON.stringify(files));

      return fileData;
    } catch (error) {
      console.error("Error storing file:", error);
      return null;
    }
  },

  // Get file by consultation ID
  getFile(consultationId) {
    const files = JSON.parse(localStorage.getItem("medibridge_files")) || {};
    return files[consultationId] || null;
  },

  // Delete file
  deleteFile(consultationId) {
    const files = JSON.parse(localStorage.getItem("medibridge_files")) || {};
    delete files[consultationId];
    localStorage.setItem("medibridge_files", JSON.stringify(files));
  },

  // Download file
  downloadFile(consultationId) {
    const fileData = this.getFile(consultationId);
    if (!fileData) {
      alert("No file found for this consultation");
      return;
    }

    const link = document.createElement("a");
    link.href = fileData.data;
    link.download = fileData.name;
    link.click();
  },
};

// ============================================
// CONSULTATION MANAGEMENT
// ============================================

const ConsultationManager = {
  addConsultation(data) {
    const user = AuthManager.getCurrentUser();
    const consultations =
      JSON.parse(localStorage.getItem("medibridge_consultations")) || [];

    const consultation = {
      id: Date.now(),
      patientId: user.id,
      patientName: user.name,
      patientEmail: user.email,
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
      gender: data.gender,
      phone: data.phone,
      address: data.address,
      healthIssue: data.healthIssue,
      doctor: data.doctor || null,
      status: "Pending",
      createdAt: new Date().toLocaleString(),
    };

    consultations.push(consultation);
    localStorage.setItem(
      "medibridge_consultations",
      JSON.stringify(consultations)
    );

    return consultation;
  },

  getConsultations(filter = null) {
    const consultations =
      JSON.parse(localStorage.getItem("medibridge_consultations")) || [];

    if (filter === "pending") {
      return consultations.filter((c) => c.status === "Pending");
    }
    if (filter === "accepted") {
      return consultations.filter((c) => c.status === "Accepted");
    }

    return consultations;
  },

  updateStatus(consultationId, status) {
    const consultations =
      JSON.parse(localStorage.getItem("medibridge_consultations")) || [];
    const consultation = consultations.find((c) => c.id === consultationId);

    if (consultation) {
      consultation.status = status;
      localStorage.setItem(
        "medibridge_consultations",
        JSON.stringify(consultations)
      );
      return true;
    }

    return false;
  },

  getConsultationById(consultationId) {
    const consultations =
      JSON.parse(localStorage.getItem("medibridge_consultations")) || [];
    return consultations.find((c) => c.id === consultationId);
  },

  updateConsultation(consultationId, updatedData) {
    const consultations =
      JSON.parse(localStorage.getItem("medibridge_consultations")) || [];
    const consultation = consultations.find((c) => c.id === consultationId);

    if (consultation) {
      Object.assign(consultation, updatedData);
      localStorage.setItem(
        "medibridge_consultations",
        JSON.stringify(consultations)
      );
      return consultation;
    }

    return null;
  },

  deleteConsultation(consultationId) {
    const consultations =
      JSON.parse(localStorage.getItem("medibridge_consultations")) || [];
    const index = consultations.findIndex((c) => c.id === consultationId);

    if (index > -1) {
      consultations.splice(index, 1);
      localStorage.setItem(
        "medibridge_consultations",
        JSON.stringify(consultations)
      );
      // Also delete associated file
      FileManager.deleteFile(consultationId);
      return true;
    }

    return false;
  },
};

// ============================================
// HELP REQUEST MANAGEMENT
// ============================================

const HelpManager = {
  submitRequest(name, email, address, doubt) {
    const requests =
      JSON.parse(localStorage.getItem("medibridge_help_requests")) || [];
    const request = {
      id: Date.now(),
      name,
      email,
      address,
      doubt,
      submittedAt: new Date().toLocaleString(),
    };

    requests.push(request);
    localStorage.setItem("medibridge_help_requests", JSON.stringify(requests));

    return request;
  },

  getRequests() {
    return JSON.parse(localStorage.getItem("medibridge_help_requests")) || [];
  },
};

// ============================================
// FORM VALIDATION
// ============================================

const FormValidator = {
  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  validatePassword(password) {
    return password.length >= 6;
  },

  validatePhone(phone) {
    const re = /^[0-9]{10}$/;
    return re.test(phone.replace(/\D/g, ""));
  },

  showError(message) {
    alert(message);
  },

  showSuccess(message) {
    alert(message);
  },
};

// ============================================
// DOCTOR UTILITY FUNCTIONS
// ============================================

function generateStarRating(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  let stars = "★".repeat(fullStars);

  if (hasHalfStar) {
    stars += "☆";
  }

  stars += "☆".repeat(5 - Math.ceil(rating));

  return stars;
}

function getDoctorsList() {
  return DOCTORS_LIST;
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener("DOMContentLoaded", function () {
  // Initialize auth system
  AuthManager.init();

  // Initialize cursor glow
  CursorGlow.init();

  // Update navigation
  NavigationManager.updateNavigation();
  NavigationManager.updateNavLinks();
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

function formatDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
