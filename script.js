document.addEventListener("DOMContentLoaded", () => {
    const envelopeScreen = document.getElementById("envelope-screen");
    const mainContent = document.getElementById("main-content");
    const bgMusic = document.getElementById("bg-music");
    const musicToggle = document.getElementById("music-toggle");

    // Open Envelope Action
    envelopeScreen.addEventListener("click", () => {
        envelopeScreen.style.opacity = "0";
        setTimeout(() => {
            envelopeScreen.classList.add("hidden");
            mainContent.classList.remove("hidden");
            bgMusic.play().catch(e => console.log("Audio autoplay restricted"));
        }, 800);
    });

    // Toggle Background Music
    let isPlaying = true;
    musicToggle.addEventListener("click", () => {
        if (isPlaying) {
            bgMusic.pause();
            musicToggle.textContent = "🔇";
        } else {
            bgMusic.play();
            musicToggle.textContent = "🔊";
        }
        isPlaying = !isPlaying;
    });

    // Fixed Scratch Card Interaction
    const scratchCovers = document.querySelectorAll(".scratch-cover");
    scratchCovers.forEach(cover => {
        cover.addEventListener("click", () => {
            const revealedText = cover.getAttribute("data-revealed");
            cover.textContent = revealedText;
            cover.classList.add("revealed");
        });
    });

    // Countdown Timer Logic (Target: Dec 10, 2026)
    const weddingDate = new Date("December 10, 2026 00:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const gap = weddingDate - now;

        if (gap < 0) return;

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const days = Math.floor(gap / day);
        const hours = Math.floor((gap % day) / hour);
        const mins = Math.floor((gap % hour) / minute);
        const secs = Math.floor((gap % minute) / second);

        document.getElementById("days").innerText = String(days).padStart(2, '0');
        document.getElementById("hours").innerText = String(hours).padStart(2, '0');
        document.getElementById("mins").innerText = String(mins).padStart(2, '0');
        document.getElementById("secs").innerText = String(secs).padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
});