const token =
    localStorage.getItem("authToken");

if (!token) {
    window.location.href = "login.html";
}
let currentPet = null;

const petImage = document.getElementById("petImage");
const imageInput = document.getElementById("imageInput");

const nameInput = document.getElementById("name");
const breedInput = document.getElementById("breed");
const ageInput = document.getElementById("age");
const genderInput = document.getElementById("gender");

const temperamentInput =
  document.getElementById("temperament");

const energyLevelInput =
  document.getElementById("energyLevel");

const activityLevelInput =
  document.getElementById("activityLevel");

const dietInput =
  document.getElementById("diet");

const adoptionReasonInput =
  document.getElementById("adoptionReason");

const trainedInput =
  document.getElementById("trained");

const goodWithKidsInput =
  document.getElementById("goodWithKids");

const goodWithPetsInput =
  document.getElementById("goodWithPets");

const vaccinatedInput =
  document.getElementById("vaccinated");

const editBtn =
  document.getElementById("editBtn");

const saveBtn =
  document.getElementById("saveBtn");

const deleteBtn =
  document.getElementById("deleteBtn");

let selectedImage = null;

/* ---------------------------- */
/* LOAD USER PET                */
/* ---------------------------- */

async function loadMyPet() {

  try {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) {
      alert("Please login first.");
      window.location.href = "login.html";
      return;
    }

    const response = await fetch(
      "https://petmatch-mu.vercel.app/api/pet"
    );

    const data = await response.json();

    currentPet = data.pets.find(
      pet =>
        pet.ownerId &&
        pet.ownerId._id === user._id
    );

    if (!currentPet) {

      document.querySelector(
        ".profile-card"
      ).innerHTML = `
        <div style="text-align:center;">
          <h2>No Pet Profile Found 🐾</h2>
          <p>Create your pet profile first.</p>
        </div>
      `;

      return;
    }

    fillPetData();

  } catch (error) {

    console.error(error);

    alert(
      "Failed to load profile."
    );
  }
}

/* ---------------------------- */
/* FILL FORM                    */
/* ---------------------------- */

function fillPetData() {

  // document.getElementById(
  //   "petName"
  // ).textContent =
  //   currentPet.name;

  // document.getElementById(
  //   "petBreed"
  // ).textContent =
  //   currentPet.breed || "Unknown Breed";

  petImage.src =
    currentPet.image ||
    "paw.jpg";

  nameInput.value =
    currentPet.name || "";

  breedInput.value =
    currentPet.breed || "";

  ageInput.value =
    currentPet.age || "";

  genderInput.value =
    currentPet.gender || "Male";

  temperamentInput.value =
    currentPet.behavior?.temperament ||
    "Friendly";

  energyLevelInput.value =
    currentPet.behavior?.energyLevel ||
    "Medium";

  activityLevelInput.value =
    currentPet.lifestyle?.activityLevel ||
    "Both";

  dietInput.value =
    currentPet.lifestyle?.diet || "";

  adoptionReasonInput.value =
    currentPet.lifestyle?.adoptionReason ||
    "";

  trainedInput.checked =
    currentPet.behavior?.trained ||
    false;

  goodWithKidsInput.checked =
    currentPet.behavior?.goodWithKids ||
    false;

  goodWithPetsInput.checked =
    currentPet.behavior?.goodWithOtherPets ||
    false;

  vaccinatedInput.checked =
    currentPet.medical?.vaccinated ||
    false;
}

/* ---------------------------- */
/* ENABLE EDITING               */
/* ---------------------------- */

function toggleEditing(enable) {

  const fields = document.querySelectorAll(
    "input, select, textarea"
  );

  fields.forEach(field => {

    if (
      field.id !== "imageInput"
    ) {
      field.disabled = !enable;
    }
  });

  saveBtn.style.display =
    enable ? "inline-block" : "none";

  editBtn.style.display =
    enable ? "none" : "inline-block";
}

editBtn.addEventListener(
  "click",
  () => {
    toggleEditing(true);
  }
);

/* ---------------------------- */
/* IMAGE PREVIEW                */
/* ---------------------------- */

imageInput.addEventListener(
  "change",
  (event) => {

    selectedImage =
      event.target.files[0];

    if (!selectedImage) return;

    petImage.src =
      URL.createObjectURL(
        selectedImage
      );
  }
);

/* ---------------------------- */
/* SAVE PROFILE                 */
/* ---------------------------- */

saveBtn.addEventListener(
  "click",
  async () => {

    try {

      const updateData = {

        name:
          nameInput.value,

        breed:
          breedInput.value,

        age:
          Number(
            ageInput.value
          ),

        gender:
          genderInput.value,

        behavior: {

          temperament:
            temperamentInput.value,

          energyLevel:
            energyLevelInput.value,

          trained:
            trainedInput.checked,

          goodWithKids:
            goodWithKidsInput.checked,

          goodWithOtherPets:
            goodWithPetsInput.checked
        },

        medical: {

          vaccinated:
            vaccinatedInput.checked
        },

        lifestyle: {

          activityLevel:
            activityLevelInput.value,

          diet:
            dietInput.value,

          adoptionReason:
            adoptionReasonInput.value
        }
      };

      const token =
        localStorage.getItem(
          "authToken"
        );

      const response =
        await fetch(
          `https://petmatch-mu.vercel.app/api/pet/${currentPet._id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`
            },

            body: JSON.stringify(
              updateData
            )
          }
        );

      const result =
        await response.json();

      console.log(result);

      /* -------------------- */
      /* IMAGE UPLOAD         */
      /* -------------------- */

      if (selectedImage) {

        const imageForm =
          new FormData();

        imageForm.append(
          "image",
          selectedImage
        );

        await fetch(
          `https://petmatch-mu.vercel.app/api/pet/upload-image/${currentPet._id}`,
          {
            method: "POST",

            headers: {
              Authorization:
                `Bearer ${token}`
            },

            body: imageForm
          }
        );
      }

      alert(
        "Profile updated successfully 🐾"
      );

      toggleEditing(false);

      loadMyPet();

    } catch (error) {

      console.error(error);

      alert(
        "Failed to update profile."
      );
    }
  }
);

/* ---------------------------- */
/* DELETE PROFILE               */
/* ---------------------------- */

deleteBtn.addEventListener(
  "click",
  async () => {

    const confirmDelete =
      confirm(
        "Delete your pet profile?"
      );

    if (!confirmDelete)
      return;

    try {

      const token =
        localStorage.getItem(
          "authToken"
        );

      const response =
        await fetch(
          `https://petmatch-mu.vercel.app/api/pet/${currentPet._id}`,
          {
            method: "DELETE",

            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      const result =
        await response.json();

      console.log(result);

      alert(
        "Profile deleted successfully."
      );

      window.location.href =
        "profile.html";

    } catch (error) {

      console.error(error);

      alert(
        "Unable to delete profile."
      );
    }
  }
);

/* ---------------------------- */
/* START                        */
/* ---------------------------- */

loadMyPet();