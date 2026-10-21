const display = document.querySelector("input");

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

async function calculate() {
    try {
        const expression = encodeURIComponent(display.value);

        const response = await fetch(
            `https://api.mathjs.org/v4/?expr=${expression}`
        );

        const result = await response.text();
        display.value = result;
    } catch (error) {
        display.value = "Error";
    }
}