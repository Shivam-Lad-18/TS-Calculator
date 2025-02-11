
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
var f_logxy = false;
var f_yrootx = false;
var f_t2nd = false;
var f_hyp = false;
var f_logxy = false;
var f_fe = false;

var scale = 'degree';
var sp_count = 0;
// var current_memory = 0;

keys.addEventListener('click', buttonpress);
trigo_drop.addEventListener('click', trigoDrop);
func_drop.addEventListener('click', funcDrop);
memory_btns.addEventListener('click', memoryBtn);

class TrigoFunctions {
    // Method to convert degrees to radians
    static toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    // Method to convert gradians to radians
    static toRadiansFromGrad(grad) {
        return grad * (Math.PI / 200);
    }

    // Method to convert radians to degrees
    static toDegrees(radians) {
        return radians * (180 / Math.PI);
    }

    // Method to convert radians to gradians
    static toGrad(radians) {
        return radians * (200 / Math.PI);
    }

    // Method to normalize angle based on scale
    static normalizeAngle(angle, scale) {
        switch (scale) {
            case 'degree':
                return this.toRadians(angle);
            case 'grad':
                return this.toRadiansFromGrad(angle);
            case 'rad':
            default:
                return angle;
        }
    }

    // Sine function
    static sin(angle, scale = 'rad') {
        const rad = this.normalizeAngle(angle, scale);
        return Math.sin(rad);
    }

    // Arc Sine function
    static asin(value, scale = 'rad') {
        const result = Math.asin(value);
        return scale === 'degree' ? this.toDegrees(result) : scale === 'grad' ? this.toGrad(result) : result;
    }

    // Hyperbolic Sine function
    static sinh(angle, scale = 'rad') {
        const rad = this.normalizeAngle(angle, scale);
        return Math.sinh(rad);
    }

    // Inverse Hyperbolic Sine function
    static asinh(value) {
        return Math.asinh(value);
    }

    // Cosine function
    static cos(angle, scale = 'rad') {
        const rad = this.normalizeAngle(angle, scale);
        return Math.cos(rad);
    }

    // Arc Cosine function
    static acos(value, scale = 'rad') {
        const result = Math.acos(value);
        return scale === 'degree' ? this.toDegrees(result) : scale === 'grad' ? this.toGrad(result) : result;
    }

    // Hyperbolic Cosine function
    static cosh(angle, scale = 'rad') {
        const rad = this.normalizeAngle(angle, scale);
        return Math.cosh(rad);
    }

    // Inverse Hyperbolic Cosine function
    static acosh(value) {
        return Math.acosh(value);
    }

    // Tangent function
    static tan(angle, scale = 'rad') {
        const rad = this.normalizeAngle(angle, scale);
        return Math.tan(rad);
    }

    // Arc Tangent function
    static atan(value, scale = 'rad') {
        const result = Math.atan(value);
        return scale === 'degree' ? this.toDegrees(result) : scale === 'grad' ? this.toGrad(result) : result;
    }

    // Hyperbolic Tangent function
    static tanh(angle, scale = 'rad') {
        const rad = this.normalizeAngle(angle, scale);
        return Math.tanh(rad);
    }

    // Inverse Hyperbolic Tangent function
    static atanh(value) {
        return Math.atanh(value);
    }

    // Secant function
    static sec(angle, scale = 'rad') {
        const rad = this.normalizeAngle(angle, scale);
        return 1 / Math.cos(rad);
    }

    // Cosecant function
    static csc(angle, scale = 'rad') {
        const rad = this.normalizeAngle(angle, scale);
        return 1 / Math.sin(rad);
    }

