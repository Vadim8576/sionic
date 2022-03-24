import { AxiosRequestConfig, AxiosResponse, AxiosResponseHeaders } from "axios"

export interface Categories {
    id: number
    name: string
}

// Products
export type Imgs = {
    id: number
    image_name: string
    image_url: string
    product_id: number
}

export interface Variations {
    id: number
    price: number
    product_id: number
    stock: number
}

export interface Product {
    imgs: Imgs[]
    name: string
    variations: Variations[]
    id: number
    description: string
    category_id: number
}

//

export interface ProductsInBasket  {
    description: string
    product_id: string
    imgs: Imgs
    name: string
    variations: Variations
    count: number
    id: string
}


export interface HistoriItemType {
    adress: string
    date: string
    name: string
    orderData: string
    products: ProductsInBasket[]
    tel: string
    time: string
}


///////////////////////////////////////////////////////



export enum ProductActionTypes {
    SET_CATEGORIES = 'FETCHING_CATEGORIES',
    SET_PRODUCTS = 'FETCHING_PRODUCTS',
    SET_NEW_PRODUCTS = 'SET_NEW_PRODUCTS',
    SET_IMAGES = 'FETCHING_IMAGES',
    SET_PRODUCTS_VARIATIONS = 'FETCHING_PRODUCT_VARIATIONS',
    SET_PRODUCT_TOTAL = 'SET_PRODUCT_TOTAL',
    SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY',
    SET_CURRENT_RANGE = 'SET_CURRENT_RANGE',
    SET_IS_LOADING = 'SET_IS_LOADING'
}

export type Payload = any[]

export interface setCategoriesAction {
    type: ProductActionTypes.SET_CATEGORIES
    payload: Payload
}
interface setProductsAction {
    type: ProductActionTypes.SET_PRODUCTS
    payload: Payload
}
interface setNewProductsAction {
    type: ProductActionTypes.SET_NEW_PRODUCTS
    payload: Payload
}
interface setImagesAction {
    type: ProductActionTypes.SET_IMAGES
    payload: Payload
}
interface setProductsVariationsAction {
    type: ProductActionTypes.SET_PRODUCTS_VARIATIONS
    payload: Payload
}
interface setProductTotalAction {
    type: ProductActionTypes.SET_PRODUCT_TOTAL
    payload: number
}
interface setCurrentCategoryAction {
    type: ProductActionTypes.SET_CURRENT_CATEGORY
    payload: number
}
interface setCurrentRangeAction {
    type: ProductActionTypes.SET_CURRENT_RANGE
    payload: number
}
interface setIsLoading {
    type: ProductActionTypes.SET_IS_LOADING
    payload: boolean
}


export type ProductsAction = setCategoriesAction | setProductsAction | setNewProductsAction | setImagesAction | setProductsVariationsAction | setProductTotalAction | setCurrentCategoryAction | setCurrentRangeAction | setIsLoading


let cr: number = 50;
export interface ProductsState {
    categories: Categories[] | any[]
    products: Product[] | any[]
    images: Imgs[] | any[]
    variations: Variations[] | any[]
    productTotal: number | null
    currentCategory: number | null
    currentRange: typeof cr,
    isLoading: boolean
}



export let QueryTypes: 'NEW' | 'ADD'

export interface Query {
    currentCategory: number
    currentRange: number
    queryType: string
}


export interface Response {
    config: AxiosRequestConfig<any>
    data: any[]
    headers: AxiosResponseHeaders
    request: AxiosResponse<any, any>
    status: number
    statusText: string
}


export type Obj = {
    index: number
    value: number
}