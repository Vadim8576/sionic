export const getIdsOfProducts = (products) => products.map(product => product.id);


export const calcTotalItems = (response) => {
    let index = response.headers['content-range'].indexOf('/');
    let result = response.headers['content-range'].slice(index + 1);
    return result;
  }