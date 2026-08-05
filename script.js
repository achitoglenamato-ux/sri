/* ==========================================
   Happy Birthday Sri 🤎
   Main Script
========================================== */

// ------------------------------
// Countdown
// ------------------------------

const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

function getBirthday() {

    const now = new Date();

    let year = now.getFullYear();

    let birthday = new Date(year, 7, 6, 0, 0, 0);

    if (now > birthday) {

        birthday = new Date(year + 1, 7, 6, 0, 0, 0);

    }

    return birthday;

}

function updateCountdown() {

    const now = new Date();

    const birthday = getBirthday();

    const diff = birthday - now;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    days.textContent = String(d).padStart(2, "0");
    hours.textContent = String(h).padStart(2, "0");
    minutes.textContent = String(m).padStart(2, "0");
    seconds.textContent = String(s).padStart(2, "0");

}

updateCountdown();
setInterval(updateCountdown,1000);

// ------------------------------
// Begin Journey Button
// ------------------------------

const beginBtn = document.getElementById("beginBtn");

beginBtn.addEventListener("click", () => {

    document
        .getElementById("journey")
        .scrollIntoView({
            behavior:"smooth"
        });

});

// ------------------------------
// Floating Hearts & Teddy Bears
// ------------------------------

const particleLayer = document.getElementById("particles") || document.body;
const floatIcons = ["🤎","🧸","✨","🎈"];

function createFloatingIcon(){

    const el = document.createElement("div");

    el.innerHTML = floatIcons[Math.floor(Math.random()*floatIcons.length)];

    el.style.position = "absolute";
    el.style.left = Math.random()*100 + "vw";
    el.style.bottom = "-10vh";
    el.style.fontSize = (20 + Math.random()*24)+"px";
    el.style.animation = `floatUp ${8 + Math.random()*6}s linear forwards`;

    particleLayer.appendChild(el);

    setTimeout(()=>{
        el.remove();
    },14000);

}

setInterval(createFloatingIcon,900);
createFloatingIcon();

// ------------------------------
// Sparkle Effect
// ------------------------------

document.addEventListener("mousemove",(e)=>{

    const spark=document.createElement("span");

    spark.innerHTML="✨";

    spark.style.position="fixed";

    spark.style.left=e.clientX+"px";

    spark.style.top=e.clientY+"px";

    spark.style.pointerEvents="none";

    spark.style.fontSize="12px";

    spark.style.opacity="1";

    spark.style.transition="1s";

    document.body.appendChild(spark);

    setTimeout(()=>{

        spark.style.transform="translateY(-30px)";
        spark.style.opacity="0";

    },20);

    setTimeout(()=>{

        spark.remove();

    },1000);

});

// ------------------------------
// Welcome Message
// ------------------------------

setTimeout(()=>{

    console.log("Happy Birthday Sri 🤎");

},1000);