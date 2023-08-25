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
const customListEl = document.getElementsByClassName('customList')[0];
const component = customList.bind(customListEl)

function customList(originalArray) {
    const INPUT_TEXT = this.getElementsByTagName('INPUT')[0];
    const DIV = this.getElementsByTagName('DIV')[0];

    // create a new arr of objects with IDs (assuming the original is not an arr of objects)
    let menuItemsArr = originalArray.map((item, i) => {
        return { id: i, data: item, selected: 'false' };
    });

    // use menuItemsArr to create A tags and add to DIV
    menuItemsArr.forEach(item => {
        const A = document.createElement('a');

        // A.setAttribute('data-menu-matched', 'false');
        A.setAttribute('href', '#');
        A.setAttribute('data-menu-selected', 'false');
        A.textContent = item.data;
        A.addEventListener('click', function () {
            if (item.selected === 'false') {
                item.selected = 'true';
                this.setAttribute('data-menu-selected', 'true');
            } else {
                item.selected = 'false';
                this.setAttribute('data-menu-selected', 'false');
            }
        });

        DIV.appendChild(A);
    });

    //update menu items based on search string
    INPUT_TEXT.addEventListener('keyup', function () {
        updateMenuSelection(this.value);
    });

    function updateMenuSelection(inputTxtValue) {
        const As = Array.from(DIV.children);

        // if the text field is filled out display menu items that match it,
        // else display all menu items
        if (inputTxtValue !== '') {
            As.forEach(A => {
                if ((A.innerText).toLowerCase().includes((inputTxtValue).toLowerCase())) {
                    // A.dataset.menuMatched = 'true';
                    A.style.display = 'block';
                } else {
                    A.dataset.menuMatched = 'false';
                    A.style.display = 'none';
                }
            })
        } else {
            As.forEach(A => {
                // A.dataset.menuMatched = 'false';
                A.style.display = 'block';
            });
        }

        DIV.style.display = (inputTxtValue !== '') ? 'block' : 'none';
    }
}

component(fruitsArr);

// TODO optionally show chips of selected items
// TODO optionally show check for selected items
// TODO add button to toggle list items (for now click it is ok)
// TODO make sure originalArr has items before creating menus