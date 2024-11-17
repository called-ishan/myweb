let timer = null;
let totalSeconds = 0;
let currentTask = null;
let isPomodoroRunning = false;

function toggleTimer() {
  const button = document.getElementById('startStopButton');
  if (timer) {
    pauseTimer();
    button.textContent = 'Start';
  } else {
    startTimer();
    button.textContent = 'Stop';
  }
}

function startTimer() {
  if (!timer) {
    timer = setInterval(() => {
      totalSeconds++;
      displayTimer();
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  timer = null;
}

function resetTimer() {
  pauseTimer();
  totalSeconds = 0;
  displayTimer();
  document.getElementById('startStopButton').textContent = 'Start';
}

function displayTimer() {
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  document.getElementById('timer').textContent = `${hours}:${minutes}:${seconds}`;
}

function addTask() {
  const taskNameInput = document.getElementById('taskName');
  const taskName = taskNameInput.value.trim();
  if (taskName) {
    const taskLog = document.getElementById('taskLog');
    const listItem = document.createElement('li');
    listItem.textContent = `${taskName}: 0h 0m 0s`;
    listItem.dataset.seconds = 0;
    taskLog.appendChild(listItem);
    taskNameInput.value = '';
    setCurrentTask(taskName);
  }
}

function setCurrentTask(taskName) {
  currentTask = taskName;
  document.getElementById('currentTask').textContent = `Task: ${currentTask}`;
}

function startPomodoro() {
  if (isPomodoroRunning) return;

  const workMinutes = parseInt(document.getElementById('workDuration').value, 10) || 25;
  const breakMinutes = parseInt(document.getElementById('breakDuration').value, 10) || 5;

  isPomodoroRunning = true;
  let isWorkTime = true;

  function pomodoroCycle() {
    const duration = isWorkTime ? workMinutes : breakMinutes;
    const status = isWorkTime ? 'Work Time!' : 'Break Time!';
    document.getElementById('pomodoroStatus').textContent = status;

    setTimeout(() => {
      isWorkTime = !isWorkTime;
      if (isPomodoroRunning) pomodoroCycle();
    }, duration * 60000);
  }

  pomodoroCycle();
}

function changeMode() {
  const mode = document.getElementById('mode').value;
  document.getElementById('timerMode').style.display = mode === 'timer' ? 'block' : 'none';
  document.getElementById('pomodoroMode').style.display = mode === 'pomodoro' ? 'block' : 'none';
}
