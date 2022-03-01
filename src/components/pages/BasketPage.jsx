import React from "react";
import BasketContainer from "../basket/BasketContainer";


const BasketPage = ({productsInBasket, setProductsInBasket}) => {


    return (
        <>
            <BasketContainer productsInBasket={productsInBasket} setProductsInBasket={setProductsInBasket}/>
        </>
    )
}


export default BasketPage;
