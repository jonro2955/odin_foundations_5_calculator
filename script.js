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
  let operandA, 
    operandB, 
    operator, 
    result,
    changed;

  function upDateHistory(a, op, b, result) {
    let existingText = history.innerHTML
    history.innerHTML =  "<br>" + `${a} ${op} ${b} = ${result}` + "<br>" + existingText;
  }

  function displayRounded(result) {
    let numStr = result.toString(); 
    const display = document.querySelector("#display"); 
    /*Case 1) Result is a whole number greter than 9 digits. Return error.*/ 
    if (!numStr.includes(".") && numStr.length > 9) { 
      display.innerHTML = "Too big &#128534;";
      return;
    }
    /*Case 2) Result is a decimal. Round answers with long decimals so that they 
    don’t overflow the screen.*/ 
    if (numStr.includes(".")) { 
      let splitArray = numStr.split("."); //split numStr into array of 2 parts
      if (splitArray[0].length > 8) { //if the pre-decimal part is too long, error
        display.innerHTML = "Too big &#128534;";
        return;
      } 
      /*Case 2b) Pre-decimal portion is short enough to allow at least one decimal place 
      to appear. Only round off decimals if the numStr is longer than 10 characters.*/
      if (numStr.length > 10) {
        let i = 1;
        let roundedValue;
        do { //successively grow the rounded decimal length to fit
          roundedValue = result.toFixed(i);
          ++i;
        } while (roundedValue.length < 10);
        display.textContent = roundedValue;
        return;
      } 
    }
    /*Case 3) If the other cases don't apply, display the result as is*/
    display.textContent = result;
  }

  function pressNumBtn(number) {
    /*At error screen, numBtns should be disabled*/
    if (display.textContent.includes("Too big")) {
      return;
    }
    /*If a numBtn is pressed after the operator is defined and changed is false,
    clear the display once to enter operandB*/
    if (operator !== undefined && changed === false) {
      display.textContent = ""; //clear display
      changed = true; //clear only once to string further numbers together
      console.log(`Entering operandB`); 
    }
    //For now, Users can only input upto 9 digits
    if (display.textContent.length < 9) {
      //First, if at a cleared state, get rid of the 0
      if (display.textContent == "0") display.textContent = "";
      //If decimal is pressed,
      if (number == ".") {
        //If there is already a decimal, do nothing
        if (display.textContent.includes(".")) return;
        //If it was a cleared state with 0 removed, place decimal with a 0 before it
        if (display.textContent == "") {
          display.textContent = "0.";
          return;
        } 
      }
      //If none of the other cases applied, concatenate the character onto existing numbers
      display.textContent += number;
      console.log(`Pressed numBtn ${number}`);
    }  
  }

  function pressOpBtn(symbol) {
    /*At error screen, the opBtns should do nothing*/
    if (display.textContent.includes("Too big")) {
      return;
    }
    /*opBtn scenario 1: If opBtn is pressed in a cleared state (i.e. if operandA, 
    operandB, and operator are all undefined), then take the current display value as 
    operandA, the pressed button as operator and set changed to false to enter operandB */
    if (operandA === undefined && operandB === undefined && operator === undefined) {
      operandA = display.textContent;
      operator = symbol;
      changed = false; 
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
      upDateHistory(operandA, operator, operandB, result);
      let oldOperandA = operandA; //old
      let oldOperator = operator; //old
      operandA = result; //new 
      operator = symbol; //new  
      changed = false; 
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
      console.log(`Pressed opBtn ${operator} under scenario 3: opBtn pressed consecutively. Assigning new operator.
        operandA: ${operandA}, operator: ${operator}, operandB: ${operandB}.`);
      return;
    }
  }

  function pressEqualsBtn() {
    /*The equals button only works if operandA and operator are defined and display has changed,
    or, if all of operandA, operandB and operator are defined.*/
    if (operandA != undefined && operator != undefined && (changed == true || operandB !== undefined)) {
      /*Only change operandB if the display number was changed. Otherwise just use the old value*/ 
      if (changed) operandB = display.textContent;
      result = operate(operandA, operator, operandB);
      displayRounded(result);
      upDateHistory(operandA, operator, operandB, result);
      // display.textContent = result;
      oldOperandA = operandA; //old
      operandA = result; //new
      changed = false; 
      console.log(`Pressed equals btn. Calculated ${oldOperandA} ${operator} ${operandB} = ${result}
        operandA: ${operandA}, operator: ${operator}, operandB: ${operandB}, result: ${result}.`);
      return;
    }
    console.log(`Equals pressed but nothing happened.`);
  }

  function pressClearBtn() {
    display.textContent = "0";
    operandA = undefined;
    operandB = undefined;
    operator = undefined;
    result = undefined;
    changed = false;
    console.log(`Memory cleared. operandA: ${operandA}, operator: ${operator}, operandB: ${operandB}, result: ${result}.`);
  }

  function pressDelBtn() {
    changed = true;
    if (display.textContent.includes("Too big")) {
      clear();      
      return;
    }
    const array = display.textContent.split("");
    console.log(`Deleted last digit: ${array[array.length-1]}`);
    if (array.length === 1) {
      display.textContent = "0";
      return;
    }
    display.textContent = array.slice(0, array.length - 1).join("");
  }

  function pressSignBtn() {
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
  btnC.addEventListener("click", () => {
    pressClearBtn();
  });

  //The +/- button
  const btnSign = document.querySelector("#btnSign");
  btnSign.addEventListener("click", () => {
    pressSignBtn()
  });

  //History clear button
  const history = document.querySelector("#history");
  const historyClearBtn = document.querySelector("#historyClearBtn");
  historyClearBtn.addEventListener("click", () => {
    history.textContent = "";
  });

  //Notepad clear button
  const notePad = document.querySelector("#notePad");
  const notePadClearBtn = document.querySelector("#notePadClearBtn");
  notePadClearBtn.addEventListener("click", () => {
    notePad.value = "";
  });

  //keyboard keys
  window.addEventListener("keydown", (event) => {
    console.log(`Pressed: ${event.key}`);
    switch (event.key) {
      //numBtns
      case "0":
        pressNumBtn("0"); 
      return;
      case "1":
        pressNumBtn("1");
      return;
      case "2":
        pressNumBtn("2");
      return;
      case "3":
        pressNumBtn("3");
      return;
      case "4":
        pressNumBtn("4");
      return;
      case "5":
        pressNumBtn("5");
      return;
      case "6":
        pressNumBtn("6");
      return;
      case "7":
        pressNumBtn("7");
      return;
      case "8":
        pressNumBtn("8");
      return;
      case "9":
        pressNumBtn("9");
      return;
      case ".":
        pressNumBtn(".");
      return;
      //opBtns
      case "+":
        pressOpBtn("+");
        return;
      case "-":
        pressOpBtn("-");
        return;
      case "*":
        pressOpBtn("*");
      return;
      case "/":
        pressOpBtn("/");
      return;
      case "%":
        pressOpBtn("%");
      return;
      //equals, clear, del
      case "Enter":
        pressEqualsBtn();
      return;
      case ("c"):
        pressClearBtn();
      return;
      case ("Escape"):
        pressClearBtn();
      return;
      case "Backspace":
        pressDelBtn();
      return;
    } 
  });
}

main();


