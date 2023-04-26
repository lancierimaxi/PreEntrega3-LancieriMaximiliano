///////////////////////INICIO INGRESO/////////////////////////
class Miembro {

  constructor(nombre, correo, contrasenia) {

      this.nombre = nombre;
      this.correo = correo;
      this.contrasenia = contrasenia;

  }
  toString() {

      return this.nombre;

  }
}

let formLogIn = document.querySelector("#formLogIn");
let nombreLogIn = document.querySelector("#nombreLogIn");
let correoLogIn = document.querySelector("#correoLogIn");
let contraseniaLogIn = document.querySelector("#contraseniaLogIn");
let resumenLogIn = document.querySelector("#resumenLogIn");


let usuarioIngresar = JSON.parse(sessionStorage.getItem("UsuarioMiembro")) ?? [];

if (usuarioIngresar.length > 0) {

  resumenLogIn.innerText = ("\nBienvenido." + "\n\n" + "Fecha: " + now.toLocaleString(DateTime.DATETIME_MED) + "\n" + "Nombre: " + (usuarioIngresar.nombre).toUpperCase() + "\n" + "Apellido: " + (usuarioIngresar.correo).toUpperCase() + "\n" + "Correo Electrónico: ");

}

formLogIn.addEventListener("submit", (event) => {

  event.preventDefault();

  if ((nombreLogIn.value !== "") && (correoLogIn.value !== "") && (contraseniaLogIn.value !== "")) {


      resumenLogIn.innerText = ("\nBIENVENIDO");

      let usuarioIngresar = new Miembro(nombreLogIn.value, correoLogIn.value, contraseniaLogIn.value);

      setTimeout(() => {

          resumenLogIn.innerText = "";

      }, 5000);

      Swal.fire({

          position: 'top-end',
          icon: 'success',
          title: 'Datos enviados correctamente.',
          showConfirmButton: false,
          timer: 2500

      })

      sessionStorage.setItem('UsuarioMiembro', JSON.stringify(usuarioIngresar));

      nombreLogIn.focus();
      formLogIn.reset();

  } else {

      resumenLogIn.innerText = ("\nDebes introducir todos los datos correctamente.");

      setTimeout(() => {

          resumenLogIn.innerText = "";

      }, 5000);

      Swal.fire({

          icon: 'error',
          title: 'Error!',
          text: 'Debes introducir todos los datos correctamente.',
          timer: 2500

      })

      nombreLogIn.focus();
      formLogIn.reset();

  }

})
////////////////////////////FIN INGRESO///////////////////////////////////////
////////////////////////////INICIO STORE//////////////////////////////////////
const addToShoppingCartButtons = document.querySelectorAll('.addToCart');
addToShoppingCartButtons.forEach((addToCartButton) => {
  addToCartButton.addEventListener('click', addToCartClicked);
});

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);

const shoppingCartItemsContainer = document.querySelector(
  '.shoppingCartItemsContainer'
);

function addToCartClicked(event) {
  const button = event.target;
  const item = button.closest('.item');

  const itemTitle = item.querySelector('.item-title').textContent;
  const itemPrice = item.querySelector('.item-price').textContent;
  const itemImage = item.querySelector('.item-image').src;

  addItemToShoppingCart(itemTitle, itemPrice, itemImage);
}

function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {
  const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
    'shoppingCartItemTitle'
  );
  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === itemTitle) {
      let elementQuantity = elementsTitle[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        '.shoppingCartItemQuantity'
      );
      elementQuantity.value++;
      $('.toast').toast('show');
      updateShoppingCartTotal();
      return;
    }
  }

  const shoppingCartRow = document.createElement('div');
  const shoppingCartContent = `
  <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImage} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
  shoppingCartRow.innerHTML = shoppingCartContent;
  shoppingCartItemsContainer.append(shoppingCartRow);

  shoppingCartRow
    .querySelector('.buttonDelete')
    .addEventListener('click', removeShoppingCartItem);

  shoppingCartRow
    .querySelector('.shoppingCartItemQuantity')
    .addEventListener('change', quantityChanged);

  updateShoppingCartTotal();
}

function updateShoppingCartTotal() {
  let total = 0;
  const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
      '.shoppingCartItemPrice'
    );
    const shoppingCartItemPrice = Number(
      shoppingCartItemPriceElement.textContent.replace('$' , '')
    );
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
      '.shoppingCartItemQuantity'
    );
    const shoppingCartItemQuantity = Number(
      shoppingCartItemQuantityElement.value
    );
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
  });
  shoppingCartTotal.innerHTML = `${total} $`;
}

function removeShoppingCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest('.shoppingCartItem').remove();
  updateShoppingCartTotal();
}

function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  updateShoppingCartTotal();
}

function comprarButtonClicked() {
  shoppingCartItemsContainer.innerHTML = '';
  updateShoppingCartTotal();
}
////////////////////////////////////////FIN STORE//////////////////////////////////////////////