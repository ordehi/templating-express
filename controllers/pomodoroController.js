const startBtn = document.querySelector(".start");

startBtn.addEventListener("click", () => {
    const pomodoro = new Pomodoro();
    pomodoro.start();
});
