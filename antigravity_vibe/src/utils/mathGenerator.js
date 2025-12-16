export const generateQuestion = () => {
    const operators = ['+', '-', '*'];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let num1, num2;

    // Difficulty tweaking
    if (operator === '*') {
        num1 = Math.floor(Math.random() * 9) + 2; // 2 to 10
        num2 = Math.floor(Math.random() * 9) + 2;
    } else {
        num1 = Math.floor(Math.random() * 50) + 1; // 1 to 50
        num2 = Math.floor(Math.random() * 50) + 1;
    }

    // Ensure positive result for subtraction
    if (operator === '-' && num1 < num2) {
        [num1, num2] = [num2, num1];
    }

    const question = `${num1} ${operator} ${num2}`;
    // eslint-disable-next-line no-eval
    const answer = eval(question); // Safe for local generated numbers

    // Generate options
    const options = new Set([answer]);
    while (options.size < 4) {
        const variance = Math.floor(Math.random() * 10) - 5; // -5 to +5
        const wrong = answer + variance;
        if (wrong !== answer && wrong >= 0) {
            options.add(wrong);
        } else {
            // Fallback if variance is 0 or negative (and unwanted)
            options.add(answer + options.size + 1);
        }
    }

    return {
        id: Date.now(),
        text: `${question} = ?`,
        answer: answer,
        options: Array.from(options).sort(() => 0.5 - Math.random())
    };
};
