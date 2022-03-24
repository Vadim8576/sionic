import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { productsAPI } from "../api/api";
import { calcTotalItems, getIdsOfProducts } from "../helpFunctions/helpFunctions";
import { ProductsAction, Query } from "../types/types";
import { setCategoriesActionCreator, setCurrentCategoryActionCreator, setImagesActionCreator, setNewProductsActionCreator, setProductsActionCreator, setProductsVariationsActionCreator, setProductTotalActionCreator, setIsLoadingActionCreator } from './actionCreators';



export const fetchingCategories = (params: string = '') => async (dispatch: Dispatch<ProductsAction>) => {

    let categories: any[];

    await productsAPI.getCategories(params)
        .then((response: any[]) => {
            categories = response;
            dispatch(setCategoriesActionCreator(categories));
        })
        .catch((e: EventTarget) => {
            console.log('Не удалось получить категории')
        })

    let currentCategoriesId: number;
    // Если категория еще не установлена (первый запуск)
    if (!params) {
        currentCategoriesId = categories[0].id
        dispatch(setCurrentCategoryActionCreator(currentCategoriesId));
    } else {
        currentCategoriesId = Number(params)
    }

}


export const fetchingProducts = (query: Query) => async (dispatch: Dispatch<ProductsAction> | any) => {

    let products: any;
    let { currentCategory, currentRange, queryType } = query;

    await productsAPI.getProducts(currentCategory, currentRange)
        .then((response) => {

            products = response;
            if (queryType === 'NEW') {
                dispatch(setNewProductsActionCreator(products.data));
            }
            if (queryType === 'ADD') {
                dispatch(setProductsActionCreator(products.data));
            }
        })
    
    dispatch(setIsLoadingActionCreator(true));
    dispatch(setProductTotalActionCreator(calcTotalItems(products)));
    dispatch(fetchingImages(getIdsOfProducts(products.data)));
    dispatch(fetchingProductsVariations(getIdsOfProducts(products.data)));
}



export const fetchingImages = (params: number[]) => async (dispatch: Dispatch<ProductsAction>) => {

    let dataIsFetching: boolean = true;
    let range: number = 0;
    let arr: any[] = []

    while (dataIsFetching) {
        let rangeQuery: string = `range=[${range},${range + 49}]`
        await productsAPI.getProductsImages(params, rangeQuery)
            .then((response: AxiosResponse<any, any>) => {
                
                let count = calcTotalItems(response)
                arr.push(...response.data)
                if (arr.length >= count) dataIsFetching = false;
            })
            .catch((e: EventTarget) => {
                dataIsFetching = false;
                console.log('Ошибка получения изображений', e)
            })
        range += 50;
    }
    !dataIsFetching && dispatch(setImagesActionCreator(arr));
}

export const fetchingProductsVariations = (params: number[]) => async (dispatch: Dispatch<ProductsAction>) => {
    let dataIsFetching: boolean = true;
    let range: number = 0;
    let arr: any[] = [];

    while (dataIsFetching) {
        let rangeQuery: string = `range=[${range},${range + 49}]`
        await productsAPI.getProductVariations(params, rangeQuery)
            .then((response: AxiosResponse<any, any>) => {
                let count = calcTotalItems(response)
                arr.push(...response.data)
                if (arr.length >= count) dataIsFetching = false;
            }).catch(e => {
                dataIsFetching = false;
                console.log('Ошибка получения вариаций', e)
            })
        range += 50;
    }
    !dataIsFetching && dispatch(setProductsVariationsActionCreator(arr));
    !dataIsFetching && dispatch(setIsLoadingActionCreator(false));
}