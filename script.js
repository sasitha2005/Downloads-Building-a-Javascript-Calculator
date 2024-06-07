let trailingResult = 0;
let operationOptions = ['divide', 'multiply', 'subtract', 'add'];
let workingOperation = "";
let lastInputWasOperator = false; // Track consecutive operators

function updateDisplay(input) {
  let display = document.getElementById("display");
  let secondaryDisplay = document.getElementById("secondaryDisplay");

  if (display.innerHTML === "0" && operationOptions.indexOf(input) === -1) {
    if (input === "decimal") {
      display.innerHTML = "0.";
    } else if (input === "negative-value") {
      if (display.innerHTML.indexOf("-") === -1) {
        display.innerHTML = "-" + display.innerHTML;
      } else if (display.innerHTML.indexOf("-") > -1) {
        display.innerHTML = display.innerHTML.slice(1, display.innerHTML.length);
      }
    } else {
      display.innerHTML = input;
    }
    lastInputWasOperator = false;
  } else if (operationOptions.indexOf(input) >= 0) {
    if (lastInputWasOperator) {
      // If the last input was an operator, update to the current operator
      workingOperation = input;
    } else {
      if (workingOperation === "") {
        // No pending operation
        workingOperation = input;
        trailingResult = display.innerHTML;
        secondaryDisplay.innerHTML = trailingResult;
        display.innerHTML = 0;
      } else {
        // Perform calculation with the current operation
        trailingResult = calculate(trailingResult, display.innerHTML, workingOperation);
        secondaryDisplay.innerHTML = trailingResult;
        display.innerHTML = 0;
        workingOperation = input;
      }
    }
    lastInputWasOperator = true; // Mark that an operator was the last input
  } else if (input === "equals") {
    display.innerHTML = calculate(trailingResult, display.innerHTML, workingOperation);
    trailingResult = 0;
    workingOperation = "";
    secondaryDisplay.innerHTML = trailingResult;
    lastInputWasOperator = false;
  } else if (input === "decimal") {
    if (display.innerHTML.indexOf(".") === -1) {
      display.innerHTML += ".";
    }
    lastInputWasOperator = false;
  } else if (input === "negative-value") {
    if (display.innerHTML.indexOf("-") === -1) {
      display.innerHTML = "-" + display.innerHTML;
    } else if (display.innerHTML.indexOf("-") > -1) {
      display.innerHTML = display.innerHTML.slice(1, display.innerHTML.length);
    }
    lastInputWasOperator = false;
  } else {
    display.innerHTML += input;
    lastInputWasOperator = false;
  }
}

function clearDisplay() {
  let display = document.getElementById("display");
  let secondaryDisplay = document.getElementById("secondaryDisplay");
  trailingResult = 0;
  display.innerHTML = 0;
  secondaryDisplay.innerHTML = trailingResult;
}

function calculate(firstNumber, secondNumber, operation) {
  let result;
  firstNumber = parseFloat(firstNumber);
  secondNumber = parseFloat(secondNumber);
  switch(operation) {
    case "add":
      result = firstNumber + secondNumber;
      break;
    case "subtract":
      result = firstNumber - secondNumber;
      break;
    case "multiply":
      result = firstNumber * secondNumber;
      break;
    case "divide":
      result = firstNumber / secondNumber;
      break;
    default:
      console.log("Calculate switch statement missed something");
  }
  return result.toString();
}