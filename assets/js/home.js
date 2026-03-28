(function() {
    function getQuestionnairePath(setKey) {
        return setKey === "bingo" ? "bingo.html" : "questionnaire.html";
    }

    function renderHome() {
        const contentDiv = document.getElementById("content");
        const availableSets = Object.entries(window.questionBank);

        let html = '<div class="selection-title">Choose a questionnaire to begin.</div>';
        html += '<div class="selection-container">';

        availableSets.forEach(function(entry) {
            const setKey = entry[0];
            const questions = entry[1];
            const href = new URL(getQuestionnairePath(setKey), window.location.href);
            href.searchParams.set("questions", setKey);

            html += '\
                <div class="questionnaire-card" data-href="' + href.toString() + '">\
                    <h2>' + setKey + '</h2>\
                    <p>' + questions.questions.length + ' questions</p>\
                </div>\
            ';
        });

        html += "</div>";
        contentDiv.innerHTML = html;

        contentDiv.querySelectorAll(".questionnaire-card").forEach(function(card) {
            card.addEventListener("click", function() {
                window.location.href = card.dataset.href;
            });
        });
    }

    window.addEventListener("DOMContentLoaded", function() {
        window.AppShared.initThemeToggle("themeToggle");
        renderHome();
    });
}());
