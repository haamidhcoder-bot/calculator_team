const display = document.querySelector("input");
const buttons = document.querySelectorAll("button");
let justCalculated = false;

function appendValue(value) {
    if (display.value === "Error" || justCalculated) {
        display.value = "";
        justCalculated = false;
    }
    display.value += value;
}

function clearDisplay() {
    display.value = "";
    justCalculated = false;
}

async function calculate() {
    const expression = display.value.trim();
    if (!expression) return;

    try {
        const response = await fetch("/api/calculate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ expression })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Calculation failed");
        display.value = String(data.result);
        justCalculated = true;
    } catch (error) {
        display.value = error.message || "Error";
        justCalculated = true;
    }
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.textContent.trim();
        if (value === "C") clearDisplay();
        else if (value === "=") calculate();
        else appendValue(value);
    });
});

display.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === "=") {
        event.preventDefault();
        calculate();
    } else if (event.key === "Escape") {
        clearDisplay();
    }
});
