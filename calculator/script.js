
const screen = document.getElementById("screen");
const historyDisplay = document.getElementById("history");
const buttons = document.querySelector(".buttons");

let expression = "";
let finished = false;

function updateScreen() {
    screen.value = expression || "0";
}

function calculate() {
    if (!expression) return;

    try {
        const safeExpression = expression
            .replace(/×/g, "*")
            .replace(/÷/g, "/");

        if (!/^[0-9+\-*/%.() ]+$/.test(safeExpression)) {
            throw new Error("Invalid");
        }

        const result = Function(
            '"use strict"; return (' + safeExpression + ')'
        )();

        if (!Number.isFinite(result)) {
            throw new Error("Invalid");
        }

        historyDisplay.textContent = expression + " =";
        expression = String(
            Number.parseFloat(result.toPrecision(12))
        );

        finished = true;
        updateScreen();

    } catch {
        screen.value = "خطأ";
        expression = "";
        finished = false;
    }
}

buttons.addEventListener("click", function(event) {
    const button = event.target.closest("button");
    if (!button) return;

    const value = button.dataset.value;
    const action = button.dataset.action;

    if (action === "clear") {
        expression = "";
        historyDisplay.textContent = "";
        finished = false;
        updateScreen();
        return;
    }

    if (action === "delete") {
        expression = expression.slice(0, -1);
        finished = false;
        updateScreen();
        return;
    }

    if (action === "calculate") {
        calculate();
        return;
    }

    if (action === "sign") {
        if (!expression) return;

        if (/^[0-9.]+$/.test(expression)) {
            expression = String(-Number(expression));
        } else {
            expression = "-(" + expression + ")";
        }

        finished = false;
        updateScreen();
        return;
    }

    if (value === "%") {
        expression += "/100";
        finished = false;
        updateScreen();
        return;
    }

    if (finished) {
        if (/[0-9.]/.test(value)) {
            expression = "";
        }
        finished = false;
        historyDisplay.textContent = "";
    }

    if (value === ".") {
        const currentNumber = expression.split(/[+\-×÷]/).pop();

        if (currentNumber.includes(".")) return;

        if (!currentNumber) expression += "0";
    }

    expression += value;
    updateScreen();
});
