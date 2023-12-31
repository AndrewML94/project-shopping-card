// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
const getIdFromProductItem = (product) => product.querySelector('.item_id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */

const itemsSection = document.querySelector('.items');
const cartOl = document.querySelector('.cart__items');
const total = document.querySelector('.total-price');
const productsInCart = [];

const purchaseValue = () => {
  const cartLi = document.querySelectorAll('.cart__item');
  const listOfItems = Array.from(cartLi);
  const price = listOfItems.reduce((e, curr) => e + Number(curr.innerText.split('$')[1]), 0);
  total.innerText = price;
};

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', () => {
    cartOl.removeChild(li);
    purchaseValue();
  });
  productsInCart.push(li.innerText);
  saveCartItems(productsInCart);
  return li;
};

const removeLoading = () => {
  const pLoading = document.querySelector('.loading');
  itemsSection.removeChild(pLoading);
};

const showcase = async () => {
  await fetchProducts('computador').then(({ results }) => {
    results.forEach((element) => {
      itemsSection.appendChild(createProductItemElement(element));
    });
  });
  removeLoading();
};

const captureId = async (element) => {
  cartOl.append(createCartItemElement(await
    fetchItem(getIdFromProductItem(element.target.parentNode))));
  purchaseValue();
};

const shoppingCart = () => {
  const shoppingCartBtn = document.querySelectorAll('.item__add');
  shoppingCartBtn.forEach((btn) => btn.addEventListener('click', captureId));
};

const restoreShoppingCart = () => {
  if (localStorage.getItem('cartItems')) {
    const result = JSON.parse(getSavedCartItems());
    result.forEach((a) => {
      const li = document.createElement('li');
      li.innerText = a;
      cartOl.appendChild(li);
      li.addEventListener('click', () => cartOl.removeChild(li));
    });
  }
};

const clearButton = () => {
  const clearBtn = document.querySelector('.empty-cart');
  clearBtn.addEventListener('click', () => {
    cartOl.innerHTML = '';
    localStorage.clear();
  });
};

window.onload = async () => {
  await showcase();
  shoppingCart();
  restoreShoppingCart();
  clearButton();
  purchaseValue();
};
