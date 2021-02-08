'use strict';

import '@babel/polyfill';
import 'nodelist-foreach-polyfill';
import 'formdata-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'es6-promise';
import 'fetch-polyfill';
import ('element-remove');

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import commandPhoto from './modules/commandPhoto';
import getCalc from './modules/getCalc';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

// Timer
countTimer('22 Marсh 2023');
// Menu
toggleMenu();
// popup
togglePopUp();
// Tabs
tabs();
// Slider
slider();
// Hover change photo command
commandPhoto();
// Calc validation
getCalc();
// Calc
calc(100);
// Send-form
sendForm();