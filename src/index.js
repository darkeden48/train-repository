import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/confirm/dist/PNotifyConfirm.css';
import country from './templates/country.hbs'

const debounce = require("lodash.debounce");

const form = document.querySelector('form')
const container = document.querySelector('.container');
const input = document.querySelector('.input');
const list = document.querySelector('.list');

function countrySearch(){  
    const value = input.value;
    console.log(input.value);
return fetch(`https://restcountries.com/v2/name/${value}`)
.then(response=>{return response.json()})
.then(data=>{
    if (data.length<2) {
        pnotify();
        return
        }
    if(data.length>0) {
    data.map(el=>{
        if (data.indexOf(el)<10) {
        list.insertAdjacentHTML('beforeend',`<li class='pick-item'>${el.name}</li>`)
        }
    })
}}
)}
function clicker(e){
    const searchQuery = e.target.textContent;
    form.value = searchQuery;
    container.innerHTML = '';
    list.innerHTML = '';
    fetch(`https://restcountries.com/v2/name/${searchQuery}`)
.then(response=>{return response.json()})
.then(data=>{return data[0]})
.then(data=>{return container.innerHTML = country(data)})
}
function pnotify() {
    error({
      text: 'Too many matches found. Please enter a more specific query!',
      maxTextHeight: null,
      delay: 3000,
    });
  }
list.addEventListener('click', clicker);
input.addEventListener('input', debounce(countrySearch,500));
