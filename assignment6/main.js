document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("e_display");
    const input = document.getElementById("e_input");
    const talkButton = document.getElementById("talk");
    const resetButton = document.getElementById("reset");
  
    const eliza = new ElizaBot();
    const initial = eliza.getInitial();
    display.value = initial;
  
    talkButton.addEventListener("click", function () {
      const userInput = input.value;
      if (!userInput) return;
  
      const reply = eliza.transform(userInput);
      display.value += "\n\n> " + userInput + "\n" + reply;
      display.scrollTop = display.scrollHeight;
      input.value = "";
    });
  
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        talkButton.click();
      }
    });
  
    resetButton.addEventListener("click", function () {
      const restart = eliza.getInitial();
      display.value = restart;
    });
  });
  