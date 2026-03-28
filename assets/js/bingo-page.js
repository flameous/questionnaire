(function() {
    function buildAnswerNumber(questionSet, formElement) {
        const formData = new FormData(formElement);
        const answerArray = [];

        questionSet.questions.forEach(function(question, index) {
            const value = formData.get("question_" + index);
            const optionIndex = question.options.findIndex(function(option) {
                return option === value;
            });
            answerArray.push(optionIndex >= 0 ? optionIndex + 1 : 0);
        });

        return window.QuestionnaireLogic.handleAnswers(questionSet, answerArray);
    }

    function renderBingo() {
        const contentDiv = document.getElementById("content");
        const questionSetKey = window.AppShared.getURLParameter("questions") || "bingo";
        const questionSet = window.questionBank[questionSetKey];

        if (!questionSet) {
            contentDiv.innerHTML = '\
                <div class="error">\
                    <strong>Error:</strong> Question set "' + questionSetKey + '" not found. Use ?questions=bingo\
                </div>\
            ';
            return;
        }

        document.getElementById("bingoTitle").textContent = questionSet.title || "Which food do you like?";

        const previousAnswer = window.AppShared.getURLParameter("previousAnswer");
        let html = "";

        if (previousAnswer) {
            html += '\
                <div class="notice">\
                    Someone already filled this bingo questionnaire. Select your own grid, then press compare to see the result.\
                </div>\
            ';
        } else {
            html += '<div class="info">Select the items you want to mark as yes.</div>';
        }

        html += '<form id="questionnaire-form"><div hidden>';
        questionSet.questions.forEach(function(question, index) {
            html += '<input type="hidden" name="question_' + index + '" id="q_' + index + '" value="No">';
        });
        html += '</div><div class="bingo-grid">';

        questionSet.questions.forEach(function(question, index) {
            html += '\
                <button type="button" class="bingo-cell-btn" id="cell_' + index + '" data-index="' + index + '" aria-pressed="false">\
                    <span class="cell-index">' + String(index + 1).padStart(2, "0") + '</span>\
                    <span class="cell-label">' + question.question + '</span>\
                    <span class="cell-state">No</span>\
                </button>\
            ';
        });

        html += '</div><div class="form-actions">';
        if (previousAnswer) {
            html += '<button type="button" class="submit-btn" id="compareBtn">Compare answers</button>';
            html += '<div class="action-hint">Your selected grid will be compared with the saved result on the next page.</div>';
        } else {
            html += '<button type="submit" class="submit-btn">Generate result link</button>';
            html += '<div class="action-hint">Your current 3x3 grid will be turned into a shareable result URL.</div>';
        }
        html += "</div></form>";

        contentDiv.innerHTML = html;

        questionSet.questions.forEach(function(question, index) {
            const button = document.getElementById("cell_" + index);
            const input = document.getElementById("q_" + index);
            const state = button.querySelector(".cell-state");

            button.addEventListener("click", function() {
                const selected = input.value !== "Yes";
                input.value = selected ? "Yes" : "No";
                button.classList.toggle("clicked", selected);
                button.setAttribute("aria-pressed", String(selected));
                state.textContent = selected ? "Yes" : "No";
            });
        });

        const form = document.getElementById("questionnaire-form");
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            const resultNumber = buildAnswerNumber(questionSet, form);
            const shareUrl = new URL(window.location.href);
            shareUrl.searchParams.set("previousAnswer", resultNumber);
            window.AppShared.showModal("resultModal", "resultUrl", shareUrl.toString());
        });

        const compareButton = document.getElementById("compareBtn");
        if (compareButton) {
            compareButton.addEventListener("click", function() {
                const myAnswer = buildAnswerNumber(questionSet, form);
                const compareUrl = new URL("compare.html", window.location.href);
                compareUrl.searchParams.set("questionSet", questionSetKey);
                compareUrl.searchParams.set("previousAnswer", previousAnswer);
                compareUrl.searchParams.set("myAnswer", myAnswer);
                window.location.href = compareUrl.toString();
            });
        }
    }

    window.closeModal = function() {
        window.AppShared.closeModal("resultModal", ".copy-btn");
    };

    window.copyToClipboard = function() {
        window.AppShared.copyInputValue("resultUrl", ".copy-btn");
    };

    window.addEventListener("click", function(event) {
        if (event.target.id === "resultModal") {
            window.closeModal();
        }
    });

    window.addEventListener("DOMContentLoaded", function() {
        window.AppShared.initThemeToggle("themeToggle");
        window.QuestionnaireLogic.runTests();
        renderBingo();
    });
}());
