
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

    // Create new details object
    const newDetails = {
        name: nameInput.value,
        email: emailInput.value
    };
    showData(newDetails);

    // post to crud crud using axios
    axios.post('https://crudcrud.com/api/8806390386144251b3092ca3aad91050/user',newDetails)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.error(err); 
    })

    // Clear fields
    nameInput.value = '';
    emailInput.value = '';
  }
}

//creating li with buttons
function showData(obj){
  //create a li
  const li = document.createElement('li');
  //give the id of obj to li which will help us while removing the data from crudcrud
  li.id=obj._id;
  //create a delete button
  const delBtn=document.createElement('button');
  delBtn.appendChild(document.createTextNode('Delete'));
  delBtn.classList.add('del');

  //create a delete button
  const editBtn=document.createElement('button');
  editBtn.appendChild(document.createTextNode('Edit'));
  editBtn.classList.add('edit');

  // Add text node with input values
  li.appendChild(document.createTextNode(`${obj.name}: ${obj.email}`));
  // add button to li
  li.appendChild(delBtn);
  li.appendChild(editBtn);
  // Append to ul
  userList.appendChild(li);
}

const ul=document.getElementById('users');
const delBtn=document.getElementsByClassName('del');

ul.addEventListener('click', removeItem);
ul.addEventListener('click',editItem);

function removeItem(e){
    if(e.target.classList.contains('del')){
        if(confirm('Are You Sure?')){
          var li = e.target.parentElement;

          // // Get the index of the item to delete
          // const index = Array.from(ul.children).indexOf(li);

          // // Retrieve existing credentials from local storage
          // const existingCredentials = localStorage.getItem('credentials');

          // // Parse the existing credentials if they exist
          // const existingCredentialsParsed = existingCredentials ? JSON.parse(existingCredentials) : [];

          // // Remove the item from the existing credentials array
          // existingCredentialsParsed.splice(index, 1);

          // // Convert the updated credentials to a string
          // const updatedCredentialsSerialized = JSON.stringify(existingCredentialsParsed);

          // // Store the updated credentials in local storage
          // localStorage.setItem('credentials', updatedCredentialsSerialized);

          axios
          .delete(`https://crudcrud.com/api/8806390386144251b3092ca3aad91050/user/${li.id}`)
          .then((response)=>{
            console.log(response);
          })
          .catch((err)=>{
            console.log(err);
          });

          ul.removeChild(li);

        }
      }
}


function editItem(e){
    if(e.target.classList.contains('edit')){
        if(confirm('Are You Sure?')){
          var li = e.target.parentElement;

          // // Get the index of the item to delete
          // const index = Array.from(ul.children).indexOf(li);

          // // Retrieve existing credentials from local storage
          // const existingCredentials = localStorage.getItem('credentials');

          // // Parse the existing credentials if they exist
          // const existingCredentialsParsed = existingCredentials ? JSON.parse(existingCredentials) : [];

          // let name='',email='';
          // if(existingCredentialsParsed!=[]){
          //       name=existingCredentialsParsed[index].name;
          //       email=existingCredentialsParsed[index].email;
          // }

          // // Remove the item from the existing credentials array
          // existingCredentialsParsed.splice(index, 1);

          // // Convert the updated credentials to a string
          // const updatedCredentialsSerialized = JSON.stringify(existingCredentialsParsed);

          // // Store the updated credentials in local storage
          // localStorage.setItem('credentials', updatedCredentialsSerialized);
          axios
          .get(`https://crudcrud.com/api/8806390386144251b3092ca3aad91050/user/${li.id}`)
          .then((res)=>{
            nameInput.value = res.data.name;
            emailInput.value = res.data.email;
            axios
            .delete(`https://crudcrud.com/api/8806390386144251b3092ca3aad91050/user/${li.id}`)
            .then((response)=>{
              console.log(response);
            })
            .catch((err)=>{
              console.log(err);
            });
          })
          .catch((err)=>{
            console.log(err);
          });

          ul.removeChild(li);

          // Clear fields


        }
      }
}

//Run the function after the script is loaded in the browser
document.addEventListener('DOMContentLoaded',()=>{
  axios
  .get('https://crudcrud.com/api/8806390386144251b3092ca3aad91050/user')
  .then((response)=>{
    for(let i=0;i<response.data.length;i++){
      showData(response.data[i]);
    }
  })
  .catch((err)=>{
    console.log(err);
  });
});