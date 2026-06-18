// signup.js

console.log("✅ PawMatch Sign Up JavaScript loaded!");

document.addEventListener("DOMContentLoaded", () => {

    const signupForm = document.getElementById("signupForm");
    const errorMsg = document.getElementById("errorMsg");

    signupForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        errorMsg.textContent = "";

        if (!name) {
            errorMsg.style.color = "red";
            errorMsg.textContent = "❌ Full name is required.";
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            errorMsg.style.color = "red";
            errorMsg.textContent = "❌ Please enter a valid email.";
            return;
        }

        if (password.length < 6) {
            errorMsg.style.color = "red";
            errorMsg.textContent = "❌ Password must be at least 6 characters.";
            return;
        }

        const submitBtn =
            signupForm.querySelector('button[type="submit"]');

        const originalBtnText = submitBtn.textContent;

        submitBtn.disabled = true;
        submitBtn.textContent = "Creating Account...";

        try {

            const response = await fetch(
                "https://petmatch-mu.vercel.app/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: name,
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            console.log(data);

            if (response.ok) {

                errorMsg.style.color = "green";
                errorMsg.textContent =
                    "✅ Account created! Check your email and verify your account.";

                signupForm.reset();

                setTimeout(() => {
                    window.location.href = "login.html";
                }, 3000);

            } else {

                errorMsg.style.color = "red";
                errorMsg.textContent =
                    data.message ||
                    "❌ Registration failed.";

            }

        } catch (error) {

            console.error(error);

            errorMsg.style.color = "red";
            errorMsg.textContent =
                "❌ Unable to connect to server.";

        } finally {

            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;

        }

    });

});