# Calculator

This is the fifth project from The Odin Project's web develpment foundations curriculum. Live version: https://jonro2955.github.io/odin_foundations_5_calculator/ 

It is a simple calculator with all logic programmed in pure JavaScript. Although it only provides the user with 5 mathematical functions, the addition of decimal, +/- sign change, and the del functionality provided ample problem solving challenges. I'm also proud to include the extra features of calculation history and notepad in addition to the overall visual presentation requiring considerable HTML/CSS design work. Overall, it was a great exercise in JavaScript/CSS/HTML development. Following are the complete project instructions provided by the curriculum.  

Project instructions:

1. Your calculator is going to contain functions for all of the basic math operators you typically find on simple calculators, so start by creating functions for the following items and testing them in your browser’s console.
- add
- subtract
- multiply
- divide

2. Create a new function operate() that takes an operator and 2 numbers and then calls one of the above functions on the numbers.

3. Create a basic HTML calculator with buttons for each digit, each of the above functions and an “Equals” key.
- Implement the visual display for the calculator, and fill it with some dummy numbers so you can get it looking right.
- Add all the buttons and style them according to your design.

4. Create the functions that populate the display when you click the number buttons. Store the ‘display value’ in a variable somewhere for later use.

5. Now make the calculator work. You’ll need to store the first number that is input into the calculator when a user presses an operator, and also save which operation has been chosen and then operate() on them when the user presses the “=” key.
- You should already have the code that can populate the display, so once operate() has been called, update the display with the ‘solution’ to the operation.
- This is the hardest part of the project. You need to figure out how to store all the values and call the operate function with them. Don’t feel bad if it takes you a while to figure out the logic.

6. Gotchas: watch out for and fix these bugs if they show up in your code:
- Users should be able to string together several operations and get the right answer, with each pair of numbers being evaluated at a time. For example, 12 + 7 - 5 * 3 = should yield 42. An example of the behavior we’re looking for would be this: https://mrbuddh4.github.io/calculator/. Your calculator should not evaluate more than a single pair of numbers at a time. If you enter a number then an operator and another number that calculation should be displayed if your next input is an operator. The result of the calculation should be used as the first number in your new calculation.
- You should round answers with long decimals so that they don’t overflow the screen.
- Pressing = before entering all of the numbers or an operator could cause problems!
- Pressing “clear” should wipe out any existing data.. make sure the user is really starting fresh after pressing “clear”
- Display a snarky error message if the user tries to divide by 0… don’t let it crash your calculator!

EXTRA CREDIT: Users can get floating point numbers if they do the math required to get one, but they can’t type them in yet. Add a . button and let users input decimals! Make sure you don’t let them type more than one though: 12.3.56.5. It is hard to do math on these numbers. (disable the decimal button if there’s already one in the display).

EXTRA CREDIT: Make it look nice! This can be a good portfolio project… but not if it’s UGLY. At least make the operations a different color from the keypad buttons. 

EXTRA CREDIT: Add a “backspace” button, so the user can undo if they click the wrong number. 

EXTRA CREDIT: Add keyboard support! 
