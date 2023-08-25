
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

async function onSubmit(e) {
  e.preventDefault();
  if(expense.value === '' || desc.value === '' || cat.value==='') {
    msg.classList.add('error');
    msg.textContent = 'Please enter all fields';

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  } else {
    const newDetails = {
      expense: expense.value,
      desc: desc.value,
      cat:cat.value
    }

    // post to crud crud using axios
    axios.post('http://localhost:3000/expenses',newDetails)
    .then((res) => {
      console.log(res);
      showData(res.data);
    })
    .catch(err => {
      console.error(err); 
    })

    // Clear fields
    expense.value = '';
    desc.value = '';
    cat.value='';
  }
}

function showData(obj){
  const li = document.createElement('li');
  li.id=obj.id;

  //create a delete button
  const delBtn=document.createElement('button');
  delBtn.classList.add('btn');
  delBtn.classList.add('btn-danger');
  delBtn.appendChild(document.createTextNode('Delete'));
  delBtn.classList.add('del');

  //create a edit button
  const editBtn=document.createElement('button');
  editBtn.classList.add('btn');
  editBtn.classList.add('btn-warning');
  editBtn.appendChild(document.createTextNode('Edit'));
  editBtn.classList.add('edit');

  // Add text node with input values
  li.appendChild(document.createTextNode(`${obj.expense}: ${obj.desc}: ${obj.cat}`));
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
          axios
          .delete(`http://localhost:3000/expense/${li.id}`)
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
          
          axios
          .get(`http://localhost:3000/expense/${li.id}`)
          .then((res)=>{
            expense.value = res.data.expense;
            desc.value = res.data.desc;
            cat.value=res.data.cat;
            axios
            .delete(`http://localhost:3000/expense/${li.id}`)
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
        }
      }
}

//Run the function after the script is loaded in the browser
document.addEventListener('DOMContentLoaded',async ()=>{
  axios
  .get('http://localhost:3000/expenses')
  .then((response)=>{
    for(let i=0;i<response.data.length;i++){
      showData(response.data[i]);
    }
  })
  .catch((err)=>{
    console.log(err);
  });
});