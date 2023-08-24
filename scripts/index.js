'use strict';
const fruitsArr = ['Apple', 'Banana', 'Bluberry', 'Cherry', 'Coconut', 'Grape', 'Guava', 'Jackfruit', 'Kiwi', 'Kumquat', 'Lemon', 'Mango', 'Orange', 'Papaya', 'Pear', 'Pinapple', 'Pomegranate', 'Raspberry', 'Strawberry'];

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
    const ulEl = this.getElementsByTagName('UL')[0];

    // create a new arr of objects with IDs (assuming the original is not an arr of objects)
    let menuItemsArr = originalArray.map((item, i) => {
        return { id: i, data: item };
    });

    // use menuItemsArr to create LI and A tags and add to UL
    menuItemsArr.forEach(item => {
        const liEl = document.createElement('li');
        const aEl = document.createElement('a');

        aEl.setAttribute('href', '#');
        aEl.setAttribute('data-menu-selected', 'false');
        aEl.innerText = item.data;
        aEl.addEventListener('click', function () {
            console.log('toggle data attr here')
        });

        liEl.appendChild(aEl);
        ulEl.appendChild(liEl);
    });

    //update menu items based on search string
    inputEl.addEventListener('keyup', function () {
        updateMenuSelection(this.value);
    });

    function updateMenuSelection(inputTxtValue) {
        const LIs = Array.from(ulEl.children);

        // if the text field is filled out display menu items that match it,
        // else display all menu items
        if (inputTxtValue !== '') {
            LIs.forEach(LI => {
                const a = LI.children[0];

                if ((a.innerText).toLowerCase().includes((inputTxtValue).toLowerCase())) {
                    a.dataset.menuSelected = 'true';
                    LI.style.display = 'block';
                } else {
                    a.dataset.menuSelected = 'false';
                    LI.style.display = 'none';
                }
            })
        } else {
            LIs.forEach(LI => {
                const a = LI.children[0];

                a.dataset.menuSelected = 'false';
                LI.style.display = 'block';
            });
        }
    }
}

component(fruitsArr);

// TODO optionally show chips of selected items
// TODO optionally show check for selected items
// TODO LIs should be tabbable
// TODO add button to toggle list items (for now click it is ok)
// TODO remember to remove event listeners