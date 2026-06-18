document.getElementById("resetForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const newPassword =
        document.getElementById("newPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    const email = localStorage.getItem("resetEmail");

    const msg = document.getElementById("msg");

    if (newPassword !== confirmPassword) {

        msg.style.color = "red";
        msg.textContent = "Passwords do not match";

        return;
    }

    try {

        const response = await fetch(
            `https://petmatch-mu.vercel.app/api/auth/change-password/${email}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    newPassword,
                    confirmPassword
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            msg.style.color = "green";
            msg.textContent =
                "✅ Password changed successfully";

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);

        } else {

            msg.style.color = "red";
            msg.textContent =
                data.message || "Unable to change password";

        }

    } catch (error) {

        console.error(error);

        msg.style.color = "red";
        msg.textContent = "Server error";

    }

});