
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
    const li = document.createElement('li');

    // Add text node with input values
    li.appendChild(document.createTextNode(`${nameInput.value}: ${emailInput.value}`));

    // Add HTML
    // li.innerHTML = `<strong>${nameInput.value}</strong>e: ${emailInput.value}`;

    // Append to ul
    userList.appendChild(li);
    // let details={
    //     name:nameInput.value,
    //     email:emailInput.value
    // }
    // let detailsSerialized=JSON.stringify(details);
    // localStorage.setItem('credentials',detailsSerialized);

    // Retrieve existing credentials from local storage
    const existingCredentials = localStorage.getItem('credentials');

    // Parse the existing credentials if they exist
    const existingCredentialsParsed = existingCredentials ? JSON.parse(existingCredentials) : [];

    // Create new details object
    const newDetails = {
        name: nameInput.value,
        email: emailInput.value
    };

    // Add the new details to the existing credentials
    existingCredentialsParsed.push(newDetails);

    // Convert the updated credentials to a string
    const updatedCredentialsSerialized = JSON.stringify(existingCredentialsParsed);

    // Store the updated credentials in local storage
    localStorage.setItem('credentials', updatedCredentialsSerialized);


    // Clear fields
    nameInput.value = '';
    emailInput.value = '';
  }
}