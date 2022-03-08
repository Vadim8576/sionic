import * as axios from 'axios';

const instanse = axios.create({
    baseURL: 'https://test2.sionic.ru/api/'
});


export const productsAPI = {
    getProducts(currentCategory = '', currentRange = '') {
        let params = '';
        if(currentCategory) params = `filter={"category_id":[${currentCategory}]}`;
        if(currentRange) {
            let range = (currentRange - 50).toString();
            range += ',' + (currentRange - 1).toString();
            params += `&range=[${range}]`;
        }
        
        // filter={"category_id":21}&range=[51,100]
        // filter={"category_id":21]}&range[0,50];

        console.log(params)

        return instanse
            .get(`products?${params}`)
            .then(response => {
                return response;
            })
    },
    getProductsImages(params = '', rangeQuery = '') {
        params = `${rangeQuery}&filter={"product_id":[${params}]}`;

        return instanse
            .get(`productImages?${params}`)
            .then(response => {
                return response
            })
    },
    getCategories(params = '') {
        return instanse
            .get(`Categories`)
            .then(response => {
                return response.data
            })
    },
    getProductVariations(params = '', rangeQuery = '') {
        params = `${rangeQuery}&filter={"product_id":[${params}]}`;
        
        return instanse
            .get(`ProductVariations?${params}`)
            .then(response => {
                return response
            })
    }
}


