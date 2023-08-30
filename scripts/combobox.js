'use strict';
export default function comboBox(id, arr, multiSel) {
    const widget = document.getElementById(id);
    const searchField = widget.getElementsByTagName('input')[0];
    const button = widget.getElementsByTagName('button')[0];
    const menu = widget.getElementsByTagName('div')[0];
    const multiSelect = multiSel || false;
    let As = [];

    // if multiselect show menu as scrollbox
    if (multiSelect === true) {
        menu.classList.add('multi-select');
        button.style.display = 'none'
    }

    if (arr.length > 0) {
        const menuItems = arr.map((item, i) => ({ id: i, data: item }));

        // hide menu if there was click elsewhere on page
        widget.addEventListener('comboBoxEvent', function () {
            if (menu.style.display = 'flex') clearFieldHideMenu();
        });

        // hide menu if esc key
        widget.addEventListener('keyup', function (evt) {
            if (evt.key === 'Escape') clearFieldHideMenu();
        });

        // toggle menu
        button.addEventListener('click', function () {
            menu.style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'flex' : 'none';
        });

        // use menuItems to create A tags and add to menu
        menuItems.forEach(item => {
            const A = document.createElement('A');

            A.textContent = item.data;
            A.setAttribute('href', '#');
            A.setAttribute('data-menu-selected', 'false');
            A.addEventListener('click', function () {
                const menuState = this.dataset.menuSelected === 'false' ? 'true' : 'false';

                this.setAttribute('data-menu-selected', menuState);
                updateInputField();
            });

            menu.appendChild(A);
        });

        // get anchors
        As = Array.from(menu.children);

        searchField.addEventListener('keyup', function (evt) {
            // update menu items if input text
            if (this.value !== '') {
                As.forEach(A => {
                    if ((A.innerText).toLowerCase().includes((this.value).toLowerCase())) {
                        A.style.display = 'flex';
                    } else {
                        A.style.display = 'none';
                    }
                });

                menu.style.display = 'flex';
            }

            // show menu if up/down keys
            if (evt.key === 'ArrowUp' || evt.key === 'ArrowDown') menu.style.display = 'flex';
        });
    }

    // close menu when user clicks outside it
    if (window.comboBoxEvent === undefined) window.comboBoxEvent = new Event('comboBoxEvent');
    if (window.comboBoxEvent instanceof (Event)) {
        document.addEventListener('click', function (event) {
            if (!widget.contains(event.target)) widget.dispatchEvent(window.comboBoxEvent);
        });
    }

    function clearFieldHideMenu() {
        menu.style.display = 'none';
        As.forEach(A => A.style.display = 'flex');
    }

    // update items in the input field when menu items are clicked
    function updateInputField() {
        let selectedItems = [];
        let items = '';

        if (!multiSelect) {
            selectedItems = As.find(A => A.dataset.menuSelected === 'true');
            items = selectedItems.innerText;
            searchField.value = items;
            selectedItems.dataset.menuSelected = 'false';
            menu.style.display = 'none';
        }

        if (multiSelect) {
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

                searchField.value = items;
                // todo copy the pattern above for this
            } else {
                clearFieldHideMenu();
            }

        }
    }
}