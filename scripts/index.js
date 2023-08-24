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

function customList(arr) {
    const inputEl = this.getElementsByTagName('INPUT')[0];
    const ulEl = this.getElementsByTagName('UL')[0];
    let arrCopy = arr.map((item, i) => {
        return { id: i, data: item, selected: false };
    });
    let itemsArr = [...arrCopy];

    itemsArr.forEach((item) => {
        const liEl = document.createElement('li');
        const aEl = document.createElement('a');

        aEl.setAttribute('href', '#');
        aEl.innerText = item.data;
        aEl.addEventListener('click', function (e) {
            const obj = arrCopy.find(o => o.id === item.id);
            obj.selected = !obj.selected;
        });

        liEl.appendChild(aEl);
        ulEl.appendChild(liEl);
    });

    inputEl.addEventListener('keyup', function (e) {
        let tmp = arrCopy.filter(item => {
            let i = item.data.toLowerCase();
            let v = this.value.toLowerCase();
            if (i.includes(v)) return item;
        });

        itemsArr = tmp;
        if (itemsArr.length) createLIs(ulEl, itemsArr);
    });

    function createLIs(containerEl, arr) {
        const tmp = [...arr];

        containerEl.textContent = '';

        tmp.forEach(item => {
            const liEl = document.createElement('li');
            liEl.innerText = item.data;
            containerEl.appendChild(liEl);
        });
    }
}

component(fruitsArr);

// TODO optionally show chips of selected items
// TODO optionally show check for selected items
// TODO LIs should be tabbable
// TODO add button to toggle list items (for now click it is ok)
// TODO remember to remove event listeners
// BUG updated list doesn't have links