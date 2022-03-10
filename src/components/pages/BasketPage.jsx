import React from "react";
import BasketContainer from "../basket/BasketContainer";


const BasketPage = ({productsInBasket, setProductsInBasket}) => {


    return (
        <div style={{width: '100%'}}>
            <BasketContainer productsInBasket={productsInBasket} setProductsInBasket={setProductsInBasket}/>
        </div>
    )
}


export default BasketPage;
