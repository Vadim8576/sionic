import { Payload, ProductActionTypes, ProductsAction } from "../types/types";

export const setCategoriesActionCreator = (payload: Payload ): ProductsAction => ({ type: ProductActionTypes.SET_CATEGORIES, payload });
export const setProductsActionCreator = (payload: Payload): ProductsAction => ({ type: ProductActionTypes.SET_PRODUCTS, payload });
export const setNewProductsActionCreator = (payload: Payload): ProductsAction => ({ type: ProductActionTypes.SET_NEW_PRODUCTS, payload });
export const setImagesActionCreator = (payload: Payload): ProductsAction => ({ type: ProductActionTypes.SET_IMAGES, payload });
export const setProductsVariationsActionCreator = (payload: Payload): ProductsAction => ({ type: ProductActionTypes.SET_PRODUCTS_VARIATIONS, payload });
export const setProductTotalActionCreator = (payload: number): ProductsAction => ({ type: ProductActionTypes.SET_PRODUCT_TOTAL, payload });
export const setCurrentCategoryActionCreator = (payload: number): ProductsAction => ({ type: ProductActionTypes.SET_CURRENT_CATEGORY, payload });
export const setCurrentRangeActionCreator = (payload: number): ProductsAction => ({ type: ProductActionTypes.SET_CURRENT_RANGE, payload });
export const setIsLoadingActionCreator = (payload: boolean): ProductsAction => ({ type: ProductActionTypes.SET_IS_LOADING, payload });