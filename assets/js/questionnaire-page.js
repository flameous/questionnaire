(function() {
    function getQuestionnaireState() {
        const questionSetKey = window.AppShared.getURLParameter("questions");
        return {
            key: questionSetKey,
            questionSet: questionSetKey ? window.questionBank[questionSetKey] : null,
            previousAnswer: window.AppShared.getURLParameter("previousAnswer")
        };
    }

    function buildAnswerNumber(questionSet, formElement) {
        const formData = new FormData(formElement);
        const answerArray = [];

        questionSet.questions.forEach(function(question, index) {
            const value = formData.get(`question_${index}`);
            const optionIndex = question.options.findIndex(function(option) {
                return option === value;
            });
            answerArray.push(optionIndex >= 0 ? optionIndex + 1 : 0);
        });

        return window.QuestionnaireLogic.handleAnswers(questionSet, answerArray);
    }

    function renderQuestionnaire() {
        const state = getQuestionnaireState();
        const contentDiv = document.getElementById("content");
        const topbar = document.getElementById("topbar");

        if (!state.key) {
            contentDiv.innerHTML = `
                <div class="error">
                    <strong>Error:</strong> Missing questionnaire. Go back and choose one from the home page.
                </div>
            `;
            return;
        }

        if (!state.questionSet) {
            contentDiv.innerHTML = `
                <div class="error">
                    <strong>Error:</strong> Question set "${state.key}" not found.
                </div>
            `;
            return;
        }

        topbar.classList.add("inside");

        const questionMarkup = state.questionSet.questions.map(function(question, index) {
            const optionsMarkup = question.options.map(function(option, optionIndex) {
                const inputId = `question_${index}_option_${optionIndex}`;
                return `
                    <div class="radio-option">
                        <input type="radio" id="${inputId}" name="question_${index}" value="${option}">
                        <label for="${inputId}">${option}</label>
                    </div>
                `;
            }).join("");

            return `
                <section class="question-container">
                    <div class="question-title">
                        <div class="question-title-text">${index + 1}. ${question.question}</div>
                    </div>
                    <div class="options-container">${optionsMarkup}</div>
                </section>
            `;
        }).join("");

        const actionMarkup = state.previousAnswer
            ? `
                <button type="button" class="submit-btn" id="compareBtn">Compare answers</button>
                <div class="action-hint">Your answers will be compared with the saved result on the next page.</div>
            `
            : `
                <button type="submit" class="submit-btn">Generate result link</button>
                <div class="action-hint">Your answers will be encoded into a shareable URL.</div>
            `;

        contentDiv.innerHTML = `
            <div class="info">Questionnaire: <strong>${state.key}</strong> (${state.questionSet.questions.length} questions)</div>
            ${state.previousAnswer ? `
                <div class="notice">
                    Someone already filled this questionnaire. Add your own answers below, then press compare to see the result.
                </div>
            ` : ""}
            <form id="questionnaire-form">
                ${questionMarkup}
                <div class="form-actions">${actionMarkup}</div>
            </form>
        `;

        contentDiv.querySelectorAll(".radio-option").forEach(function(optionElement) {
            const input = optionElement.querySelector('input[type="radio"]');

            optionElement.addEventListener("pointerdown", function() {
                optionElement.dataset.wasChecked = input.checked ? "true" : "false";
            });

            input.addEventListener("keydown", function(event) {
                if ((event.key === " " || event.key === "Spacebar") && input.checked) {
                    optionElement.dataset.wasChecked = "true";
                }
            });

            optionElement.addEventListener("click", function() {
                if (optionElement.dataset.wasChecked === "true") {
                    input.checked = false;
                }

                delete optionElement.dataset.wasChecked;
            });
        });

        const form = document.getElementById("questionnaire-form");
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            const resultNumber = buildAnswerNumber(state.questionSet, form);
            const shareUrl = new URL(window.location.href);
            shareUrl.searchParams.set("previousAnswer", resultNumber);
            window.AppShared.showModal("resultModal", "resultUrl", shareUrl.toString());
        });

        const compareButton = document.getElementById("compareBtn");
        if (compareButton) {
            compareButton.addEventListener("click", function() {
                const myAnswer = buildAnswerNumber(state.questionSet, form);
                const compareUrl = new URL("compare.html", window.location.href);
                compareUrl.searchParams.set("questionSet", state.key);
                compareUrl.searchParams.set("previousAnswer", state.previousAnswer);
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
        renderQuestionnaire();
    });
}());
