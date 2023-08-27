'use strict';
const fruitsArr = ['Apple', 'Apricot', 'Banana', 'Blueberry', 'Cantaloupe', 'Cherry', 'Coconut', 'Grape', 'Guava', 'Jackfruit', 'Kiwi', 'Kumquat', 'Lemon', 'Mango', 'Orange', 'Papaya', 'Parsimmon', 'Pear', 'Peach', 'Pinapple', 'Pomegranate', 'Raspberry', 'Strawberry'];

// datalist (for comparison only)
const dataListItemsEl = document.getElementById('dataListItems');

addFruitsToMenu(dataListItemsEl);

function addFruitsToMenu(targetEl) {
    fruitsArr.forEach(fruit => {
        const optionEl = document.createElement('option');

        if (targetEl.tagName === 'DATALIST') {
            optionEl.setAttribute('value', fruit);
            targetEl.appendChild(optionEl);
        }
    });
}

// custom
const clickedOutside = new Event('clickedOutside');
const customListEl = document.getElementsByClassName('customList')[0];
const component = customList.bind(customListEl);

function customList(originalArray) {
    if (originalArray.length > 0) {
        const INPUT_TEXT = this.getElementsByTagName('INPUT')[0];
        const DIV = this.getElementsByTagName('DIV')[0];

        // listen for custom event and hide menu if its showing
        this.addEventListener('clickedOutside', function () {
            if (DIV.style.display = 'block') DIV.style.display = 'none';
        });

        // create a new arr of objects with IDs (assuming the original is not an arr of objects)
        const menuItemsArr = originalArray.map((item, i) => {
            return { id: i, data: item };
        });

        // use menuItemsArr to create A tags and add to DIV
        menuItemsArr.forEach(item => {
            const A = document.createElement('A');

            A.textContent = item.data;
            A.setAttribute('href', '#');
            A.setAttribute('data-menu-selected', 'false');
            A.addEventListener('click', function () {
                let menuState = this.dataset.menuSelected === 'false' ? 'true' : 'false';

                this.setAttribute('data-menu-selected', menuState);
                updateInputField();
            });

            DIV.appendChild(A);
        });

        // updatee items in the input field when menu items are clicked
        function updateInputField() {
            const As = Array.from(DIV.children);
            let selectedItems = [];

            selectedItems = As.filter(A => A.dataset.menuSelected === 'true');

            if (selectedItems.length > 0) {
                let items = '';

                selectedItems.forEach((o, i) => {
                    if (i === selectedItems.length - 1) {
                        items += o.innerText;
                    } else {
                        items += o.innerText + ', ';
                    }
                });

                INPUT_TEXT.value = items;
            } else {
                INPUT_TEXT.value = '';
            }
            // BUG deslecting items via menu should empty close the menu
        }

        // update menu items based on input text
        INPUT_TEXT.addEventListener('keyup', function (event) {
            const As = Array.from(DIV.children);

            // if text field is filled out display matches else display all items
            if (this.value !== '') {
                As.forEach(A => {
                    if ((A.innerText).toLowerCase().includes((this.value).toLowerCase())) {
                        A.style.display = 'block';
                    } else {
                        A.style.display = 'none';
                    }
                });
            } else {
                As.forEach(A => {
                    A.style.display = 'block';
                });
            }

            DIV.style.display = (this.value !== '') ? 'block' : 'none';
        });
    } else {
        console.warn('Custom menu has no data!');
    }
}

// listen for clicks outside of menu, and broadcast custom event if true
document.addEventListener('click', function (event) {
    if (!customListEl.contains(event.target)) customListEl.dispatchEvent(clickedOutside);
});

component(fruitsArr);

// TODO single (default): clicking 1 item should close menu
// TODO multiple: allow for it (ie menu stays open w scroll bar)
// TODO multiple: optionally show check for selected items
// TODO add button to toggle list items (for now click it is ok)

// https://www.dom-tricks.com/click-outside