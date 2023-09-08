'use strict';
export default function comboBox(id, arr, multi) {
    const widget = document.getElementById(id);
    const searchField = widget.getElementsByTagName('input')[0];
    const button = widget.getElementsByTagName('button')[0];
    const menu = widget.getElementsByTagName('div')[0];
    const isMultiSelect = multi || false;
    let As = [];

    // if multi show menu as scrollbox
    if (isMultiSelect) {
        menu.classList.add('multi-select');
        button.style.display = 'none';
    } else {
        button.textContent = '+';
    }

    // if arr has items, create menu
    if (arr.length > 0) {
        const menuItems = arr.map((item, i) => ({ id: i, data: item }));

        // hide menu if there was click elsewhere on page
        widget.addEventListener('comboBoxEvent', function (e) {
            if (menu.style.display === 'flex') clearFieldHideMenu(e);
            button.textContent = '+';
        });

        // hide menu if esc key
        widget.addEventListener('keyup', function (e) {
            if (e.key === 'Escape') clearFieldHideMenu(e);
        });

        // toggle menu (if single select)
        widget.addEventListener('click', function (e) {
            if (!isMultiSelect) menu.style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'flex' : 'none';
            updateButton(e);
        });

        // build menu
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
        searchField.addEventListener('keyup', function (e) {
            // show items that match fully/partially
            if (this.value !== '') {
                As.forEach(A => {
                    if (A.innerText.toLowerCase().includes(this.value.toLowerCase())) {
                        A.style.display = 'flex';
                    } else {
                        A.style.display = 'none';
                    }
                });

                menu.style.display = 'flex';
            }

            // show menu if up/down keys
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') menu.style.display = 'flex';
            updateButton(e);
        });
    }

    // close menu when user clicks outside it
    if (arr.length > 0) setComboBoxEvent();

    function updateButton(e) {
        e.stopPropagation();
        if (e.target.parentElement.getAttribute('id') === id) button.textContent = (menu.style.display === 'none') ? '+' : '-';
    }

    function setComboBoxEvent() {
        if (window.comboBoxEvent === undefined) window.comboBoxEvent = new Event('comboBoxEvent');

        if (window.comboBoxEvent instanceof (Event)) {
            document.addEventListener('click', function (e) {
                if (!widget.contains(e.target)) widget.dispatchEvent(window.comboBoxEvent);
            });
        }
    }

    function clearFieldHideMenu(e) {
        menu.style.display = 'none';
        As.forEach(A => A.style.display = 'flex');

        updateButton(e);
    }

    function updateInputField() {
        let selectedItems = [];
        let items = '';

        if (!isMultiSelect) {
            selectedItems = As.find(A => A.dataset.menuSelected === 'true');
            items = selectedItems.innerText;
            searchField.value = items;
            selectedItems.dataset.menuSelected = 'false';
        }

        if (isMultiSelect) {
            selectedItems = As.filter(A => A.dataset.menuSelected === 'true');

            if (selectedItems.length > 0) {
                let items = '';

                selectedItems.forEach((el, i) => {
                    if (i === selectedItems.length - 1) {
                        items += el.innerText;
                    } else {
                        items += el.innerText + ', ';
                    }
                });

                searchField.value = items;
            }

            if (selectedItems.length === 0) searchField.value = '';
        }
    }
}