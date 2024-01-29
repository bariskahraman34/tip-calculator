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

function numberOfPeople(e){
    calcPeopleAgain = e.target.value;
    if(totalTip > 0){
        total.textContent = `$${((e.target.value / calcPeopleAgain) + totalTip)}`;
    }else if(billInput.value > 0){
        total.textContent = `$${billInput.value / calcPeopleAgain}`;
    }
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
}

function hideError(){
    tipAmount.textContent = "$0.00";
    billInput.value = "";
    numberOfPeopleInput.value = "";
}