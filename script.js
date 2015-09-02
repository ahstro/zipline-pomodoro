var activeTime, pomodoro
var breakTimeSec = 360 // 360 sec = 6 min
var workTimeSec = 1440 // 1440 sec = 24 min

function renderTime (time) {
  var minutes = Math.floor(time / 60)
  var seconds = time % 60
  if (seconds.toString().length === 1) seconds = '0' + seconds
  window.time.innerHTML = minutes + ':' + seconds
}

function toggleStatusIcon (pause) {
  if (pause) window.statusIcon.innerHTML = '▮▮'
  else window.statusIcon.innerHTML = '▶'
}

function soundAlarm () {
  window.alarm.play()

  if (window.Notification.permission === 'granted') {
    var notify = new window.Notification('Pomodoro', { body: 'Time to switch!' })
  }

  console.log(notify)
}

function toggleType (type) {
  if (type === 'Work') {
    activeTime = breakTimeSec
    window.tomato.innerHTML = 'Break'
  } else {
    activeTime = workTimeSec
    window.tomato.innerHTML = 'Work'
  }
}

function clearPomodoro () {
  window.clearInterval(pomodoro)
  pomodoro = null
}

function toggleActive () {
  toggleStatusIcon(!pomodoro)

  if (!pomodoro) {
    pomodoro = window.setInterval(() => {
      activeTime--

      if (activeTime === 0) soundAlarm()
      if (activeTime < 0) toggleType(window.tomato.innerHTML)

      renderTime(activeTime)
    }, 1000)
  } else {
    clearPomodoro()
  }

}

function resetTimer () {
  activeTime = workTimeSec

  if (pomodoro) clearPomodoro()

  toggleType('hamburgers')
  toggleStatusIcon(false)
  renderTime(activeTime)
}

function timeIncDec (click) {
  // Exit if clock is running
  if (pomodoro) return

  var id = click.target.innerHTML
  var x = click.target.className

  if (id === '+') {
    window[x + 'Sec'] += 60
  } else if (id === '-' && window[x + 'Sec'] > 60) {
    window[x + 'Sec'] -= 60
  } else {
    return
  }

  window[x].innerHTML = Math.floor(window[x + 'Sec'] / 60)

  activeTime = workTimeSec
  renderTime(activeTime)
}

if (window.Notification.permission !== 'granted' &&
    window.Notification.permission !== 'denied') {
  window.Notification.requestPermission()
}

document.addEventListener('DOMContentLoaded', () => {
  resetTimer()
  renderTime(activeTime)
  window.timer.addEventListener('click', toggleActive)
  window.reset.addEventListener('click', resetTimer)

  // Add in-/decrement click listeners
  Array.from(document.getElementsByClassName('timeControl'))
       .forEach((x) => x.addEventListener('click', timeIncDec))
})
