'use strict';
import comboBox from './combobox.js';

const fruitsArr = ['Apple', 'Apricot', 'Banana', 'Blueberry', 'Cantaloupe', 'Cherry', 'Coconut', 'Date', 'Grape', 'Guava', 'Jackfruit', 'Kiwi', 'Kumquat', 'Lemon', 'Mango', 'Nectarine', 'Orange', 'Papaya', 'Parsimmon', 'Pear', 'Peach', 'Pinapple', 'Pomegranate', 'Raspberry', 'Strawberry', 'Sugar Cane'];

comboBox('fruits1Menu', fruitsArr); // single select
comboBox('fruits2Menu', fruitsArr); // multiple select
comboBox('fruits3Menu', fruitsArr, true); // multiple select