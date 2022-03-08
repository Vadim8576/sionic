import React from "react";
import OrderContainer from "../order/OrderContainer";


const OrderPage = ({productsInBasket, cleanBasket}) => {
    return (
        <OrderContainer productsInBasket={productsInBasket} cleanBasket={cleanBasket} />
    )
}

export default OrderPage;