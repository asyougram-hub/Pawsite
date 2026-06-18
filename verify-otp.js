document.getElementById("otpForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const otp = document.getElementById("otp").value.trim();
    const email = localStorage.getItem("resetEmail");
    const msg = document.getElementById("msg");

    try {

        const response = await fetch(
            `https://petmatch-mu.vercel.app/api/auth/verify-otp/${email}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    otp: otp
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            msg.style.color = "green";
            msg.textContent = "✅ OTP verified successfully";

            setTimeout(() => {
                window.location.href = "reset-password.html";
            }, 1500);

        } else {

            msg.style.color = "red";
            msg.textContent =
                data.message || "Invalid OTP";

        }

    } catch (error) {

        console.error(error);

        msg.style.color = "red";
        msg.textContent = "Server error";

    }

});