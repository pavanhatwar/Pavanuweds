document.addEventListener("DOMContentLoaded", () => {
    const envelopeScreen = document.getElementById("envelope-screen");
    const mainContent = document.getElementById("main-content");
    const bgMusic = document.getElementById("bg-music");
    const musicToggle = document.getElementById("music-toggle");

    // Open Envelope Action
    if (envelopeScreen) {
        envelopeScreen.addEventListener("click", () => {
            envelopeScreen.style.opacity = "0";
            setTimeout(() => {
                envelopeScreen.style.display = "none";
                if (mainContent) {
                    mainContent.classList.remove("hidden");
                }
            }, 500);

            // Play background music
            if (bgMusic) {
                bgMusic.play().catch(e => console.log("Audio autoplay restricted"));
            }
        });
    }

    // Toggle Background Music
    let isPlaying = true;
    if (musicToggle && bgMusic) {
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
    }

    // Scratch Card Interaction
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
        const day = hour * 2