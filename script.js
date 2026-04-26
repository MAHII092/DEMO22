const form = document.getElementById("appointmentForm");
const successMsg = document.getElementById("successMsg");

// STEP 1: Google Apps Script deploy kelyavar Web App URL ithe paste kara.
// Example:
// const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxxxxxxx/exec";
const GOOGLE_SCRIPT_URL = "PASTE_YOUR_GOOGLE_SCRIPT_WEB_APP_URL_HERE";

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  const appointment = {
    id: Date.now(),
    name: document.getElementById("name").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    doctor: document.getElementById("doctor").value,
    department: document.getElementById("department").value,
    date: document.getElementById("date").value,
    time: document.getElementById("time").value,
    message: document.getElementById("message").value.trim(),
    status: "नवीन",
    createdAt: new Date().toLocaleString("mr-IN")
  };

  // Demo/local admin panel sathi same browser madhe save
  const list = JSON.parse(localStorage.getItem("appointments") || "[]");
  list.unshift(appointment);
  localStorage.setItem("appointments", JSON.stringify(list));

  // Real Google Sheet save + Email alert
  if (
    GOOGLE_SCRIPT_URL &&
    GOOGLE_SCRIPT_URL !== "https://script.google.com/macros/s/AKfycbxUVnScSaPIEfQ-om41iGh2u_tcmWD89g43e1z3ggXWmbCB2SbrpuKbTJytWacw3oQ9uA/exec"
  ) {
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointment)
      });
    } catch (err) {
      console.log("Google Sheet connection failed. Local save done.", err);
    }
  }

  successMsg.innerText = "अपॉइंटमेंट book झाली ✅ Admin panel आणि Google Sheet मध्ये save होईल.";
  successMsg.style.display = "block";
  form.reset();
  setTimeout(() => successMsg.style.display = "none", 5000);
});
