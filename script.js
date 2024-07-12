let timer;
let disableTimer;
let isDisabled = false;

document.getElementById('startButton').addEventListener('click', function() {
    if (isDisabled) return;

    this.style.display = 'none';
    document.getElementById('stopButton').style.display = 'inline-block';
    startTimer(3 * 60 * 60); // 3 hours in seconds
});

document.getElementById('stopButton').addEventListener('click', function() {
    clearInterval(timer);
    clearInterval(disableTimer);
    document.getElementById('startButton').style.display = 'inline-block';
    this.style.display = 'none';
    document.getElementById('timerDisplay').textContent = '03:00:00';
});

function startTimer(duration) {
    let timerDisplay = document.getElementById('timerDisplay');
    let alarmSound = document.getElementById('alarmSound');
    let time = duration;

    timer = setInterval(function() {
        let hours = Math.floor(time / 3600);
        let minutes = Math.floor((time % 3600) / 60);
        let seconds = time % 60;

        timerDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (--time < 0) {
            clearInterval(timer);
            alarmSound.loop = true;
            alarmSound.play();
            setTimeout(function() {
                alarmSound.loop = false;
                alarmSound.pause();
                alarmSound.currentTime = 0;
                disableApp(10 * 60); // 10 minutes in seconds
            }, 10 * 1000); // 10 seconds
        }
    }, 1000);
}

function disableApp(duration) {
    let timerDisplay = document.getElementById('timerDisplay');
    let startButton = document.getElementById('startButton');
    let stopButton = document.getElementById('stopButton');
    let time = duration;

    isDisabled = true;
    startButton.classList.add('disabled');
    stopButton.style.display = 'none';

    disableTimer = setInterval(function() {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        timerDisplay.textContent = `Disabled: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (--time < 0) {
            clearInterval(disableTimer);
            isDisabled = false;
            startButton.classList.remove('disabled');
            startButton.style.display = 'inline-block';
        }
    }, 1000);
}
