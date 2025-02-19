var input_area_g = document.getElementById("Input_area");
var sub_area_g = document.getElementById("sub_input");
var keys = document.getElementById("keys");
var trigo_drop = document.getElementById("trigo_drop");
var func_drop = document.getElementById("func_drop");
var trigo_btns = document.querySelectorAll(".t-func");
var count_badge = document.getElementById("count_badge");
var history_div = document.getElementById("history_div");
var memory_div = document.getElementById("memory_div");
var memory_btns = document.getElementById("memory_btns");
var chanbool = false;
var f_exp = false;
var f_equal = false;
var f_yrootx = false;
var f_t2nd = false;
var f_hyp = false;
var f_logxy = false;
var f_fe = false;
var AngleUnit;
(function (AngleUnit) {
    AngleUnit["Degree"] = "degree";
    AngleUnit["Grad"] = "grad";
    AngleUnit["Radian"] = "rad";
})(AngleUnit || (AngleUnit = {}));
var scale = AngleUnit.Degree;
var sp_count = 0;
keys.addEventListener('click', buttonpress);
trigo_drop.addEventListener('click', trigoDrop);
func_drop.addEventListener('click', funcDrop);
memory_btns.addEventListener('click', memoryBtn);
var TrigoFunctions = /** @class */ (function () {
    function TrigoFunctions() {
    }
    // Method to convert degrees to radians
    TrigoFunctions.toRadians = function (degrees) {
        return degrees * (Math.PI / 180);
    };
    // Method to convert gradians to radians
    TrigoFunctions.toRadiansFromGrad = function (grad) {
        return grad * (Math.PI / 200);
    };
    // Method to convert radians to degrees
    TrigoFunctions.toDegrees = function (radians) {
        return radians * (180 / Math.PI);
    };
    // Method to convert radians to gradians
    TrigoFunctions.toGrad = function (radians) {
        return radians * (200 / Math.PI);
    };
    // Method to normalize angle based on scale
    TrigoFunctions.normalizeAngle = function (angle, scale) {
        switch (scale) {
            case 'degree':
                return TrigoFunctions.toRadians(angle);
            case 'grad':
                return TrigoFunctions.toRadiansFromGrad(angle);
            case 'rad':
            default:
                return angle;
        }
    };
    // Sine function
    TrigoFunctions.prototype.sin = function (angle, scale) {
        if (scale === void 0) { scale = AngleUnit.Radian; }
        // console.log("uydg");
        var rad = TrigoFunctions.normalizeAngle(angle, scale);
        return Math.sin(rad);
    };
    // Arc Sine function
    TrigoFunctions.prototype.asin = function (value, scale) {
        if (scale === void 0) { scale = AngleUnit.Radian; }
        var result = Math.asin(value);
        return scale === 'degree' ? TrigoFunctions.toDegrees(result) : scale === 'grad' ? TrigoFunctions.toGrad(result) : result;
    };
    // Hyperbolic Sine function
    TrigoFunctions.prototype.sinh = function (angle, scale) {
        if (scale === void 0) { scale = AngleUnit.Radian; }
        // const rad = TrigoFunctions.normalizeAngle(angle, scale);
        return Math.sinh(angle);
    };
    // Inverse Hyperbolic Sine function
    TrigoFunctions.prototype.asinh = function (value) {
        return Math.asinh(value);
    };
    // Cosine function
    TrigoFunctions.prototype.cos = function (angle, scale) {
        if (scale === void 0) { scale = AngleUnit.Radian; }
        var rad = TrigoFunctions.normalizeAngle(angle, scale);
        return Math.cos(rad);
    };
    // Arc Cosine function
    TrigoFunctions.prototype.acos = function (value, scale) {
        if (scale === void 0) { scale = AngleUnit.Radian; }
        var result = Math.acos(value);
        return scale === 'degree' ? TrigoFunctions.toDegrees(result) : scale === 'grad' ? TrigoFunctions.toGrad(result) : result;
    };
    // Hyperbolic Cosine function
    TrigoFunctions.prototype.cosh = function (angle, scale) {
        if (scale === void 0) { scale = AngleUnit.Radian; }
        // const rad = TrigoFunctions.normalizeAngle(angle, scale);
        return Math.cosh(angle);
    };
    // Inverse Hyperbolic Cosine function
    TrigoFunctions.prototype.acosh = function (value) {
        return Math.acosh(value);
    };
    // Tangent function
    TrigoFunctions.prototype.tan = function (angle, scale) {
        if (scale === void 0) { scale = AngleUnit.Radian; }
        var rad = TrigoFunctions.normalizeAngle(angle, scale);
        return Math.tan(rad);
    };
    // Arc Tangent function
    TrigoFunctions.prototype.atan = function (value, scale) {
        if (scale === void 0) { scale = AngleUnit.Radian; }
        var result = Math.atan(value);
        return scale === 'degree' ? TrigoFunctions.toDegrees(result) : scale === 'grad' ? TrigoFunctions.toGrad(result) : result;
    };
    // Hyperbolic Tangent function
    TrigoFunctions.prototype.tanh = function (angle, scale) {
        if (scale === void 0) { scale = AngleUnit.Radian; }
        // const rad = TrigoFunctions.normalizeAngle(angle, scale);
        return Math.tanh(angle);
    };
    // Inverse Hyperbolic Tangent function
    TrigoFunctions.prototype.atanh = function (value) {
        return Math.atanh(value);
    };
    // Secant function
    TrigoFunctions.prototype.sec = function (angle, scale) {
        if (scale === void 0) { scale = AngleUnit.Radian; }
        var rad = TrigoFunctions.normalizeAngle(angle, scale);
        return 1 / Math.cos(rad);
    };
    // Cosecant function
    TrigoFunctions.prototype.csc = function (angle, scale) {
        if (scale === void 0) { scale = AngleUnit.Radian; }
        var rad = TrigoFunctions.normalizeAngle(angle, scale);
        return 1 / Math.sin(rad);
    };
    // Cotangent function
    TrigoFunctions.prototype.cot = function (angle, scale) {
        if (scale === void 0) { scale = AngleUnit.Radian; }
        var rad = TrigoFunctions.normalizeAngle(angle, scale);
        return 1 / Math.tan(rad);
    };
    return TrigoFunctions;
}());
function memoryBtn(e) {
    var firstChild = document.querySelector("#memory_div div:first-child h3");
    if (e.target instanceof HTMLElement && e.target.closest("#memory_mc")) {
        localStorage.clear();
        // current_memory=0;
        getMemory();
        syncHistoryAndMemory();
    }
    else if (e.target instanceof HTMLElement && e.target.closest("#memory_mr")) {
        input_area_g.value = firstChild.innerText;
    }
    else if (e.target instanceof HTMLElement && e.target.closest("#memory_ma")) {
        console.log(Number(firstChild.innerText) + Number(input_area_g.value));
        firstChild.innerHTML = (Number(firstChild.innerText) + Number(input_area_g.value)).toString();
        localStorage.setItem(firstChild.id, firstChild.innerHTML);
        getMemory();
        syncHistoryAndMemory();
    }
    else if (e.target instanceof HTMLElement && e.target.closest("#memory_mre")) {
        firstChild.innerHTML = (Number(firstChild.innerText) - Number(input_area_g.value)).toString();
        localStorage.setItem(firstChild.id, firstChild.innerHTML);
        getMemory();
        syncHistoryAndMemory();
    }
    else if (e.target instanceof HTMLElement && e.target.closest("#memory_ms")) {
        if (input_area_g && !isNaN(Number(input_area_g.value)) && input_area_g.value !== '') {
            localStorage.setItem((Date.now()).toString(), input_area_g.value);
        }
        else {
            localStorage.setItem((Date.now()).toString(), input_area_g.value);
        }
        getMemory();
        syncHistoryAndMemory();
    }
    // console.log(current_memory);
}
var operators = new Set(["+", "-", "/", "*", "%", "**"]);
var trigoFunctionsSet = new Set([
    'sin', 'cos', 'tan', 'sec', 'csc', 'cot', // Basic trigonometric functions
    'asin', 'acos', 'atan', 'asec', 'acsc', 'acot', // Inverse trigonometric functions
    'sinh', 'cosh', 'tanh', 'sech', 'csch', 'coth', // Hyperbolic functions
    'asinh', 'acosh', 'atanh', 'asech', 'acsch', 'acoth' // Inverse hyperbolic functions
]);
function syncHistoryAndMemory() {
    // Sync History
    var historyDiv = document.getElementById('history_div');
    var historyDivOffcanvas = document.getElementById('history_offcanvas');
    if (historyDiv && historyDivOffcanvas) {
        historyDivOffcanvas.innerHTML = historyDiv.innerHTML;
    }
    // Sync Memory
    var memoryDiv = document.getElementById('memory_div');
    var memoryDivOffcanvas = document.getElementById('memory_offcanvas');
    if (memoryDiv && memoryDivOffcanvas) {
        memoryDivOffcanvas.innerHTML = memoryDiv.innerHTML;
    }
}
// Sync content when the offcanvas is shown
var historyOffcanvas = document.getElementById('historyOffcanvas');
if (historyOffcanvas) {
    historyOffcanvas.addEventListener('show.bs.offcanvas', syncHistoryAndMemory);
}
function setActive(clickedButton, button) {
    if (button == 'history') {
        history_div.style.display = 'block';
        memory_div.style.display = 'none';
        document.querySelectorAll(".hist").forEach(function (button) { return button.classList.add("active"); });
        document.querySelectorAll(".memo").forEach(function (button) { return button.classList.remove("active"); });
    }
    else {
        history_div.style.display = 'none';
        memory_div.style.display = 'block';
        document.querySelectorAll(".memo").forEach(function (button) { return button.classList.add("active"); });
        document.querySelectorAll(".hist").forEach(function (button) { return button.classList.remove("active"); });
    }
    // Remove 'active' class from all buttons
    // document.querySelectorAll(".nav-link").forEach(button => button.classList.remove("active"));
    // clickedButton.classList.add("active");
    var historyOffcanvas = document.getElementById('history_offcanvas');
    var memoryOffcanvas = document.getElementById('memory_offcanvas');
    if (historyOffcanvas && memoryOffcanvas) {
        if (button === 'history_offcanvas') {
            historyOffcanvas.style.display = 'block';
            memoryOffcanvas.style.display = 'none';
            // Separate loop for .hist buttons
            var histButtons = document.querySelectorAll(".hist");
            histButtons.forEach(function (button) {
                button.classList.add("active");
            });
            // Separate loop for .memo buttons
            var memoButtons = document.querySelectorAll(".memo");
            memoButtons.forEach(function (button) {
                button.classList.remove("active");
            });
        }
        else if (button === 'memory_offcanvas') {
            historyOffcanvas.style.display = 'none';
            memoryOffcanvas.style.display = 'block';
            // Separate loop for .memo buttons
            var memoButtons = document.querySelectorAll(".memo");
            memoButtons.forEach(function (button) {
                button.classList.add("active");
            });
            // Separate loop for .hist buttons
            var histButtons = document.querySelectorAll(".hist");
            histButtons.forEach(function (button) {
                button.classList.remove("active");
            });
        }
    }
    // Sync content
    syncHistoryAndMemory();
}
function toggleActiveClass(checkbox) {
    var navLink = checkbox.closest('.nav-link');
    if (checkbox.checked) {
        navLink.classList.add('active');
        f_fe = true;
    }
    else {
        navLink.classList.remove('active');
        f_fe = false;
    }
}
function logB(number, base) {
    return Math.log(Number(number)) / Math.log(Number(base));
}
function YrootX(y, x) {
    return Math.pow(Number(x), (1 / Number(y)));
}
function toggleText(button) {
    var currentText = button.innerText;
    if (currentText === "DEG") {
        button.innerText = "GRAD"; // Change to Grad
        scale = AngleUnit.Grad;
    }
    else if (currentText === "GRAD") {
        button.innerText = "RAD"; // Change to Rad
        scale = AngleUnit.Radian;
    }
    else {
        button.innerText = "DEG"; // Change back to Degree
        scale = AngleUnit.Degree;
    }
    // console.log(scale);
}
function keepFocus() {
    var inputElement = document.getElementById("Input_area");
    // Keep the input focused even when clicking elsewhere
    inputElement.focus();
    // Ensure input is focused whenever the page is loaded or focus is lost
    setInterval(function () {
        inputElement.focus();
    }, 100); // Refocus every 100ms
}
function ShowError() {
    // Get the alert element
    var alertElement = document.getElementById('danger-alert');
    // Show the alert by removing the 'd-none' class
    alertElement.classList.remove('d-none');
    // Hide the alert after 5 seconds
    setTimeout(function () {
        alertElement.classList.add('d-none');
    }, 3000); // 5000 milliseconds = 5 seconds
    // Add event listener to the close button
    var closeButton = alertElement.querySelector('.btn-close');
    closeButton.addEventListener('click', function () {
        alertElement.classList.add('d-none');
    });
}
window.onload = function () {
    // document.getElementById("Input_area").focus();
    var toggle_button = document.querySelectorAll('.toggle_button');
    var f_T2nd = false;
    var f_hyp = false;
    toggle_button.forEach(function (button) {
        // Adding an event listener to each button
        button.style.display = "none";
    });
    getHistory();
    getMemory();
    syncHistoryAndMemory();
    setInterval(convertFe, 10);
};
function convertFe() {
    // console.log("hi");
    if (input_area_g && !isNaN(Number(input_area_g.value)) && f_fe && input_area_g.value != '') {
        input_area_g.value = Number(input_area_g.value).toExponential();
    }
}
function deleteSession() {
    sessionStorage.clear();
    getHistory();
    syncHistoryAndMemory();
}
function getHistory() {
    var _a;
    history_div.innerHTML = '';
    // Collect all the keys in an array
    var keys = [];
    for (var i = 0; i < sessionStorage.length; i++) {
        var key = sessionStorage.key(i);
        if (key === 'IsThisFirstTime_Log_From_LiveServer') {
            continue; // Skip the specific key if needed
        }
        keys.push(Number(key));
    }
    // Sort keys in descending order based on their timestamps (latest first)
    keys.sort(function (a, b) { return b - a; });
    var _loop_1 = function (i) {
        var key = keys[i]; // Assuming keys is an array of numbers
        var storedValue = sessionStorage.getItem(key.toString()); // Get the value from sessionStorage
        // Check if storedValue exists before parsing
        if (storedValue) {
            // Parse the stored JSON value
            var hist_ele_1 = JSON.parse(storedValue);
            // Check if hist_ele is not null and has valid data
            if (hist_ele_1) {
                // Create a new div element
                var newele = document.createElement("div");
                // Set innerHTML using a template string
                newele.innerHTML = "\n                    <div class=\"d-grid text-end text-secondary my-2 border-bottom me-3\">\n                        <p style=\"font-size:0.9rem;\">".concat(hist_ele_1.expression, "</p>\n                        <h4 class=\"text-dark\">").concat(hist_ele_1.answer, "</h4>\n                    </div>");
                // Add event listener for click event (instead of inline onclick attribute)
                (_a = newele.querySelector('div')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
                    clickHistory(hist_ele_1.expression, hist_ele_1.answer);
                });
                // Append the new element to the history_div
                history_div.appendChild(newele);
            }
        }
    };
    // Now loop through the sorted keys
    for (var i = 0; i < keys.length; i++) {
        _loop_1(i);
    }
}
function getMemory() {
    memory_div.innerHTML = '';
    var keys = [];
    // Iterate over the localStorage keys
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key === 'IsThisFirstTime_Log_From_LiveServer') {
            continue; // Skip a specific key
        }
        if (key)
            keys.push(key);
    }
    // Sort keys in descending order (latest first)
    keys.sort(function (a, b) { return parseInt(b) - parseInt(a); });
    // Now loop through the sorted keys
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var hist_ele = localStorage.getItem(key);
        var newele = document.createElement("div");
        newele.innerHTML = "<h3 class=\"mt-3 mb-0 text-end\" id=".concat(key, "> ").concat(hist_ele, "</h3>\n        <div class=\"d-flex justify-content-end gap-1 border-bottom pb-2\">\n        <button type=\"button\" class=\"btn btn-light border\"\n        style=\"--bs-btn-padding-y: .20rem; --bs-btn-padding-x: .25rem; --bs-btn-font-size: .6rem;\" onclick=\"localStorage.removeItem('").concat(key, "');getMemory();syncHistoryAndMemory();\"> MC </button>\n\n        <button type=\"button\" class=\"btn btn-light border\"\n        style=\"--bs-btn-padding-y: .20rem; --bs-btn-padding-x: .25rem; --bs-btn-font-size: .6rem;\" onclick=\"localStorage.setItem('").concat(key, "',\n            Number(document.getElementById('").concat(key, "').innerText)+Number(document.getElementById('Input_area').value));getMemory();syncHistoryAndMemory();\"> M+ </button>\n\n       <button type=\"button\" class=\"btn btn-light border\"\n        style=\"--bs-btn-padding-y: .20rem; --bs-btn-padding-x: .25rem; --bs-btn-font-size: .6rem;\" onclick=\"localStorage.setItem('").concat(key, "',\n            Number(document.getElementById('").concat(key, "').innerText)-Number(document.getElementById('Input_area').value));getMemory();syncHistoryAndMemory();\"> M- </button>\n\n        </div>\n        \n        ");
        memory_div.appendChild(newele);
    }
}
function clickHistory(expression, answer) {
    // Set the input values with the clicked expression and answer
    input_area_g.value = answer;
    sub_area_g.value = expression.slice(0, expression.length - 1);
}
function factorial(n) {
    if (n === 0 || n === 1)
        return 1;
    return n * factorial(n - 1);
}
function changeBtn() {
    var initial_button = document.querySelectorAll('.initial_button');
    var toggle_button = document.querySelectorAll('.toggle_button');
    var chanbtn = document.getElementById("chan");
    if (!chanbool) {
        // Hide initial buttons and show toggle buttons
        initial_button.forEach(function (button) {
            button.style.display = "none";
        });
        toggle_button.forEach(function (button) {
            button.style.display = "block";
        });
        // Change state of chanbtn and the chanbool flag
        chanbool = true;
        chanbtn.classList.add('btn-primary');
        chanbtn.classList.remove('btn-light');
    }
    else {
        // Show initial buttons and hide toggle buttons
        initial_button.forEach(function (button) {
            button.style.display = "block";
        });
        toggle_button.forEach(function (button) {
            button.style.display = "none";
        });
        // Change state of chanbtn and the chanbool flag
        chanbool = false;
        chanbtn.classList.add('btn-light');
        chanbtn.classList.remove('btn-primary');
    }
}
function buttonpress(e) {
    var temp = e.target;
    var val = temp.id.trim(); // Get clicked element's ID
    // console.log(typeof val, val);
    if (val === "b_space" || val === "b_space_cont") {
        // console.log("Backspace clicked");
        if (input_area_g.value.length > 0) {
            input_area_g.value = input_area_g.value.slice(0, -1); // Remove last character
        }
    }
    else if (e.target instanceof HTMLElement && e.target.closest("#chan")) {
        changeBtn();
    }
    else if (val === "change_sign") {
        input_area_g.value = (Number(input_area_g.value) * -1).toString();
    }
    else if (operators.has(val)) {
        // console.log("here");
        if (f_logxy) {
            sub_area_g.value += input_area_g.value + ')' + val;
            f_logxy = false;
            return;
        }
        if (f_yrootx) {
            sub_area_g.value += input_area_g.value + ')' + val;
            f_yrootx = false;
            return;
        }
        if (input_area_g.value === "" && sub_area_g.value === "") {
            sub_area_g.value = "0" + val;
            return;
        }
        else if (input_area_g.value === "") {
            sub_area_g.value = sub_area_g.value.slice(0, sub_area_g.value.length - 1) + val;
            return;
        }
        if (Number(input_area_g.value) < 0) {
            var opp = sub_area_g.value.charAt(sub_area_g.value.length - 1);
            // console.log(opp);
            if (opp == "+") {
                sub_area_g.value = sub_area_g.value.slice(0, sub_area_g.value.length - 1) +
                    '-' + Math.abs(Number(input_area_g.value)) + val;
            }
            else if (opp == '-') {
                sub_area_g.value = sub_area_g.value.slice(0, sub_area_g.value.length - 1) +
                    '+' + Math.abs(Number(input_area_g.value)) + val;
            }
            else {
                sub_area_g.value += input_area_g.value + val;
            }
        }
        else {
            sub_area_g.value += input_area_g.value + val;
        }
        f_equal = true;
        // input_area_g.value='';
    }
    else if (val === 'pi') {
        input_area_g.value = (Math.PI).toString();
    }
    else if (val === 'e') {
        input_area_g.value = (Math.E).toString();
    }
    else if (val === "clear") {
        if (input_area_g.value != '') {
            input_area_g.value = '';
        }
        else {
            sub_area_g.value = '';
            sp_count = 0;
            count_badge.innerText = (sp_count).toString();
        }
    }
    else if (val === "fact") {
        if (input_area_g.value === '') {
            input_area_g.value = '1';
        }
        else {
            console.log(Number(input_area_g.value));
            input_area_g.value = (factorial(Number(input_area_g.value))).toString();
        }
    }
    else if (val === "=") {
        var exp = void 0;
        if (Number(input_area_g.value) < 0) {
            var opp = sub_area_g.value.charAt(sub_area_g.value.length - 1);
            // console.log(opp);
            if (opp == "+") {
                exp = sub_area_g.value.slice(0, sub_area_g.value.length - 1) +
                    '-' + Math.abs(Number(input_area_g.value));
            }
            else if (opp == '-') {
                exp = sub_area_g.value.slice(0, sub_area_g.value.length - 1) +
                    '+' + Math.abs(Number(input_area_g.value));
            }
            else {
                exp = sub_area_g.value + input_area_g.value;
            }
        }
        else {
            // console.log(Number(sub_area_g.value));
            exp = sub_area_g.value + input_area_g.value;
        }
        // console.log(exp);
        if (f_logxy) {
            sub_area_g.value += input_area_g.value + ')' + val;
            f_logxy = false;
            exp += ')';
        }
        if (f_yrootx) {
            sub_area_g.value += input_area_g.value + ')' + val;
            f_yrootx = false;
            exp += ')';
        }
        var ans = void 0;
        if (input_area_g.value === '') {
            try {
                ans = eval(exp.substr(0, exp.length - 1));
            }
            catch (_a) {
                ShowError();
                sub_area_g.value = '';
                input_area_g.value = '';
                return;
            }
        }
        else {
            try {
                ans = eval(exp);
            }
            catch (_b) {
                ShowError();
                sub_area_g.value = '';
                input_area_g.value = '';
                return;
            }
        }
        // if
        // console.log(ans);
        var session_obj = void 0;
        if (sub_area_g.value != '') {
            session_obj = {
                expression: exp + '=',
                answer: ans,
            };
        }
        console.log(typeof ans);
        if (ans == 'Infinity') {
            input_area_g.value = '';
            sub_area_g.value = '';
            ShowError();
        }
        else {
            sessionStorage.setItem((Date.now()).toString(), JSON.stringify(session_obj));
            getHistory();
            syncHistoryAndMemory();
            input_area_g.value = ans;
            sub_area_g.value = '';
        }
        f_equal = true;
    }
    else if (e.target instanceof HTMLElement && e.target.closest("#abs")) {
        // console.log("fj");
        if (Number(input_area_g.value) < 0) {
            input_area_g.value = (Number(input_area_g.value) * -1).toString();
        }
    }
    else if (e.target instanceof HTMLElement && e.target.closest("#inverse")) {
        if (input_area_g.value === '') {
            console.log("fff");
            ShowError();
        }
        else {
            input_area_g.value = (Math.pow(Number(input_area_g.value), -1)).toString();
        }
    }
    else if (e.target instanceof HTMLElement && e.target.closest("#square")) {
        if (input_area_g.value != '') {
            input_area_g.value = (Math.pow(Number(input_area_g.value), 2)).toString();
        }
    }
    else if (e.target instanceof HTMLElement && e.target.closest("#square_inv")) {
        if (input_area_g.value != '') {
            input_area_g.value = (Math.pow(Number(input_area_g.value), 3)).toString();
        }
    }
    else if (e.target instanceof HTMLElement && e.target.closest("#square_root")) {
        if (input_area_g.value != '') {
            input_area_g.value = (Math.sqrt(Number(input_area_g.value))).toString();
        }
    }
    else if (e.target instanceof HTMLElement && e.target.closest("#square_root_inv")) {
        if (input_area_g.value != '') {
            input_area_g.value = (Math.cbrt(Number(input_area_g.value))).toString();
        }
    }
    else if (e.target instanceof HTMLElement && e.target.closest("#tenpow")) {
        if (input_area_g.value != '') {
            input_area_g.value = (Math.pow(10, Number(input_area_g.value))).toString();
        }
        else {
            input_area_g.value = '1';
        }
    }
    else if (e.target instanceof HTMLElement && e.target.closest("#tenpow_inv")) {
        if (input_area_g.value != '') {
            input_area_g.value = (Math.pow(2, Number(input_area_g.value))).toString();
        }
        else {
            input_area_g.value = '1';
        }
    }
    else if (e.target instanceof HTMLElement && e.target.closest("#log")) {
        if (input_area_g.value != '') {
            input_area_g.value = (Math.log10(Number(input_area_g.value))).toString();
        }
        else {
            ShowError();
        }
    }
    else if (e.target instanceof HTMLElement && e.target.closest("#log_inv")) {
        // console.log("log _inv");
        if (input_area_g.value === '') {
            return;
        }
        else
            sub_area_g.value += "logB(".concat(input_area_g.value, ",");
        f_logxy = true;
        f_equal = true;
    }
    else if (e.target instanceof HTMLElement && e.target.closest("#yrootx_inv")) {
        // console.log("**");
        if (input_area_g.value === '') {
            return;
        }
        else
            sub_area_g.value += "YrootX(".concat(input_area_g.value, ",");
        f_yrootx = true;
        f_equal = true;
    }
    else if (e.target instanceof HTMLElement && e.target.closest("#ln")) {
        if (input_area_g.value != '') {
            input_area_g.value = (Math.log(Number(input_area_g.value))).toString();
        }
        else {
            ShowError();
        }
    }
    else if (e.target instanceof HTMLElement && e.target.closest("#ln_inv")) {
        if (input_area_g.value != '') {
            input_area_g.value = (Math.exp(Number(input_area_g.value))).toString();
        }
        else {
            input_area_g.value = '1';
        }
    }
    else if (e.target instanceof HTMLElement && e.target.closest("#exp")) {
        input_area_g.value += '.e+0';
        f_exp = true;
    }
    else if (e.target instanceof HTMLElement && e.target.closest("#start_p")) {
        // console.log("Sp");
        sp_count++;
        count_badge.innerHTML = (sp_count).toString();
        if (sub_area_g.value === '' && input_area_g.value === '')
            sub_area_g.value += input_area_g.value + "(";
        else if (sub_area_g.value === '') {
            sub_area_g.value += input_area_g.value + "*(";
        }
        else {
            sub_area_g.value += "(";
        }
    }
    else if (e.target instanceof HTMLElement && e.target.closest("#end_p")) {
        // console.log("Ep");
        if (sp_count == 0)
            return;
        sp_count--;
        count_badge.innerHTML = (sp_count).toString();
        if (sub_area_g.value.charAt(sub_area_g.value.length - 1) === '(' && input_area_g.value === '')
            sub_area_g.value += input_area_g.value + "0)*";
        else if (sub_area_g.value.charAt(sub_area_g.value.length - 1) == '(') {
            sub_area_g.value += input_area_g.value + ")*";
        }
        else {
            sub_area_g.value += ")";
        }
    }
    else if (val === ".") {
        if (input_area_g.value.charAt(input_area_g.value.length - 1) == '.') {
            return;
        }
        if (input_area_g.value === '') {
            input_area_g.value = '0.';
        }
        if (!input_area_g.value.includes('.')) {
            f_equal = false;
            input_area_g.value += val;
        }
    }
    else if (!isNaN(Number(val)) && val !== "") { // Check if val is a valid number
        // val = Number(val);
        // Prevent leading zero when pressing 0 first
        if (input_area_g.value === "0") {
            input_area_g.value = "";
        }
        if (f_exp) {
            input_area_g.value = input_area_g.value.slice(0, input_area_g.value.length - 1) + val;
            f_exp = false;
        }
        else if (f_equal) {
            input_area_g.value = val;
            f_equal = false;
        }
        else {
            input_area_g.value += val; // Append number to input field
        }
    }
}
function trigoDrop(e) {
    var ebtn = e.target;
    var btn2nd = document.getElementById("trig2nd");
    var btnhyp = document.getElementById("hyp");
    var temp = e.target;
    var btn_id = temp.id.trim();
    if (e.target instanceof HTMLElement && e.target.closest("#trig2nd")) {
        if (!f_t2nd) {
            btn2nd.classList.add('btn-primary');
            btn2nd.classList.remove('btn-light');
            f_t2nd = true;
            trigo_btns.forEach(function (button) {
                button.innerHTML = button.innerHTML + "<sup>-1</sup>";
                button.id = 'a' + button.id;
            });
        }
        else {
            btn2nd.classList.remove('btn-primary');
            btn2nd.classList.add('btn-light');
            f_t2nd = false;
            trigo_btns.forEach(function (button) {
                button.innerHTML = button.innerHTML.replace(/<sup>-1<\/sup>/g, "");
                button.id = button.id.slice(1);
            });
        }
    }
    else if (e.target instanceof HTMLElement && e.target.closest("#hyp")) {
        if (!f_hyp) {
            btnhyp.classList.add('btn-primary');
            btnhyp.classList.remove('btn-light');
            f_hyp = true;
            trigo_btns.forEach(function (button) {
                button.innerHTML = button.innerHTML.slice(0, 3) + 'h' + button.innerHTML.slice(3);
                button.id = button.id + 'h';
            });
        }
        else {
            btnhyp.classList.remove('btn-primary');
            btnhyp.classList.add('btn-light');
            f_hyp = false;
            trigo_btns.forEach(function (button) {
                button.innerHTML = button.innerHTML.slice(0, 3) + button.innerHTML.slice(4);
                button.id = button.id.slice(0, button.id.length - 1);
            });
        }
    }
    else if (trigoFunctionsSet.has(ebtn.id)) {
        // console.log(e.target.id);
        var functionName = ebtn.id;
        var inputValue = Number(input_area_g.value);
        if (!isNaN(inputValue)) { // Check if the input is a valid number
            // Call the corresponding function from TrigoFunctions
            var trigoInstance = new TrigoFunctions(); // Create an instance
            var func = trigoInstance[functionName];
            if (typeof func === "function") {
                var ans = func(inputValue, scale);
                // Handle special cases like Infinity
                if (!isFinite(ans)) {
                    ShowError();
                    return;
                }
                // Display the result
                input_area_g.value = ans.toString();
                f_equal = true;
            }
            else {
                console.error("Function ".concat(functionName, " not found"));
            }
        }
        else {
            ShowError(); // Show error if input is not a number
        }
    }
}
function funcDrop(e) {
    if (e.target instanceof HTMLElement && e.target.closest("#modulo")) {
        if (Number(input_area_g.value) < 0) {
            input_area_g.value = (Number(input_area_g.value) * -1).toString();
        }
    }
    else if (e.target instanceof HTMLElement && e.target.closest("#floor")) {
        if (!isNaN(Number(input_area_g.value))) {
            input_area_g.value = (Math.floor(Number(input_area_g.value))).toString();
        }
        else {
            ShowError();
        }
    }
    else if (e.target instanceof HTMLElement && e.target.closest("#ceil")) {
        if (!isNaN(Number(input_area_g.value))) {
            input_area_g.value = (Math.ceil(Number(input_area_g.value))).toString();
        }
        else {
            ShowError();
        }
    }
    else if (e.target instanceof HTMLElement && e.target.closest("#rand")) {
        input_area_g.value = (Math.random()).toString();
    }
}
