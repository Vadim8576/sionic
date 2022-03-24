import React from "react";

import BasketContainer from "../basket/BasketContainer";


interface BasketPageProps {
    productsInBasket: []
    setProductsInBasket: any
}


const BasketPage: React.FC<BasketPageProps> = ({productsInBasket, setProductsInBasket}) => {


    return (
        <div style={{width: '100%'}}>
            <BasketContainer productsInBasket={productsInBasket} setProductsInBasket={setProductsInBasket}/>
        </div>
    )
}


export default BasketPage;
