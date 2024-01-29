const inputInlineElements = document.querySelectorAll('.input-inline-element');

for (const inputElement of inputInlineElements) {
    inputElement.addEventListener('focus',function(){
        inputElement.closest('div').style.border = "2px solid #26C2AE"
    })
    inputElement.addEventListener('blur',function(){
        inputElement.closest('div').style.border = "2px solid transparent"
    })
    
}