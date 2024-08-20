const screen = document.getElementById('screen');
let currentInput = '';
let operator = '';
let firstOperand = '';

document.querySelectorAll('.key').forEach(button => {
    button.addEventListener('click', () => {
        const action = button.getAttribute('data-action');
        
        if (!isNaN(action) || action === '.') {
            // If there's a current operator, add to the firstOperand, otherwise to the currentInput
            if (operator) {
                currentInput += action;
                screen.textContent = currentInput;
            } else {
                currentInput = (currentInput === '0' ? action : currentInput + action);
                screen.textContent = currentInput;
            }
        } else if (action === 'AC') {
            currentInput = '';
            operator = '';
            firstOperand = '';
            screen.textContent = '0';
        } else if (action === '=') {
            if (operator && firstOperand) {
                // Evaluate the result and update the screen
                try {
                    currentInput = eval(`${firstOperand} ${operator} ${currentInput}`);
                    screen.textContent = currentInput;
                    firstOperand = '';
                    operator = '';
                } catch {
                    screen.textContent = 'Error';
                }
            }
        } else {
            // Set operator and store current input as first operand
            if (operator && currentInput) {
                try {
                    firstOperand = eval(`${firstOperand} ${operator} ${currentInput}`);
                } catch {
                    firstOperand = currentInput;
                }
                currentInput = '';
                screen.textContent = firstOperand;
            } else {
                firstOperand = currentInput;
                currentInput = '';
                screen.textContent = firstOperand;
            }
            operator = action;
        }
    });
});
