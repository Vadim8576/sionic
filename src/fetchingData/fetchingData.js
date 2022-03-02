
import { productsAPI } from '../api/api';

export const fetchingData = (currentRange) => {

    let isFetching = true;

    let categories, currentCategory, productTotal, products, images, productVariations,
    error = 'Что-то пошло не так!';
    
    
    let data = {};

    const getProducts = (params) => productsAPI.getProducts(params).then(resolve => resolve)

    const getCategories = new Promise((resolve, reject) => resolve(productsAPI.getCategories(currentRange)))
    .then(categories => {
        console.log(categories)
        return [getProducts(categories[0]), categories]
    }).then(resolve => {
        console.log(resolve)
        const categoriesAndProducts = {product: resolve[0], categories: resolve[1]}
        return [productsAPI.getProductsImages(idsOfProducts(resolve[1])), productsAPI.getProductVariations(idsOfProducts(resolve[1])), categoriesAndProducts ]
    })


    // const getProducts = new Promise((resolve, reject) => resolve(productsAPI.getProducts()))

    // const getProductsImages = new Promise((resolve, reject) => resolve(productsAPI.getProductsImages()))
    // const getProductVariations = new Promise((resolve, reject) => resolve(productsAPI.getProductVariations()))

    return Promise.all([getCategories])
    .then(resolve => resolve)
    .catch(err => console.log('ОШИБКА!', err))


    let getData = productsAPI.getCategories();

    // getData
    // .then((response) => {
    //     categories = response;
    //     currentCategory = response[0].id
    //     data = {...data, categories};
    //     console.log(data)
    //   return [getProducts(currentCategory), categories];
    // })
    // .then((response) => {
    //     let getProducts = response[0];
    //     let categories = response[1];

    //     console.log(getProducts)
    //     productTotal = calcProductTotal(getProducts);

    //     products = response.data;

    //     data = {...data, products};

    //     console.log(data)
    //   return [getProductsImages(products), categories, ];
    // })
    // .then((response) => {
    //   console.log(data);
    //   return getProductVariations(products);
    // })
    // .catch((error) => {
    //   console.log(error);  // Promise3 отклонен
    // });






 
    getData
    .then(response => {
        categories = response;
        currentCategory = response[0].id
        data = {...data, categories};
        console.log(data)
        return productsAPI.getProducts(currentCategory)
    })
    .then(response => {
      
        productTotal = calcProductTotal(response);
        products = response.data;
        data = {...data, products};
        console.log(data)
        return [productsAPI.getProductsImages(idsOfProducts(products)), productsAPI.getProductVariations(idsOfProducts(products))]
    })
    .then(response => {
        response[0]
        .then(response => data = {...data, images: [...response]})
        .then(response => data = {...data, productVariations: [...response]})
        console.log(response[0])
        console.log(response[1])


        return [response[0], response[1]]
    })

   
    console.log(getData)


    return data
}


const calcProductTotal = (response) => {
 
    let index = response.headers['content-range'].indexOf('/');
    let result = response.headers['content-range'].slice(index + 1);
    return result;
}

const idsOfProducts = (products) => products.map(product => product.id);


