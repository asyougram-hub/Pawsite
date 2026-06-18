document.addEventListener("DOMContentLoaded", () => {

    const logoutBtn = document.getElementById("logoutBtn");

    if (!logoutBtn) return;

    logoutBtn.addEventListener("click", async () => {

        try {

            const token = localStorage.getItem("authToken");

            await fetch(
                "https://petmatch-mu.vercel.app/api/auth/logout",
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

        } catch (error) {
            console.error(error);
        }

        localStorage.clear();

        alert("Logged out successfully!");

        window.location.href = "login.html";
    });

});