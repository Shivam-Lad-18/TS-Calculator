
let input_area_g = document.getElementById("Input_area") as HTMLInputElement;
let sub_area_g = document.getElementById("sub_input") as HTMLInputElement;
let keys = document.getElementById("keys") as HTMLDivElement;
let trigo_drop = document.getElementById("trigo_drop") as HTMLDivElement;
let func_drop = document.getElementById("func_drop") as HTMLDivElement;
let trigo_btns: NodeListOf<HTMLElement> = document.querySelectorAll(".t-func");
let count_badge = document.getElementById("count_badge") as HTMLInputElement;
let history_div = document.getElementById("history_div") as HTMLInputElement;
let memory_div = document.getElementById("memory_div") as HTMLInputElement;
let memory_btns = document.getElementById("memory_btns") as HTMLInputElement;

let chanbool: boolean = false;
let f_exp: boolean = false;
let f_equal: boolean = false;
let f_yrootx: boolean = false;
let f_t2nd: boolean = false;
let f_hyp: boolean = false;
let f_logxy: boolean = false;
let f_fe: boolean = false;

let scale: 'degree' | 'grad' | 'rad' = 'degree';
let sp_count: number = 0;
// let current_memory = 0;

keys.addEventListener('click', buttonpress);
trigo_drop.addEventListener('click', trigoDrop);
func_drop.addEventListener('click', funcDrop);
memory_btns.addEventListener('click', memoryBtn);

class TrigoFunctions {
    // Method to convert degrees to radians
    static toRadians(degrees: number): number {
        return degrees * (Math.PI / 180);
    }

    // Method to convert gradians to radians
    static toRadiansFromGrad(grad: number): number {
        return grad * (Math.PI / 200);
    }

    // Method to convert radians to degrees
    static toDegrees(radians: number): number {
        return radians * (180 / Math.PI);
    }

    // Method to convert radians to gradians
    static toGrad(radians: number): number {
        return radians * (200 / Math.PI);
    }

