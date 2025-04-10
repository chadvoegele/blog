document.addEventListener('DOMContentLoaded', () => {
    // Quiz state
    const state = {
        currentQuestion: 0,
        totalQuestions: 60,
        correctAnswers: 0,
        questions: []
    };

    // DOM elements
    const elements = {
        questionContainer: document.getElementById('question-container'),
        resultContainer: document.getElementById('result-container'),
        summaryContainer: document.getElementById('summary-container'),
        question: document.getElementById('question'),
        answerInput: document.getElementById('answer-input'),
        submitBtn: document.getElementById('submit-btn'),
        nextBtn: document.getElementById('next-btn'),
        restartBtn: document.getElementById('restart-btn'),
        resultIcon: document.getElementById('result-icon'),
        resultText: document.getElementById('result-text'),
        progressText: document.getElementById('progress-text'),
        progressFill: document.getElementById('progress-fill'),
        finalScore: document.getElementById('final-score')
    };

    // Generate math questions
    function generateQuestions() {
        const operations = [
            { symbol: '+', func: (a, b) => a + b },
            { symbol: '-', func: (a, b) => a - b }
        ];

        state.questions = [];

        for (let i = 0; i < state.totalQuestions; i++) {
            // Alternate between addition and subtraction
            const operationIndex = i % 2;
            const operation = operations[operationIndex];

            let num1, num2;

            // Generate appropriate numbers based on the operation
            if (operation.symbol === '+') {
                num1 = Math.floor(Math.random() * 10) + 1; // 1-10
                num2 = Math.floor(Math.random() * 10) + 1; // 1-10
            } else { // subtraction
                num1 = Math.floor(Math.random() * 10) + 1; // 1-10
                num2 = Math.floor(Math.random() * num1) + 1; // 1-num1 (to ensure positive result)
            }

            const answer = operation.func(num1, num2);

            state.questions.push({
                text: `What is ${num1} ${operation.symbol} ${num2}?`,
                answer: answer
            });
        }
    }

    // Display current question
    function displayQuestion() {
        const currentQ = state.questions[state.currentQuestion];
        elements.question.textContent = currentQ.text;
        elements.answerInput.value = '';
        elements.answerInput.focus();

        // Update progress (counting down)
        const remainingQuestions = state.totalQuestions - state.currentQuestion;
        elements.progressText.textContent = `${remainingQuestions}/${state.totalQuestions} questions remaining`;
        elements.progressFill.style.width = `${((remainingQuestions) / state.totalQuestions) * 100}%`;
    }

    // Check answer
    function checkAnswer() {
        const userAnswer = parseInt(elements.answerInput.value, 10);
        if (isNaN(userAnswer)) return; // Don't proceed if input is not a number

        const currentQ = state.questions[state.currentQuestion];
        const isCorrect = userAnswer === currentQ.answer;

        // Show result
        elements.questionContainer.classList.add('hidden');
        elements.resultContainer.classList.remove('hidden');

        if (isCorrect) {
            elements.resultContainer.classList.add('correct');
            elements.resultContainer.classList.remove('incorrect');
            elements.resultText.textContent = 'Correct!';
            state.correctAnswers++;
        } else {
            elements.resultContainer.classList.add('incorrect');
            elements.resultContainer.classList.remove('correct');
            elements.resultText.textContent = `Incorrect. The correct answer is ${currentQ.answer}.`;
        }
    }

    // Move to next question
    function nextQuestion() {
        state.currentQuestion++;

        elements.resultContainer.classList.add('hidden');

        if (state.currentQuestion < state.totalQuestions) {
            elements.questionContainer.classList.remove('hidden');
            displayQuestion();
        } else {
            // Quiz completed
            showSummary();
        }
    }

    // Show quiz summary
    function showSummary() {
        elements.finalScore.textContent = `${state.correctAnswers}/${state.totalQuestions}`;
        elements.summaryContainer.classList.remove('hidden');
        elements.progressFill.style.width = '0%';
        elements.progressText.textContent = `0/${state.totalQuestions} questions remaining`;
    }

    // Reset quiz
    function resetQuiz() {
        state.currentQuestion = 0;
        state.correctAnswers = 0;

        generateQuestions();

        elements.summaryContainer.classList.add('hidden');
        elements.questionContainer.classList.remove('hidden');

        displayQuestion();
    }

    // Event listeners
    elements.submitBtn.addEventListener('click', checkAnswer);
    elements.answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkAnswer();
    });
    elements.nextBtn.addEventListener('click', nextQuestion);
    elements.restartBtn.addEventListener('click', resetQuiz);

    // Initialize quiz
    generateQuestions();
    displayQuestion();
});
