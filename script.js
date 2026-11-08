document.addEventListener("DOMContentLoaded", () => {
    const envelopeScreen = document.getElementById("envelope-screen");
    const mainContent = document.getElementById("main-content");
    const bgMusic = document.getElementById("bg-music");
    const musicToggle = document.getElementById("music-toggle");

    // Helper function for timed smooth scrolling over a specific duration (in ms)
    function slowScrollTo(targetY, duration, callback) {
        const startY = window.pageYOffset;
        const distance = targetY - startY;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Smooth easing function
            const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
            
            window.scrollTo(0, startY + (distance * ease));

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                if (callback) callback();
            }
        }

        requestAnimationFrame(animation);
    }

    function openEnvelope() {
        if (envelopeScreen && !envelopeScreen.classList.contains("fade-out")) {
            envelopeScreen.classList.add("fade-out");
            setTimeout(() => {
                envelopeScreen.style.display = "none";
                if (mainContent) {
                    mainContent.classList.remove("hidden");
                }

                // Step 1: 1.5 second pause after opening the envelope
                setTimeout(() => {
                    const dateSection = document.querySelector(".date-section");
                    if (!dateSection) return;

                    const dateSectionY = dateSection.getBoundingClientRect().top + window.pageYOffset - 50;

                    // Step 2: Smooth and slow scroll till Save the Date (takes ~5 seconds)
                    slowScrollTo(dateSectionY, 5000, () => {
                        
                        // Step 3: Add an extra pause (e.g., 2 seconds) after scrolling before scratching starts
                        setTimeout(() => {
                            const scratchCovers = document.querySelectorAll(".scratch-cover");
                            scratchCovers.forEach((cover, index) => {
                                setTimeout(() => {
                                    const revealedText = cover.getAttribute("data-revealed");
                                    cover.textContent = revealedText;
                                    cover.classList.add("revealed");
                                }, index * 1200); // 1.2 seconds stagger delay between each card
                            });

                            // Step 4: After scratch cards finish revealing, continue smooth slow scrolling till the bottom
                            setTimeout(() => {
                                const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
                                slowScrollTo(maxScrollY, 35000); // Slow glide to the footer
                            }, 5000); // Wait until all cards finish revealing before final scroll glide

                        }, 2000); // <--- 2 second pause right after reaching the date section

                    });

                }, 1500); // 1.5 sec initial pause

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

    // Manual scratch card interaction
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