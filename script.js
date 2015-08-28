var active = true;

function renderTime (time) {
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;
  if (seconds.toString().length === 1) seconds = '0' + seconds;
  window.timer.innerHTML = minutes + ':' + seconds;
}

function playBeep () {
  var soundfile = document.getElementById("beep");
  soundfile.play();
  window.timer.innerHTML = "BEEP BEEP";
}

function toggleActive () {
  var workTime = 1500; // 1500 sec = 25 min
  renderTime(workTime);
  var pomodoro = window.setInterval(function () {
    if (!active) {
      workTime--;
      renderTime(workTime);
      
      if (workTime <= 0) {
        playBeep();
        window.clearInterval(pomodoro);
      }
    } else {
      window.clearInterval(pomodoro);
    }
    
  }, 1000);
    
  active = !active;
}

document.addEventListener('DOMContentLoaded', function () {
  window.timer.addEventListener('click', toggleActive);
});