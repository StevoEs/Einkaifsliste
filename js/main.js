'use strict';
/**********************************************************/
/*                   Produkt Item List                    */
/**********************************************************/
// Create a new list item when clicking on the "Add" button
function newElement() {
  let li = document.createElement("li");
  li.className = "mdl-list__item mdl-shadow--2dp";

  let inputValue = document.getElementById("myInput").value;
  let inputValuePrice = document.getElementById("myInput2").value;

  if (inputValue === '') {
    //show error Message
  } else {
    componentHandler.upgradeElement(li);
    document.getElementById("product-list").appendChild(li);

  }

  /*-----------Elemente Kreieren------------*/
  let edit = document.createElement('i');
  let spanPrimary = document.createElement('span');
  let inputLabel = document.createElement('label');
  let productName = document.createElement('span');
  let productPrice = document.createElement('span');
  let spanSecondary = document.createElement('span');
  let checkBox = document.createElement('input');
  let closeBtn = document.createElement("span");
  /*-----------Elemente einfügen------------*/
  productName.appendChild(document.createTextNode(inputValue));
  productPrice.appendChild(document.createTextNode(inputValuePrice + "€"));
  spanPrimary.appendChild(productName);
  spanPrimary.appendChild(productPrice);
  inputLabel.appendChild(checkBox);
  spanSecondary.appendChild(inputLabel);
  li.appendChild(edit);
  li.appendChild(spanPrimary);
  li.appendChild(spanSecondary);
  li.appendChild(closeBtn);
  /*-----------Elemente klassifizieren------------*/
  edit.className = "material-symbols-outlined icon-edit-document";
  edit.textContent = 'edit_document';
  spanPrimary.className = "mdl-list__item-primary-content";
  spanSecondary.className = "mdl-list__item-secondary-action";
  inputLabel.className = "mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect"; 
  productName.className = 'product-text';
  productPrice.className = 'product-preis';
  checkBox.className = "mdl-checkbox__input";
  checkBox.setAttribute('id', 'my-id');
  checkBox.setAttribute('type', 'checkbox');
  closeBtn.className = "material-symbols-outlined hiding-list-item";
  closeBtn.textContent = 'cancel';


// Add a "edit" symbol when clicking on a list item
let editieren = document.getElementsByClassName("icon-edit-document");
for (let i = 0; i < editieren.length; i++) {
  editieren[i].onlick = function() {
    console.log('Produkt editieren');
  }
}

// Funktion close Button
  let close = document.getElementsByClassName("hiding-list-item");
  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      let div = this.parentElement;
      div.style.display = "none";
    }
  }

/*------------------Summe----------------*/
  let outputSumme = document.getElementById("summe");
  outputSumme = parseFloat(inputValuePrice);
  let sum = [];
  sum.push(outputSumme);
  console.log(sum);
}

/*-------------------Events----------------*/
function catchEnter() {
  const pressEnter = document.getElementById("myInput");
  pressEnter.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("add_btn").click();
    }
  });
  const pressEnter2 = document.getElementById("myInput2");
  pressEnter2.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("add_btn").click();
    }
  });
}

function clearField() {
  document.getElementById("myInput").value = "";
  document.getElementById("myInput2").value = "";
}

/**********************************************************/
/*                      service worker                    */
/***********************************************************/
 
// Registrierung von service worker.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service.js').then(function(reg) {
      console.log('Service worker wurde erfolgreich ausgeführt', reg);
  }).catch(function(err) {
      console.warn('Fehler beim erstellen vom service worker', err);
  });
}

window.addEventListener('online', function(e) {
  // Resync data with server.
  console.log("Du bist online");
}, false);

window.addEventListener('offline', function(e) {
  // Queue up events for server.
  console.log("Du bist offline");
}, false);


let addButton = document.getElementById("add_btn");
addButton.addEventListener("click", clearField);

//document.addEventListener('DOMContentLoaded', init);
document.addEventListener('DOMContentLoaded', catchEnter);
