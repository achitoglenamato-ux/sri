/* ==========================================
   Lucky Wheel — Birthday Blessings
========================================== */

const prizes = [
    { emoji: "🤗", title: "A Big Hug!",        text: "Consider yourself hugged tight, all the way from here." },
    { emoji: "🍫", title: "Endless Chocolate!", text: "May your birthday come with an unlimited chocolate supply." },
    { emoji: "🧸", title: "Teddy Bear Cuddle!", text: "Sending the softest, warmest virtual teddy-bear cuddle." },
    { emoji: "☕",  title: "Bottomless Coffee!", text: "One year of bottomless coffee, on the house (virtually)." },
    { emoji: "💃", title: "Dance Party!",       text: "You've won an imaginary dance party, just for you." },
    { emoji: "🙏", title: "A Special Blessing", text: "May God bless you with peace, joy, and everything you're praying for." },
    { emoji: "🌹", title: "A Virtual Rose",     text: "A rose, freshly picked from the internet, just for you." },
    { emoji: "😄", title: "A Day of Laughter",  text: "May today be filled with laughter that makes your cheeks hurt." }
];

const colors = ["#6D4C41", "#8D6E63"];
const wheelSvg = document.getElementById("wheelSvg");
const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const wheelResult = document.getElementById("wheelResult");
const prizeTitle = document.getElementById("prizeTitle");
const prizeText = document.getElementById("prizeText");

const segCount = prizes.length;
const segAngle = 360 / segCount;
const cx = 200, cy = 200, r = 195;

function polarToCartesian(angleDeg) {
    const a = (angleDeg - 90) * Math.PI / 180;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

let svgMarkup = "";

prizes.forEach((prize, i) => {
    const startAngle = i * segAngle;
    const endAngle = startAngle + segAngle;
    const start = polarToCartesian(startAngle);
    const end = polarToCartesian(endAngle);
    const largeArc = segAngle > 180 ? 1 : 0;

    svgMarkup += `<path d="M${cx},${cy} L${start.x},${start.y} A${r},${r} 0 ${largeArc},1 ${end.x},${end.y} Z" fill="${colors[i % 2]}" stroke="#120d0b" stroke-width="2"/>`;

    const midAngle = startAngle + segAngle / 2;
    const labelPos = polarToCartesian(midAngle);
    const labelX = cx + (labelPos.x - cx) * 0.68;
    const labelY = cy + (labelPos.y - cy) * 0.68;

    svgMarkup += `<text x="${labelX}" y="${labelY}" font-size="28" text-anchor="middle" dominant-baseline="middle" transform="rotate(${midAngle}, ${labelX}, ${labelY})">${prize.emoji}</text>`;
});

wheelSvg.innerHTML = svgMarkup;

let currentRotation = 0;
let spinning = false;

spinBtn.addEventListener("click", () => {

    if (spinning) return;
    spinning = true;
    spinBtn.disabled = true;

    const winnerIndex = Math.floor(Math.random() * segCount);
    const winnerCenterAngle = winnerIndex * segAngle + segAngle / 2;

    // Rotate so the winning segment lands under the top pointer.
    const extraSpins = 6 * 360;
    const targetRotation = currentRotation + extraSpins + (360 - winnerCenterAngle) - (currentRotation % 360);

    currentRotation = targetRotation;
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {

        const prize = prizes[winnerIndex];
        prizeTitle.textContent = `${prize.emoji} ${prize.title}`;
        prizeText.textContent = prize.text;
        wheelResult.classList.remove("hidden");
        wheelResult.scrollIntoView({ behavior: "smooth", block: "center" });

        burstConfetti();

        spinning = false;

    }, 4600);

});

// ------------------------------
// Confetti burst on win
// ------------------------------

function burstConfetti() {
    const icons = ["🎉", "🎊", "✨", "🧸", "🤎"];
    for (let i = 0; i < 24; i++) {
        const el = document.createElement("div");
        el.innerHTML = icons[Math.floor(Math.random() * icons.length)];
        el.style.position = "fixed";
        el.style.left = "50%";
        el.style.top = "35%";
        el.style.fontSize = (16 + Math.random() * 18) + "px";
        el.style.pointerEvents = "none";
        el.style.zIndex = "2000";
        const angle = Math.random() * Math.PI * 2;
        const distance = 120 + Math.random() * 180;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;
        el.style.transition = "transform 1.2s ease-out, opacity 1.2s ease-out";
        document.body.appendChild(el);
        requestAnimationFrame(() => {
            el.style.transform = `translate(${dx}px, ${dy}px)`;
            el.style.opacity = "0";
        });
        setTimeout(() => el.remove(), 1300);
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
