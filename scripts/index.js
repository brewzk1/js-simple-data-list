'use strict';

const fruitsArr = ['Apple', 'Apricot', 'Banana', 'Blueberry', 'Cantaloupe', 'Cherry', 'Coconut', 'Date', 'Grape', 'Guava', 'Jackfruit', 'Kiwi', 'Kumquat', 'Lemon', 'Mango', 'Nectarine', 'Orange', 'Papaya', 'Parsimmon', 'Pear', 'Peach', 'Pinapple', 'Pomegranate', 'Raspberry', 'Strawberry', 'Sugar Cane'];

const veggiesArr = ['Tomato', 'Lettuce', 'Carrot', 'Beets'];

function comboBox(id, originalArray) {
    const widget = document.getElementById(id);

    if (originalArray.length > 0) {
        const INPUT_TEXT = widget.getElementsByTagName('INPUT')[0];
        const DIV = widget.getElementsByTagName('DIV')[0];

        // listen for custom event and hide menu if its showing
        widget.addEventListener('comboBoxEvent', function () {
            if (DIV.style.display = 'block') DIV.style.display = 'none';
        });

        // create a new arr of objects with IDs
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
                const menuState = this.dataset.menuSelected === 'false' ? 'true' : 'false';

                this.setAttribute('data-menu-selected', menuState);
                updateInputField();
            });

            DIV.appendChild(A);
        });

        // update items in the input field when menu items are clicked
        function updateInputField() {
            const As = Array.from(DIV.children);
            const selectedItems = As.filter(A => A.dataset.menuSelected === 'true');

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
                DIV.style.display = 'none';
            }
        }

        // update menu items based on input text
        INPUT_TEXT.addEventListener('keyup', function () {
            const As = Array.from(DIV.children);

            // if text field is filled out, display matched items else display all items
            if (this.value !== '') {
                As.forEach(A => {
                    if ((A.innerText).toLowerCase().includes((this.value).toLowerCase())) {
                        A.style.display = 'block';
                    } else {
                        A.style.display = 'none';
                    }
                });

                DIV.style.display = 'block';
            } else {
                As.forEach(A => {
                    A.style.display = 'block';
                });
                DIV.style.display = 'none';
            }
        });
    }

    // track when outside menu is clicked
    if (window.comboBoxEvent === undefined) window.comboBoxEvent = new Event('comboBoxEvent');
    if (window.comboBoxEvent instanceof (Event)) {
        document.addEventListener('click', function (event) {
            if (!widget.contains(event.target)) widget.dispatchEvent(window.comboBoxEvent);
        });
    }
}

comboBox('fruitsMenu', fruitsArr);
comboBox('veggiesMenu', veggiesArr);

// TODO single (default): clicking 1 item should close menu
// TODO multiple: allow for it (ie menu stays open w scroll bar)
// TODO multiple: optionally show check for selected items
// https://www.dom-tricks.com/click-outside
// https://www.w3.org/WAI/ARIA/apg/patterns/combobox/#:~:text=A%20combobox%20is%20an%20input,the%20popup%20presents%20suggested%20values.