```javascript
/* ==================================================
   CHRIS WEBSITE - COMPLETE SCRIPT
   MANUAL MUSIC PLAYBACK
================================================== */


/* ==================================================
   ELEMENTS
================================================== */

const welcomeScreen = document.getElementById("welcomeScreen");
const mainWebsite = document.getElementById("mainWebsite");

const meButton = document.getElementById("meButton");
const goAwayButton = document.getElementById("goAwayButton");

const audioPlayer = document.getElementById("audioPlayer");

const playButton = document.getElementById("playButton");
const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");

const backButton = document.getElementById("backButton");
const forwardButton = document.getElementById("forwardButton");

const volumeButton = document.getElementById("volumeButton");
const volumeSlider = document.getElementById("volumeSlider");
const volumePercent = document.getElementById("volumePercent");

const progressBar = document.getElementById("progressBar");

const currentTimeDisplay = document.getElementById("currentTime");
const durationDisplay = document.getElementById("duration");

const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");

const blueHeart = document.getElementById("blueHeart");
const exPopup = document.getElementById("exPopup");

const phoneButton = document.getElementById("phoneButton");

const viewerCount = document.getElementById("viewerCount");


/* ==================================================
   SONG LIST
   EXACT ORDER
================================================== */

const songs = [
    {
        title: "pointatmyhead",
        artist: "Chris",
        file: "./pointatmyhead.mp3"
    },

    {
        title: "NOT HERE",
        artist: "Chris",
        file: "./NOT HERE.mp3"
    },

    {
        title: "123",
        artist: "Chris",
        file: "./123.mp3"
    },

    {
        title: "TOO LATE",
        artist: "Chris",
        file: "./TOO LATE.mp3"
    },

    {
        title: "all i want is you now",
        artist: "Chris",
        file: "./all i want is you now.mp3"
    },

    {
        title: "stalk ur socials",
        artist: "Chris",
        file: "./stalk ur socials.mp3"
    }
];


/* ==================================================
   CURRENT SONG
================================================== */

let currentSongIndex = 0;


/* ==================================================
   FORMAT TIME
================================================== */

function formatTime(seconds) {

    if (!isFinite(seconds)) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);

    const secondsRemaining = Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0");

    return minutes + ":" + secondsRemaining;
}


/* ==================================================
   LOAD SONG
   DOES NOT PLAY AUTOMATICALLY
================================================== */

function loadSong(index) {

    if (!audioPlayer) {
        return;
    }

    currentSongIndex = index;

    const song = songs[currentSongIndex];

    audioPlayer.pause();

    audioPlayer.src = song.file;

    audioPlayer.load();

    if (songTitle) {
        songTitle.textContent = song.title;
    }

    if (songArtist) {
        songArtist.textContent = song.artist;
    }

    if (currentTimeDisplay) {
        currentTimeDisplay.textContent = "0:00";
    }

    if (durationDisplay) {
        durationDisplay.textContent = "0:00";
    }

    if (progressBar) {
        progressBar.value = 0;
    }

    if (playButton) {
        playButton.textContent = "▶";
    }
}


/* ==================================================
   PLAY
================================================== */

function playSong() {

    if (!audioPlayer) {
        return;
    }

    audioPlayer.play()
        .then(function () {

            if (playButton) {
                playButton.textContent = "❚❚";
            }

        })
        .catch(function (error) {

            console.error("Music could not play:", error);

        });
}


/* ==================================================
   PAUSE
================================================== */

function pauseSong() {

    if (!audioPlayer) {
        return;
    }

    audioPlayer.pause();

    if (playButton) {
        playButton.textContent = "▶";
    }
}


/* ==================================================
   PLAY / PAUSE BUTTON
================================================== */

if (playButton) {

    playButton.addEventListener("click", function () {

        if (audioPlayer.paused) {

            playSong();

        } else {

            pauseSong();

        }

    });

}


/* ==================================================
   ENTER WEBSITE
   IMPORTANT:
   DOES NOT AUTOPLAY MUSIC
================================================== */

function enterWebsite() {

    if (welcomeScreen) {
        welcomeScreen.classList.add("hide");
    }

    /*
       Load the first song,
       but DO NOT play it.
    */

    loadSong(0);
}


/* ==================================================
   MAKE ENTERWEBSITE AVAILABLE TO HTML
================================================== */

window.enterWebsite = enterWebsite;


/* ==================================================
   ME BUTTON
================================================== */

if (meButton) {

    meButton.addEventListener("click", function () {

        enterWebsite();

    });

}


/* ==================================================
   GO AWAY BUTTON
================================================== */

if (goAwayButton) {

    goAwayButton.addEventListener("click", function () {

        enterWebsite();

    });

}


/* ==================================================
   NEXT SONG
================================================== */

function nextSong() {

    currentSongIndex++;

    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }

    loadSong(currentSongIndex);

}


/* ==================================================
   NEXT BUTTON
================================================== */

if (nextButton) {

    nextButton.addEventListener("click", function () {

        nextSong();

    });

}


/* ==================================================
   PREVIOUS SONG
================================================== */

function previousSong() {

    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }

    loadSong(currentSongIndex);

}


/* ==================================================
   PREVIOUS BUTTON
================================================== */

if (previousButton) {

    previousButton.addEventListener("click", function () {

        previousSong();

    });

}


/* ==================================================
   BACK 10 SECONDS
================================================== */

if (backButton) {

    backButton.addEventListener("click", function () {

        if (!audioPlayer) {
            return;
        }

        audioPlayer.currentTime =
            Math.max(
                0,
                audioPlayer.currentTime - 10
            );

    });

}


/* ==================================================
   FORWARD 10 SECONDS
================================================== */

if (forwardButton) {

    forwardButton.addEventListener("click", function () {

        if (!audioPlayer) {
            return;
        }

        if (!isFinite(audioPlayer.duration)) {
            return;
        }

        audioPlayer.currentTime =
            Math.min(
                audioPlayer.duration,
                audioPlayer.currentTime + 10
            );

    });

}


/* ==================================================
   UPDATE MUSIC TIME
================================================== */

if (audioPlayer) {

    audioPlayer.addEventListener("timeupdate", function () {

        if (!isFinite(audioPlayer.duration)) {
            return;
        }

        const percentage =
            (audioPlayer.currentTime /
                audioPlayer.duration) * 100;

        if (progressBar) {
            progressBar.value = percentage;
        }

        if (currentTimeDisplay) {

            currentTimeDisplay.textContent =
                formatTime(audioPlayer.currentTime);

        }

    });

}


/* ==================================================
   AUDIO METADATA LOADED
================================================== */

if (audioPlayer) {

    audioPlayer.addEventListener("loadedmetadata", function () {

        if (durationDisplay) {

            durationDisplay.textContent =
                formatTime(audioPlayer.duration);

        }

    });

}


/* ==================================================
   PROGRESS BAR
================================================== */

if (progressBar) {

    progressBar.addEventListener("input", function () {

        if (!audioPlayer) {
            return;
        }

        if (!isFinite(audioPlayer.duration)) {
            return;
        }

        const newTime =
            (Number(progressBar.value) / 100) *
            audioPlayer.duration;

        audioPlayer.currentTime = newTime;

    });

}


/* ==================================================
   SONG ENDED
   GOES TO NEXT SONG BUT DOES NOT AUTOPLAY
================================================== */

if (audioPlayer) {

    audioPlayer.addEventListener("ended", function () {

        currentSongIndex++;

        if (currentSongIndex >= songs.length) {
            currentSongIndex = 0;
        }

        loadSong(currentSongIndex);

    });

}


/* ==================================================
   PLAY EVENT
================================================== */

if (audioPlayer) {

    audioPlayer.addEventListener("play", function () {

        if (playButton) {
            playButton.textContent = "❚❚";
        }

    });


/* ==================================================
   PAUSE EVENT
================================================== */

    audioPlayer.addEventListener("pause", function () {

        if (playButton) {
            playButton.textContent = "▶";
        }

    });

}


/* ==================================================
   VOLUME SLIDER
================================================== */

if (volumeSlider) {

    volumeSlider.addEventListener("input", function () {

        const volume =
            Number(volumeSlider.value);

        audioPlayer.volume = volume;

        audioPlayer.muted = false;

        if (volumePercent) {

            volumePercent.textContent =
                Math.round(volume * 100) + "%";

        }

        if (volumeButton) {

            if (volume === 0) {

                volumeButton.textContent = "🔇";

            } else {

                volumeButton.textContent = "🔊";

            }

        }

    });

}


/* ==================================================
   VOLUME BUTTON
================================================== */

if (volumeButton) {

    volumeButton.addEventListener("click", function () {

        if (!audioPlayer) {
            return;
        }

        if (audioPlayer.muted || audioPlayer.volume === 0) {

            audioPlayer.muted = false;

            audioPlayer.volume = 1;

            if (volumeSlider) {
                volumeSlider.value = 1;
            }

            if (volumePercent) {
                volumePercent.textContent = "100%";
            }

            volumeButton.textContent = "🔊";

        } else {

            audioPlayer.muted = true;

            volumeButton.textContent = "🔇";

        }

    });

}


/* ==================================================
   BLUE HEART
   I MISS MY EX
================================================== */

if (blueHeart) {

    blueHeart.addEventListener("click", function () {

        if (!exPopup) {
            return;
        }

        exPopup.classList.add("show");

        /*
           Short display time.
        */

        setTimeout(function () {

            exPopup.classList.remove("show");

        }, 900);

    });

}


/* ==================================================
   PHONE NUMBER BUTTON
================================================== */

if (phoneButton) {

    phoneButton.addEventListener("click", function () {

        phoneButton.textContent = "you thought 😂";

    });

}


/* ==================================================
   VIEWER COUNTER
================================================== */

if (viewerCount) {

    const savedViewerCount =
        localStorage.getItem("chrisViewerCount");

    if (savedViewerCount) {

        viewerCount.textContent =
            savedViewerCount;

    } else {

        viewerCount.textContent = "786";

        localStorage.setItem(
            "chrisViewerCount",
            "786"
        );

    }

}


/* ==================================================
   INITIAL SONG
   LOADED BUT NOT PLAYED
================================================== */

loadSong(0);


/* ==================================================
   AUDIO ERROR
================================================== */

if (audioPlayer) {

    audioPlayer.addEventListener("error", function () {

        console.error(
            "The MP3 could not be loaded. Make sure the filename and location match exactly."
        );

    });

}
```
