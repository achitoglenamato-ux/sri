/* ==========================================
   Shared Background Music (all pages)
   Self-locates friend.mp3 relative to this script,
   so the same file works at any folder depth.
========================================== */

(function () {

    const thisScript = document.currentScript;
    const musicSrc = thisScript.src.replace(/music\.js(\?.*)?$/, "friend.mp3");

    const audio = document.createElement("audio");
    audio.src = musicSrc;
    audio.loop = true;
    audio.volume = 0.45;
    audio.id = "bgMusic";
    document.body.appendChild(audio);

    // Floating toggle button
    const btn = document.createElement("button");
    btn.id = "musicToggle";
    btn.type = "button";
    btn.innerHTML = "🎵";
    document.body.appendChild(btn);

    const style = document.createElement("style");
    style.textContent = `
        #musicToggle{
            position:fixed;
            bottom:22px;
            right:22px;
            z-index:1002;
            width:52px;
            height:52px;
            border-radius:50%;
            border:none;
            background:rgba(0,0,0,.45);
            backdrop-filter:blur(10px);
            color:#D7B98E;
            font-size:22px;
            cursor:pointer;
            box-shadow:0 8px 20px rgba(0,0,0,.4);
            transition:.3s;
        }
        #musicToggle:hover{
            background:rgba(0,0,0,.65);
            transform:translateY(-3px) scale(1.05);
        }
        #musicToggle.playing{
            animation:musicPulse 1.6s ease-in-out infinite;
        }
        @keyframes musicPulse{
            0%,100%{ box-shadow:0 8px 20px rgba(0,0,0,.4); }
            50%{ box-shadow:0 8px 20px rgba(215,185,142,.55); }
        }
    `;
    document.head.appendChild(style);

    let userPaused = false;

    function play() {
        audio.play().then(() => {
            btn.innerHTML = "🎵";
            btn.classList.add("playing");
        }).catch(() => {
            // Autoplay blocked — wait for user interaction
        });
    }

    function pause() {
        audio.pause();
        btn.innerHTML = "🔇";
        btn.classList.remove("playing");
    }

    // Try to autoplay immediately (works if user already interacted on a prior page this session)
    play();

    // Most browsers block audio-with-sound autoplay before any interaction —
    // start on the very first click/tap/keypress anywhere on the page.
    function unlock() {
        if (!userPaused && audio.paused) play();
        document.removeEventListener("click", unlock);
        document.removeEventListener("keydown", unlock);
        document.removeEventListener("touchstart", unlock);
    }
    document.addEventListener("click", unlock);
    document.addEventListener("keydown", unlock);
    document.addEventListener("touchstart", unlock);

    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (audio.paused) {
            userPaused = false;
            play();
        } else {
            userPaused = true;
            pause();
        }
    });

})();
