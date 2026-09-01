```javascript
document.addEventListener("DOMContentLoaded", function () {

    // ============================================================
    // ELEMENTS
    // ============================================================

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

    const currentTimeDisplay =
        document.getElementById("currentTime");

    const durationDisplay =
        document.getElementById("duration");

    const songTitle =
        document.getElementById("songTitle");

    const songArtist =
        document.getElementById("songArtist");

    const blueHeart =
        document.getElementById("blueHeart");

    const exPopup =
        document.getElementById("exPopup");

    const phoneButton =
        document.getElementById("phoneButton");


    // ============================================================
    // SONG LIST
    // ============================================================
    // EXACT ORDER
    // ============================================================

    const songs = [

        {
            title: "pointatmyhead",
            artist: "Chris",
            file: "music/pointatmyhead.mp3"
        },

        {
            title: "NOT HERE",
            artist: "Chris",
            file: "music/NOT HERE.mp3"
        },

        {
            title: "123",
            artist: "Chris",
            file: "music/123.mp3"
        },

        {
            title: "TOO LATE",
            artist: "Chris",
            file: "music/TOO LATE.mp3"
        },

        {
            title: "all i want is you now",
            artist: "Chris",
            file: "music/all i want is you now.mp3"
        },

        {
            title: "stalk ur socials",
            artist: "Chris",
            file: "music/stalk ur socials.mp3"
        }

    ];


    // ============================================================
    // CURRENT SONG
    // ============================================================

    let currentSong = 0;


    // ============================================================
    // LOAD SONG
    // ============================================================

    function loadSong(index) {

        if (index < 0) {
            index = songs.length - 1;
        }

        if (index >= songs.length) {
            index = 0;
        }


        currentSong = index;


        const song =
            songs[currentSong];


        // Stop current song

        audioPlayer.pause();


        // Set new audio file

        audioPlayer.src =
            song.file;


        // Load new audio

        audioPlayer.load();


        // Update title

        if (songTitle) {

            songTitle.textContent =
                song.title;

        }


        // Update artist

        if (songArtist) {

            songArtist.textContent =
                song.artist;

        }


        // Reset progress

        if (progressBar) {

            progressBar.value = 0;

        }


        if (currentTimeDisplay) {

            currentTimeDisplay.textContent =
                "0:00";

        }


        if (durationDisplay) {

            durationDisplay.textContent =
                "0:00";

        }

    }


    // ============================================================
    // PLAY SONG
    // ============================================================

    function playSong() {

        if (!audioPlayer) {
            return;
        }


        const promise =
            audioPlayer.play();


        if (promise !== undefined) {

            promise
                .then(function () {

                    updatePlayButton(true);

                })
                .catch(function (error) {

                    console.log(
                        "Music could not autoplay:",
                        error
                    );

                    updatePlayButton(false);

                });

        }

    }


    // ============================================================
    // PAUSE SONG
    // ============================================================

    function pauseSong() {

        audioPlayer.pause();

        updatePlayButton(false);

    }


    // ============================================================
    // PLAY / PAUSE BUTTON
    // ============================================================

    if (playButton) {

        playButton.addEventListener(
            "click",
            function () {

                if (audioPlayer.paused) {

                    playSong();

                } else {

                    pauseSong();

                }

            }
        );

    }


    // ============================================================
    // ENTER WEBSITE
    // ============================================================

    function enterWebsite() {

        // Hide welcome screen

        if (welcomeScreen) {

            welcomeScreen.classList.add(
                "hide"
            );


            setTimeout(
                function () {

                    welcomeScreen.style.display =
                        "none";

                },
                700
            );

        }


        // Make sure main website is visible

        if (mainWebsite) {

            mainWebsite.style.display =
                "flex";

            mainWebsite.style.visibility =
                "visible";

            mainWebsite.style.opacity =
                "1";

        }


        // Only load the first song if
        // nothing has been loaded yet.

        if (
            !audioPlayer.src ||
            audioPlayer.src ===
            window.location.href
        ) {

            loadSong(0);

        }


        // Start music after the button click.
        // This click counts as user interaction.

        playSong();

    }


    // ============================================================
    // ME BUTTON
    // ============================================================

    if (meButton) {

        meButton.addEventListener(
            "click",
            function () {

                enterWebsite();

            }
        );

    }


    // ============================================================
    // GO AWAY BUTTON
    // ============================================================

    if (goAwayButton) {

        goAwayButton.addEventListener(
            "click",
            function () {

                enterWebsite();

            }
        );

    }


    // ============================================================
    // AUDIO PLAY EVENT
    // ============================================================

    audioPlayer.addEventListener(
        "play",
        function () {

            updatePlayButton(true);

        }
    );


    // ============================================================
    // AUDIO PAUSE EVENT
    // ============================================================

    audioPlayer.addEventListener(
        "pause",
        function () {

            updatePlayButton(false);

        }
    );


    // ============================================================
    // UPDATE PLAY BUTTON
    // ============================================================

    function updatePlayButton(isPlaying) {

        if (!playButton) {
            return;
        }


        if (isPlaying) {

            playButton.textContent =
                "❚❚";

        } else {

            playButton.textContent =
                "▶";

        }

    }


    // ============================================================
    // NEXT SONG
    // ============================================================

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            function () {

                currentSong++;


                if (
                    currentSong >=
                    songs.length
                ) {

                    currentSong = 0;

                }


                loadSong(currentSong);

                playSong();

            }
        );

    }


    // ============================================================
    // PREVIOUS SONG
    // ============================================================

    if (previousButton) {

        previousButton.addEventListener(
            "click",
            function () {

                currentSong--;


                if (currentSong < 0) {

                    currentSong =
                        songs.length - 1;

                }


                loadSong(currentSong);

                playSong();

            }
        );

    }


    // ============================================================
    // BACK 10 SECONDS
    // ============================================================

    if (backButton) {

        backButton.addEventListener(
            "click",
            function () {

                audioPlayer.currentTime =
                    Math.max(
                        0,
                        audioPlayer.currentTime - 10
                    );

            }
        );

    }


    // ============================================================
    // FORWARD 10 SECONDS
    // ============================================================

    if (forwardButton) {

        forwardButton.addEventListener(
            "click",
            function () {

                if (!audioPlayer.duration) {
                    return;
                }


                audioPlayer.currentTime =
                    Math.min(
                        audioPlayer.duration,
                        audioPlayer.currentTime + 10
                    );

            }
        );

    }


    // ============================================================
    // PROGRESS BAR
    // ============================================================

    if (progressBar) {

        progressBar.addEventListener(
            "input",
            function () {

                if (!audioPlayer.duration) {
                    return;
                }


                const percentage =
                    Number(
                        progressBar.value
                    );


                audioPlayer.currentTime =
                    (
                        percentage / 100
                    ) *
                    audioPlayer.duration;

            }
        );

    }


    // ============================================================
    // TIME UPDATE
    // ============================================================

    audioPlayer.addEventListener(
        "timeupdate",
        function () {

            if (!audioPlayer.duration) {
                return;
            }


            // Progress

            if (progressBar) {

                progressBar.value =
                    (
                        audioPlayer.currentTime /
                        audioPlayer.duration
                    ) *
                    100;

            }


            // Current time

            if (currentTimeDisplay) {

                currentTimeDisplay.textContent =
                    formatTime(
                        audioPlayer.currentTime
                    );

            }


            // Duration

            if (durationDisplay) {

                durationDisplay.textContent =
                    formatTime(
                        audioPlayer.duration
                    );

            }

        }
    );


    // ============================================================
    // AUDIO LOADED
    // ============================================================

    audioPlayer.addEventListener(
        "loadedmetadata",
        function () {

            if (durationDisplay) {

                durationDisplay.textContent =
                    formatTime(
                        audioPlayer.duration
                    );

            }

        }
    );


    // ============================================================
    // SONG FINISHED
    // ============================================================

    audioPlayer.addEventListener(
        "ended",
        function () {

            currentSong++;


            if (
                currentSong >=
                songs.length
            ) {

                currentSong = 0;

            }


            loadSong(currentSong);

            playSong();

        }
    );


    // ============================================================
    // VOLUME SLIDER
    // ============================================================

    if (volumeSlider) {

        volumeSlider.addEventListener(
            "input",
            function () {

                const volume =
                    Number(
                        volumeSlider.value
                    );


                audioPlayer.volume =
                    volume;


                if (volumePercent) {

                    volumePercent.textContent =
                        Math.round(
                            volume * 100
                        ) + "%";

                }


                if (volumeButton) {

                    if (volume === 0) {

                        volumeButton.textContent =
                            "🔇";

                    } else if (
                        volume < 0.5
                    ) {

                        volumeButton.textContent =
                            "🔉";

                    } else {

                        volumeButton.textContent =
                            "🔊";

                    }

                }

            }
        );

    }


    // ============================================================
    // VOLUME BUTTON
    // ============================================================

    if (volumeButton) {

        volumeButton.addEventListener(
            "click",
            function () {

                if (audioPlayer.volume > 0) {

                    audioPlayer.dataset.oldVolume =
                        audioPlayer.volume;

                    audioPlayer.volume = 0;


                    if (volumeSlider) {

                        volumeSlider.value = 0;

                    }


                    if (volumePercent) {

                        volumePercent.textContent =
                            "0%";

                    }


                    volumeButton.textContent =
                        "🔇";

                } else {

                    const oldVolume =
                        Number(
                            audioPlayer.dataset.oldVolume
                        ) || 1;


                    audioPlayer.volume =
                        oldVolume;


                    if (volumeSlider) {

                        volumeSlider.value =
                            oldVolume;

                    }


                    if (volumePercent) {

                        volumePercent.textContent =
                            Math.round(
                                oldVolume * 100
                            ) + "%";

                    }


                    volumeButton.textContent =
                        "🔊";

                }

            }
        );

    }


    // ============================================================
    // PHONE NUMBER BUTTON
    // ============================================================

    if (phoneButton) {

        phoneButton.addEventListener(
            "click",
            function () {

                phoneButton.textContent =
                    "you thought 😂";

            }
        );

    }


    // ============================================================
    // BLUE HEART / I MISS MY EX
    // ============================================================

    if (
        blueHeart &&
        exPopup
    ) {

        blueHeart.addEventListener(
            "click",
            function () {

                exPopup.classList.add(
                    "show"
                );


                setTimeout(
                    function () {

                        exPopup.classList.remove(
                            "show"
                        );

                    },
                    800
                );

            }
        );

    }


    // ============================================================
    // FORMAT TIME
    // ============================================================

    function formatTime(seconds) {

        if (
            !seconds ||
            isNaN(seconds)
        ) {

            return "0:00";

        }


        const minutes =
            Math.floor(
                seconds / 60
            );


        const remainingSeconds =
            Math.floor(
                seconds % 60
            )
            .toString()
            .padStart(
                2,
                "0"
            );


        return (
            minutes +
            ":" +
            remainingSeconds
        );

    }


    // ============================================================
    // INITIAL VOLUME
    // ============================================================

    audioPlayer.volume = 1;


    if (volumeSlider) {

        volumeSlider.value = 1;

    }


    if (volumePercent) {

        volumePercent.textContent =
            "100%";

    }


    // ============================================================
    // LOAD FIRST SONG
    // ============================================================

    loadSong(0);

});
```
