'use strict';
const fruitsArr = ['Apple', 'Apricot', 'Banana', 'Blueberry', 'Cantaloupe', 'Cherry', 'Coconut', 'Grape', 'Guava', 'Jackfruit', 'Kiwi', 'Kumquat', 'Lemon', 'Mango', 'Orange', 'Papaya', 'Parsimmon', 'Pear', 'Pinapple', 'Pomegranate', 'Raspberry', 'Strawberry'];

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
    const inputEl = this.getElementsByTagName('INPUT')[0];
    const UL = this.getElementsByTagName('UL')[0];

    // create a new arr of objects with IDs (assuming the original is not an arr of objects)
    let menuItemsArr = originalArray.map((item, i) => {
        return { id: i, data: item, selected: 'false' };
    });

    // use menuItemsArr to create LI and A tags and add to UL
    menuItemsArr.forEach(item => {
        const LI = document.createElement('li');
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

        LI.appendChild(A);
        UL.appendChild(LI);
    });

    //update menu items based on search string
    inputEl.addEventListener('keyup', function () {
        updateMenuSelection(this.value);
    });

    function updateMenuSelection(inputTxtValue) {
        const LIs = Array.from(UL.children);

        // if the text field is filled out display menu items that match it,
        // else display all menu items
        if (inputTxtValue !== '') {
            LIs.forEach(LI => {
                const A = LI.children[0];

                if ((A.innerText).toLowerCase().includes((inputTxtValue).toLowerCase())) {
                    // A.dataset.menuMatched = 'true';
                    LI.style.display = 'block';
                } else {
                    A.dataset.menuMatched = 'false';
                    LI.style.display = 'none';
                }
            })
        } else {
            LIs.forEach(LI => {
                const A = LI.children[0];

                // A.dataset.menuMatched = 'false';
                LI.style.display = 'block';
            });
        }

        UL.style.display = (inputTxtValue !== '') ? 'block' : 'none';
    }
}

component(fruitsArr);

// TODO optionally show chips of selected items
// TODO optionally show check for selected items
// TODO LIs should be tabbable
// TODO add button to toggle list items (for now click it is ok)