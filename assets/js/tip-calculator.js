const billInput = document.querySelector('#bill-input');
const customDiscount = document.querySelector('#custom-discount-input');
const numberOfPeopleInput = document.querySelector('#number-of-people-input');
const discountBtns = document.querySelectorAll('.discount-btn');
const resetBtn = document.querySelector('.reset-btn');
const tipAmount = document.querySelector('#tip-amount-result');
const total = document.querySelector('#total-result');

for (const discount of discountBtns) {
    discount.addEventListener('click', e => selectTip(e));
}

billInput.addEventListener('input' , e => billInputResult(e))

function billInputResult(e){
    total.textContent = `$${e.target.value}`;
}