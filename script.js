let currentMode = "summary";

// -------- MODE BUTTONS --------
function setMode(mode) {
  currentMode = mode;
  document.getElementById("currentMode").innerText = mode;
}

// -------- ADD INPUT --------
function addInput() {
  const container = document.getElementById("inputs");
  const textarea = document.createElement("textarea");
  textarea.className = "input-box";
  textarea.placeholder = "Paste text or a URL here...";
  container.appendChild(textarea);
}

// -------- CLEAR INPUTS --------
function clearInputs() {
  document.getElementById("inputs").innerHTML = "";
  document.getElementById("output").innerText = "";
}

// -------- MAIN CLEAN FUNCTION --------
async function cleanMess() {
  const inputs = document.querySelectorAll(".input-box");
  let text = "";

  inputs.forEach(input => {
    if (input.value.trim()) {
      text += input.value.trim() + "\n\n";
    }
  });

  if (!text) {
    alert("Add some input first.");
    return;
  }

  const output = document.getElementById("output");
  output.innerText = "Cleaning mess…";

  try {
    const response = await fetch(
      "https://summifyai-backend123-o81wgftcq-baxters-projects-10a4be27.vercel.app/api/clean",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text,
          mode: currentMode
        })
      }
    );

    if (!response.ok) {
      throw new Error("Server error");
    }

    const data = await response.json();

    if (data.error) {
      output.innerText = "Error: " + data.error;
      return;
    }

    output.innerText = data.result || "No result returned.";

  } catch (err) {
    console.error(err);
    output.innerText = "Error: Failed to fetch";
  }
}

// -------- INITIAL INPUT --------
window.onload = () => {
  addInput();
};
