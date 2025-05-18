document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registration-form");
  
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const dob = document.getElementById("dob");
    const email = document.getElementById("email");
    const address = document.getElementById("address");
    const contactNumber = document.getElementById("contactNumber");
  
    const acknowledgment = document.getElementById("acknowledgment");
  
    const errors = {
      firstName: document.getElementById("firstName-error"),
      lastName: document.getElementById("lastName-error"),
      dob: document.getElementById("dob-error"),
      email: document.getElementById("email-error"),
      address: document.getElementById("address-error"),
      contactNumber: document.getElementById("contactNumber-error"),
    };
  
    const clearErrors = () => {
      for (const key in errors) {
        errors[key].textContent = "";
      }
      acknowledgment.style.display = "none";
      acknowledgment.textContent = "";
    };
  
    const validateEmail = (email) => {
      const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return pattern.test(email);
    };
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      clearErrors();
  
      let valid = true;
  
      if (!firstName.value.trim()) {
        errors.firstName.textContent = "First Name is required";
        valid = false;
      }
  
      if (!lastName.value.trim()) {
        errors.lastName.textContent = "Last Name is required";
        valid = false;
      }
  
      if (!dob.value) {
        errors.dob.textContent = "DOB is required";
        valid = false;
      } else {
        const chosenDate = new Date(dob.value);
        const minDate = new Date("1924-01-02");
        if (chosenDate < minDate) {
          errors.dob.textContent = "Choose a date greater than 1/1/1924";
          valid = false;
        }
      }
  
      if (!email.value.trim()) {
        errors.email.textContent = "Email is required";
        valid = false;
      } else if (!validateEmail(email.value.trim())) {
        errors.email.textContent = "Enter a valid mail id";
        valid = false;
      }
  
      if (!address.value.trim()) {
        errors.address.textContent = "Address is required";
        valid = false;
      }
  
      if (!contactNumber.value.trim()) {
        errors.contactNumber.textContent = "Contact Number is required";
        valid = false;
      } else if (!/^\d{10}$/.test(contactNumber.value.trim())) {
        errors.contactNumber.textContent = "Enter a valid contact number";
        valid = false;
      }
  
      if (!valid) {
        return;
      }
  
      const passengerId = Math.floor(10000 + Math.random() * 90000);
      let password =
        firstName.value.trim().substring(0, 4).padEnd(4, "_") + "@123";
  
      const userData = {
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        dob: dob.value,
        email: email.value.trim(),
        address: address.value.trim(),
        contactNumber: contactNumber.value.trim(),
        passengerId: passengerId,
        password: password,
      };
  
      let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
      users.push(userData);
      localStorage.setItem("registeredUsers", JSON.stringify(users));
  
      acknowledgment.style.display = "block";
      acknowledgment.innerHTML = `
        <p class="success-message">Passenger Registration is successful.</p>
        <p>Passenger Id: <strong>${passengerId}</strong></p>
        <p>Password: <strong>${password}</strong></p>
        <p>Redirecting to home page...</p>
      `;
  
      // Redirect to home.html after 3 seconds
      setTimeout(() => {
        window.location.href = "login.html";
      }, 3000);
    });
  
    form.addEventListener("reset", function (e) {
      const confirmReset = confirm("Is it Okay to reset the fields?");
      if (!confirmReset) {
        e.preventDefault();
      } else {
        clearErrors();
      }
    });
  });
  