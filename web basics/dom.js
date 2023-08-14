//console.dir(document);

// console.log(document.domain);
// console.log(document.URL);
// console.log(document.title);
// document.title='New title';
// console.log(document.head);
// console.log(document.body);
// console.log(document.all);
// console.log(document.forms);
// console.log(document.links);
// console.log(document.images);

// let headerTitle=document.getElementById('header-title');
// headerTitle.textContent='Hello';
// headerTitle.innerHTML='Bye';

// headerTitle.style='border:1px solid black';

// let addItem=document.getElementById('add');
// console.log(addItem);
// addItem.style='font-weight:bold; color:green;';

// const items = document.querySelectorAll(".list-group-item");

// items.forEach((item, index) => {
//     item.style.fontWeight = "bold";
//     if (index === 2) {
//       item.style.backgroundColor = "green";
//     }
// });


// Add a new <li> element without the same class name
const newItem = document.createElement('li');
newItem.textContent = 'New Item Without Class';
document.getElementById('items').appendChild(newItem);

// Edit the new <li> element using getElementsByClassName
// const itemsByClass = document.getElementsByClassName('list-group-item');
// if (itemsByClass.length > 0) {
//     const lastItemByClass = itemsByClass[itemsByClass.length - 1];
//     lastItemByClass.textContent = 'Edited using getElementsByClassName';
//     lastItemByClass.style.backgroundColor = 'green';
// }

// Edit the new <li> element using getElementsByTagName
const itemsByTagName = document.getElementsByTagName('li');
if (itemsByTagName.length > 3) {
    const lastItemByTagName = itemsByTagName[itemsByTagName.length - 1];
    lastItemByTagName.textContent = 'Edited using getElementsByTagName';
    lastItemByTagName.style.backgroundColor = 'orange';
}

