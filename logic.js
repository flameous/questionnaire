(function() {
    function handleAnswers(question, answers) {
        const base = question.optionsCount + 1;
        let resultNumber = 0;

        for (let index = 0; index < answers.length; index += 1) {
            resultNumber += answers[index] * (base ** index);
        }

        return resultNumber;
    }

    function answerNumberToAnswers(question, number) {
        const base = question.optionsCount + 1;
        const answers = new Array(question.questions.length).fill(0);
        let currentNumber = number;

        for (let index = answers.length - 1; index >= 0; index -= 1) {
            answers[index] = currentNumber % base;
            currentNumber = Math.floor(currentNumber / base);
        }

        return answers;
    }

    function runTests() {
        const question = window.questionBank.food;
        const answers = [0, 1, 2, 1, 2, 1, 0];
        const result = handleAnswers(question, answers);

        if (result !== 453) {
            throw new Error("#1 Unit tests failed, go check the code");
        }

        const parsedAnswers = answerNumberToAnswers(question, result);
        if (parsedAnswers.length !== answers.length) {
            throw new Error("#2 Unit tests failed, go check the code");
        }

        for (let index = 0; index < parsedAnswers.length; index += 1) {
            if (parsedAnswers[index] !== answers[index]) {
                throw new Error("#3 Unit tests failed, go check the code");
            }
        }
    }

    window.QuestionnaireLogic = {
        answerNumberToAnswers,
        handleAnswers,
        runTests
    };
}());
