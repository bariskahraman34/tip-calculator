const billInput = document.querySelector('#bill-input');
const customDiscount = document.querySelector('#custom-discount-input');
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
    if(totalTip > 0){
        total.textContent = `$${((e.target.value / calcPeopleAgain) + totalTip)}`;
    }else if(billInput.value > 0){
        total.textContent = `$${billInput.value / calcPeopleAgain}`;
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
        totalTip = ((billInput.value * e.target.dataset.value)/100)/numberOfPeopleInput.value
        discountRate = e.target.dataset.value;
        tipAmount.textContent = `$${((billInput.value * e.target.dataset.value)/100)/numberOfPeopleInput.value}`;
        total.textContent = `$${eval((billInput.value / numberOfPeopleInput.value) + totalTip)}`
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
    for (const discount of discountBtns) {
        discount.classList.remove('active');
    }
    resetBtn.classList.remove('active');
    resetBtn.classList.add('not-active');
}

