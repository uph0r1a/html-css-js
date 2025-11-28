const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");

const allSongs = [
  {
    id: 0,
    title: "Scratching The Surface",
    artist: "Artist",
    duration: "4:25",
    src: "./media/music/scratching-the-surface.mp3",
  },
  {
    id: 1,
    title: "Can't Stay Down",
    artist: "Artist",
    duration: "4:15",
    src: "./media/music/can't-stay-down.mp3",
  },
  {
    id: 2,
    title: "Still Learning",
    artist: "Artist",
    duration: "3:51",
    src: "./media/music/still-learning.mp3",
  },
  {
    id: 3,
    title: "Cruising for a Musing",
    artist: "Artist",
    duration: "3:34",
    src: "./media/music/cruising-for-a-musing.mp3",
  },
  {
    id: 4,
    title: "Never Not Favored",
    artist: "Artist",
    duration: "3:35",
    src: "./media/music/never-not-favored.mp3",
  },
  {
    id: 5,
    title: "From the Ground Up",
    artist: "Artist",
    duration: "3:12",
    src: "./media/music/from-the-ground-up.mp3",
  },
  {
    id: 6,
    title: "Walking on Air",
    artist: "Artist",
    duration: "3:25",
    src: "./media/music/walking-on-air.mp3",
  },
  {
    id: 7,
    title: "Can't Stop Me. Can't Even Slow Me Down.",
    artist: "Artist",
    duration: "3:52",
    src: "./media/music/cant-stop-me-cant-even-slow-me-down.mp3",
  },
  {
    id: 8,
    title: "The Surest Way Out is Through",
    artist: "Artist",
    duration: "3:10",
    src: "./media/music/the-surest-way-out-is-through.mp3",
  },
  {
    id: 9,
    title: "Chasing That Feeling",
    artist: "Artist",
    duration: "2:43",
    src: "./media/music/chasing-that-feeling.mp3",
  },
];

const audio = new Audio();
let userData = {
  songs: [...allSongs],
  currentSong: null,
  songCurrentTime: 0,
};

const togglePlayPauseUI = (isPlaying) => {
  if (isPlaying) {
    playButton.style.display = "none";
    pauseButton.style.display = "inline-block";
    playButton.classList.add("playing");
  } else {
    playButton.style.display = "inline-block";
    pauseButton.style.display = "none";
    playButton.classList.remove("playing");
  }
};

const playSong = (id) => {
  const song = userData.songs.find((song) => song.id === id);
  if (!song) return;

  audio.src = song.src;
  audio.title = song.title;

  audio.currentTime =
    userData.currentSong?.id === song.id ? userData.songCurrentTime : 0;

  userData.currentSong = song;

  highlightCurrentSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
  audio.play();
  togglePlayPauseUI(true);
};

const pauseSong = () => {
  if (!userData.currentSong) return;
  userData.songCurrentTime = audio.currentTime;
  audio.pause();
  togglePlayPauseUI(false);
};

const getCurrentSongIndex = () => userData.songs.indexOf(userData.currentSong);

const playNextSong = () => {
  if (!userData.currentSong) return playSong(userData.songs[0].id);

  const currentIndex = getCurrentSongIndex();
  const nextSong = userData.songs[currentIndex + 1] || userData.songs[0];
  playSong(nextSong.id);
};

const playPreviousSong = () => {
  if (!userData.currentSong) return;
  const currentIndex = getCurrentSongIndex();
  const previousSong =
    userData.songs[currentIndex - 1] ||
    userData.songs[userData.songs.length - 1];
  playSong(previousSong.id);
};

const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const shuffle = () => {
  userData.songs = shuffleArray([...userData.songs]);
  userData.currentSong = null;
  userData.songCurrentTime = 0;
  renderSongs(userData.songs);
  pauseSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
};

const deleteSong = (id) => {
  if (userData.currentSong?.id === id) {
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    pauseSong();
    setPlayerDisplay();
  }

  userData.songs = userData.songs.filter((song) => song.id !== id);
  renderSongs(userData.songs);
  highlightCurrentSong();
  setPlayButtonAccessibleText();
};

const setPlayerDisplay = () => {
  const titleEl = document.getElementById("player-song-title");
  const artistEl = document.getElementById("player-song-artist");

  titleEl.textContent = userData.currentSong?.title || "";
  artistEl.textContent = userData.currentSong?.artist || "";
};

const highlightCurrentSong = () => {
  document
    .querySelectorAll(".playlist-song")
    .forEach((songEl) => songEl.removeAttribute("aria-current"));
  const songEl = document.getElementById(`song-${userData.currentSong?.id}`);
  if (songEl) songEl.setAttribute("aria-current", "true");
};

const renderSongs = (array) => {
  const songsHTML = array
    .map(
      (song) => `
    <li id="song-${song.id}" class="playlist-song">
      <button class="playlist-song-info" onclick="playSong(${song.id})">
        <span class="playlist-song-title">${song.title}</span>
        <span class="playlist-song-artist">${song.artist}</span>
        <span class="playlist-song-duration">${song.duration}</span>
      </button>
      <button onclick="deleteSong(${song.id})" class="playlist-song-delete" aria-label="Delete ${song.title}">
        <i class="fa-solid fa-circle-xmark" style="color: #ff0000;"></i>
      </button>
    </li>`
    )
    .join("");

  playlistSongs.innerHTML = songsHTML;

  if (userData.songs.length === 0) {
    const resetButton = document.createElement("button");
    resetButton.id = "reset";
    resetButton.setAttribute("aria-label", "Reset playlist");
    resetButton.textContent = "Reset Playlist";

    playlistSongs.appendChild(resetButton);

    resetButton.addEventListener("click", () => {
      userData.songs = [...allSongs];
      renderSongs(sortSongs());
      setPlayButtonAccessibleText();
      resetButton.remove();
    });
  }
};

const setPlayButtonAccessibleText = () => {
  const song = userData.currentSong || userData.songs[0];
  playButton.setAttribute(
    "aria-label",
    song?.title ? `Play ${song.title}` : "Play"
  );
  playButton.setAttribute(
    "aria-pressed",
    userData.currentSong ? "true" : "false"
  );
  pauseButton.setAttribute(
    "aria-pressed",
    userData.currentSong ? "true" : "false"
  );
};

const sortSongs = () => {
  return userData.songs.sort((a, b) => a.title.localeCompare(b.title));
};

playButton.addEventListener("click", () => {
  if (!userData.currentSong) playSong(userData.songs[0].id);
  else playSong(userData.currentSong.id);
});

pauseButton.addEventListener("click", pauseSong);
nextButton.addEventListener("click", playNextSong);
previousButton.addEventListener("click", playPreviousSong);
shuffleButton.addEventListener("click", shuffle);

audio.addEventListener("ended", () => {
  const currentIndex = getCurrentSongIndex();
  const nextSong = userData.songs[currentIndex + 1];
  if (nextSong) playNextSong();
  else {
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    pauseSong();
    setPlayerDisplay();
    highlightCurrentSong();
    setPlayButtonAccessibleText();
  }
});

renderSongs(sortSongs());
setPlayButtonAccessibleText();
togglePlayPauseUI(false);
