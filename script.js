const form = document.getElementById("appointmentForm");
const successMsg = document.getElementById("successMsg");

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

  const list = JSON.parse(localStorage.getItem("appointments") || "[]");
  list.unshift(appointment);
  localStorage.setItem("appointments", JSON.stringify(list));

  const GOOGLE_SCRIPT_URL = ""; 
  if (GOOGLE_SCRIPT_URL) {
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointment)
      });
    } catch (err) {
      console.log("Sheet connection failed, local saved only.", err);
    }
  }

  successMsg.style.display = "block";
  form.reset();
  setTimeout(() => successMsg.style.display = "none", 4500);
});