// script.js
let display = document.getElementById("display");
let buttons = document.querySelectorAll(".btn");

let expression = ""; // Stores the full expression

// Add event listeners to all buttons
buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        let value = e.target.getAttribute("data-value");

        if (value === "C") {
            clearCalculator(); // Clears everything
        } else if (value === "=") {
            calculateResult(); // Shows result
        } else {
            updateExpression(value); // Updates display
        }
    });
});

// Function to clear the calculator (C Button)
function clearCalculator() {
    expression = "";
    display.innerText = "0";
}

// Function to update the display with numbers/operators
function updateExpression(value) {
    // Prevent multiple operators in a row (e.g., "++", "--", "*/")
    if (["+", "-", "*", "/"].includes(value) && ["+", "-", "*", "/"].includes(expression.slice(-1))) {
        return;
    }

    expression += value;
    display.innerText = expression;
}

// Function to calculate the result (= Button)
function calculateResult() {
    try {
        if (expression.trim() === "") return; // Prevents empty calculation

        let result = new Function(`return ${expression}`)(); // Evaluates safely
        display.innerText = result;
        expression = result.toString(); // Stores result for further calculations
    } catch (error) {
        display.innerText = "Error";
        expression = "";
    }
}
