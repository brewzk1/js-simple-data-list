'use strict';
export default function comboBox(id, arr, isMultiSelect) {
    const widget = document.getElementById(id);
    const searchField = widget.getElementsByTagName('input')[0];
    const button = widget.getElementsByTagName('button')[0];
    const menu = widget.getElementsByTagName('div')[0];
    const multi = isMultiSelect || false;
    let As = [];

    // if multi show menu as scrollbox
    if (multi === true) {
        menu.classList.add('multi-select');
        button.style.display = 'none';
    } else {
        button.textContent = '+';
    }

    // if arr has items, create menu
    if (arr.length > 0) {
        const menuItems = arr.map((item, i) => ({ id: i, data: item }));

        // hide menu if there was click elsewhere on page
        widget.addEventListener('comboBoxEvent', function (evt) {
            if (menu.style.display = 'flex') clearFieldHideMenu();
            updateButton();
        });

        // hide menu if esc key
        widget.addEventListener('keyup', function (evt) {
            if (evt.key === 'Escape') clearFieldHideMenu();
        });

        // toggle menu
        widget.addEventListener('click', function (evt) {
            if (!multi) menu.style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'flex' : 'none';
            updateButton();
        });

        // create menu
        menuItems.forEach(item => {
            const A = document.createElement('A');

            A.textContent = item.data;
            A.setAttribute('href', `#${id}`);
            A.setAttribute('data-menu-selected', 'false');
            A.addEventListener('click', function () {
                const menuState = this.dataset.menuSelected === 'false' ? 'true' : 'false';

                this.setAttribute('data-menu-selected', menuState);
                updateInputField();
            });

            menu.appendChild(A);
        });

        // get menu items (A tags)
        As = Array.from(menu.children);

        // listen for key presses
        searchField.addEventListener('keyup', function (evt) {
            // show only menu items that match fully or partially
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
            updateButton();
        });
    }

    // close menu when user clicks outside it
    if (arr.length > 0) setComboBoxEvent();

    function updateButton() {
        button.textContent = (menu.style.display === 'none') ? '+' : '-';
    }

    function setComboBoxEvent() {
        if (window.comboBoxEvent === undefined) window.comboBoxEvent = new Event('comboBoxEvent');
        if (window.comboBoxEvent instanceof (Event)) {
            document.addEventListener('click', function (event) {
                if (!widget.contains(event.target)) widget.dispatchEvent(window.comboBoxEvent);
            });
        }
    }

    function clearFieldHideMenu() {
        menu.style.display = 'none';
        As.forEach(A => A.style.display = 'flex');
    }

    function updateInputField() {
        let selectedItems = [];
        let items = '';

        if (!multi) {
            selectedItems = As.find(A => A.dataset.menuSelected === 'true');
            items = selectedItems.innerText;
            searchField.value = items;
            selectedItems.dataset.menuSelected = 'false';
        }

        if (multi) {
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
            }

            if (selectedItems.length === 0) searchField.value = '';
        }

    }
}