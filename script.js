function main() {

  function add(a, b) {
    return Number(a) + Number(b);
  }

  function sub(a, b) {
    return a - b;
  }

  function mult(a, b) {
    return a * b;
  }

  function div(a, b) {
    return a / b;
  }

  function mod(a, b) {
    return a % b;
  }

  function operate(a, op, b) {
    switch (op) {
      case "+":
        return add(a, b);
      case "-":
        return sub(a, b);
      case "*":
        return mult(a, b);
      case "/":
        return div(a, b);
      case "%":
        return mod(a, b);
    }
  }

  const display = document.querySelector("#display");
  const currentCalc = document.querySelector("#currentCalc");
  const oldCalcs = document.querySelector("#oldCalcs"); 
  const notePad = document.querySelector("#notePad");
  const op = document.querySelector("#op");
  let operandA, 
    operandB, 
    operator, 
    result,
    changed;

  function upDateHistory(a, op, b, result) {
    let lastCalc = currentCalc.innerHTML;
    let oldHistory = oldCalcs.innerHTML;
    currentCalc.innerHTML =  `<br>${a} ${op} ${b} = ${result}`;
    oldCalcs.innerHTML = lastCalc + oldHistory;
  }

  function displayRounded(result) {
    const display = document.querySelector("#display");
    // /*Worked on rounding long decimals but instead
    // decided to increase digit capacity to increase accuracy*/     
    // let resultStr = result.toString(); 
    // if (resultStr.includes(".")) { 
    //   let splitArray = resultStr.split("."); //split resultStr into array of 2 parts
    //   if (splitArray[0].length > 80) { //if the pre-decimal part is too long, error
    //     display.innerHTML = "Error &#128534;";
    //     return;
    //   } 
    //   /*If Pre-decimal portion is short enough to allow at least one decimal place 
    //   to appear, only round off decimals if the resultStr is longer than 85 characters.*/
    //   if (resultStr.length >= 85) {
    //     let i = 1;
    //     let roundedValue;
    //     do { //successively grow the rounded decimal length to fit
    //       roundedValue = result.toFixed(i);
    //       ++i;
    //     } while (roundedValue.length < 85);
    //     display.textContent = roundedValue;
    //     return;
    //   } 
    // }
    // /*Case 3) If the other cases don't apply, display the result as is*/
    display.textContent = result;
  }

  function resizeNums(display){
    if (display.textContent.length <= 9) {
      display.style.fontSize = "72px";
    }
    if (display.textContent.length > 9 && display.textContent.length <= 14) {
      display.style.fontSize = "48px";
    }
    if (display.textContent.length > 14) {
      display.style.fontSize = "24px";
    }
  }

  function pressNumBtn(number) {
    /*If error screen, numBtns should be disabled*/
    if (display.textContent.includes("Error")) {
      return;
    }
    /*If a numBtn is pressed after the operator is defined and changed is false,
    clear the display once to enter operandB*/
    if (operator !== undefined && changed === false) {
      display.textContent = ""; //clear display
      changed = true; //clear only once to string operandB together
    }
    //Max display length: 85
    if (display.textContent.length <= 85) {
      //First if there is only a 0, clear it
      if (display.textContent == "0") display.textContent = "";
      //If the decimal is pressed,
      if (number == ".") {
        //If there is already a decimal, do nothing
        if (display.textContent.includes(".")) return;
        //If there was a 0, write "0."
        if (display.textContent == "") {
          display.textContent = "0.";
          return;
        } 
      }
      //If the other cases didn't apply, concatenate the new character 
      display.textContent += number;
      resizeNums(display);
    } 
  }

  function pressOpBtn(symbol) {
    /*If error screen, the opBtns should do nothing*/
    if (display.textContent.includes("Error")) {
      return;
    }
    /*opBtn scenario 1: If opBtn is pressed in a cleared state (i.e. if operandA, 
    operandB, and operator are all undefined), then take the current display value as 
    operandA, the pressed button as operator and set changed to false to enter operandB */
    if (operandA === undefined && operandB === undefined && operator === undefined) {
      operandA = display.textContent;
      operator = symbol;
      changed = false; 
      op.textContent = symbol;
      console.log(`Pressed opBtn ${operator} under scenario 1: Cleared state. 
        operandA: ${operandA}, operator: ${operator}, operandB: ${operandB}, result: ${result}.`);
      return;
    }
    /*opBtn scenario 2: If operandA and operator are defined and changed is true, that 
    means after an opBtn was pressed in scenario 1, a numBtn was pressed, then 
    another opBtn was pressed to bring us here. This is similar to an equals
    button press. We save the current display value as operandB, calculate/display the result, 
    then assign this result as the new operandA to use with the newly pressed operand. */
    if (operandA !== undefined && operator !== undefined && changed === true) {
      operandB = display.textContent;
      result = operate(operandA, operator, operandB); 
      displayRounded(result); 
      resizeNums(display);
      upDateHistory(operandA, operator, operandB, result);
      let oldOperandA = operandA; //old
      let oldOperator = operator; //old
      operandA = result; //new 
      operator = symbol; //new  
      changed = false; 
      op.textContent = symbol;
      console.log(`Pressed opBtn ${operator} under scenario 2. Calculated ${oldOperandA} ${oldOperator} ${operandB} = ${result}
        operandA: ${operandA}, operator: ${operator}, operandB: ${operandB}, result: ${result}.`);
      return;
    }
    /*opBtn scenario 3: If operandA and operator are defined but changed is false, that 
    means more than one opBtn was pressed consecutively without entering a new number 
    in between. Then we simply reassign the operator variable according to the opBtn pressed*/ 
    if (operandA !== undefined && operator !== undefined && changed === false ) {
      operator = symbol;
      changed = false; 
      op.textContent = symbol;
      console.log(`Pressed opBtn ${operator} under scenario 3: opBtn pressed consecutively. Assigning new operator.
        operandA: ${operandA}, operator: ${operator}, operandB: ${operandB}.`);
      return;
    }
  }

  function pressEqualsBtn() {
    if (notePad === document.activeElement) {
      return;
    }
    /*The equals button only works if operandA and operator are defined and display has changed,
    or, if all of operandA, operandB and operator are defined.*/
    if (operandA != undefined && operator != undefined && (changed == true || operandB !== undefined)) {
      /*Only change operandB if the display number was changed. Otherwise just use the old value*/ 
      if (changed) operandB = display.textContent;
      result = operate(operandA, operator, operandB);
      displayRounded(result);
      resizeNums(display);
      upDateHistory(operandA, operator, operandB, result);
      // display.textContent = result;
      oldOperandA = operandA; //old
      operandA = result; //new
      changed = false; 
      console.log(`Pressed equals btn. Calculated ${oldOperandA} ${operator} ${operandB} = ${result}
        operandA: ${operandA}, operator: ${operator}, operandB: ${operandB}, result: ${result}.`);
      return;
    }
  }

  function pressClearBtn() {
    display.textContent = "0";
    operandA = undefined;
    operandB = undefined;
    operator = undefined;
    result = undefined;
    changed = false;
    op.textContent = "";
    display.style.fontSize = "72px";
    console.log(`Clear`);
  }

  function pressDelBtn() {
    changed = true;
    if (display.textContent.includes("Error")) {
      clear();      
      return;
    }
    const array = display.textContent.split("");
    if (array.length === 1) {
      display.textContent = "0";
      return;
    }
    display.textContent = array.slice(0, array.length - 1).join("");
    resizeNums(display);
  }

  function pressSignBtn() {
    changed = true;
    if (display.textContent[0] !== "-") {
      display.textContent = "-" + display.textContent;
    } else {
      display.textContent = display.textContent.substring(1);
    }  
  }

  //The opBtns: +, -, /, *, and %
  const opBtns = document.querySelectorAll(".opBtn"); 
  opBtns.forEach(btn => btn.addEventListener("click", (event) => {
    pressOpBtn(event.target.textContent);
  }));

  //Numbers and decimal buttons
  const numBtns = document.querySelectorAll(".numBtn"); 
  numBtns.forEach(btn => btn.addEventListener("click", (event) => {
    pressNumBtn(event.target.textContent)
  }));

  //Del button
  const btnDel = document.querySelector("#btnDel");
  btnDel.addEventListener("click", () => {
    pressDelBtn();
  });

  //Equals button
  const btnEqual = document.querySelector("#btnEqual");
  btnEqual.addEventListener("click", () => {
    pressEqualsBtn();
  });

  //Clear button
  const btnC = document.querySelector("#btnC");
  btnC.addEventListener("click", (event) => {
    pressClearBtn();
    event.currentTarget.blur();
  });

  //The +/- button
  const btnSign = document.querySelector("#btnSign");
  btnSign.addEventListener("click", () => {
    pressSignBtn();
  });

  //History clear button
  const historyClearBtn = document.querySelector("#historyClearBtn");
  historyClearBtn.addEventListener("click", () => {
    currentCalc.textContent = "";
    oldCalcs.textContent = "";
  });

  //Notepad clear button
  const notePadClearBtn = document.querySelector("#notePadClearBtn");
  notePadClearBtn.addEventListener("click", () => {
    notePad.value = "";
  });

  //keyboard keys
  window.addEventListener("keydown", (event) => {
    if (notePad === document.activeElement) {
      return;
    }
    switch (event.key) {
      //numBtns
      case "0":
        pressNumBtn("0"); 
      break;
      case "1":
        pressNumBtn("1");
      break;
      case "2":
        pressNumBtn("2");
      break;
      case "3":
        pressNumBtn("3");
      break;
      case "4":
        pressNumBtn("4");
      break;
      case "5":
        pressNumBtn("5");
      break;
      case "6":
        pressNumBtn("6");
      break;
      case "7":
        pressNumBtn("7");
      break;
      case "8":
        pressNumBtn("8");
      break;
      case "9":
        pressNumBtn("9");
      break;
      case ".":
        pressNumBtn(".");
      break;
      //opBtns
      case "+":
        pressOpBtn("+");
        break;
      case "-":
        pressOpBtn("-");
      break;
      case "*":
        pressOpBtn("*");
      break;
      case "/":
        pressOpBtn("/");
      break;
      case "%":
        pressOpBtn("%");
      break;
      //equals, clear, del, sign
      case "Enter":
        pressEqualsBtn();
      break;
      case ("c"):
        pressClearBtn();
      break;
      case ("Escape"):
        pressClearBtn();
      break;
      case "Backspace":
        pressDelBtn();
      break;
      case "s":
        pressSignBtn();
    }
  });
}

main();


