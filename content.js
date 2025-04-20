async function fetchGPTAnswer(questionText) {
    const response = await fetch("http://localhost:5000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: questionText })
    });
  
    const data = await response.json();
    return data.answer;
  }
  
  async function processQuestions() {
    const questionElements = document.querySelectorAll(".M7eMe"); // Google Form question class
  
    for (const el of questionElements) {
      const questionText = el.innerText;
  
      // Skip if already answered
      if (el.querySelector(".gpt-answer")) continue;
  
      const answer = await fetchGPTAnswer(questionText);
  
      const answerEl = document.createElement("div");
      answerEl.textContent = `💡 GPT Suggestion: ${answer}`;
      answerEl.className = "gpt-answer";
      answerEl.style.color = "#00796b";
      answerEl.style.marginTop = "5px";
  
      el.appendChild(answerEl);
    }
  }
  
  setInterval(processQuestions, 2000);
  