    // Method to normalize angle based on scale
    static normalizeAngle(angle: number, scale: 'degree' | 'grad' | 'rad'): number {
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
    static sin(angle: number, scale: 'degree' | 'grad' | 'rad' = 'rad'): number {
        const rad = this.normalizeAngle(angle, scale);
        return Math.sin(rad);
    }

    // Arc Sine function
    static asin(value: number, scale: 'degree' | 'grad' | 'rad' = 'rad'): number {
        const result = Math.asin(value);
        return scale === 'degree' ? this.toDegrees(result) : scale === 'grad' ? this.toGrad(result) : result;
    }

    // Hyperbolic Sine function
    static sinh(angle: number, scale: 'degree' | 'grad' | 'rad' = 'rad'): number {
        const rad = this.normalizeAngle(angle, scale);
        return Math.sinh(rad);
    }

    // Inverse Hyperbolic Sine function
    static asinh(value: number): number {
        return Math.asinh(value);
    }

    // Cosine function
    static cos(angle: number, scale: 'degree' | 'grad' | 'rad' = 'rad'): number {
        const rad = this.normalizeAngle(angle, scale);
        return Math.cos(rad);
    }

    // Arc Cosine function
    static acos(value: number, scale: 'degree' | 'grad' | 'rad' = 'rad'): number {
        const result = Math.acos(value);
        return scale === 'degree' ? this.toDegrees(result) : scale === 'grad' ? this.toGrad(result) : result;
    }

    // Hyperbolic Cosine function
    static cosh(angle: number, scale: 'degree' | 'grad' | 'rad' = 'rad'): number {
        const rad = this.normalizeAngle(angle, scale);
        return Math.cosh(rad);
    }

    // Inverse Hyperbolic Cosine function
    static acosh(value: number): number {
        return Math.acosh(value);
    }

    // Tangent function
    static tan(angle: number, scale: 'degree' | 'grad' | 'rad' = 'rad'): number {
        const rad = this.normalizeAngle(angle, scale);
        return Math.tan(rad);
    }

    // Arc Tangent function
    static atan(value: number, scale: 'degree' | 'grad' | 'rad' = 'rad'): number {
        const result = Math.atan(value);
        return scale === 'degree' ? this.toDegrees(result) : scale === 'grad' ? this.toGrad(result) : result;
    }

    // Hyperbolic Tangent function
    static tanh(angle: number, scale: 'degree' | 'grad' | 'rad' = 'rad'): number {
        const rad = this.normalizeAngle(angle, scale);
        return Math.tanh(rad);
    }

    // Inverse Hyperbolic Tangent function
    static atanh(value: number): number {
        return Math.atanh(value);
    }

    // Secant function
    static sec(angle: number, scale: 'degree' | 'grad' | 'rad' = 'rad'): number {
        const rad = this.normalizeAngle(angle, scale);
        return 1 / Math.cos(rad);
    }

    // Cosecant function
    static csc(angle: number, scale: 'degree' | 'grad' | 'rad' = 'rad'): number {
        const rad = this.normalizeAngle(angle, scale);
        return 1 / Math.sin(rad);
    }

    // Cotangent function
    static cot(angle: number, scale: 'degree' | 'grad' | 'rad' = 'rad'): number {
        const rad = this.normalizeAngle(angle, scale);
        return 1 / Math.tan(rad);
    }
}

function memoryBtn(e: MouseEvent) {
    let firstChild = document.querySelector("#memory_div div:first-child h3") as HTMLHeadingElement;

    if (e.target instanceof HTMLElement && e.target.closest("#memory_mc")) {
        localStorage.clear();
        // current_memory=0;
        getMemory();
        syncHistoryAndMemory();
    } else if (e.target instanceof HTMLElement && e.target.closest("#memory_mr")) {
        input_area_g.value = firstChild.innerText;
    } else if (e.target instanceof HTMLElement && e.target.closest("#memory_ma")) {
        console.log(Number(firstChild.innerText) + Number(input_area_g.value));
        firstChild.innerHTML = (Number(firstChild.innerText) + Number(input_area_g.value)).toString();
        localStorage.setItem(firstChild.id, firstChild.innerHTML);
        getMemory();
        syncHistoryAndMemory();
    } else if (e.target instanceof HTMLElement && e.target.closest("#memory_mre")) {
        firstChild.innerHTML = (Number(firstChild.innerText) - Number(input_area_g.value)).toString();
        localStorage.setItem(firstChild.id, firstChild.innerHTML);
        getMemory();
        syncHistoryAndMemory();
    } else if (e.target instanceof HTMLElement && e.target.closest("#memory_ms")) {

        if (input_area_g && !isNaN(Number(input_area_g.value)) && input_area_g.value !== '') {
            localStorage.setItem((Date.now()).toString(), input_area_g.value);
        } else {
            localStorage.setItem((Date.now()).toString(), input_area_g.value);
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
const historyOffcanvas = document.getElementById('historyOffcanvas') as HTMLElement;

if (historyOffcanvas) {
    historyOffcanvas.addEventListener('show.bs.offcanvas', syncHistoryAndMemory);
}

function setActive(clickedButton: HTMLButtonElement, button: string) {
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

    const historyOffcanvas = document.getElementById('history_offcanvas') as HTMLElement | null;
    const memoryOffcanvas = document.getElementById('memory_offcanvas') as HTMLElement | null;

    if (historyOffcanvas && memoryOffcanvas) {
        if (button === 'history_offcanvas') {
            historyOffcanvas.style.display = 'block';
            memoryOffcanvas.style.display = 'none';

            // Separate loop for .hist buttons
            const histButtons: NodeListOf<HTMLElement> = document.querySelectorAll(".hist");
            histButtons.forEach((button: HTMLElement) => {
                button.classList.add("active");
            });

            // Separate loop for .memo buttons
            const memoButtons: NodeListOf<HTMLElement> = document.querySelectorAll(".memo");
            memoButtons.forEach((button: HTMLElement) => {
                button.classList.remove("active");
            });
        } else if (button === 'memory_offcanvas') {
            historyOffcanvas.style.display = 'none';
            memoryOffcanvas.style.display = 'block';

            // Separate loop for .memo buttons
            const memoButtons: NodeListOf<HTMLElement> = document.querySelectorAll(".memo");
            memoButtons.forEach((button: HTMLElement) => {
                button.classList.add("active");
            });

            // Separate loop for .hist buttons
            const histButtons: NodeListOf<HTMLElement> = document.querySelectorAll(".hist");
            histButtons.forEach((button: HTMLElement) => {
                button.classList.remove("active");
            });
        }
    }


    // Sync content
    syncHistoryAndMemory();

}
function toggleActiveClass(checkbox: HTMLInputElement) {
    const navLink = checkbox.closest('.nav-link') as HTMLAnchorElement;
    if (checkbox.checked) {
        navLink.classList.add('active');
        f_fe = true;
    } else {
        navLink.classList.remove('active');
        f_fe = false;
    }
}
function logB(number: number, base: number) {
    return Math.log(Number(number)) / Math.log(Number(base));
}
function YrootX(y: number, x: number) {
    return Math.pow(Number(x), (1 / Number(y)));
}
function toggleText(button: HTMLButtonElement) {
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
    const inputElement = document.getElementById("Input_area") as HTMLInputElement;

    // Keep the input focused even when clicking elsewhere
    inputElement.focus();

    // Ensure input is focused whenever the page is loaded or focus is lost
    setInterval(() => {
        inputElement.focus();
    }, 100); // Refocus every 100ms
}
function ShowError() {
    // Get the alert element
    let alertElement = document.getElementById('danger-alert') as HTMLDivElement;

    // Show the alert by removing the 'd-none' class
    alertElement.classList.remove('d-none');

    // Hide the alert after 5 seconds
    setTimeout(() => {
        alertElement.classList.add('d-none');
    }, 3000); // 5000 milliseconds = 5 seconds

    // Add event listener to the close button
    let closeButton = alertElement.querySelector('.btn-close') as HTMLButtonElement;
    closeButton.addEventListener('click', () => {
        alertElement.classList.add('d-none');
    });
}
window.onload = function () {
    // document.getElementById("Input_area").focus();
    var toggle_button: NodeListOf<HTMLElement> = document.querySelectorAll('.toggle_button');

    let f_T2nd = false;
    let f_hyp = false;

    toggle_button.forEach((button) => {
        // Adding an event listener to each button
        button.style.display = "none";
    });
    getHistory();
    getMemory();

    syncHistoryAndMemory();
    setInterval(convertFe, 10);
}
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
interface HistoryElement {
    expression: string;
    answer: string;
}
function getHistory() {
    history_div.innerHTML = '';
    // Collect all the keys in an array
    let keys: number[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
        let key = sessionStorage.key(i);
        if (key === 'IsThisFirstTime_Log_From_LiveServer') {
            continue; // Skip the specific key if needed
        }
        keys.push(Number(key));
    }

    // Sort keys in descending order based on their timestamps (latest first)
    keys.sort((a: number, b: number) => b - a);

    // Now loop through the sorted keys
    for (let i = 0; i < keys.length; i++) {
        let key: number = keys[i]; // Assuming keys is an array of numbers
    
        const storedValue: string | null = sessionStorage.getItem(key.toString()); // Get the value from sessionStorage
    
        // Check if storedValue exists before parsing
        if (storedValue) {
            // Parse the stored JSON value
            let hist_ele: HistoryElement = JSON.parse(storedValue);
    
            // Check if hist_ele is not null and has valid data
            if (hist_ele ) {
                // Create a new div element
                let newele = document.createElement("div") as HTMLDivElement;
    
                // Set innerHTML using a template string
                newele.innerHTML = `
                    <div class="d-grid text-end text-secondary my-2 border-bottom me-3">
                        <p style="font-size:0.9rem;">${hist_ele.expression}</p>
                        <h4 class="text-dark">${hist_ele.answer}</h4>
                    </div>`;
    
                // Add event listener for click event (instead of inline onclick attribute)
                newele.querySelector('div')?.addEventListener('click', () => {
                    clickHistory(hist_ele.expression, hist_ele.answer);
                });
    
                // Append the new element to the history_div
                history_div.appendChild(newele);
            }
        }
    }

}
function getMemory() {
    memory_div.innerHTML = '';
    let keys: string[] = [];
    
    // Iterate over the localStorage keys
    for (let i = 0; i < localStorage.length; i++) {
        const key : string | null  = localStorage.key(i);
        if (key === 'IsThisFirstTime_Log_From_LiveServer') {
            continue; // Skip a specific key
        }
        if(key)
        keys.push(key);
    }

    // Sort keys in descending order (latest first)
    keys.sort((a, b) => parseInt(b) - parseInt(a));


    // Now loop through the sorted keys
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let hist_ele = localStorage.getItem(key);

        let newele = document.createElement("div");
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
function clickHistory(expression : string , answer : string) {
    // Set the input values with the clicked expression and answer
    input_area_g.value = answer;
    sub_area_g.value = expression.slice(0, expression.length - 1);
}
function factorial(n : number) : number{
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

function changeBtn() {
    var initial_button: NodeListOf<HTMLElement> = document.querySelectorAll('.initial_button');
    var toggle_button: NodeListOf<HTMLElement> = document.querySelectorAll('.toggle_button');
    var chanbtn = document.getElementById("chan") as HTMLButtonElement;
    if (!chanbool ) {
        // Hide initial buttons and show toggle buttons
        initial_button.forEach((button: HTMLElement ) => {
            button.style.display = "none";
        });

        toggle_button.forEach((button: HTMLElement) => {
            button.style.display = "block";
        });

        // Change state of chanbtn and the chanbool flag
        chanbool = true;
        chanbtn.classList.add('btn-primary');
        chanbtn.classList.remove('btn-light');
    } else {
        // Show initial buttons and hide toggle buttons
        initial_button.forEach((button) => {
            button.style.display = "block";
        });

        toggle_button.forEach((button) => {
            button.style.display = "none";
        });

        // Change state of chanbtn and the chanbool flag
        chanbool = false;
        chanbtn.classList.add('btn-light');
        chanbtn.classList.remove('btn-primary');
    }
}
function buttonpress(e : MouseEvent) {
    let temp = e.target as HTMLButtonElement;
    let val : string = temp.id.trim(); // Get clicked element's ID
    // console.log(typeof val, val);
    if (val === "b_space" || val === "b_space_cont") {
        // console.log("Backspace clicked");
        if (input_area_g.value.length > 0) {
            input_area_g.value = input_area_g.value.slice(0, -1); // Remove last character
        }
    }
    else if ( e.target instanceof HTMLElement && e.target.closest("#chan")) {
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
            let opp = sub_area_g.value.charAt(sub_area_g.value.length - 1);
            // console.log(opp);

            if (opp == "+") {
                sub_area_g.value = sub_area_g.value.slice(0, sub_area_g.value.length - 1) +
                    '-' + Math.abs(Number(input_area_g.value)) + val;
            }
            else if (opp == '-') {
                sub_area_g.value = sub_area_g.value.slice(0, sub_area_g.value.length - 1) +
                    '+' + Math.abs(Number(input_area_g.value)) + val;
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
        input_area_g.value = (Math.PI).toString();
    }
    else if (val === 'e') {
        input_area_g.value = (Math.E).toString();
    }
    else if (val === "clear") {
        if (input_area_g.value != '') {
            input_area_g.value = '';
        } else {
            sub_area_g.value = '';
            sp_count = 0;
            count_badge.innerText = (sp_count).toString();
        }
    }
    else if (val === "fact") {
        if (input_area_g.value === '') {
            input_area_g.value = '1';
        } else {
            console.log(Number(input_area_g.value));
            input_area_g.value = (factorial(Number(input_area_g.value))).toString();
        }
    }
    else if (val === "=") {
        let exp;
        if (Number(input_area_g.value) < 0) {
            let opp = sub_area_g.value.charAt(sub_area_g.value.length - 1);
            // console.log(opp);
            if (opp == "+") {
                exp = sub_area_g.value.slice(0, sub_area_g.value.length - 1) +
                    '-' + Math.abs(Number(input_area_g.value));
            } else if (opp == '-') {
                exp = sub_area_g.value.slice(0, sub_area_g.value.length - 1) +
                    '+' + Math.abs(Number(input_area_g.value));
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
        let ans;
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
        let session_obj;
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
            input_area_g.value =( Number(input_area_g.value) * -1).toString();
        }
    }
    else if (e.target instanceof HTMLElement && e.target.closest("#inverse")) {
        if (input_area_g.value === '') {
            console.log("fff");
            ShowError();
        } else {
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
            input_area_g.value =(Math.pow(Number(input_area_g.value), 3)).toString();
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
        } else {
            input_area_g.value = '1';
        }
    }
    else if (e.target instanceof HTMLElement && e.target.closest("#tenpow_inv")) {
        if (input_area_g.value != '') {
            input_area_g.value = (Math.pow(2, Number(input_area_g.value))).toString();
        } else {
            input_area_g.value = '1';
        }
    }
    else if (e.target instanceof HTMLElement && e.target.closest("#log")) {
        if (input_area_g.value != '') {
            input_area_g.value =( Math.log10(Number(input_area_g.value))).toString();
        } else {
            ShowError();
        }
    }
    else if (e.target instanceof HTMLElement && e.target.closest("#log_inv")) {
        // console.log("log _inv");
        if (input_area_g.value === '') {
            return;
        } else
            sub_area_g.value += `logB(${input_area_g.value},`;
        f_logxy = true;
        f_equal = true;
    }
    else if (e.target instanceof HTMLElement && e.target.closest("#yrootx_inv")) {
        // console.log("**");
        if (input_area_g.value === '') {
            return;
        } else
            sub_area_g.value += `YrootX(${input_area_g.value},`;
        f_yrootx = true;
        f_equal = true;
    }
    else if (e.target instanceof HTMLElement && e.target.closest("#ln")) {
        if (input_area_g.value != '') {
            input_area_g.value = (Math.log(Number(input_area_g.value))).toString();
        } else {
            ShowError();
        }
    }
    else if (e.target instanceof HTMLElement && e.target.closest("#ln_inv")) {
        if (input_area_g.value != '') {
            input_area_g.value = (Math.exp(Number(input_area_g.value))).toString();
        } else {
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
        if (sp_count == 0) return;
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

function trigoDrop(e : MouseEvent) {
    let ebtn = e.target as HTMLButtonElement;
    let btn2nd = document.getElementById("trig2nd") as HTMLButtonElement;
    let btnhyp = document.getElementById("hyp") as HTMLButtonElement;
    let temp = e.target as HTMLButtonElement;
    let btn_id = temp.id.trim();
    if (e.target instanceof HTMLElement && e.target.closest("#trig2nd")) {
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
    } else if (e.target instanceof HTMLElement && e.target.closest("#hyp")) {
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
    } else if (trigoFunctionsSet.has(ebtn.id)) {
        // console.log(e.target.id);
        const functionName: keyof typeof TrigoFunctions = ebtn.id as keyof typeof TrigoFunctions;
        const inputValue = Number(input_area_g.value);
        if (!isNaN(inputValue)) { // Check if the input is a valid number
            // Call the corresponding function from TrigoFunctions
            const func = TrigoFunctions[functionName] as (angle: number, scale: 'degree' | 'grad' | 'rad') => number;
            const ans = func(inputValue, scale);
            // Handle special cases like Infinity
            if (!isFinite(ans)) {
                ShowError();
                return;
            }
            // Display the result
            input_area_g.value = (ans).toString();
            f_equal = true;
        } else {
            ShowError(); // Show error if input is not a number
        }
    }
}
function funcDrop(e : MouseEvent) {
    if (e.target instanceof HTMLElement && e.target.closest("#modulo")) {
        if (Number(input_area_g.value) < 0) {
            input_area_g.value = (Number(input_area_g.value) *-1).toString();
        }
    } else if (e.target instanceof HTMLElement && e.target.closest("#floor")) {
        if (!isNaN(Number(input_area_g.value))) {
            input_area_g.value = (Math.floor(Number(input_area_g.value))).toString();
        } else {
            ShowError();
        }
    }
    else if (e.target instanceof HTMLElement && e.target.closest("#ceil")) {
        if (!isNaN(Number(input_area_g.value))) {
            input_area_g.value = (Math.ceil(Number(input_area_g.value))).toString();
        } else {
            ShowError();
        }
    }
    else if (e.target instanceof HTMLElement && e.target.closest("#rand")) {
        input_area_g.value = (Math.random()).toString();
    }
}

