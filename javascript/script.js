$(document).ready(function () {
    var digit = "", //variable where the digit that was input is stored
        array = [], //array to keep track of inputs for calculation
        answer = "", //answer of equations
        plusCounter = 0, //to check if the operators have been pressed multiple times
        subCounter = 0,
        multiCounter = 0,
        divCounter = 0,
        negCounter = 0,
        checkAns = answer.split(""),
        num = answer.toString(), //convert the answer from number to string
        roundDown = Math.floor(answer),
        check = answer.toString(),
        counter = 0,
        arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    $("#answer").html("0");



    $(":button").click(function () {

        var str = this.value, //to find out what key was input
            exp = /\d/g, //find any number
            deci = /\D+/, //find any non-number
            findDeci = /\./, //find decimal 
            plus = /\+/g, //regex to find plus sign
            sub = /\-/g,
            multi = /\×/g,
            negative = /\-/g,
            erase = document.getElementById("erase").value,
            checkPlus = document.getElementById("addition").value,
            checkSub = document.getElementById("subtract").value,
            checkMulti = document.getElementById("multiply").value,
            checkQuot = document.getElementById("division").value,
            equal = document.getElementById("equal").value,
            plusMinus = document.getElementById("plusminus").value;

        //Reset every to zeroes
        var reset = function () {
            digit = "";
            array = [];
            answer = "";
            $("#answer").html("0");
        };


        //Fixes the problem when a number is pressed right after the answer is given, for example answer = 10 and then 5 is pressed instead of + - / x, etc
        if (array.length == 1 && str.match(exp)) {
            array = [];
            answer = "";
        }


        //------------------------------------------------------
        //DECIMAL
        if (str.match(findDeci)) { //if decimal key is pressed
            if (findDeci.test(digit) == true && exp.test(digit) == false) { //just return the digit instead of adding extra decimals if it already has a decimal in "digit" as to not repeat decimals
                $("#answer").html(digit);
            }
            if (digit === "") { //if digit is blank[undefined], if there's no number for digit
                digit = "0" + ".";
                $("#answer").html(digit);
            }
            if (exp.test(digit) == true && digit !== "0." && findDeci.test(digit) == false && digit.match(deci) === null) { //any number that isn't "0." and doesn't have a decimal
                digit = digit + ".";
            }
        } //end of if statement (this.id === "decimal")
        //--------------------------------------------------------

        //when a number is pressed
        if (str.match(exp)) {
            digit += str;
            $("#answer").html(digit);
        }

        //-----------------------------------------------------------


        //check how many digits in answer

        var digitCount = function () {
            counter = 0;

            for (var i = 0; i < check.length; i++) {
                for (var j = 0; j < arr.length; j++) {
                    if (check[i] == arr[j]) {
                        counter++;
                        if (counter > 9) {
                            counter = 0;
                            return true;
                        }
                    }
                }
            }
        };

        //decimal digit count, with array of 2 items
        var deciDigit = function () {
            decimals = (Math.floor(answer * 1000) / 1000).toFixed(2); //fixed set of decimals
            answer = Number(decimals); //change from string to Number to fix trailing zeros
            check = answer.toString().split("");

            if (digitCount() == true) {
                $("#answer").html(answer.toExponential(2));
                digit = "";
                array = [];
                answer = "";
            } else {
                array.push(answer);
                $("#answer").html(check);
            }
        }

        //non-decimal digit count, with array of 2 items
        var nonDeciDigit = function () {
            if (digitCount() == true) { $("#answer").html(answer.toExponential(2));
                digit = "";
                array = [];
                answer = "";
            } else {
                array.push(answer);
                $("#answer").html(answer);
            }
        }

        //decimal digit count, with array of 4 items
        var deciDigitFour = function () {
            decimals = (Math.floor(answer * 1000) / 1000).toFixed(2); //fixed set of decimals
            answer = Number(decimals); //change from string to Number to fix trailing zeros
            check = answer.toString().split("");

            if (digitCount() == true) {
                $("#answer").html(answer.toExponential(2));
                digit = "";
                array = [];
                answer = "";
            } else {
                array = [];
                array.push(answer);
                array.push(str);
                $("#answer").html(check);

            }
        }

        var nonDeciDigitFour = function () {

            if (digitCount() == true) {
                $("#answer").html(answer.toExponential(2));
                digit = "";
                array = [];
                answer = "";
            } else {
                array = [];
                array.push(answer);
                array.push(str);
                $("#answer").html(answer);
            }
        }

        //check array length to see if there's a decimal
        var simplify = function () {

            if (array.length == 2) { //if array[1] matches the plus sign ex. [4, +]
                array = [];

                if (findDeci.test(num) == true) { //if a decimal is found in the answer or num in this case
                    deciDigit();
                } else {
                    check = answer.toString().split("");
                    nonDeciDigit();
                }
            } else if (array.length >= 4) { //if array has four items ex. [4, + , 5, +]

                if (findDeci.test(num) == true) {
                    deciDigitFour();

                } else {
                    check = answer.toString().split("");
                    nonDeciDigitFour();

                }
            }
        }

        //CALCULATION SECTION OF PROGRAM

        var add = function () {
            answer = Number(array[0]) + Number(digit);
            digit = "";
            plusCounter = 0;
            num = answer.toString();
            simplify();
        }



        var subtraction = function () {
            answer = Number(array[0]) - Number(digit);
            digit = "";
            subCounter = 0;
            num = answer.toString();
            simplify();
        }

        var multiplication = function () {
            answer = Number(array[0]) * Number(digit);
            digit = "";
            multiCounter = 0;
            num = answer.toString();
            simplify();
        }

        var division = function () {
            answer = Number(array[0]) / Number(digit);
            digit = "";
            divCounter = 0;
            num = answer.toString();
            //DIVISON
            if (array.length == 2) {
                //if array[0] is divided by zero (var digit)



                if (answer == Infinity) { //if first item in array isn't a zero but is being divided by zero, return error
                    answer = "ERROR";
                    digit = "";
                    divCounter = 0;
                    array = [];
                    $("#answer").html(answer);
                } else if (isNaN(answer) == true) { //if zero is being divided by zero, answer is undefined
                    answer = "UNDEFINED";
                    digit = "";
                    divCounter = 0;
                    array = [];
                    $("#answer").html(answer);
                } else {
                    simplify();
                }
            } else if (array.length == 4) {
                if (answer == Infinity) {
                    answer = "ERROR";
                    digit = "";
                    divCounter = 0;
                    array = [];
                    $("#answer").html(answer);
                    return answer;
                } else if (isNaN(answer) == true) {
                    answer = "UNDEFINED";
                    digit = "";
                    divCounter = 0;
                    array = [];
                    $("#answer").html(answer);
                } else {
                    simplify();
                }
            }
        }
        //--------------------------------------------------------------------------------------------------         
        //This is the area where if an operator is pressed, what happens next

        //Addition setup        
        if (str.match(plus)) {
            $("#answer").html(str);
            plusCounter++;
            if (plusCounter == 2) { //if plus sign is being pressed multiple times, just reset to zero
                plusCounter = 0;
            }
            if (array.length === 0 && digit !== "") { //if the array is empty and digit is numeric
                array.push(digit);
                array.push(str);
                digit = "";

            } else if (array.length === 0 && digit == "") { //if the array is empty and digit is undefined, return error
                answer = 0;
                digit = "";
                array = [];
                $("#answer").html("ERROR");
            } else if (array.length === 1) { //if the array has a number at array[0], then add the operator
                array.push(str);
            } else if (array.length === 2 && digit !== "") { //if the array has a number for array[0] and an operator for array[1] 
                array.push(digit);
                array.push(str);
                $("#answer").html("ERROR");

                if (array[1] == checkPlus) {
                    add();
                } else if (array[1] == checkSub) {
                    subtraction();
                } else if (array[1] == checkMulti) {
                    multiplication();
                } else if (array[1] == checkQuot) {
                    division();
                }
            } else { //not to get an empty digit ("") on an item position 3 in an array that consists of length of 4 
                array = [array[0], str];
            }
        }

        //Subtraction setup

        if (str.match(sub)) {
            $("#answer").html(str);
            subCounter++;
            if (subCounter == 2) {
                subCounter = 0;
            }
            if (array.length === 0 && digit !== "") {
                array.push(digit);
                array.push(str);

                digit = "";

            } else if (array.length === 0 && digit == "") {
                answer = 0;
                digit = "";
                array = [];
                $("#answer").html("ERROR");
            } else if (array.length === 1) {
                array.push(str);

            } else if (array.length === 2 && digit !== "") {
                array.push(digit);
                array.push(str);

                $("#answer").html("ERROR");

                if (array[1] == checkPlus) {
                    add();
                } else if (array[1] == checkSub) {
                    subtraction();
                } else if (array[1] == checkMulti) {
                    multiplication();
                } else if (array[1] == checkQuot) {
                    division();
                }
            } else { //not to get an empty digit ("") in an arrray that consists of length 4 at position 3 
                array = [array[0], str];
            }
        }

        //Multiplication setup
        if (str.match(checkMulti)) {
            $("#answer").html(str);
            multiCounter++;
            if (multiCounter == 2) {
                multiCounter = 0;
                array[1] = checkMulti;
            }
            if (array.length === 0 && digit !== "") {
                array.push(digit);
                array.push(str);

                digit = "";

            } else if (array.length === 0 && digit == "") {
                answer = 0;
                digit = "";
                array = [];
                $("#answer").html("ERROR");
            } else if (array.length === 1 && digit !== "") {
                array.push(str);
            } else if (array.length === 2 && digit !== "") {
                array.push(digit);
                array.push(str);

                $("#answer").html("ERROR");

                if (array[1] == checkPlus) {
                    add();
                } else if (array[1] == checkSub) {
                    subtraction();
                } else if (array[1] == checkMulti) {
                    multiplication();
                } else if (array[1] == checkQuot) {
                    division();
                }
            } else if (digit == "" && array.length === 1) {
                array.push(str);

            } else { //not to get an empty digit ("") in an arrray that consists of length 4 at position 3 
                array = [array[0], str];
            }
        }

        //Division setup

        if (str.match(checkQuot)) {
            $("#answer").html(str);
            divCounter++;
            if (divCounter == 2) {
                divCounter = 0;
                array[1] = checkQuot;
            }
            if (array.length === 0 && digit !== "") {
                array.push(digit);
                array.push(str);

                digit = "";
            } else if (array.length === 0 && digit == "") {
                answer = 0;
                digit = "";
                array = [];
                $("#answer").html("ERROR");
            } else if (array.length === 1 && digit !== "") {
                array.push(str);

            } else if (array.length === 2 && digit !== "") {
                array.push(digit);
                array.push(str);

                $("#answer").html("ERROR");

                if (array[1] == checkPlus) {
                    add();
                } else if (array[1] == checkSub) {
                    subtraction();
                } else if (array[1] == checkMulti) {
                    multiplication();
                } else if (array[1] == checkQuot) {
                    division();
                }
            } else if (digit == "" && array.length === 1) {
                array.push(str);
            } else { //not to get an empty digit ("") in an arrray that consists of length 4 at position 3 
                array = [array[0], str];
            }
        }

        //If key pressed is the EQUALS sign       
        if (str.match(equal)) {
            if (array[1] == checkPlus) {
                add();
            } else if (array[1] == checkSub) {
                subtraction();
            } else if (array[1] == checkMulti) {
                multiplication();
            } else if (array[1] == checkQuot) {
                division();
            } else {
                answer = 0;
                digit = "";
                array = [];
                $("#answer").html("ERROR");

            }
        }

        //If erase/reset key is pressed *SEEMS TO WORK*


        if (str == "AC") {
            reset();
        }

        //If +/- key is pressed:
        if (str == plusMinus) {
            negCounter++;
            var sep = digit.split("");

            if (digit == "") {
                $("#answer").html("ERROR");

            } else if (digit !== "" && negative.test(digit) == false) {
                digit = "-" + digit;
                $("#answer").html(digit);
            } else if (negCounter == 2)

                for (var i = 0; i < sep.length; i++) {
                    if (sep[i] == "-") {
                        negCounter = 0;
                        digit = Math.abs(digit);
                        digit = digit.toString();
                        $('#answer').html(digit);
                        return ("true");
                    }
                }

        }
        //Character limit set to 9
        var checkLength = digit.split("");

        if (checkLength.length == 10) {
            digit = checkLength.join("");
            //There should probably be a pop-up explaining the error, while just "ERROR" should show up on display   
            alert("Error: Too many numbers");
            reset();
        }

        // *end of setup area for opeartors*        
        //----------------------------------------------------------------------------------

    });


});
