export const getIdsOfProducts = (products) => products.map(product => product.id);


export const calcTotalItems = (response) => {
  let index = response.headers['content-range'].indexOf('/');
  let result = response.headers['content-range'].slice(index + 1);
  return result;
}


export const saveBasketToStorage = (productsInBasket) => {
  localStorage.setItem('BasketItems', JSON.stringify(productsInBasket));
}

export const loadBasketToStorage = () => {
  return JSON.parse(localStorage.getItem('BasketItems')) || [];
}

export const saveOrdersToStorage = (order) => {
  localStorage.setItem('Orders', JSON.stringify(order));
}

export const loadOrdersToStorage = () => {
  return JSON.parse(localStorage.getItem('Orders')) || [];
}





export const createProductList = (products, images, variations) => {
  return products?.map(product => {
    let img = [];
    images.forEach(image => {
      if (product.id === image.product_id) img.push(image)
    })
    product.imgs = [...img]

    let variat = [];
    variations.forEach(variation => {
      if (product.id === variation.product_id) variat.push(variation)
    })
    product.variations = [...variat]

    return product
  })
}


export const addProductToBasketHelp = (productsInBasket, dataForBasket) => {
  let addNew = true;
  let items = [];
  let variations = [];

  productsInBasket.length
    ? items = productsInBasket.map(product => {
      if (dataForBasket.product_id === product.product_id && dataForBasket.variations.id === product.variations.id) {
        product.count++;
        addNew = false;
      }
      return product;
    })
    : items = []
  return addNew ? [...items, dataForBasket] : items;
}


export const basketSum = (productsInBasket) => {
  if(!productsInBasket) return 0;
  let s = 0;
  productsInBasket.forEach(product => {
    s += product.variations.price * product.count
  })
  return s;
}

export const basketCount = (productsInBasket) => {
  if(!productsInBasket) return 0;
  let s = 0;
  productsInBasket.forEach(product => {
    s += product.count
  })
  return s;
}