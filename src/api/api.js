import * as axios from 'axios';

// создаем настройки axios
const instanse = axios.create({
    baseURL: 'https://test2.sionic.ru/api/'
});


export const productsAPI = {

    getProducts(currentCategory = '', currentRange = '') {
        let params = '';

        let range = (currentRange - 50).toString();
        range += ','+(currentRange - 1).toString();

        if(currentCategory) params = `filter={"category_id":[${currentCategory}]}`;
        if(currentRange) params += `&range=[${range}]`;
        
        // filter={"category_id":21}&range=[51,100]
        // filter={"category_id":21]}&range[0,50];

        console.log(params)
        return instanse
            .get(`products?${params}`)
            .then(response => {
                return response;
            })
    },
    getProductsImages(params = '') {
        params = `filter={"product_id":[${params}]}`;
        return instanse
            .get(`productImages?${params}`)
            .then(response => {
                return response.data
            })
    },
    getCategories(params = '') {
        console.log('getCategories')
        return instanse
            .get(`Categories?${params}`)
            .then(response => {
                return response.data
            })
    },
    getProductVariations(params = '') {
        params = `filter={"product_id":[${params}]}`;

        
        return instanse
            .get(`ProductVariations?${params}`)
            .then(response => {
                return response.data
            })
    }
}


