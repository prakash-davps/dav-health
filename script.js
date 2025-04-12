function showLoader() {
  document.getElementById("loadingOverlay").style.display = "flex";
}

function hideLoader() {
  document.getElementById("loadingOverlay").style.display = "none";
}
// Event listener for pressing "Enter" key while `admNo` input is active
document.getElementById("admNo").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent form submission
    document.getElementById("loadBtn").click(); // Simulate a button click
  }
});

document.getElementById("loadBtn").addEventListener("click", async () => {
  const admNo = document.getElementById("admNo").value;
  if (!admNo.match(/^\d{4}$/)) {
    alert("Please enter a valid 4-digit admission number.");
    return;
  }

  showLoader(); // Show the loader
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbxhB4Be-zgKXJRS_VKi5xs-pgxodrds2tcJP15WV92ajLUdqo2xcies9VbWG566gG_Q/exec"
    ); // Replace with Apps Script web URL
    const data = await response.json();
    const student = data.find((item) => item.admNo == admNo);

    if (student) {
      document.getElementById("name").value = student.name;
      document.getElementById("class").value = student.class;
      document.getElementById("section").value = student.section;
    } else {
      alert("Student not found.");
    }
  } catch (error) {
    console.error(error);
    alert("Error loading data.");
  } finally {
    document.getElementById("problem").focus();
    hideLoader(); // Hide the loader
  }
});

document
  .getElementById("studentForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitBtn = document.getElementById("submitBtn");
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    showLoader(); // Show the loader
    const formData = {
      admNo: document.getElementById("admNo").value,
      name: document.getElementById("name").value,
      class: document.getElementById("class").value,
      section: document.getElementById("section").value,
      problem: document.getElementById("problem").value,
      medicines: document.getElementById("medicines").value,
      remarks: document.getElementById("remarks").value,
    };

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxhB4Be-zgKXJRS_VKi5xs-pgxodrds2tcJP15WV92ajLUdqo2xcies9VbWG566gG_Q/exec",
        {
          method: "POST",
          body: JSON.stringify(formData),
        }
      );
      alert("Data submitted successfully.");
      submitBtn.textContent = "Submit";
      submitBtn.disabled = false;
    } catch (error) {
      console.error(error);
      alert("Error submitting data.");
      submitBtn.textContent = "Submit";
      submitBtn.disabled = false;
    } finally {
      hideLoader(); // Hide the loader
    }
  });
