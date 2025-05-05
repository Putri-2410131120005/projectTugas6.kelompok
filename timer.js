// Timer countdown script
document.addEventListener("DOMContentLoaded", function () {
    const timerContainer = document.getElementById("timerContainer");
    let timeLeft = 600; //  
  
    function updateTimer() {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerContainer.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  
      if (timeLeft > 0) {
        timeLeft--;
      } else {
        clearInterval(timerInterval);
        timerContainer.textContent = "Time's up!";
      }
    }
  
    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
});