    // Cotangent function
    static cot(angle, scale = 'rad') {
        const rad = this.normalizeAngle(angle, scale);
        return 1 / Math.tan(rad);
    }
}
function memoryBtn(e) {
    let firstChild = document.querySelector("#memory_div div:first-child h3");

    if (e.target.closest("#memory_mc")) {
        localStorage.clear();
        // current_memory=0;
        getMemory();
        syncHistoryAndMemory();
    } else if (e.target.closest("#memory_mr")) {
        input_area_g.value = firstChild.innerText;
    } else if (e.target.closest("#memory_ma")) {
        console.log(Number(firstChild.innerText) + Number(input_area_g.value));
        firstChild.innerHTML = Number(firstChild.innerText) + Number(input_area_g.value);
        localStorage.setItem(firstChild.id, firstChild.innerHTML);
        getMemory();
        syncHistoryAndMemory();
    } else if (e.target.closest("#memory_mre")) {
        firstChild.innerHTML = Number(firstChild.innerText) - Number(input_area_g.value);
        localStorage.setItem(firstChild.id, firstChild.innerHTML);
        getMemory();
        syncHistoryAndMemory();
    } else if (e.target.closest("#memory_ms")) {

        if ((!isNaN(input_area_g.value)) && input_area_g.value != '') {
            localStorage.setItem(Date.now(), input_area_g.value);
        }else{
            localStorage.setItem(Date.now(), input_area_g.value);
        }
        getMemory();
        syncHistoryAndMemory();
    }
    // console.log(current_memory);
}
const operators = new Set(["+", "-", "/", "*", "%", "**"]);

const trigoFunctionsSet = new Set([
    'sin', 'cos', 'tan', 'sec', 'csc', 'cot', // Basic trigonometric functions
    'asin', 'acos', 'atan', 'asec', 'acsc', 'acot', // Inverse trigonometric functions
    'sinh', 'cosh', 'tanh', 'sech', 'csch', 'coth', // Hyperbolic functions
    'asinh', 'acosh', 'atanh', 'asech', 'acsch', 'acoth' // Inverse hyperbolic functions
]);
function syncHistoryAndMemory() {
    // Sync History
    const historyDiv = document.getElementById('history_div');
    const historyDivOffcanvas = document.getElementById('history_offcanvas');
    if (historyDiv && historyDivOffcanvas) {
        historyDivOffcanvas.innerHTML = historyDiv.innerHTML;
    }
    // Sync Memory
    const memoryDiv = document.getElementById('memory_div');
    const memoryDivOffcanvas = document.getElementById('memory_offcanvas');
    if (memoryDiv && memoryDivOffcanvas) {
        memoryDivOffcanvas.innerHTML = memoryDiv.innerHTML;
    }
}

