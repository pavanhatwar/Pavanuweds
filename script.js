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

    // Scratch Card Interaction
    const scratchCovers = document.querySelectorAll(".scratch-cover");
    scratchCovers.forEach(cover => {
        cover.addEventListener("click", () => {
            cover.textContent = cover.getAttribute("data-revealed");
            cover.classList.add("revealed");
        });
    });
});