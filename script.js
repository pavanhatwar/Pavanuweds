document.addEventListener("DOMContentLoaded", () => {
    const envelopeScreen = document.getElementById("envelope-screen");
    const mainContent = document.getElementById("main-content");
    const bgMusic = document.getElementById("bg-music");
    const musicToggle = document.getElementById("music-toggle");

    function openEnvelope() {
        if (envelopeScreen && !envelopeScreen.classList.contains("fade-out")) {
            envelopeScreen.classList.add("fade-out");
            setTimeout(() => {
                envelopeScreen.style.display = "none";
                if (mainContent) {
                    mainContent.classList.remove("hidden");
                }

                // 1. Automatically auto-scroll down to the Save the Date section after 500ms
                setTimeout(() => {
                    const dateSection = document.querySelector(".date-section");
                    if (dateSection) {
                        dateSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 500);

                // 2. Automatically reveal the scratch cards after scrolling (e.g., after 1.5 seconds)
                setTimeout(() => {
                    const scratchCovers = document.querySelectorAll(".scratch-cover");
                    scratchCovers.forEach(cover => {
                        const revealedText = cover.getAttribute("data-revealed");
                        cover.textContent = revealedText;
                        cover.classList.add("revealed");
                    });
                }, 1500);

            }, 500);

            // Play background music
            if (bgMusic) {
                bgMusic.play().catch(e => console.log("Audio autoplay restricted"));
            }
        }
    }

    // Support both clicks and touch events for reliable mobile/desktop response
    if (envelopeScreen) {
        envelopeScreen.addEventListener("click", openEnvelope);
        envelopeScreen.addEventListener("touchend", (e) => {
            e.preventDefault();
            openEnvelope();
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

    // Manual scratch card interaction (in case users click them directly later)
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

        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minsEl = document.getElementById("mins");
        const secsEl = document.getElementById("secs");

        if (daysEl) daysEl.innerText = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.innerText = String(hours).padStart(2, '0');
        if (minsEl) minsEl.innerText = String(mins).padStart(2, '0');
        if (secsEl) secsEl.innerText = String(secs).padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
});