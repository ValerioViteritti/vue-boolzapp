// Funzione per verificare se la parola è palindroma
function Palindromo(parola) {
    // Confronta la parola con la sua versione invertita
    return parola === parola.split('').reverse().join('');
   
}

// Funzione per determinare se il numero è pari

function Pari(num) {
    return num % 2 === 0;
}

/* mylibrary.js */

/**
 * Funzioni di utilità per la manipolazione del DOM
 */

// Selettore di elementi
function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}

// Aggiungere una classe a un elemento
function addClass(element, className) {
    element.classList.add(className);
}

// Rimuovere una classe da un elemento
function removeClass(element, className) {
    element.classList.remove(className);
}

// Impostare il testo di un elemento
function setText(element, text) {
    element.textContent = text;
}

// Impostare l'HTML di un elemento
function setHTML(element, html) {
    element.innerHTML = html;
}

// Impostare un attributo su un elemento
function setAttr(element, attr, value) {
    element.setAttribute(attr, value);
}

// Ottenere un attributo da un elemento
function getAttr(element, attr) {
    return element.getAttribute(attr);
}

/**
 * Funzioni di utilità per la gestione degli eventi
 */

// Aggiungere un event listener a un elemento
function on(element, event, handler) {
    element.addEventListener(event, handler);
}

// Rimuovere un event listener da un elemento
function off(element, event, handler) {
    element.removeEventListener(event, handler);
}

// Eseguire una funzione quando il DOM è pronto
function ready(handler) {
    document.addEventListener('DOMContentLoaded', handler);
}

/**
 * Funzioni di utilità per AJAX
 */

// Eseguire una richiesta GET
function get(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.responseText);
        }
    };
    xhr.send();
}

// Eseguire una richiesta POST
function post(url, data, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.responseText);
        }
    };
    xhr.send(JSON.stringify(data));
}

/**
 * Funzioni di utilità per la manipolazione degli array
 */

// Rimuovere un elemento da un array
function removeFromArray(array, element) {
    const index = array.indexOf(element);
    if (index > -1) {
        array.splice(index, 1);
    }
}

// Ottenere un array senza duplicati
function uniqueArray(array) {
    return [...new Set(array)];
}

/**
 * Altre funzioni di utilità
 */

// Formattare una data come stringa
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Generare un numero casuale tra min e max (inclusi)
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

