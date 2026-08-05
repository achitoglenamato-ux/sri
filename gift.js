const gifts = document.querySelectorAll(".gift-box");
const continueWrap = document.getElementById("continueWrap");

const messages = [
    "🤎 You are an amazing friend!",
    "🌹 Sending you a virtual rose!",
    "🍫 Unlimited birthday chocolates!",
    "🧸 A warm virtual teddy-bear hug!"
];

let openedCount = 0;

gifts.forEach((gift, index) => {

    gift.addEventListener("click", () => {

        if (gift.classList.contains("opened")) return;

        gift.classList.add("opened");

        gift.innerHTML = `<h2>${messages[index]}</h2>`;

        openedCount++;

        if (openedCount === gifts.length) {
            setTimeout(() => {
                continueWrap.classList.remove("hidden");
                continueWrap.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 400);
        }

    });

});

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
