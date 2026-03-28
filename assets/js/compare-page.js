(function() {
    function getAnswerText(question, answerIndex) {
        if (answerIndex === 0) {
            return "Skipped";
        }

        const optionIndex = answerIndex - 1;
        return optionIndex >= 0 && optionIndex < question.options.length ? question.options[optionIndex] : "(Invalid)";
    }

    function renderStandardComparison(questionSetKey, questionSet, previousAnswers, myAnswers) {
        let matchCount = 0;

        const html = questionSet.questions.map(function(question, index) {
            const previousIndex = previousAnswers[index] || 0;
            const myIndex = myAnswers[index] || 0;
            const previousSkipped = previousIndex === 0;
            const mySkipped = myIndex === 0;
            const isMatch = previousIndex === myIndex && !previousSkipped && !mySkipped;

            if (isMatch) {
                matchCount += 1;
            }

            return `
                <section class="question-container">
                    <h2 class="question-title">${index + 1}. ${question.question}</h2>
                    <div class="comparison-grid">
                        <div>
                            <div class="answer-label">Previous answer</div>
                            <div class="answer-text ${previousSkipped ? "muted" : ""}">${getAnswerText(question, previousIndex)}</div>
                        </div>
                        <div>
                            <div class="answer-label">My answer</div>
                            <div class="answer-text ${mySkipped ? "muted" : ""}">${getAnswerText(question, myIndex)}</div>
                        </div>
                        <div class="answer-status ${isMatch ? "match" : ""}">${isMatch ? "Match" : "Different"}</div>
                    </div>
                </section>
            `;
        }).join("");

        return `
            <div class="info">Questionnaire: <strong>${questionSetKey}</strong></div>
            <div class="summary-bar">
                <div>Comparison summary</div>
                <div class="summary-count">${matchCount} matches of ${questionSet.questions.length}</div>
            </div>
            ${html || '<div class="empty-state">No questions found for this questionnaire.</div>'}
        `;
    }

    function renderBingoComparison(questionSet, previousAnswers, myAnswers) {
        let matchCount = 0;

        const html = questionSet.questions.map(function(question, index) {
            const previousIndex = previousAnswers[index] || 0;
            const myIndex = myAnswers[index] || 0;
            const isMatch = previousIndex === myIndex;

            if (isMatch) {
                matchCount += 1;
            }

            return `
                <article class="bingo-cell ${isMatch ? "match" : ""}">
                    <div class="bingo-name">${question.question}</div>
                    <div class="bingo-answer">
                        <strong>Previous</strong>
                        <span>${getAnswerText(question, previousIndex)}</span>
                    </div>
                    <div class="bingo-answer">
                        <strong>Mine</strong>
                        <span>${getAnswerText(question, myIndex)}</span>
                    </div>
                    <div class="bingo-state">${isMatch ? "Match" : "Different"}</div>
                </article>
            `;
        }).join("");

        return `
            <div class="info">${questionSet.title || "Bingo comparison"}</div>
            <div class="summary-bar">
                <div>Bingo summary</div>
                <div class="summary-count">${matchCount} matches of ${questionSet.questions.length}</div>
            </div>
            <div class="bingo-caption">Each square shows the previous answer and your answer using the same shared visual system as the other pages.</div>
            <div class="bingo-grid">${html}</div>
        `;
    }

    function renderComparison() {
        const contentDiv = document.getElementById("content");
        const questionSetKey = window.AppShared.getURLParameter("questionSet");
        const previousAnswerParam = window.AppShared.getURLParameter("previousAnswer");
        const myAnswerParam = window.AppShared.getURLParameter("myAnswer");

        if (!questionSetKey || !previousAnswerParam || !myAnswerParam) {
            contentDiv.innerHTML = `
                <div class="error">
                    <strong>Error:</strong> Missing required parameters. Please provide questionSet, previousAnswer, and myAnswer.
                </div>
            `;
            return;
        }

        const questionSet = window.questionBank[questionSetKey];
        if (!questionSet) {
            contentDiv.innerHTML = `
                <div class="error">
                    <strong>Error:</strong> Question set "${questionSetKey}" not found.
                </div>
            `;
            return;
        }

        const previousAnswers = window.QuestionnaireLogic.answerNumberToAnswers(questionSet, Number.parseInt(previousAnswerParam, 10));
        const myAnswers = window.QuestionnaireLogic.answerNumberToAnswers(questionSet, Number.parseInt(myAnswerParam, 10));
        const bodyHtml = questionSetKey === "bingo"
            ? renderBingoComparison(questionSet, previousAnswers, myAnswers)
            : renderStandardComparison(questionSetKey, questionSet, previousAnswers, myAnswers);
        const backPath = questionSetKey === "bingo" ? "bingo.html" : "questionnaire.html";
        const backUrl = new URL(backPath, window.location.href);
        backUrl.searchParams.set("questions", questionSetKey);

        contentDiv.innerHTML = `
            ${bodyHtml}
            <div class="actions">
                <a href="${backUrl.toString()}" class="back-btn">Back to questionnaire</a>
            </div>
        `;
    }

    window.addEventListener("DOMContentLoaded", function() {
        window.AppShared.initThemeToggle("themeToggle");
        renderComparison();
    });
}());
