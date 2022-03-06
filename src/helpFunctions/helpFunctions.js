export const getIdsOfProducts = (products) => products.map(product => product.id);


export const calcTotalItems = (response) => {
  let index = response.headers['content-range'].indexOf('/');
  let result = response.headers['content-range'].slice(index + 1);
  return result;
}



export const setProductImages = (products, images) => products.map((product, index) => {
  product.imgs = images[index];
  return product;
})

export const setProductVariations = (products, variations) => products.map((product, index) => {
  product.variations = variations[index];
  return product;
})


export const saveBasketToStorage = (productsInBasket) => {
  localStorage.setItem('BasketItems', JSON.stringify(productsInBasket));	
}

export const loadBasketToStorage = () => {
  return JSON.parse(localStorage.getItem('BasketItems')) || [];
}

    