'use strict';
/**********************************************************/
/*                         indexedDB                      */
/**********************************************************/
//Datenbank öffnen
const dbRequest = window.indexedDB.open("myDB", 1);
let db = null;

//Datenbank Eventhandling
dbRequest.addEventListener("upgradeneeded", (event) => {
  console.log("upgradeneedet");
  db = event.target.result;

  let objectStore = db.createObjectStore("produkte", {
    keyPath: "id",
    autoIncrement: true,
  });
});

dbRequest.addEventListener("success", (event) => {
  console.log("success");
  db = event.target.result;

});

dbRequest.addEventListener("error", (event) => {
  console.log(event.target.error);
});

// Transaction
function makeTransaction(storeName, mode, callback = null) {
  let transaction = db.transaction(storeName, mode);
  transaction.addEventListener('error', (event) => {
    console.log(event.target.error);
  });
  transaction.addEventListener('complete', (event) => {
    console.log('Transaction Erfolgreich');
    if(typeof callback === "function") callback();
  });

  return transaction.objectStore(storeName);
}

// Produkt abfrage

  function loadProducts() {
    setTimeout(() => {
    let products = makeTransaction('produkte', "readonly");
    let request = products.getAll();
    request.addEventListener('success', (event) => {
      event.preventDefault();
      if (request.result.length === 0) {
        console.log("keine Produkte");
      } else {
      newElement();
      };
    });
  }, 500);
    };

// Einen Datensatz anzeigen (zum bearbeiten)
function showProducts(productId) {
  let products = makeTransaction("produkte", "readonly");
  let request = products.get(productId);
  request.addEventListener("success", (event) => {
    let data = event.target.result;
    document.querySelector('#myForm').setAttribute("data-key", data.id);
    document.querySelector('#myInput').value = data.title;
    document.querySelector('#myInput2').value = data.price;
  });
  request.addEventListener("error", (event) => {
    console.log(event.target.error);
  });
}

// Neuen Datensatz
document.querySelector("#add_btn").addEventListener('click', (event) => {
  event.preventDefault();

  let newProduct = {
    title: document.querySelector('#myInput').value.trim(),
    price: document.querySelector('#myInput2').value.trim()
  };

  let products = makeTransaction("produkte", "readwrite");
  if(document.querySelector("#myForm").hasAttribute("data-key")) {

  }
  else{
  let request = products.add(newProduct);
  request.addEventListener("success", (event) => {
    console.log(event.target.result);
    // Formular mit Funktion zurücksetzen
    document.querySelector('#myForm').reset();
    document.getElementById("myInput").select();
    newElement();
  });
  request.addEventListener("error", (event) => {
    console.log(event.target.error);
  }); };
});

// Datensatz löschen
function deleteProduct() {
    let list = document.querySelector("li");
    let productId = list.getAttribute("data-key");

    let products = makeTransaction("produkte", "readwrite");
    let request = products.delete(parseInt(productId));
    request.addEventListener("success", (event) => {
      document.querySelector(`li[data-key="${productId}"]`).remove();
      list.removeAttribute("data-key");
      console.log("Erfolgreich gelöscht");
    });
    request.addEventListener("error", (event) => {
      console.log(event.target.error);
    });
 
};

// Datensatz aktualisieren
document.querySelector("#add_btn").addEventListener('click', (event) => {
  event.preventDefault();
  let form = document.querySelector("#myForm");
  if(form.hasAttribute("data-key")) {
    let productId = form.getAttribute("data-key");

    let product = {
      id: parseInt(productId),
      title: document.querySelector("#myInput").value.trim(),
      price: document.querySelector("#myInput2").value.trim()
    };

    let products = makeTransaction("produkte", "readwrite");
    let request = products.put(product);
    request.addEventListener("success", (event) => {
      document.querySelector(`li[data-key="${productId}"]`).innerHTML = `<li>${product.title}</li>`;
      document.querySelector("#myForm").removeAttribute("data-key");
      document.querySelector('#myForm').reset();
      document.getElementById("myInput").select();
      newElement();
    });
    request.addEventListener("error", (event) => {
      console.log(event.target.error);
    });
  }
});
/**********************************************************/
/*                Produkt Liste Erstellen                 */
/**********************************************************/

// Alle Datensätze anzeigen (für Liste)
function newElement() {

  let products = makeTransaction('produkte', "readonly");
  let request = products.getAll();
  request.addEventListener('success', (event) => {

    event.preventDefault();
    document.querySelector('#product-list').innerHTML = "";
    let data = event.target.result;
    data.forEach((element) => {

  /*-----------Elemente Kreieren------------*/
  let li = document.createElement("li");
  let edit = document.createElement('i');
  let spanPrimary = document.createElement('span');
  let inputLabel = document.createElement('label');
  let productName = document.createElement('span');
  let productPrice = document.createElement('span');
  let spanSecondary = document.createElement('span');
  let checkBox = document.createElement('input');
  let closeBtn = document.createElement("span");
  /*-----------Elemente einfügen------------*/
  li.setAttribute('data-key', element.id);
  productName.appendChild(document.createTextNode(element.title));
  productPrice.appendChild(document.createTextNode(element.price));
  spanPrimary.appendChild(productName);
  spanPrimary.appendChild(productPrice);
  inputLabel.appendChild(checkBox);
  spanSecondary.appendChild(inputLabel);
  li.appendChild(edit);
  li.appendChild(spanPrimary);
  li.appendChild(spanSecondary);
  li.appendChild(closeBtn);
  /*-----------Elemente klassifizieren------------*/
  li.className = "mdl-list__item mdl-shadow--2dp";
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

  componentHandler.upgradeElement(li);
  let list = document.getElementById("product-list").appendChild(li);

// Füge die "edit" Funtion hinzu
let editieren = document.getElementsByClassName("icon-edit-document");
for (let i = 0; i < editieren.length; i++) {
  editieren[i].onclick = function() {
    showProducts(element.id);
  }
}

// Füge die "close" Button Funktion hinzu
  let close = document.getElementsByClassName("hiding-list-item");
  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      deleteProduct();
    }
  }

// Funktion für die Summierung der Produkt Preise
  let produktPreis = element.price
  sumPrice(produktPreis);

    
    }); 
});
request.addEventListener('error', (event) => {
  console.log(event.target.error);
});
}/*-------------------Ende createElement----------------*/

// Funktion Summierung 
function sumPrice(produktPreis) {
let sum = [];
console.log(produktPreis);
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



document.addEventListener('DOMContentLoaded', catchEnter);
window.addEventListener('load', loadProducts);

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
  // Daten mit dem Server neu synchronisieren.
  console.log("Du bist online");
}, false);

window.addEventListener('offline', function(e) {
  // Ereignisse für den Server in die Warteschlange stellen.
  console.log("Du bist offline");
}, false);

