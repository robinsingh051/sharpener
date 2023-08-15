
// USER FORM SCRIPT

// Put DOM elements into variables
const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

// Listen for form submit
myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  if(nameInput.value === '' || emailInput.value === '') {
    msg.classList.add('error');
    msg.textContent = 'Please enter all fields';

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  } else {
    localStorage.setItem('name',nameInput.value);
    localStorage.setItem('email',emailInput.value);

    // Clear fields
    nameInput.value = '';
    emailInput.value = '';
  }
}