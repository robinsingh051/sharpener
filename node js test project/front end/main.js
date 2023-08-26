// USER FORM SCRIPT

// Put DOM elements into variables
const myForm = document.querySelector('#my-form');
const itemList = document.querySelector('#items');
const msg = document.querySelector('.msg');

// Listen for form submit
myForm.addEventListener('submit', onSubmit);

async function onSubmit(e) {
  e.preventDefault();
  try {
    const nameInput = document.querySelector('#name');
    const descInput = document.querySelector('#desc');
    const priceInput = document.querySelector('#price');
    const qtyInput = document.querySelector('#qty');

    if (nameInput.value === '' || descInput.value === '' || priceInput.value === '' || qtyInput.value === '') {
      msg.classList.add('error');
      msg.textContent = 'Please enter all fields';

      // Remove error after 3 seconds
      setTimeout(() => msg.remove(), 3000);
    } else {
      const newDetails = {
        name: nameInput.value,
        desc: descInput.value,
        price: priceInput.value,
        qty: qtyInput.value
      };

      const response = await axios.post('http://localhost:3000/items', newDetails);

      console.log(response);
      showData(response.data);

      // Clear fields
      nameInput.value = '';
      descInput.value = '';
      priceInput.value = '';
      qtyInput.value = '';
    }
  } catch (err) {
    console.error(err);
  }
}

// Creating li with buttons
function showData(obj) {
  const li = document.createElement('li');
  li.id = obj.id;

  const buy1btn = document.createElement('button');
  buy1btn.appendChild(document.createTextNode('Buy 1'));
  buy1btn.classList.add('buy1');

  const buy2btn = document.createElement('button');
  buy2btn.appendChild(document.createTextNode('Buy 2'));
  buy2btn.classList.add('buy2');

  const buy3btn = document.createElement('button');
  buy3btn.appendChild(document.createTextNode('Buy 3'));
  buy3btn.classList.add('buy3');

  li.appendChild(document.createTextNode(`${obj.name} ${obj.desc} ${obj.price} `));

  const qtySpan = document.createElement('span');
  qtySpan.appendChild(document.createTextNode(`${obj.qty}`));
  qtySpan.className = 'class_qty';

  li.appendChild(qtySpan);
  li.appendChild(buy1btn);
  li.appendChild(buy2btn);
  li.appendChild(buy3btn);

  itemList.appendChild(li);
}

itemList.addEventListener('click', updateQty);

async function updateQty(e) {
  if (e.target.classList.contains('buy1') || e.target.classList.contains('buy2') || e.target.classList.contains('buy3')) {
    const li = e.target.parentElement;

    let qtyToDecreses;
    if (e.target.classList.contains('buy1')) qtyToDecreses = 1;
    else if (e.target.classList.contains('buy2')) qtyToDecreses = 2;
    else qtyToDecreses = 3;

    const qtySpan = li.querySelector('.class_qty');
    let qty = parseInt(qtySpan.textContent);

    const patchData = {
      qty: qty - qtyToDecreses
    };

    if (qty >= qtyToDecreses) {
      try {
        const response = await axios.patch(`http://localhost:3000/item/${li.id}`, patchData);

        console.log(response);
        qty = qty - qtyToDecreses;
        if (qty === 0) {
          li.remove();
        } else {
          qtySpan.textContent = qty;
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      msg.classList.add('error');
      msg.textContent = 'Desired quantity is not available';

      // Remove error after 3 seconds
      setTimeout(() => {
        msg.textContent = ''; // Clear the error message
        msg.classList.remove('error');
      }, 1000);
    }
  }
}

// Run the function after the script is loaded in the browser
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await axios.get('http://localhost:3000/items');
    for (let i = 0; i < response.data.length; i++) {
      showData(response.data[i]);
    }
  } catch (err) {
    console.log(err);
  }
});
