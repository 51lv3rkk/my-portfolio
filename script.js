const projectCards = document.querySelectorAll(".project-card");

function addHoverEffect(card) {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.3) 0%, rgba(0, 0, 0, 0.7) 40%)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.background = "rgba(0, 0, 0, 0.7)";
    });
}

projectCards.forEach((card) => {
    addHoverEffect(card);
});

const showMoreBtn = document.querySelector(".show-more-btn");

if (showMoreBtn) {
    showMoreBtn.addEventListener("click", () => {
        if (showMoreBtn.textContent === "Show More") {
            const hiddenCards = document.querySelectorAll(".project-card.hidden");
            hiddenCards.forEach((card) => {
                card.classList.remove("hidden");
                card.classList.add("d");
                addHoverEffect(card);
            });
            showMoreBtn.textContent = "Show Less";
        } else {
            const allCards = document.querySelectorAll(".project-card.d");
            allCards.forEach((card) => {
                if (!card.classList.contains("hidden")) {
                    card.classList.add("hidden");
                    card.classList.remove("d");
                }
            });
            showMoreBtn.textContent = "Show More";
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const projectCardss = document.querySelectorAll(".project-card");
    projectCardss.forEach((card) => {
        card.addEventListener("click", () => {
            const project = card.getAttribute("data-project");
            let url = "";
            switch (project) {
                case "weather":
                    url = "Projects/weather/";
                    break;
                case "mcg":
                    url = "Projects/mcg/";
                    break;
                case "todo":
                    url = "Projects/todo/";
                    break;
                default:
                    url = "/";
            }
            if (url) window.location.href = url;
        });
    });
});
