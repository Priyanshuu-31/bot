async function askGemini() {
  const prompt = document.getElementById("prompt").value;
  const output = document.getElementById("gemini-response");
  output.innerText = "Thinking...";

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    output.innerText = data.text;
  } catch (err) {
    console.error(err);
    output.innerText = "Gemini couldn't respond.";
  }
}
