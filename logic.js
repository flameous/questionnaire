function handleAnswers(question, answers) { // user given answers -> number
    let base = question.optionsCount + 1;

    let resultNumber = 0;
    for (let i = 0; i < answers.length; i++) {
        resultNumber += answers[i] * (base ** i);
    }

    return resultNumber;
};

function answerNumberToAnswers(question, number) {
    let base = question.optionsCount + 1;
    let answers = new Array(question.questions.length).fill(0);

    for (let i = answers.length - 1; i >= 0; i--) {
        answers[i] = number % base;
        number = Math.floor(number / base);
    }
    return answers;
};

function runTests() {
    let question = questionBank.food;
    let answers = [0, 1, 2, 1, 2, 1, 0];
    result = handleAnswers(question, answers);
    if (result !== 453) {
        alert("#1 Unit tests failed, go check the code");
        return;
    }

    let parsedAnswers = answerNumberToAnswers(question, result);
    if (parsedAnswers.length !== answers.length) {
        alert("#2 Unit tests failed, go check the code");
        return;
    }
    for (let i = 0; i < parsedAnswers.length; i++) {
        if (parsedAnswers[i] !== answers[i]) {
            alert("#3 Unit tests failed, go check the code");
            return;
        }
    }
};