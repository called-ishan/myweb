let timer;
let minutes = 25;
let seconds = 0;
let isRunning = false;
let taskHistory = [];

const taskNameInput = document.getElementById('taskName');
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const stopBtn = document.getElementById('stopBtn');
const historyBtn = document.getElementById('historyBtn');
const historyPage = document.getElementById('historyPage');
const historyList = document.getElementById('historyList');

function formatTime() {
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateTimer() {
    timerDisplay.textContent = formatTime();
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(function() {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(timer);
                    isRunning = false;
                    alert('Pomodoro Complete!');
                } else {
                    minutes--;
                    seconds = 59;
                }
            } else {
                seconds--;
            }
            updateTimer();
        }, 1000);
        startBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
        stopBtn.style.display = 'inline-block';
    }
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
    startBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
    stopBtn.style.display = 'inline-block';
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
    if (taskNameInput.value) {
        const task = {
            name: taskNameInput.value,
            time: formatTime(),
        };
        taskHistory.push(task);
    }
    taskNameInput.value = '';
    updateTimer();
    startBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
    stopBtn.style.display = 'none';
    historyBtn.style.display = 'inline-block';
}

function viewHistory() {
    historyPage.style.display = 'block';
    document.getElementById('app').style.display = 'none';
    historyList.innerHTML = '';
    taskHistory.forEach(task => {
        const div = document.createElement('div');
        div.classList.add('history-item');
        div.textContent = `${task.name} - ${task.time}`;
        historyList.appendChild(div);
    });
}

function goBack() {
    historyPage.style.display = 'none';
    document.getElementById('app').style.display = 'block';
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
stopBtn.addEventListener('click', stopTimer);
historyBtn.addEventListener('click', viewHistory);
