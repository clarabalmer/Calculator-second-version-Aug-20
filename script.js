// TO DO:
// bug: pressing delete on a number with multiple digits deletes the entire number
// decimal points
// multiple operations
// display calculation history, last result displayed bold
// pemdas
// fix delete button styling- decide where to put it
// google how to escape double quotes in html (for html '+' instead of plus variable in js)
// put numbers in html in single quotes (highlight and press single quote once)
// 0/0 should give an animation of zero dueling infinity

/********NOTES
math: [];
click on a number: add it to array: math as string
click on operator: add it to an array: math as string
"+", "-", "/", "*"

var bara = 1;
var benzi = '1';
if (bara == benzi) // true
if (bara === benzi) // false (because it also checks type)
exclamation point just means not
if (bara != benzi) // false
if (bara !== benzi) // true

[1, '+', 2, '-', 3]

    [
        {
            type: 'number',
            value: 1
        },
        {
            type: 'operator',
            value: '+'
        },
        {
            type: 'number',
            value: 2
        },
        {
            type: 'result',
            value: 3
        }
    ]
*/

// array holds all of the inputted numbers/symbols
var math = [];

function onClickNumber(number) {
    // does the math array have anything in it?
    if (math.length > 0) {
        // if so, check if the last item in the
        //array is a result
        if (math[math.length - 1].type === "result") {
            // if so, clear the array and start over
            onClickClear();
        }
    }
    if (math.length > 0) {
        if (math[math.length - 1].type === "number") {
            // don't allow 00
            if (math[math.length - 1].value === "0" && number === "0") {
                return;
            }
            // if it is a number, append the new
            // number to the end of the last number
            math[math.length - 1].value = math[math.length - 1].value + number;
            displayMath();
            return;
        }
    }
    let obj = {
        type: "number",
        value: number,
    };
    math.push(obj);
    displayMath();
}

function onClickDot() {
    if (math.length === 0) {
        let obj = {
            type: "number",
            value: "0.",
        };
        math.push(obj);
        displayMath();
    } else {
        if (math[math.length - 1].type === "operator") {
            let obj = {
                type: "number",
                value: "0.",
            };
            math.push(obj);
            displayMath();
        } else if (math[math.length - 1].type === "result") {
            onClickClear();

            let obj = {
                type: "number",
                value: "0.",
            };
            math.push(obj);
            displayMath();
        } else if (math[math.length - 1].type === "number") {
            if (math[math.length - 1].value.includes(".")) {
                return;
            }
            math[math.length - 1].value = math[math.length - 1].value + ".";
            displayMath();
        }
    }
}

function onClickOperator(operator) {
    // if the first thing you press is an operator
    // ignore it
    if (math.length === 0) {
        return;
    }
    // if the last item in the math array is
    // an operator,
    if (math[math.length - 1].type === "operator") {
        // replace it with a new operator
        math[math.length - 1].value = operator;
        // update the display
        displayMath();
        //don't do anything else
        return;
    }
    let obj = {
        type: "operator",
        value: operator,
    };
    math.push(obj);
    displayMath();
}

function onClickEquals() {
    // 1 + 3 - 4
    //loop through math array
    //if we find a number, we call parseInt
    //if we find an operator, we...?

    for (let index = 0; index < math.length; index++) {
        //Get the value in the array
        let valueObj = math[index];
        // Check to see if this is an operator
        if (valueObj.type === "operator") {
            //get the previous and next values in the math array
            let prevValueObj = math[index - 1];
            let nextValueObj = math[index + 1];

            //parse them as numbers
            let prevValue = parseFloat(prevValueObj.value);
            let nextValue = parseFloat(nextValueObj.value);

            //prevent division by zero
            if (valueObj.value === "/" && nextValue === 0) {
                displayCustomText("you cheeky mungbean");
                return;
            }

            //set the default result to 0 for the calculations
            let result = 0;

            //check what the operator value is set to
            switch (valueObj.value) {
                //do the operation
                case "/": {
                    result = prevValue / nextValue;
                    break; //if we don't add this, it will continue and do what's in the default
                }
                case "*": {
                    result = prevValue * nextValue;
                    break;
                }

                case "+": {
                    result = prevValue + nextValue;
                    break;
                }

                case "-": {
                    result = prevValue - nextValue;
                    break;
                }
                default: {
                }
            }
            //display the result
            document.getElementById("calculation").innerHTML = result;
            //clear out the math array
            math = [];
            //add the result to the math array so we can continue with that number
            let obj = {
                type: "result",
                value: result,
            };
            math.push(obj);

            displayMath();
        }
    }
}

function displayMath() {
    //ex: math = ["1", "2", "+", "3"]
    //             0    1    2    3 (zero based index)
    let displayString = "";
    for (let index = 0; index < math.length; index++) {
        if (math[index].type === "number" || math[index].type === "result") {
            //to do: add commas
            displayString += commaNumber(math[index].value);
        } else {
            displayString += math[index].value;
            //poop += 5 is the same as poop = poop + 5
        }
    }

    document.getElementById("calculation").innerHTML = displayString;
}
//display custom text in the result window without changing the math array
function displayCustomText(text) {
    document.getElementById("calculation").innerHTML = text;
}

function onClickClear() {
    math = [];
    displayMath();
}

function onClickDelete() {
    // do something to math array, to delete the last number
    math.pop();

    // update the display
    displayMath();
}
