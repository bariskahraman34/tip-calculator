const billInput = document.querySelector('#bill-input');
const customDiscount = document.querySelector('#custom-discount');
const numberOfPeopleInput = document.querySelector('#number-of-people-input');
const discountBtns = document.querySelectorAll('.discount-btn');
const resetBtn = document.querySelector('.reset-btn');
const tipAmount = document.querySelector('#tip-amount-result');
const total = document.querySelector('#total-result');


let totalTip = 0;
let calcPeopleAgain = 0;
let discountRate = 0;

for (const discount of discountBtns) {
    discount.addEventListener('click', e => selectTip(e));
}

customDiscount.addEventListener('input',e => addCustomDiscount(e))

billInput.addEventListener('input' , e => billInputResult(e))

numberOfPeopleInput.addEventListener('input' , e => numberOfPeople(e))

resetBtn.addEventListener('click',resetBoard)

function handleResetBtn(){
    if(total.textContent != "$0.00" && total.textContent != "Error"){
        resetBtn.classList.add('active');
        resetBtn.classList.remove('not-active');
    }else{
        resetBtn.classList.add('not-active');
        resetBtn.classList.remove('active');
    }
}

function numberOfPeople(e){
    calcPeopleAgain = e.target.value;
    totalTip = ((billInput.value * discountRate)/100)
    if(e.target.value === "0"){
        document.querySelectorAll('.input-container')[1].style.border = "2px solid #E17052";
        let notZero = `<span class="zero">Can't be zero</span>`
        document.querySelector('.number-of-people-container h3').insertAdjacentHTML('afterend',notZero) 
        return
    }else{
        document.querySelectorAll('.input-container')[1].style.border = "2px solid #26C2AE";
        document.querySelector('.zero').innerHTML = "";
        
    }
    if(totalTip > 0){
        total.textContent = `$${((billInput.value / calcPeopleAgain) + totalTip/calcPeopleAgain)}`;
        tipAmount.textContent = `$${totalTip/calcPeopleAgain}`;
    }else if(billInput.value > 0 && totalTip <= 0){
        total.textContent = `$${billInput.value / calcPeopleAgain}`;
        tipAmount.textContent = `$0.00`;
    }
    if(calcPeopleAgain == ""){
        total.textContent = "$0.00"
        tipAmount.textContent = "$0.00"
    }
    handleResetBtn()
}

function billInputResult(e){
    if(!isNaN(e.target.value) && numberOfPeopleInput.value > 0 && calcPeopleAgain > 0){
        if(totalTip > 0){
            totalTip = eval(((e.target.value * discountRate)/100)/calcPeopleAgain)
            total.textContent = `$${((e.target.value / calcPeopleAgain) + totalTip)}`;
            tipAmount.textContent = totalTip;
        }else if(calcPeopleAgain > 0){
            total.textContent = `$${e.target.value / calcPeopleAgain}`;
        }
        handleResetBtn()
    }
    return
}

function selectTip(e){
    e.preventDefault();
    if(numberOfPeopleInput.value > 0 && !isNaN(numberOfPeopleInput.value)){
        for (const discount of discountBtns) {
            if(e.target == discount){
                e.target.classList.add('active');
            }else{
                discount.classList.remove('active');
            }
        }
        discountRate = e.target.dataset.value;
        totalTip = (((billInput.value * discountRate)/100)/numberOfPeopleInput.value)
        tipAmount.textContent = `$${(((billInput.value * discountRate)/100)/numberOfPeopleInput.value)}`;
        total.textContent = `$${((billInput.value / numberOfPeopleInput.value) + totalTip)}`
    }else{
        tipAmount.textContent = "Error";
        billInput.value = "Error";
        numberOfPeopleInput.value = "Error";
        setTimeout(hideError,1000)
    }
    handleResetBtn()
}

function hideError(){
    tipAmount.textContent = "$0.00";
    billInput.value = "";
    numberOfPeopleInput.value = "";
}

function resetBoard(){
    billInput.value = "";
    tipAmount.textContent = "$0.00"
    total.textContent = "$0.00";
    numberOfPeopleInput.value = "";
    customDiscount.value = "";
    for (const discount of discountBtns) {
        discount.classList.remove('active');
    }
    resetBtn.classList.remove('active');
    resetBtn.classList.add('not-active');
}

function addCustomDiscount(e){
    if(e.target.value != ""){
        for (const discount of discountBtns) {
            discount.classList.remove('active');
        }
        discountRate = e.target.value;
        if(numberOfPeopleInput.value > 0 && !isNaN(numberOfPeopleInput.value)){
            totalTip = (((billInput.value * discountRate)/100)/numberOfPeopleInput.value)
            tipAmount.textContent = `$${(((billInput.value * discountRate)/100)/numberOfPeopleInput.value)}`;
            total.textContent = `$${eval((billInput.value / numberOfPeopleInput.value) + totalTip)}`
        }else{
            tipAmount.textContent = "Error";
            billInput.value = "Error";
            numberOfPeopleInput.value = "Error";
            setTimeout(hideError,1000)
        }
        handleResetBtn();
    }
}