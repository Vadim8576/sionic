import React from "react";
import OrderContainer from "../order/OrderContainer";


const OrderPage = ({ productsInBasket, cleanBasket }) => {
    return (
        <div style={{ width: '100%' }}>
            <OrderContainer productsInBasket={productsInBasket} cleanBasket={cleanBasket} />
        </div>
    )
}

export default OrderPage;