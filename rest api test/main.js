// Put DOM elements into variables
const myForm = document.querySelector('#my-form');
const priceInput=document.querySelector('#price')
const nameInput = document.querySelector('#name');
const catInput = document.querySelector('#category');
const msg = document.querySelector('.msg');
const electronicsList = document.querySelector('#ele');
const foodList=document.querySelector('#foo');
const fashionList=document.querySelector('#fas');

// Listen for form submit
myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  if(nameInput.value === '' || priceInput.value === '' || catInput.value==='') {
    msg.classList.add('error');
    msg.textContent = 'Please enter all fields';

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  } else {

    // Create new details object
    const newItem = {
        price:priceInput.value,
        name: nameInput.value,
        category: catInput.value
    };
    showData(newItem);

    // post to crud crud using axios
    axios.post('https://crudcrud.com/api/8806390386144251b3092ca3aad91050/item',newItem)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.error(err); 
    })

    // Clear fields
    priceInput.value='';
    nameInput.value = '';
    catInput.value = '';
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

  // Add text node with input values
  li.appendChild(document.createTextNode(`${obj.price}: ${obj.name}`));
  // add button to li
  li.appendChild(delBtn);
  // Append to ul
  if(obj.category==='electronics')
    electronicsList.appendChild(li);
  if(obj.category==='food')
  foodList.appendChild(li);
  if(obj.category==='fashion')
  fashionList.appendChild(li);
  
}


electronicsList.addEventListener('click', removeItem);
foodList.addEventListener('click',removeItem);
fashionList.addEventListener('click',removeItem);

function removeItem(e){
    if(e.target.classList.contains('del')){
        if(confirm('Are You Sure?')){
          var li = e.target.parentElement;
          var ul=li.parentElement;
          axios
          .delete(`https://crudcrud.com/api/8806390386144251b3092ca3aad91050/item/${li.id}`)
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

//Run the function after the script is loaded in the browser
document.addEventListener('DOMContentLoaded',()=>{
  axios
  .get('https://crudcrud.com/api/8806390386144251b3092ca3aad91050/item')
  .then((response)=>{
    for(let i=0;i<response.data.length;i++){
      showData(response.data[i]);
    }
  })
  .catch((err)=>{
    console.log(err);
  });
});