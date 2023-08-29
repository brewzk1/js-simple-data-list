'use strict';
import comboBox from './combobox.js';

const veggiesArr = ['Tomato', 'Lettuce', 'Carrot', 'Beets'];
const fruitsArr = ['Apple', 'Apricot', 'Banana', 'Blueberry', 'Cantaloupe', 'Cherry', 'Coconut', 'Date', 'Grape', 'Guava', 'Jackfruit', 'Kiwi', 'Kumquat', 'Lemon', 'Mango', 'Nectarine', 'Orange', 'Papaya', 'Parsimmon', 'Pear', 'Peach', 'Pinapple', 'Pomegranate', 'Raspberry', 'Strawberry', 'Sugar Cane'];


comboBox('fruitsMenu', fruitsArr);
comboBox('veggiesMenu', veggiesArr);

// TODO single (default): clicking 1 item should close menu
// TODO multiple: allow for it (ie menu stays open w scroll bar)
// TODO multiple: optionally show check for selected items