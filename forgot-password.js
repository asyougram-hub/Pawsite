document.getElementById("forgotForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const msg = document.getElementById("msg");

    localStorage.setItem("resetEmail", email);

    try {

        const response = await fetch(
            "https://petmatch-mu.vercel.app/api/auth/forgot-password",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            }
        );

        const data = await response.json();

        if (response.ok) {

            msg.style.color = "green";
            msg.textContent = "✅ OTP sent to your email.";

            setTimeout(() => {
                window.location.href = "verify-otp.html";
            }, 1500);

        } else {

            msg.style.color = "red";
            msg.textContent =
                data.message || "Unable to send OTP";

        }

    } catch (error) {

        msg.style.color = "red";
        msg.textContent = "Server error";

    }

});