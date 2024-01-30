const billInput = document.querySelector('#bill-input');
const customDiscount = document.querySelector('#custom-discount');
const numberOfPeopleInput = document.querySelector('#number-of-people-input');
const discountBtns = document.querySelectorAll('.discount-btn');
const resetBtn = document.querySelector('.reset-btn');
const tipAmount = document.querySelector('#tip-amount-result');
const total = document.querySelector('#total-result');

let bill = 0;
let numOfPeople = 0;
let discountRate = 0;
let totalTipPerPerson = 0;
let totalPerPerson = 0;

for (const discount of discountBtns) {
    discount.addEventListener('click', e => selectTip(e));
}

customDiscount.addEventListener('input',e => addCustomDiscount(e))

billInput.addEventListener('input' , e => billInputResult(e))

numberOfPeopleInput.addEventListener('input' , e => numberOfPeople(e))

resetBtn.addEventListener('click',resetBoard)

function handleResetBtn(){
    if(total.textContent != "$0.00"){
        resetBtn.classList.add('active');
        resetBtn.classList.remove('not-active');
    }else{
        resetBtn.classList.add('not-active');
        resetBtn.classList.remove('active');
    }
}

function numberOfPeople(e){
    numOfPeople = e.target.value;
    // if(numOfPeople === "0"){
    //     document.querySelectorAll('.input-container')[1].style.border = "2px solid #E17052";
    //     let notZero = `<span class="zero">Can't be zero</span>`
    //     document.querySelector('.number-of-people-container h3').insertAdjacentHTML('afterend',notZero) 
    //     return
    // }else{
    //     document.querySelectorAll('.input-container')[1].style.border = "2px solid #26C2AE";
    //     document.querySelector('.zero').innerHTML = "";
    // }
    if(numOfPeople > 0 && bill > 0 && discountRate > 0){
        calculateTip(bill,numOfPeople,discountRate);
    }
}

function billInputResult(e){
    bill = e.target.value;
    // if(bill === "0"){
    //     document.querySelectorAll('.input-container')[0].style.border = "2px solid #E17052";
    //     let notZero = `<span class="zero">Can't be zero</span>`
    //     document.querySelector('.number-of-people-container h3').insertAdjacentHTML('afterend',notZero) 
    //     return
    // }else{
    //     document.querySelectorAll('.input-container')[0].style.border = "2px solid #26C2AE";
    //     document.querySelector('.zero').innerHTML = "";
    // }
    if(numOfPeople > 0 && bill > 0 && discountRate > 0){
        calculateTip(bill,numOfPeople,discountRate);
    }
}

function selectTip(e){
    e.preventDefault();
    for (const discount of discountBtns) {
        if(e.target == discount){
            e.target.classList.add('active');
        }else{
            discount.classList.remove('active');
        }
    }
    discountRate = e.target.dataset.value;
    if(numOfPeople > 0 && bill > 0 && discountRate > 0){
        calculateTip(bill,numOfPeople,discountRate);
    }
}

function addCustomDiscount(e){
    if(e.target.value != ""){
        for (const discount of discountBtns) {
            discount.classList.remove('active');
        }
        discountRate = e.target.value;
        if(numOfPeople > 0 && bill > 0 && discountRate > 0){
            calculateTip(bill,numOfPeople,discountRate);
        }
    }
}

function calculateTip(bill,numOfPeople,discountRate){
    console.log(bill,numOfPeople,discountRate);
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

