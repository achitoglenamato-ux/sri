/* ==========================================
   Secret Letter — envelope reveal + verses
========================================== */

const envelope = document.getElementById("envelope");
const envelopeWrap = document.getElementById("envelopeWrap");
const letterContent = document.getElementById("letterContent");

const verses = [
    { text: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.", ref: "Jeremiah 29:11" },
    { text: "The LORD bless thee, and keep thee: The LORD make his face shine upon thee, and be gracious unto thee.", ref: "Numbers 6:24-25" },
    { text: "A friend loveth at all times.", ref: "Proverbs 17:17" },
    { text: "This is the day which the LORD hath made; we will rejoice and be glad in it.", ref: "Psalm 118:24" },
    { text: "Be strong and of a good courage; be not afraid... for the LORD thy God is with thee whithersoever thou goest.", ref: "Joshua 1:9" }
];

envelope.addEventListener("click", () => {

    if (envelope.classList.contains("open")) return;

    envelope.classList.add("open");

    setTimeout(() => {
        envelopeWrap.classList.add("hidden");
        letterContent.classList.remove("hidden");
        letterContent.classList.add("fade-in");
        renderVerses();
        letterContent.scrollIntoView({ behavior: "smooth", block: "start" });
        burstConfetti();
    }, 700);

});

function renderVerses() {
    const grid = document.getElementById("versesGrid");
    grid.innerHTML = "";
    verses.forEach(v => {
        const card = document.createElement("div");
        card.className = "verse-card";
        card.innerHTML = `<p>"${v.text}"</p><span>— ${v.ref}</span>`;
        grid.appendChild(card);
    });
}

// ------------------------------
// Confetti burst on letter open
// ------------------------------

function burstConfetti() {
    const icons = ["🎉", "🎊", "✨", "🧸", "🤎", "💌"];
    for (let i = 0; i < 26; i++) {
        const el = document.createElement("div");
        el.innerHTML = icons[Math.floor(Math.random() * icons.length)];
        el.style.position = "fixed";
        el.style.left = "50%";
        el.style.top = "30%";
        el.style.fontSize = (16 + Math.random() * 18) + "px";
        el.style.pointerEvents = "none";
        el.style.zIndex = "2000";
        const angle = Math.random() * Math.PI * 2;
        const distance = 120 + Math.random() * 200;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;
        el.style.transition = "transform 1.3s ease-out, opacity 1.3s ease-out";
        document.body.appendChild(el);
        requestAnimationFrame(() => {
            el.style.transform = `translate(${dx}px, ${dy}px)`;
            el.style.opacity = "0";
        });
        setTimeout(() => el.remove(), 1400);
    }
}

// ------------------------------
// Floating teddy bears & hearts (matches main site)
// ------------------------------

const particleLayer = document.getElementById("particles") || document.body;
const floatIcons = ["🤎", "🧸", "✨"];

function createFloatingIcon() {
    const el = document.createElement("div");
    el.innerHTML = floatIcons[Math.floor(Math.random() * floatIcons.length)];
    el.style.position = "absolute";
    el.style.left = Math.random() * 100 + "vw";
    el.style.bottom = "-10vh";
    el.style.fontSize = (20 + Math.random() * 24) + "px";
    el.style.animation = `floatUp ${8 + Math.random() * 6}s linear forwards`;
    particleLayer.appendChild(el);
    setTimeout(() => el.remove(), 14000);
}

setInterval(createFloatingIcon, 1200);
createFloatingIcon();
