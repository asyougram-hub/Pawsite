const form = document.getElementById("petForm");

const imageInput = document.getElementById("petImage");
const preview = document.getElementById("imagePreview");

if (imageInput && preview) {
  imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];

    if (file) {
      preview.src = URL.createObjectURL(file);
    }
  });
}
//new
const authToken = localStorage.getItem("authToken");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitBtn = document.querySelector(".submit-btn");

  try {
    submitBtn.disabled = true;
    submitBtn.textContent = "Creating Profile...";

    const petData = {
      name: document.getElementById("name").value.trim(),

      category: document.querySelector(
        'input[name="category"]:checked'
      )?.value,

      gender: document.querySelector(
        'input[name="gender"]:checked'
      )?.value,

      breed: document.getElementById("breed").value.trim(),

      age: Number(
        document.getElementById("age").value
      ),

      behavior: {
        temperament: document.querySelector(
          'input[name="temperament"]:checked'
        )?.value,

        energyLevel: document.querySelector(
          'input[name="energy"]:checked'
        )?.value,

        trained: document.getElementById(
          "trained"
        ).checked,

        goodWithKids: document.getElementById(
          "kids"
        ).checked,

        goodWithOtherPets:
          document.getElementById(
            "pets"
          ).checked
      },

      medical: {
        vaccinated: document.getElementById(
          "vaccinated"
        ).checked,

        vaccinationDetails:
          document.getElementById(
            "vaccinationDetails"
          ).value.trim(),

        medicalIssues:
          document.getElementById(
            "medicalIssues"
          ).value.trim(),

        allergies:
          document.getElementById(
            "allergies"
          ).value.trim(),

        lastCheckup:
          document.getElementById(
            "lastCheckup"
          ).value
      },

      lifestyle: {
        diet:
          document.getElementById(
            "diet"
          ).value.trim(),

        activityLevel:
          document.querySelector(
            'input[name="activity"]:checked'
          )?.value,

        adoptionReason:
          document.getElementById(
            "adoptionReason"
          ).value.trim()
      }
    };

    console.log("Sending Pet Data:");
    console.log(petData);

    const createResponse = await fetch(
      "https://petmatch-mu.vercel.app/api/pet",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
            "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify(petData)
      }
    );

    const pet = await createResponse.json();

    console.log("Create Pet Response:");
    console.log(pet);

    if (!createResponse.ok) {
      throw new Error(
        pet.message ||
        pet.error ||
        "Failed to create pet"
      );
    }

    const petId =
      pet._id ||
      pet.id ||
      pet.pet?._id;

    console.log("Pet ID:", petId);

    const imageFile =
      imageInput?.files[0];

    if (imageFile && petId) {
      const formData = new FormData();

      formData.append(
        "image",
        imageFile
      );

      const uploadResponse =
        await fetch(
          
  `https://petmatch-mu.vercel.app/api/pet/upload-image/${petId}`,

          {
            method: "POST",
            headers: {
      "Authorization": `Bearer ${authToken}`
    },
            body: formData
          }
        );

      const uploadData =
        await uploadResponse.json();

      console.log(
        "Upload Response:"
      );
      console.log(uploadData);
    }

    alert(
      "🐾 Pet Profile Created Successfully!"
    );

    form.reset();

    if (preview) {
      preview.src = "paw.jpg";
    }

    window.location.href =
      "discover.html";

  } catch (error) {
    console.error(error);

    alert(
      error.message ||
      "Something went wrong"
    );
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent =
      "Create Profile 🐾";
  }
});