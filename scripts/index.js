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
const component = customList.bind(customListEl)

function customList(originalArray) {
    const INPUT_TEXT = this.getElementsByTagName('INPUT')[0];
    const DIV = this.getElementsByTagName('DIV')[0];

    // listen for custom event and hide menu if its showing
    this.addEventListener('clickedOutside', function () {
        if (DIV.style.display = 'block') DIV.style.display = 'none';
    });

    // create a new arr of objects with IDs (assuming the original is not an arr of objects)
    const menuItemsArr = originalArray.map((item, i) => {
        return { id: i, data: item, selected: 'false' };
    });

    // use menuItemsArr to create A tags and add to DIV
    menuItemsArr.forEach(item => {
        const A = document.createElement('a');

        A.textContent = item.data;
        A.setAttribute('href', '#');
        A.setAttribute('data-menu-selected', 'false');
        A.addEventListener('click', function () {
            if (item.selected === 'false') {
                item.selected = 'true';
                this.setAttribute('data-menu-selected', 'true');
            } else {
                item.selected = 'false';
                this.setAttribute('data-menu-selected', 'false');
            }

            updateInputField();
        });

        DIV.appendChild(A);
    });

    function updateInputField() {
        const As = Array.from(DIV.children);
        let selectedItems = [];

        // string selected items values together (separated by comma)
        // and updated input field
        // BUG  deselecting should remove item from selectedItems and input field
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

            INPUT_TEXT.value = '';
            INPUT_TEXT.value = items;
        }
    }

    // update menu items based on search string
    INPUT_TEXT.addEventListener('keyup', function () {
        updateMenu(this.value);
    });

    function updateMenu(inputTxtValue) {
        const As = Array.from(DIV.children);

        // if text field is filled out display matches else display all items
        if (inputTxtValue !== '') {
            As.forEach(A => {
                if ((A.innerText).toLowerCase().includes((inputTxtValue).toLowerCase())) {
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

        DIV.style.display = (inputTxtValue !== '') ? 'block' : 'none';
    }
}

// listen for clicks outside of menu, and broadcast custom event if true
document.addEventListener('click', function (event) {
    if (!customListEl.contains(event.target)) customListEl.dispatchEvent(clickedOutside);
});

component(fruitsArr);

// TODO optionally show chips of selected items
// TODO optionally show check for selected items
// TODO add button to toggle list items (for now click it is ok)
// TODO make sure originalArr has items before creating menus

// https://www.dom-tricks.com/click-outside