let clipboard = new Clipboard('.copy', {
    text: function() {
        return header.textContent;
    }
});
let textAtClick = '';
const triggers = document.querySelectorAll('[data-input]');
const header = document.querySelector('.story');
const inputs = document.querySelectorAll('input');
const message = document.querySelector('.message');
let initialMessage = message.textContent;
triggers.forEach(trigger => trigger.addEventListener('click', handleClick));
inputs.forEach(input => input.addEventListener('focus', handleFocus));
inputs.forEach(input => input.addEventListener('blur', handleBlur));
inputs.forEach(input => input.addEventListener('keyup', handleKeyup));
function handleClick(e) {
    const input = document.querySelector(`.${this.dataset.input}`);
    input.focus();
}
function handleFocus() {
    unFocusOthers();
    const textfield = document.querySelector(`.${this.dataset.textfield}`);
    textfield.classList.add('focused');
    textAtClick = textfield.textContent;
    textfield.textContent = '';
    this.value = '';
    message.textContent = textfield.dataset.message;
}
function unFocusOthers() {
    const focused = document.querySelectorAll('.focused');
    focused.forEach(el => el.classList.remove('focused'));
}
function handleKeyup(e) {
    const textfield = document.querySelector(`.${this.dataset.textfield}`);
    textfield.textContent = this.value;
}
function handleBlur(e) {
    unFocusOthers();
    const textfield = document.querySelector(`.${this.dataset.textfield}`);
    if (this.value === "") {
        textfield.textContent = textAtClick;
    } else {
        textfield.textContent = this.value;
    }
    message.textContent = initialMessage;
}
clipboard.on('success', function (e) {
    swal(
        'Copied!',
        header.textContent,
        'success'
    );
});
clipboard.on('error', function (e) {
    swal(
        'Failed to copy',
        'Select the following text and press ctrl + c or cmd + c :' + header.textContent,
        'error'
    );
});