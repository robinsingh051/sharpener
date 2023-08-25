
// USER FORM SCRIPT

// Put DOM elements into variables
const myForm = document.querySelector('#my-form');
const expense = document.querySelector('#expense');
const desc = document.querySelector('#desc');
const cat = document.querySelector('#category');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

// Listen for form submit
myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  if(expense.value === '' || desc.value === '' || cat.value==='') {
    msg.classList.add('error');
    msg.textContent = 'Please enter all fields';

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  } else {
    const li = document.createElement('li');

    //create a delete button
    const delBtn=document.createElement('button');
    delBtn.classList.add('btn');
    delBtn.classList.add('btn-danger');
    delBtn.appendChild(document.createTextNode('Delete'));
    delBtn.classList.add('del');

    //create a delete button
    const editBtn=document.createElement('button');
    editBtn.classList.add('btn');
    editBtn.classList.add('btn-warning');
    editBtn.appendChild(document.createTextNode('Edit'));
    editBtn.classList.add('edit');

    // Add text node with input values
    li.appendChild(document.createTextNode(`${expense.value}: ${desc.value}: ${cat.value}`));
    // add button to li
    li.appendChild(delBtn);
    li.appendChild(editBtn);

    // Append to ul
    userList.appendChild(li);

    // Retrieve existing credentials from local storage
    const existingExpenses = localStorage.getItem('expenses');

    // Parse the existing credentials if they exist
    const existingExpensesParsed = existingExpenses ? JSON.parse(existingExpenses) : [];

    // Create new details object
    const newDetails = {
        expense: expense.value,
        desc: desc.value,
        cat:cat.value
    };

    // Add the new details to the existing credentials
    existingExpensesParsed.push(newDetails);

    // Convert the updated credentials to a string
    const updatedExpensesSerialized = JSON.stringify(existingExpensesParsed);

    // Store the updated credentials in local storage
    localStorage.setItem('expenses', updatedExpensesSerialized);


    // Clear fields
    expense.value = '';
    desc.value = '';
    cat.value='';
  }
}

const ul=document.getElementById('users');
const delBtn=document.getElementsByClassName('del');

ul.addEventListener('click', removeItem);
ul.addEventListener('click',editItem);

function removeItem(e){
    if(e.target.classList.contains('del')){
        if(confirm('Are You Sure?')){
          var li = e.target.parentElement;

          // Get the index of the item to delete
          const index = Array.from(ul.children).indexOf(li);

          // Retrieve existing credentials from local storage
          const existingExpenses = localStorage.getItem('expenses');

          // Parse the existing credentials if they exist
          const existingExpensesParsed = existingExpenses ? JSON.parse(existingExpenses) : [];

          // Remove the item from the existing credentials array
          existingExpensesParsed.splice(index, 1);

          // Convert the updated credentials to a string
          const updatedExpensesSerialized = JSON.stringify(existingExpensesParsed);

          // Store the updated credentials in local storage
          localStorage.setItem('expenses', updatedExpensesSerialized);

          ul.removeChild(li);

        }
      }
}


function editItem(e){
    if(e.target.classList.contains('edit')){
        if(confirm('Are You Sure?')){
          var li = e.target.parentElement;

          // Get the index of the item to delete
          const index = Array.from(ul.children).indexOf(li);

          // Retrieve existing credentials from local storage
          const existingExpenses = localStorage.getItem('expenses');

          // Parse the existing credentials if they exist
          const existingExpensesParsed = existingExpenses ? JSON.parse(existingExpenses) : [];

          let ex='',d='',c='';
          if(existingExpensesParsed!=[]){
                ex=existingExpensesParsed[index].expense;
                d=existingExpensesParsed[index].desc;
                c=existingExpensesParsed[index].cat;
          }

          // Remove the item from the existing credentials array
          existingExpensesParsed.splice(index, 1);

          // Convert the updated credentials to a string
          const updatedExpensesSerialized = JSON.stringify(existingExpensesParsed);

          // Store the updated credentials in local storage
          localStorage.setItem('expenses', updatedExpensesSerialized);

          ul.removeChild(li);

          // Clear fields
          expense.value = ex;
          desc.value = d;
          cat.value=c;

        }
      }
}