// Sync content when the offcanvas is shown
document.getElementById('historyOffcanvas').addEventListener('show.bs.offcanvas', syncHistoryAndMemory);
function setActive(clickedButton, button) {
    if (button == 'history') {
        history_div.style.display = 'block';
        memory_div.style.display = 'none';
        document.querySelectorAll(".hist").forEach(button => button.classList.add("active"));
        document.querySelectorAll(".memo").forEach(button => button.classList.remove("active"));
    } else {
        history_div.style.display = 'none';
        memory_div.style.display = 'block';
        document.querySelectorAll(".memo").forEach(button => button.classList.add("active"));
        document.querySelectorAll(".hist").forEach(button => button.classList.remove("active"));
    }
    // Remove 'active' class from all buttons
    // document.querySelectorAll(".nav-link").forEach(button => button.classList.remove("active"));
    // clickedButton.classList.add("active");

    if (button === 'history_offcanvas') {
        document.getElementById('history_offcanvas').style.display = 'block';
        document.getElementById('memory_offcanvas').style.display = 'none';
        document.querySelectorAll(".hist").forEach(button => button.classList.add("active"));
        document.querySelectorAll(".memo").forEach(button => button.classList.remove("active"));
    } else if (button === 'memory_offcanvas') {
        document.getElementById('history_offcanvas').style.display = 'none';
        document.getElementById('memory_offcanvas').style.display = 'block';
        document.querySelectorAll(".memo").forEach(button => button.classList.add("active"));
        document.querySelectorAll(".hist").forEach(button => button.classList.remove("active"));
    }
    // Sync content
    syncHistoryAndMemory();

}
function toggleActiveClass(checkbox) {
    const navLink = checkbox.closest('.nav-link');
    if (checkbox.checked) {
        navLink.classList.add('active');
        f_fe=true;
    } else {
        navLink.classList.remove('active');
        f_fe=false;
    }
}
function logB(number, base) {
    return Math.log(Number(number)) / Math.log(Number(base));
}
function YrootX(y, x) {
    return Math.pow( Number(x), (1 / Number(y)));
}
function toggleText(button) {
    const currentText = button.innerText;

    if (currentText === "DEG") {
        button.innerText = "GRAD";  // Change to Grad
        scale = "grad";
    } else if (currentText === "GRAD") {
        button.innerText = "RAD";  // Change to Rad
        scale = "rad";
    } else {
        button.innerText = "DEG"; // Change back to Degree
        scale = "degree";
    }
    // console.log(scale);

}
function keepFocus() {
    const inputElement = document.getElementById("Input_area");

    // Keep the input focused even when clicking elsewhere
    inputElement.focus();

    // Ensure input is focused whenever the page is loaded or focus is lost
    setInterval(() => {
        inputElement.focus();
    }, 100); // Refocus every 100ms
}
function ShowError() {
    // Get the alert element
    let alertElement = document.getElementById('danger-alert');

    // Show the alert by removing the 'd-none' class
    alertElement.classList.remove('d-none');

    // Hide the alert after 5 seconds
    setTimeout(() => {
        alertElement.classList.add('d-none');
    }, 3000); // 5000 milliseconds = 5 seconds

    // Add event listener to the close button
    let closeButton = alertElement.querySelector('.btn-close');
    closeButton.addEventListener('click', () => {
        alertElement.classList.add('d-none');
    });
}
window.onload = function () {
    document.getElementById("Input_area").focus();
    var square_inv = document.getElementById("square_inv");
    var square_root_inv = document.getElementById("square_root_inv");
    var pow_inv = document.getElementById("yrootx_inv");
    var tenpow_inv = document.getElementById("tenpow_inv");
    var log_inv = document.getElementById("log_inv");
    var ln_inv = document.getElementById("ln_inv");
    var f_T2nd = false;
    var f_hyp = false;

    square_inv.style.display = "none";
    square_root_inv.style.display = "none";
    pow_inv.style.display = "none";
    tenpow_inv.style.display = "none";
    log_inv.style.display = "none";
    ln_inv.style.display = "none";

    getHistory();
    getMemory();
    
    syncHistoryAndMemory();
    setInterval(convertFe,10);
}
function convertFe(){
    // console.log("hi");
    if(!isNaN(input_area_g.value) && f_fe && input_area_g.value!=''){
        input_area_g.value=Number(input_area_g.value).toExponential();
    }
}
function deleteSession() {
    sessionStorage.clear();
    getHistory();
    syncHistoryAndMemory();
}
function getHistory() {
    history_div.innerHTML = '';
    // Collect all the keys in an array
    let keys = [];
    for (let i = 0; i < sessionStorage.length; i++) {
        let key = sessionStorage.key(i);
        if (key === 'IsThisFirstTime_Log_From_LiveServer') {
            continue; // Skip the specific key if needed
        }
        keys.push(key);
    }

    // Sort keys in descending order based on their timestamps (latest first)
    keys.sort((a, b) => b - a);

    // Now loop through the sorted keys
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        var hist_ele = JSON.parse(sessionStorage.getItem(key));

        var newele = document.createElement("div");
        newele.innerHTML = `
        <div class="d-grid text-end text-secondary my-2 border-bottom me-3" onclick="clickHistory('${hist_ele.expression}', '${hist_ele.answer}')">
            <p style="font-size:0.9rem;">${hist_ele.expression}</p>
            <h4 class="text-dark">${hist_ele.answer}</h4>
        </div>`;
        history_div.appendChild(newele);
    }

}
function getMemory() {
    memory_div.innerHTML = '';
    let keys = [];
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key === 'IsThisFirstTime_Log_From_LiveServer') {
            continue; // Skip the specific key if needed
        }
        keys.push(key);
    }

    // Sort keys in descending order based on their timestamps (latest first)
    keys.sort((a, b) => b - a);

    // Now loop through the sorted keys
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        var hist_ele = localStorage.getItem(key);

        var newele = document.createElement("div");
        newele.innerHTML = `<h3 class="mt-3 mb-0 text-end" id=${key}> ${hist_ele}</h3>
        <div class="d-flex justify-content-end gap-1 border-bottom pb-2">
        <button type="button" class="btn btn-light border"
        style="--bs-btn-padding-y: .20rem; --bs-btn-padding-x: .25rem; --bs-btn-font-size: .6rem;" onclick="localStorage.removeItem('${key}');getMemory();syncHistoryAndMemory();"> MC </button>

        <button type="button" class="btn btn-light border"
        style="--bs-btn-padding-y: .20rem; --bs-btn-padding-x: .25rem; --bs-btn-font-size: .6rem;" onclick="localStorage.setItem('${key}',
            Number(document.getElementById('${key}').innerText)+Number(document.getElementById('Input_area').value));getMemory();syncHistoryAndMemory();"> M+ </button>

       <button type="button" class="btn btn-light border"
        style="--bs-btn-padding-y: .20rem; --bs-btn-padding-x: .25rem; --bs-btn-font-size: .6rem;" onclick="localStorage.setItem('${key}',
            Number(document.getElementById('${key}').innerText)-Number(document.getElementById('Input_area').value));getMemory();syncHistoryAndMemory();"> M- </button>

        </div>
        
        `;
        memory_div.appendChild(newele);
    }
}
function clickHistory(expression, answer) {
    // Set the input values with the clicked expression and answer
    input_area_g.value = answer;
    sub_area_g.value = expression.slice(0, expression.length - 1);
}
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

