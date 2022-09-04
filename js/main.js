/**********************************************************/
/*               Produkt Item / MongoDB                   */
/**********************************************************/
let product = {
  productName: 'Kaffe',
  productPrice: '3,99'
};

/**********************************************************/
/*               Produkt Item / MongoDB                   */
/**********************************************************/
// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.className = "mdl-list__item";
  //li.appendChild(t);
  if (inputValue === '') {
    //show error Message
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  /*-----------Elemente Kreieren------------*/
  var edit = document.createElement('i');
  var spanPrimary = document.createElement('span');
  var inputLabel = document.createElement('label');
  var productName = document.createElement('span');
  var spanSecondary = document.createElement('span');
  var checkBox = document.createElement('input');

  /*-----------Element Klassen------------*/
  spanPrimary.className = "mdl-list__item-primary-content";
  spanSecondary.className = "mdl-list__item-secondary-action";
  inputLabel.className = "mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect"; 
  productName.className = 'product-text';
  checkBox.className = "mdl-checkbox__input";
/*-----------Primary------------*/
  li.appendChild(edit);
  li.appendChild(spanPrimary);
  spanPrimary.appendChild(productName);
  productName.appendChild(t);
  

  /*-----------Secondary------------*/
  li.appendChild(spanSecondary);
  spanSecondary.appendChild(inputLabel);
  inputLabel.appendChild(checkBox);
  checkBox.setAttribute('id', 'my-id');
  checkBox.setAttribute('type', 'checkbox');

// Add a "edit" symbol when clicking on a list item
edit.className = "material-symbols-outlined icon-edit-document";
edit.textContent = 'edit_document';
for (i = 0; i < edit.length; i++) {
  edit[i].onlick = function() {
    //updateItemPreisinDB
  }
}
/*-------------Close Button-------------*/
// Hinzufügen des Close Button
  document.getElementById("myInput").value = "";
  var span = document.createElement("span");
  span.className = "material-symbols-outlined";
  span.className += " hiding-list-item";
  span.textContent = 'cancel';
  li.appendChild(span);
// Funktion close Button
  var close = document.getElementsByClassName("hiding-list-item");
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }

  /*-------------Event Handler-------------*/
var pressEnter = document.getElementById("myInput");
pressEnter.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("add_btn").click();
  }
});
}