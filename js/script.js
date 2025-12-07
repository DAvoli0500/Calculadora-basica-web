document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('resultado');
    let currentInput = '0';
    let previousInput = '';
    let operation = null;
    let resetScreen = false;

    // Atualiza o display
    function updateDisplay() {
        display.textContent = currentInput;
    }

    // Insere número ou ponto decimal
    function insert(value) {
        if (currentInput === '0' || resetScreen) {
            currentInput = value;
            resetScreen = false;
        } else {
            currentInput += value;
        }
        updateDisplay();
    }

    // Adiciona ponto decimal
    function addDecimal() {
        if (resetScreen) {
            currentInput = '0.';
            resetScreen = false;
            updateDisplay();
            return;
        }
        
        if (!currentInput.includes('.')) {
            currentInput += '.';
            updateDisplay();
        }
    }

    // Limpa a calculadora
    function clearAll() {
        currentInput = '0';
        previousInput = '';
        operation = null;
        updateDisplay();
    }

    // Apaga o último caractere
    function backspace() {
        if (currentInput.length === 1 || (currentInput.length === 2 && currentInput.startsWith('-'))) {
            currentInput = '0';
        } else {
            currentInput = currentInput.slice(0, -1);
        }
        updateDisplay()
    }

    // Define a operação a ser realizada
    function setOperation(op) {
        if (operation !== null) calculate();
        previousInput = currentInput;
        operation = op;
        resetScreen = true;
    }

    // Realiza o cálculo
    function calculate() {
        if (operation === null || resetScreen) return;
        
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        
        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case 'X':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }
        
        currentInput = result.toString();
        operation = null;
        updateDisplay();
    }

    // Atribui eventos aos botões
    document.querySelectorAll('.botao').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;
            
            if (!isNaN(value) || value === '.') {
                if (value === '.') {
                    addDecimal();
                } else {
                    insert(value);
                }
            } else {
                switch (value) {
                    case 'C':
                        clearAll();
                        break;
                    case '<':
                        backspace();
                        break;
                    case '+':
                    case '-':
                    case 'X':
                    case '/':
                        setOperation(value);
                        break;
                    case '=':
                        calculate();
                        break;
                }
            }
        });
    });

    // Inicializa o display
    updateDisplay();
});