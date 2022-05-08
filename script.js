let messageElement;
let expressionElement;
let equalToElement;
const OPERATORS = ['addition', 'subtraction', 'mutiplication', "division", "decimalPoint"];

document.addEventListener("DOMContentLoaded", function (event) {
    messageElement = document.getElementById('message');
    expressionElement = document.getElementById('expression');
    equalToElement = document.getElementById('equalTo');
    updateButtons();
});


let string = "";
let message = "";

function buttonClick(event) {
    message = "";

    const { textContent: key, id } = event.target;

    const isCurrentButtonIsOperator = isOperator(id);

    if (isCurrentButtonIsOperator && isLastKeyIsOperator()) {

        console.log("both operators");
        return;
    }

    switch (id) {
        case "clear":
            string = "";
            break;

        case "back":
            string = string.slice(0, -1);
            break;

        case "equalTo":
            try {
                temp = eval(string).toString();
                if (temp.includes('.')) {
                    temp = Math.round((Number(temp) + Number.EPSILON) * 100) / 100;
                }
                if (temp === "Infinity") {
                    setTimeout(() => {
                        document.getElementById("clear").click();
                    }, 2000);
                }
                if (![null, "NaN", undefined].includes(temp)) {
                    string = temp;
                    message = "";
                } else {
                    throw Error("String has value :", value);
                }
            } catch (ex) {
                message = "Invalid operation. Please check provided inputs.";
            }
            break;

        default:
            string += key;
    }

    expressionElement.value = string;

    showMessage()

    updateButtons(isCurrentButtonIsOperator);
}

function isOperator(key) {
    return OPERATORS.includes(key);
}

function isLastKeyIsOperator() {
    return isOperator(string[string.length - 1]);
}

function updateButtons(isCurrentButtonIsOperator) {
    if (!string.length) {
        equalToElement.toggleAttribute('disabled');
        disableButtons([...OPERATORS, "equalTo"]);
    } else {
        if (isCurrentButtonIsOperator) {
            //disableAllOperators();
            enableButtons(["zero"]);
        } else {
            enableButtons([...OPERATORS, "clear", "back", "equalTo"]);
        }
    }
}


function disableAllOperators() {
    disableButtons(OPERATORS);
}

function disableButtons(buttons) {
    buttons.forEach(operatorId => {
        document.getElementById(operatorId).setAttribute('disabled', 'true');
    });
}

function enableButtons(buttons) {
    buttons.forEach(operatorId => {
        document.getElementById(operatorId).removeAttribute('disabled');
    });
}

function showMessage() {
    messageElement.innerHTML = message;
    if (message.length) {
        messageElement.style.display = 'block';
    } else {
        messageElement.style.display = 'none';
    }
}
