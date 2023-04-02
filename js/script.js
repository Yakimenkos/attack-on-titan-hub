"use strict";

const player = document.querySelector(".music-player"),
  seekBar = player.querySelector(".seek-bar"),
  songName = player.querySelector(".music-name"),
  artistName = player.querySelector(".artist-name"),
  disk = player.querySelector(".disk"),
  currentTime = player.querySelector(".current-time"),
  musicDuration = player.querySelector(".song-duration"),
  playBtn = player.querySelector(".play-btn"),
  forwardBtn = player.querySelector(".forward-btn"),
  backwardBtn = player.querySelector(".backward-btn"),
  volumeWrapper = document.querySelector(".volume-wrapper"),
  volumeControl = volumeWrapper.querySelector(".volume-control");


// Background logic
const background = document.querySelector(".background");
let backgrounds = data.backgrounds;

if(!localStorage.getItem("background")) {
    localStorage.setItem("background", 0);
}

let currentBackgound = localStorage.getItem("background");
background.style.backgroundImage = `url(${backgrounds[currentBackgound]})`;

setInterval(() => {
    if (currentBackgound >= backgrounds.length - 1) {
        currentBackgound = 0;
    } else {
        currentBackgound++;
    }
    background.style.backgroundImage = `url(${backgrounds[currentBackgound]})`;
    localStorage.setItem("background", currentBackgound);
}, 1000 * 60 * 5);

// Music logic
const music = document.querySelector("#audio");

if(!localStorage.getItem("music")) {
    localStorage.setItem("music", 0);
}

let currentMusic = localStorage.getItem("music");


playBtn.addEventListener("click", () => {
  if (playBtn.classList.contains("pause")) {
    music.play();
  } else {
    music.pause();
  }

  playBtn.classList.toggle("pause");
  disk.classList.toggle("play");
});

disk.addEventListener("click", () => {
  volumeWrapper.classList.toggle("show");
});

let songs = data.songs;

music.src = songs[0].path;

const setMusic = (i) => {
  localStorage.setItem("music", currentMusic)
  seekBar.value = 0;
  let song = songs[i];
  currentMusic = i;
  music.src = song.path;

  songName.textContent = song.name;
  artistName.textContent = song.artist;
  disk.style.backgroundImage = `url(${song.cover})`;

  currentTime.textContent = "00:00";
  setTimeout(() => {
    seekBar.max = music.duration;
    musicDuration.textContent = formatTime(music.duration);
  }, 300);
};

const formatTime = (time) => {
  let mins = 0;
  let secs = 0;
  if (time) {
    mins = Math.floor(time / 60);
    secs = Math.floor(time % 60);
  }

  if (mins < 10) {
    mins = `0${mins}`;
  }

  if (secs < 10) {
    secs = `0${secs}`;
  }

  return `${mins}:${secs}`;
};

setInterval(() => {
  seekBar.value = music.currentTime;
  currentTime.textContent = formatTime(music.currentTime);
  if (Math.floor(music.currentTime) == Math.floor(seekBar.max)) {
    forwardBtn.click();
  }
}, 500);

const playMusic = () => {
  music.play();
  playBtn.classList.remove("pause");
  disk.classList.add("play");
};

seekBar.addEventListener("change", () => {
  music.currentTime = seekBar.value;
});

volumeControl.addEventListener("change", () => {
  music.volume = volumeControl.value;
});

forwardBtn.addEventListener("click", () => {
  if (currentMusic >= songs.length - 1) {
    currentMusic = 0;
  } else {
    currentMusic++;
  }
  setMusic(currentMusic);
  playMusic();
});

backwardBtn.addEventListener("click", () => {
  if (currentMusic <= 0) {
    currentMusic = songs.length - 1;
  } else {
    currentMusic--;
  }
  setMusic(currentMusic);
  playMusic();
});


setMusic(currentMusic);
