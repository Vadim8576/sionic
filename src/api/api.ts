// import * as axios from 'axios';
import axios from 'axios';

const instanse = axios.create({
    baseURL: 'https://test2.sionic.ru/api/'
});


export const productsAPI = {
    async getProducts(currentCategory = null, currentRange = null) {
        const currentCategoryStr = currentCategory ? currentCategory.toString() : '';
        let params = '';
        if(currentCategory) params = `filter={"category_id":[${currentCategoryStr}]}`;
        if(currentRange) {
            let range = (currentRange - 50).toString();
            range += ',' + (currentRange - 1).toString();
            params += `&range=[${range}]`;
        }
        
        const response = await instanse.get(`products?${params}`);
        return response;
    },
    async getProductsImages(params = [], rangeQuery = '') {
        const paramsStr = `${rangeQuery}&filter={"product_id":[${params}]}`;

        const response = await instanse.get(`productImages?${paramsStr}`);
        return response;
    },
    async getCategories(params = '') {
        const response = await instanse.get(`Categories`);
        return response.data;
    },
    async getProductVariations(params = [], rangeQuery = '') {
        const paramsStr = `${rangeQuery}&filter={"product_id":[${params}]}`;
        
        const response = await instanse.get(`ProductVariations?${paramsStr}`);
        return response;
    }
}


