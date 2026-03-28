const qFood = {
    optionsCount: 2,
    allowSkip: true,
    questions: [
        {
            question: "What is your favorite food?",
            options: ["Pizza", "Burger"]
        },
        {
            question: "Do you like cheese?",
            options: ["Yes", "No"]
        },
        {
            question: "Do you like pizza?",
            options: ["Yes", "No"]
        },
        {
            question: "Do you like burger?",
            options: ["Yes", "No"]
        },
        {
            question: "Do you like pasta?",
            options: ["Yes", "No"]
        },
        {
            question: "Do you like salad?",
            options: ["Yes", "No"]
        },
        {
            question: "Do you like soup?",
            options: ["Yes", "No"]
        }
    ]
};

const qHobby = {
    optionsCount: 3,
    allowSkip: true,
    questions: [
        {
            question: "What is your favorite hobby?",
            options: ["Reading", "Writing", "Other"]
        },
        {
            question: "Pick one of three",
            options: ["Option 1", "Option 2", "Option 3"]
        },
        {
            question: "What do you dislike the most?",
            options: ["Yapping", "Napping", "Rapping"]
        }
    ]
};

const qFanzil = {
    optionsCount: 3,
    allowSkip: true,
    questions: [
        {
            question: "What is your favorite hobby?",
            options: ["Reading", "Writing", "Other"]
        },
        {
            question: "Pick one of three",
            options: ["Option 1", "Option 2", "Option 3"]
        },
        {
            question: "What do you dislike the most?",
            options: ["Yapping", "Napping", "Rapping"]
        }
    ]
};

const qBingo = {
    optionsCount: 2,
    allowSkip: true,
    title: "Which food do you like?",
    questions: [
        { question: "Pizza", options: ["Yes", "No"] },
        { question: "Burger", options: ["Yes", "No"] },
        { question: "Pasta", options: ["Yes", "No"] },
        { question: "Salad", options: ["Yes", "No"] },
        { question: "Soup", options: ["Yes", "No"] },
        { question: "Cheese", options: ["Yes", "No"] },
        { question: "Coffee", options: ["Yes", "No"] },
        { question: "Tea", options: ["Yes", "No"] },
        { question: "Cake", options: ["Yes", "No"] }
    ]
};

const qDailyLife = {
    optionsCount: 2,
    allowSkip: true,
    questions: [
        {
            question: "Я никогда не засыпал(а) в кинотеатре.",
            options: ["Было", "Никогда"]
        },
        {
            question: "Я никогда не отменял(а) планы, чтобы остаться дома и посмотреть сериал.",
            options: ["Было", "Никогда"]
        },
        {
            question: "Я никогда не был(а) участником университетской спортивной команды.",
            options: ["Было", "Никогда"]
        },
        {
            question: "Я никогда не забывал(а) мокрые вещи в стиральной машине на несколько дней.",
            options: ["Было", "Никогда"]
        },
        {
            question: "Я никогда не водил(а) электромобиль.",
            options: ["Было", "Никогда"]
        },
        {
            question: "Я никогда не ездил(а) ночным поездом.",
            options: ["Было", "Никогда"]
        },
        {
            question: "Я никогда не бегал(а), чтобы успеть на пересадочный рейс.",
            options: ["Было", "Никогда"]
        },
        {
            question: "Я никогда не водил(а) машину в другой стране.",
            options: ["Было", "Никогда"]
        },
        {
            question: "Я никогда не имел(а) друга, который переехал в другую страну.",
            options: ["Было", "Никогда"]
        },
        {
            question: "Я никогда не заводил(а) друга с другим родным языком.",
            options: ["Было", "Никогда"]
        },
        {
            question: "Я никогда не удалял(а) пост в соцсетях, потому что он не набрал достаточно лайков.",
            options: ["Было", "Никогда"]
        },
        {
            question: "Я никогда не плакал(а) из-за финала сериала.",
            options: ["Было", "Никогда"]
        }
    ]
};

const qCoupleLife = {
    optionsCount: 2,
    allowSkip: true,
    questions: [
        {
            question: "Кто более романтичный?",
            options: ["Я", "Ты"]
        },
        {
            question: "Кто лучше танцует?",
            options: ["Я", "Ты"]
        },
        {
            question: "Кто проявляет больше ласки?",
            options: ["Я", "Ты"]
        },
        {
            question: "У кого лучше вкус в музыке?",
            options: ["Я", "Ты"]
        },
        {
            question: "Кто лучше находит рестораны?",
            options: ["Я", "Ты"]
        },
        {
            question: "Кто больше привязан к родителям?",
            options: ["Я", "Ты"]
        },
        {
            question: "Кто более организованный?",
            options: ["Я", "Ты"]
        },
        {
            question: "Кто лучше выбирает фильмы?",
            options: ["Я", "Ты"]
        },
        {
            question: "Кто лучше готовит?",
            options: ["Я", "Ты"]
        },
        {
            question: "Кто лучше планирует романтические свидания?",
            options: ["Я", "Ты"]
        }
    ]
};

window.questionBank = {
    food: qFood,
    hobby: qHobby,
    fanzil: qFanzil,
    bingo: qBingo,
    "Daily Life": qDailyLife,
    "Couple Life": qCoupleLife
};