function changeBtn() {
    var square = document.getElementById("square");
    var square_root = document.getElementById("square_root");
    var pow = document.getElementById("**");
    var tenpow = document.getElementById("tenpow");
    var log = document.getElementById("log");
    var ln = document.getElementById("ln");

    var square_inv = document.getElementById("square_inv");
    var square_root_inv = document.getElementById("square_root_inv");
    var pow_inv = document.getElementById("yrootx_inv");
    var tenpow_inv = document.getElementById("tenpow_inv");
    var log_inv = document.getElementById("log_inv");
    var ln_inv = document.getElementById("ln_inv");

    var chanbtn = document.getElementById("chan");
    if (!chanbool) {
        square.style.display = "none";
        square_root.style.display = "none";
        pow.style.display = "none";
        tenpow.style.display = "none";
        log.style.display = "none";
        ln.style.display = "none";

        square_inv.style.display = "block";
        square_root_inv.style.display = "block";
        pow_inv.style.display = "block";
        tenpow_inv.style.display = "block";
        log_inv.style.display = "block";
        ln_inv.style.display = "block";

        chanbool = true;
        chanbtn.classList.add('btn-primary');
        chanbtn.classList.remove('btn-light');
    } else {
        square_inv.style.display = "none";
        square_root_inv.style.display = "none";
        pow_inv.style.display = "none";
        tenpow_inv.style.display = "none";
        log_inv.style.display = "none";
        ln_inv.style.display = "none";

        square.style.display = "block";
        square_root.style.display = "block";
        pow.style.display = "block";
        tenpow.style.display = "block";
        log.style.display = "block";
        ln.style.display = "block";

        chanbool = false;
        chanbtn.classList.add('btn-light');
        chanbtn.classList.remove('btn-primary');

    }
}
function buttonpress(e) {
    let val = e.target.id.trim(); // Get clicked element's ID
    // console.log(typeof val, val);
    if (val === "b_space" || val === "b_space_cont") {
        // console.log("Backspace clicked");
        if (input_area_g.value.length > 0) {
            input_area_g.value = input_area_g.value.slice(0, -1); // Remove last character
        }
    }
    else if (e.target.closest("#chan")) {
        changeBtn();
    }
    else if (val === "change_sign") {
        input_area_g.value = Number(input_area_g.value) * -1;
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
            var opp = sub_area_g.value.at(sub_area_g.value.length - 1);
            // console.log(opp);

            if (opp == "+") {
                sub_area_g.value = sub_area_g.value.slice(0, sub_area_g.value.length - 1) +
                    '-' + Math.abs(input_area_g.value) + val;
            }
            else if (opp == '-') {
                sub_area_g.value = sub_area_g.value.slice(0, sub_area_g.value.length - 1) +
                    '+' + Math.abs(input_area_g.value) + val;
            } else {
                sub_area_g.value += input_area_g.value + val;
            }
        } else {
            sub_area_g.value += input_area_g.value + val;
        }
        f_equal = true;
        // input_area_g.value='';
    }
    else if (val === 'pi') {
        input_area_g.value = Math.PI;
    }
    else if (val === 'e') {
        input_area_g.value = Math.E;
    }
    else if (val === "clear") {
        if (input_area_g.value != '') {
            input_area_g.value = '';
        } else {
            sub_area_g.value = '';
            sp_count = 0;
            count_badge.innerText = sp_count;
        }
    }
    else if (val === "fact") {
        if (input_area_g.value === '') {
            input_area_g.value = 1;
        } else {
            console.log(Number(input_area_g.value));
            input_area_g.value = factorial(Number(input_area_g.value));
        }
    }
    else if (val === "=") {
        var exp;
        if (Number(input_area_g.value) < 0) {
            var opp = sub_area_g.value.at(sub_area_g.value.length - 1);
            // console.log(opp);
            if (opp == "+") {
                exp = sub_area_g.value.slice(0, sub_area_g.value.length - 1) +
                    '-' + Math.abs(input_area_g.value);
            } else if (opp == '-') {
                exp = sub_area_g.value.slice(0, sub_area_g.value.length - 1) +
                    '+' + Math.abs(input_area_g.value);
            }
            else {
                exp = sub_area_g.value + input_area_g.value;
            }
        } else {
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
        var ans;
        if (input_area_g.value === '') {
            try {
                ans = eval(exp.substr(0, exp.length - 1));
            } catch {
                ShowError();
                sub_area_g.value = '';
                input_area_g.value = '';
                return;
            }
        }
        else {
            try {
                ans = eval(exp);
            } catch {
                ShowError();
                sub_area_g.value = '';
                input_area_g.value = '';
                return;
            }
        }
        // if
        // console.log(ans);
        var session_obj;
        if (sub_area_g.value != '') {
            session_obj = {
                expression: exp + '=',
                answer: ans,
            };
            
        }
        console.log(typeof ans);
        if(ans =='Infinity'){
            input_area_g.value='';
            sub_area_g.value='';
            ShowError();
        }
        else{
            sessionStorage.setItem(Date.now(), JSON.stringify(session_obj));
            getHistory();
            syncHistoryAndMemory();
            input_area_g.value = ans;
            sub_area_g.value = '';
        }
        f_equal = true;
    }
    else if (e.target.closest("#abs")) {
        // console.log("fj");
        if (input_area_g.value < 0) {
            input_area_g.value *= -1;
        }
    }
    else if (e.target.closest("#inverse")) {
        if (input_area_g.value === '') {
            console.log("fff");
            ShowError();
        } else {
            input_area_g.value = Math.pow(Number(input_area_g.value), -1);
        }
    }
    else if (e.target.closest("#square")) {
        if (input_area_g.value != '') {
            input_area_g.value = Math.pow(Number(input_area_g.value), 2);
        }
    }
    else if (e.target.closest("#square_inv")) {
        if (input_area_g.value != '') {
            input_area_g.value = Math.pow(Number(input_area_g.value), 3);
        }
    }
    else if (e.target.closest("#square_root")) {
        if (input_area_g.value != '') {
            input_area_g.value = Math.sqrt(Number(input_area_g.value));
        }
    }
    else if (e.target.closest("#square_root_inv")) {
        if (input_area_g.value != '') {
            input_area_g.value = Math.cbrt(Number(input_area_g.value));
        }
    }
    else if (e.target.closest("#tenpow")) {
        if (input_area_g.value != '') {
            input_area_g.value = Math.pow(10, Number(input_area_g.value));
        } else {
            input_area_g.value = 1;
        }
    }
    else if (e.target.closest("#tenpow_inv")) {
        if (input_area_g.value != '') {
            input_area_g.value = Math.pow(2, Number(input_area_g.value));
        } else {
            input_area_g.value = 1;
        }
    }
    else if (e.target.closest("#log")) {
        if (input_area_g.value != '') {
            input_area_g.value = Math.log10(Number(input_area_g.value));
        } else {
            ShowError();
        }
    }
    else if (e.target.closest("#log_inv")) {
        // console.log("log _inv");
        if(input_area_g.value===''){
            return;
        }else
        sub_area_g.value += `logB(${input_area_g.value},`;
        f_logxy = true;
        f_equal = true;
    }
    else if (e.target.closest("#yrootx_inv")) {
        // console.log("**");
        if(input_area_g.value===''){
            return;
        }else
        sub_area_g.value += `YrootX(${input_area_g.value},`;
        f_yrootx = true;
        f_equal = true;
    }
    else if (e.target.closest("#ln")) {
        if (input_area_g.value != '') {
            input_area_g.value = Math.log(Number(input_area_g.value));
        } else {
            ShowError();
        }
    }
    else if (e.target.closest("#ln_inv")) {
        if (input_area_g.value != '') {
            input_area_g.value = Math.exp(Number(input_area_g.value));
        } else {
            input_area_g.value = 1;
        }
    }
    else if (e.target.closest("#exp")) {
        input_area_g.value += '.e+0';
        f_exp = true;
    }
    else if (e.target.closest("#start_p")) {
        // console.log("Sp");
        sp_count++;
        count_badge.innerHTML = sp_count;
        if (sub_area_g.value === '' && input_area_g.value === '')
            sub_area_g.value += input_area_g.value + "(";
        else if (sub_area_g.value === '') {
            sub_area_g.value += input_area_g.value + "*(";
        }
        else {
            sub_area_g.value += "(";
        }
    }
    else if (e.target.closest("#end_p")) {
        // console.log("Ep");
        if (sp_count == 0) return;
        sp_count--;
        count_badge.innerHTML = sp_count;
        if (sub_area_g.value.at(sub_area_g.value.length - 1) === '(' && input_area_g.value === '')
            sub_area_g.value += input_area_g.value + "0)*";
        else if (sub_area_g.value.at(sub_area_g.value.length - 1) == '(') {
            sub_area_g.value += input_area_g.value + ")*";
        }
        else {
            sub_area_g.value += ")";
        }
    }
    else if (val === ".") {
        if (input_area_g.value.at(input_area_g.value.length - 1) == '.') {
            return;
        }
        if (input_area_g.value === '') {
            input_area_g.value = 0.;
        }
        if (!input_area_g.value.includes('.')) {
            f_equal = false;
            input_area_g.value += val;
        }
    }
    else if (!isNaN(val) && val !== "") { // Check if val is a valid number
        val = Number(val);

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
    var btn2nd = document.getElementById("trig2nd");
    var btnhyp = document.getElementById("hyp");

    let btn_id = e.target.id.trim();
    if (e.target.closest("#trig2nd")) {
        if (!f_t2nd) {
            btn2nd.classList.add('btn-primary');
            btn2nd.classList.remove('btn-light');
            f_t2nd = true;
            trigo_btns.forEach(button => {
                button.innerHTML = button.innerHTML + `<sup>-1</sup>`;
                button.id = 'a' + button.id;
            })
        }
        else {
            btn2nd.classList.remove('btn-primary');
            btn2nd.classList.add('btn-light');
            f_t2nd = false;
            trigo_btns.forEach(button => {
                button.innerHTML = button.innerHTML.replace(/<sup>-1<\/sup>/g, "");
                button.id = button.id.slice(1);
            })
        }
    } else if (e.target.closest("#hyp")) {
        if (!f_hyp) {
            btnhyp.classList.add('btn-primary');
            btnhyp.classList.remove('btn-light');
            f_hyp = true;
            trigo_btns.forEach(button => {
                button.innerHTML = button.innerHTML.slice(0, 3) + 'h' + button.innerHTML.slice(3);
                button.id = button.id + 'h';
            });
        }
        else {
            btnhyp.classList.remove('btn-primary');
            btnhyp.classList.add('btn-light');
            f_hyp = false;
            trigo_btns.forEach(button => {
                button.innerHTML = button.innerHTML.slice(0, 3) + button.innerHTML.slice(4);
                button.id = button.id.slice(0, button.id.length - 1);

            });
        }
    } else if (trigoFunctionsSet.has(e.target.id)) {
        // console.log(e.target.id);
        const functionName = e.target.id;
        const inputValue = Number(input_area_g.value);
        if (!isNaN(inputValue)) { // Check if the input is a valid number
            // Call the corresponding function from TrigoFunctions
            const ans = TrigoFunctions[functionName](inputValue, scale);
            // Handle special cases like Infinity
            if (!isFinite(ans)) {
                ShowError();
                return;
            }
            // Display the result
            input_area_g.value = ans;
            f_equal = true;
        } else {
            ShowError(); // Show error if input is not a number
        }
    }
}
function funcDrop(e) {
    if (e.target.closest("#modulo")) {
        if (input_area_g.value < 0) {
            input_area_g.value *= -1;
        }
    } else if (e.target.closest("#floor")) {
        if (!isNaN(Number(input_area_g.value))) {
            input_area_g.value = Math.floor(Number(input_area_g.value));
        } else {
            ShowError();
        }
    }
    else if (e.target.closest("#ceil")) {
        if (!isNaN(Number(input_area_g.value))) {
            input_area_g.value = Math.ceil(Number(input_area_g.value));
        } else {
            ShowError();
        }
    }
    else if (e.target.closest("#rand")) {
        input_area_g.value = Math.random();
    }
}

