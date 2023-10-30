let isStoryFull = false;

function VegetarianChange() {
  var x = document.getElementById("IsVegetarian").value;
  console.log(x);
  const vegetarianCountParent = document.getElementById(
    "VegetarianCountParent"
  );
  if (x == "true") {
    vegetarianCountParent.style.display = "block";
  } else {
    vegetarianCountParent.style.display = "none";
  }
}

function myFunction() {
  const heart = document.getElementById("Story_Heart");
  const paragraph2 = document.getElementById("Story_P2");
  const ring = document.getElementById("Story_Ring");
  const paragraph3 = document.getElementById("Story_P3");
  const readMoreBtn = document.getElementById("myBtn");
  // var dots = document.getElementById("dots");
  // var moreText = document.getElementById("more");
  // var btnText = document.getElementById("myBtn");

  // if (dots.style.display === "none") {
  //     dots.style.display = "inline";
  //     btnText.innerHTML = "Read more";
  //     moreText.style.display = "none";
  // } else {
  //     dots.style.display = "none";
  //     btnText.innerHTML = "Read less";
  //     moreText.style.display = "inline";
  // }
  if (isStoryFull) {
    isStoryFull = false;
    heart.style.display = "none";
    paragraph2.style.display = "none";
    ring.style.display = "none";
    paragraph3.style.display = "none";
    readMoreBtn.innerHTML = "Read more";
  } else {
    isStoryFull = true;
    heart.style.display = "block";
    paragraph2.style.display = "inline-block";
    ring.style.display = "flex";
    paragraph3.style.display = "inline-block";
    readMoreBtn.innerHTML = "Read less";
  }
}

function displayTime(ticksInSecs) {
  var ticks = ticksInSecs;
  var hh = Math.floor(ticks / 3600);
  var mm = Math.floor((ticks % 3600) / 60);
  var ss = ticks % 60;

  return pad(hh, 2) + ":" + pad(mm, 2) + ":" + pad(ss, 2);
}
function pad(n, width) {
  var n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join("0") + n;
}
function OnSendClicked() {
  var IsVegetarianOption = document.getElementById("IsVegetarian").value;
  var VegetarianCount = document.getElementById("VegetarianCount").value;
  //var TransportationType = document.getElementById("TransportationType").value;
  var AttendessCount = document.getElementById("AttendessCount").value;
  var GuestType = document.getElementById("option-1").checked;
  var GuestName = document.getElementById("GuestName").value;
  var GuestStatus = document.getElementById("option-1boxp").checked;
  if (GuestName.length < 1) {
    swal({
      title: "Thất bại !",
      text: `Quý vị vui lòng nhập tên!`,
      icon: "error",
      button: "OK!",
    });
    return;
  } else {
    console.log("GuestName.length", GuestName.length);
  }

  let requestData = {
    name: GuestName,
    type: GuestType ? 0 : 1,
    ready: GuestStatus,
    count: AttendessCount,
    transportationType: 0,
    vegetarian: IsVegetarianOption,
    vegetarianCount: VegetarianCount,
  };

  console.log("requestData", requestData);
  axios
    .post("/api/guests", requestData, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response);
      console.log(response.status);
      // success responnse
      if (response.status >= 200 && response.status < 300) {
        console.log("hshafhef");
        swal({
          title: "Thành công !",
          text: "Xin cảm ơn phản hồi của quý vị!",
          icon: "success",
          button: "OK!",
        });
      } else {
        swal({
          title: "Thất bại !",
          text: `Đã xảy ra lỗi ${response.status}, vui lòng liên hệ chú rể!`,
          icon: "error",
          button: "OK!",
        });
      }
    })
    .catch((error) => {
      swal({
        title: "Thất bại !",
        text: `Đã xảy ra lỗi ${error.message}, vui lòng liên hệ chú rể!`,
        icon: "error",
        button: "OK!",
      });
    });
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let tz = jstz.determine();
let htmlx = $(".addevent").attr("data-event");
//htmlx = htmlx.replace('\n, "\n");

try {
  htmlx = $.parseJSON(htmlx.replace(/\s+/g, " "));
  //htmlx = JSON.parse(htmlx);
  htmlx.timezone = tz.name();
} catch (e) {}

//console.log(htmlx);
$(".addevent").attr("data-event", JSON.stringify(htmlx));

let time = $("div.countdown-time").attr("data-time");
var countDownDate = new Date("" + time + "").getTime();
// Update the count down every 1 second
var x = setInterval(function () {
  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  if (parseInt(hours) < 10) {
    hours = "0" + parseInt(hours);
  }
  if (parseInt(minutes) < 10) {
    minutes = "0" + parseInt(minutes);
  }
  if (parseInt(seconds) < 10) {
    seconds = "0" + parseInt(seconds);
  }
  if (parseInt(days) < 10) {
    days = "0" + parseInt(days);
  }

  $(".day-left .num").html(days);
  $(".hour-left .num").html(hours);
  $(".minute-left .num").html(minutes);
  $(".second-left .num").html(seconds);

  // If the count down is over, write some text
  if (distance < 0) {
    clearInterval(x);
    $(".day-left .num").html("00");
    $(".hour-left .num").html("00");
    $(".minute-left .num").html("00");
    $(".second-left .num").html("00");
    //document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);

let audioPlayer = document.getElementById("audio");

function randomSource() {
  console.log("randomSource");
  var sources = ["audio1.mp3", "audio3.mp3", "audio4.mp3"];
  let targetAudioIndex = getRandomInt(0, 2);

  while (true) {
    if (targetAudioIndex == localStorage.getItem("lastAudioIndex")) {
      targetAudioIndex = getRandomInt(0, 2);
      continue;
    }
    localStorage.setItem("lastAudioIndex", targetAudioIndex);
    break;
  }

  if (audioPlayer) {
    console.log("sources: ", sources[targetAudioIndex]);
    audioPlayer.src = "./audios/" + sources[targetAudioIndex];
  }
}

function getNextRandom() {
  let targetAudioIndex = getRandomInt(0, 2);
  while (true) {
    if (targetAudioIndex == localStorage.getItem("lastAudioIndex")) {
      targetAudioIndex = getRandomInt(0, 2);
      continue;
    }
    localStorage.setItem("lastAudioIndex", targetAudioIndex);
    break;
  }
  return targetAudioIndex;
}

function randomSource() {
  const sources = ["audio1.mp3", "audio3.mp3", "audio4.mp3"];
  let result = [];
  while (result < 3) {
    const index = getNextRandom();
    result.push(sources[index]);
  }
  return result;
}

let audioIndex = -1;

function setAudioSource(audioSources, index) {
  if (audioPlayer) {
    console.log("sources: ", audioSources[index]);
    audioPlayer.src = "./audios/" + audioSources[index];
  }
}
function nextIndex() {
  audioIndex += 1;
  if (audioIndex > 2) {
    audioIndex = 0;
  }
}

$(document).ready(function () {
  nextIndex();
  var audioSources = randomSource();
  setAudioSource(audioSources, audioIndex);

  audioPlayer.onended = function () {
    var audioSources = randomSource();
    setAudioSource(audioSources, audioIndex);
    audioPlayer.play();
  };
  swal({
    title: "Cấp quyền âm thanh?",
    text: "Vui lòng cấp quyền âm thanh để có trải nghiệm tốt nhất",
    icon: "warning",
    buttons: true,
    dangerMode: true,
    html: "compa&ntilde;ia",
  }).then((isAgree) => {
    if (isAgree) {
      console.log("isAgree");
      let button = document.getElementsByClassName("btn-musicf");
      console.log(button);
      button[0].click();
    }
  });
});
