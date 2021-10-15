apiKey = "5b5c99b88e14b535e7a2082b3dae0cb8";
reset = 0;
//Test Case
lat = 32;
lon = -110;
let timesCalled = 0;
reapplyMatrix = [
  [3, 120],
  [4, 109],
  [5, 101],
  [6, 92],
  [7, 84],
  [8, 77],
  [9, 77],
  [10, 71],
  [11, 60],
];
const removeRings = (containerID, index) => {
  node = containerID.childNodes[index];
  // console.log(node.className);
  // if (node.className == undefined) {
  //   console.log("dna");
  //   return;
  // } else if (node.className == "hold") {
  //   console.log("in if");
  //   // containerID.removeChild("hold");
  // } else {
  //   console.log("in else");
  // }
};
const makeRed = () => {
  console.log("making red");
  document.getElementById("red").style.color = "red";
  document.getElementById("sunTime").innerHTML = `REAPPLY`;
};

const populateDisplay = (uvi, temp, icon, minutes) => {
  uvi = Math.round(uvi);
  temp = Math.round(temp);
  document.getElementById("uvi").innerHTML = `UV: ${uvi}`;
  document.getElementById("temp").innerHTML = `${temp}&deg`;
  document.getElementById("sunTime").innerHTML = `${minutes}m`;

  document.getElementById(
    "icon"
  ).src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  document.getElementById("time").innerHTML = `${time}`;
};

const getWeather = (lat, lon) => {
  document.getElementById("red").style.color = "white";
  url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  fetch(url)
    .then((response) => response.json())
    .then(function test(data) {
      uvi = data.current.uvi;
      icon = data.current.weather[0].icon;
      temp = data.current.temp;

      getReapplyTime(uvi);
      populateDisplay(uvi, temp, icon, minutes);
    });
  // .catch(function () {
  //   console.log("error/max api calls met");
  //   window.alert("City not found, check spelling and try again");
  // });
};

const getReapplyTime = (uvi) => {
  uvi = Math.round(uvi, 1);
  minutes = reapplyMatrix[uvi][1];
  minutes = minutes - timesCalled;
  colorPie(minutes);
  timesCalled = timesCalled + 1;
};

const buildRings = (
  timeInput,
  class1,
  class2,
  containerClass,
  angle,
  displacement
) => {
  container = document.querySelector(`.${containerClass}`);
  angle = angle;
  j = 0;
  for (i = 0; i < 360 / angle; i += 2) {
    reset = 1;
    removeRings(container, i, reset);
    let slice = document.createElement("div");
    slice.id = `pieSlice${i}`;
    slice.className = `${class1}`;
    slice.style.transform = `rotate(${angle * i + displacement}deg)`;

    let innerPie = document.createElement("div");
    innerPie.className = `${class2}`;
    innerPie.style.transform = `rotate(${angle}deg)`;

    if (j < timeInput) {
      innerPie.style.border = "4px solid white";
    } else if (j >= timeInput) {
      innerPie.style.border = "4px solid #818080";
    }
    slice.appendChild(innerPie);
    container.appendChild(slice);
    j = j + 5;
  }

  rem = timeInput - j;
  return rem;
};

const colorPie = (minutes) => {
  buildRings(minutes, "hold", "pie", "pieContainer", 15, 0);

  if (rem > 0) {
    buildRings(rem, "hold2", "pie2", "pieContainer2", 15, 15);
  } else if (minutes <= 60) {
    buildRings(0, "hold2", "pie2", "pieContainer2", 15, 15);
  }
};

getWeather(lat, lon);
setInterval(function () {
  if (minutes <= 1) {
    makeRed();
  } else {
    getWeather(lat, lon);
  }
}, 60 * 100);

document
  .getElementById("reset")
  .addEventListener("click", function resetWatch() {
    console.log("button pushed");
    timesCalled = 0;
    minutes = 1;
    reset = 1;
    getWeather(lat, lon);
  });
