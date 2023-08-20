// Put DOM elements into variables
const myForm = document.querySelector('#my-form');
const priceInput = document.querySelector('#price');
const nameInput = document.querySelector('#name');
const catInput = document.querySelector('#category');
const msg = document.querySelector('.msg');
const electronicsList = document.querySelector('#ele');
const foodList = document.querySelector('#foo');
const fashionList = document.querySelector('#fas');

// Listen for form submit
myForm.addEventListener('submit', onSubmit);

async function onSubmit(e) {
  e.preventDefault();
  if (nameInput.value === '' || priceInput.value === '' || catInput.value === '') {
    msg.classList.add('error');
    msg.textContent = 'Please enter all fields';

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  } else {

    // Create new details object
    const newItem = {
      price: priceInput.value,
      name: nameInput.value,
      category: catInput.value
    };
    await showData(newItem);

    try {
      // post to crudcrud using axios
      const response = await axios.post('https://crudcrud.com/api/ad4b75532f2d469c95538db1e0d9561e/item', newItem);
      console.log(response);
    } catch (err) {
      console.error(err);
    }

    // Clear fields
    priceInput.value = '';
    nameInput.value = '';
    catInput.value = '';
  }
}

//creating li with buttons
async function showData(obj) {
  //create a li
  const li = document.createElement('li');
  //give the id of obj to li which will help us while removing the data from crudcrud
  li.id = obj._id;
  //create a delete button
  const delBtn = document.createElement('button');
  delBtn.appendChild(document.createTextNode('Delete'));
  delBtn.classList.add('del');

  // Add text node with input values
  li.appendChild(document.createTextNode(`${obj.price}: ${obj.name}`));
  // add button to li
  li.appendChild(delBtn);
  // Append to ul
  if (obj.category === 'electronics')
    electronicsList.appendChild(li);
  if (obj.category === 'food')
    foodList.appendChild(li);
  if (obj.category === 'fashion')
    fashionList.appendChild(li);
}

electronicsList.addEventListener('click', removeItem);
foodList.addEventListener('click', removeItem);
fashionList.addEventListener('click', removeItem);

async function removeItem(e) {
  if (e.target.classList.contains('del')) {
    if (confirm('Are You Sure?')) {
      const li = e.target.parentElement;
      const ul = li.parentElement;
      try {
        await axios.delete(`https://crudcrud.com/api/ad4b75532f2d469c95538db1e0d9561e/item/${li.id}`);
        ul.removeChild(li);
      } catch (err) {
        console.log(err);
      }
    }
  }
}

//Run the function after the script is loaded in the browser
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await axios.get('https://crudcrud.com/api/ad4b75532f2d469c95538db1e0d9561e/item');
    for (let i = 0; i < response.data.length; i++) {
      await showData(response.data[i]);
    }
  } catch (err) {
    console.log(err);
  }
});
