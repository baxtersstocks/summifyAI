// --------------------
// GLOBAL STATE
// --------------------
let mode = "summary";

// --------------------
// ADD INPUT BOX
// --------------------
function addInput() {
  const textarea = document.createElement("textarea");
  textarea.placeholder = "Paste a link, article, note, tweet, etc...";
  document.getElementById("inputs").appendChild(textarea);
}

// --------------------
// CLEAR ALL INPUTS
// --------------------
function clearInputs() {
  document.getElementById("inputs").innerHTML = "";
  document.getElementById("output").innerText = "";
}

// --------------------
// SET MODE
// --------------------
function setMode(newMode) {
  mode = newMode;
  document.getElementById("currentMode").innerText = newMode;
}

// --------------------
// MAIN ACTION: CLEAN MESS
// --------------------
async function cleanMess() {
  const inputElements = document.querySelectorAll("#inputs textarea");
  const text = Array.from(inputElements)
    .map(t => t.value.trim())
    .filter(Boolean)
    .join("\n\n");

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
      mode
    })
  }
);

    if (!response.ok) {
      throw new Error("Server error");
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    output.innerText = data.result;
  } catch (err) {
    output.innerText = "Error: " + err.message;
  }
}
