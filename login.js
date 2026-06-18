// login.js

console.log("✅ PawMatch Login JavaScript (external file) is loaded!");

document.addEventListener('DOMContentLoaded', function() {
    
    const loginBtn = document.getElementById('loginBtn');
    const errorMsg = document.getElementById('loginErrorMsg');

    if (!loginBtn) {
        console.error("Login button not found!");
        return;
    }

    const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function(e) {
        // Prevent default if it's inside a form
        if (e) e.preventDefault();

        console.log("Login button clicked!");

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        // Clear previous message
        errorMsg.textContent = "";
        errorMsg.style.color = "";

        // Validation
        if (!email.includes('@') || !email.includes('.')) {
            errorMsg.style.color = "red";
            errorMsg.textContent = "❌ Please enter a valid email!";
            return;
        }

        if (password.length < 6) {
            errorMsg.style.color = "red";
            errorMsg.textContent = "❌ Password must be at least 6 characters long!";
            return;
        }

        // Disable button + loading state
        const originalBtnText = loginBtn.textContent;
        loginBtn.disabled = true;
        loginBtn.textContent = "Logging in...";

        try {
            const response = await fetch("https://petmatch-mu.vercel.app/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            let data;
            try {
                data = await response.json();
            } catch (err) {
                data = { message: "Invalid response from server" };
            }

            console.log("Login response:", data);

            if (response.ok) {
                errorMsg.style.color = "green";
                errorMsg.textContent = "✅ Login successful! Redirecting...";
                
                if (data.accessToken) {
                    localStorage.setItem("authToken", data.accessToken);
                }

                if (data.RefreshToken) {
                    localStorage.setItem("refreshToken", data.RefreshToken);
                }

                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                }
                console.log(
                    "Token Saved:",
                    localStorage.getItem("authToken")
                );                

                setTimeout(() => {
                    window.location.href = "profile.html";
                }, 1200);
            } else {
                errorMsg.style.color = "red";
                errorMsg.textContent = data.message || data.error || "❌ Login failed! Please check your credentials.";
            }

        } catch (error) {
            console.error("Login error:", error);
            errorMsg.style.color = "red";
            errorMsg.textContent = "❌ Unable to connect to server. Please check your internet connection.";
        } finally {
            // Reset button
            loginBtn.disabled = false;
            loginBtn.textContent = originalBtnText;
        }
    });
});