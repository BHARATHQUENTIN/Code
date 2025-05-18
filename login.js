document.addEventListener("DOMContentLoaded", function () {
    let validUsers = [
        { userId: "12345", password: "password1" },
        { userId: "54321", password: "password2" },
        { userId: "11111", password: "password3" }
    ];

    // ✅ Include users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const localStorageUsers = storedUsers.map(user => ({
        userId: user.passengerId.toString(),
        password: user.password
    }));
    validUsers = validUsers.concat(localStorageUsers);

    const loginForm = document.querySelector("form");
    const userIdInput = document.getElementById("userId");
    const passwordInput = document.getElementById("password");
    const messageDiv = document.createElement("div");
    loginForm.insertBefore(messageDiv, userIdInput);

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const userId = userIdInput.value.trim();
        const password = passwordInput.value.trim();
        messageDiv.textContent = "";

        if (userId.length === 0 || password.length === 0) {
            messageDiv.textContent = "User ID and Password are mandatory.";
            return;
        }

        if (!/^[0-9]{1,6}$/.test(userId)) {
            messageDiv.textContent = "ID not valid.";
            return;
        }

        if (password.length < 6 || password.length > 30) {
            messageDiv.textContent = "Password not valid.";
            return;
        }

        const user = validUsers.find(u => u.userId === userId);

        if (!user) {
            messageDiv.textContent = "ID not valid.";
        } else if (user.password !== password) {
            messageDiv.textContent = "Password not valid.";
        } else {
            // ✅ Store logged-in user ID
            localStorage.setItem("loggedInUserId", userId);
            messageDiv.textContent = "Login successful.";
            setTimeout(() => {
                window.location.href = "home.html";
            }, 1000);
        }
    })      
});
