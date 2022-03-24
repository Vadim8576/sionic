
import { AxiosResponse } from 'axios';
import { ProductsInBasket, Imgs, Product, Variations, Response, HistoriItemType } from '../types/types';

export const getIdsOfProducts = (products: []): number[] => products.map((product: Product) => product.id);


export const calcTotalItems = (response:  AxiosResponse<any, any>) => {
  let index: number = Number(response.headers['content-range'].indexOf('/'));
  let result:number = Number(response.headers['content-range'].slice(index + 1));
  return result;
}


export const saveBasketToStorage = (productsInBasket: ProductsInBasket) => {
  localStorage.setItem('BasketItems', JSON.stringify(productsInBasket));
}

export const loadBasketToStorage = () => {
  return JSON.parse(localStorage.getItem('BasketItems')) || [];
}

export const saveOrdersToStorage = (order: any) => {
  localStorage.setItem('Orders', JSON.stringify(order));
}

export const loadOrdersToStorage = () => {
  return JSON.parse(localStorage.getItem('Orders')) || [];
}



export const createProductList = (products: Product[], images: Imgs[], variations: Variations[]) => {
  return products?.map(product => {

    let img: Imgs[] = new Array();

    images.forEach((image: Imgs) => {
  
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


export const addProductToBasketHelp = (productsInBasket: ProductsInBasket[], dataForBasket: ProductsInBasket) => {
  let addNew = true;
  let items = [];
  // let variations = [];

console.log(dataForBasket)
  productsInBasket.length
    ? items = productsInBasket.map((product: ProductsInBasket) => {
      
      if (dataForBasket.product_id === product.product_id && dataForBasket.variations.id === product.variations.id) {
        product.count++;
        addNew = false;
      }
      return product;
    })
    : items = []
  return addNew ? [...items, dataForBasket] : items;
}


export const basketSum = (productsInBasket: ProductsInBasket[]): number => {
  if(!productsInBasket) return 0;
  let s: number = 0;
  productsInBasket.forEach((product: ProductsInBasket) => {
    s += product.variations.price * product.count
  })
  return s;
}

export const basketCount = (productsInBasket: ProductsInBasket[]): number => {
  if(!productsInBasket) return 0;
  let s: number = 0;
  productsInBasket.forEach((product: ProductsInBasket) => {
    s += product.count
  })
  return s;
}

export const historySum = (historiItem: HistoriItemType): number => {
  if(!historiItem) return 0;
  let s: number = 0;
  historiItem.products.forEach((product) => {
    s += product.variations.price * product.count
  })
  return s;
}

export const historyCount = (historiItem: HistoriItemType): number => {
  if(!historiItem) return 0;
  let s: number = 0;
  historiItem.products.forEach((product) => {
    s += product.count
  })
  return s;
}