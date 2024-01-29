const billInput = document.querySelector('#bill-input');
const customDiscount = document.querySelector('#custom-discount-input');
const numberOfPeopleInput = document.querySelector('#number-of-people-input');
const discountBtns = document.querySelectorAll('.discount-btn');
const resetBtn = document.querySelector('.reset-btn');

for (const discount of discountBtns) {
    discount.addEventListener('click',selectTip);
}



function selectTip(){
    console.log(this.textContent);
}
