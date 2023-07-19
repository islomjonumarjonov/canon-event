const eventName = document.getElementById("event--name");
const eventDeadline = document.getElementById("event--deadline");

const modalFont = document.querySelector(".modal");
const modalBack = document.querySelector(".modalClose");

const closeTitle = document.querySelector("h2");
const dayArea = document.querySelector(".day");
const hourArea = document.querySelector(".hour");
const minuteArea = document.querySelector(".minute");
const secondArea = document.querySelector(".second");

const countBtn = document.querySelector(".count-btn");
const reset = document.querySelector(".reset");

let second = 0;
let minute = 0;
let hour = 0;
let day = 0;

countBtn.addEventListener("click", () => {
  let now = new Date();
  modalFont.classList.toggle("hidden");
  modalBack.classList.toggle("hidden");
  closeTitle.textContent = eventName.value;
  let dayDdline = +(eventDeadline.value[8] + eventDeadline.value[9]);
  dayDdline = dayDdline < 10 ? "0" + dayDdline : dayDdline;
  let monthDdline = +(eventDeadline.value[5] + eventDeadline.value[6]);
  monthDdline = monthDdline < 10 ? "0" + monthDdline : monthDdline;
  let hourDdline = now.getHours();
  let minuteDdline = now.getMinutes();
  let secondDdline = now.getSeconds();
  let deadlineList = {
    month: monthDdline,
    day: dayDdline,
    hour: hourDdline,
    minute: minuteDdline,
    second: secondDdline,
  };
  console.log(dayDdline, monthDdline);

  let nowMonth = now.getMonth();
  let nowDay = now.getDate();
  let nowHour = now.getHours();
  let nowMinute = now.getMinutes();
  let nowSecond = now.getSeconds();

  if (nowMonth < deadlineList.month) {
    second = 60 - nowSecond;
    secondArea.textContent = second;
    minute = 60 - nowMinute - 1;
    minuteArea.textContent = minute;
    hour = 24 - nowHour - 1;
    hourArea.textContent = hour;
    day = Math.abs(deadlineList.day - nowDay) - 1;
    dayArea.textContent = day;

    let timer = setInterval(() => {
      if (second > 0) {
        second--;
        secondArea.textContent = second;
      } else {
        if (minute > 0) {
          minute--;
          second = 59;
          minuteArea.textContent = minute;
        } else {
          if (hour > 0) {
            hour--;
            minute = 59;
            second = 59;
            hourArea.textContent = hour;
          } else {
            if (day > 0) {
              day--;
              hour = 24;
              minute = 59;
              second = 59;
              dayArea.textContent = day;
            } else {
              alert("Congratulations");
              clearInterval(timer);
            }
          }
        }
      }
    }, 1000);
  }

  localStorage.setItem("deadline", JSON.stringify(deadlineList));
});

// reset.addEventListener("click", () => {
//   modalFont.classList.toggle("hidden");
//   modalBack.classList.toggle("hidden");
//   second = 0;
// });
