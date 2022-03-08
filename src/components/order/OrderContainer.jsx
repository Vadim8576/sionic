import React from "react";
import { saveOrdersToStorage } from "../../helpFunctions/helpFunctions";
import Order from "./Order";
import css from './orderContainer.module.css'

const OrderContainer = ({productsInBasket, cleanBasket}) => {

    const saveOrder = (order) => {
        saveOrdersToStorage(order);
    }

    return (
        <div className={css.orderContainer}>
            <Order
                productsInBasket={productsInBasket}
                saveOrder={saveOrder}
                cleanBasket={cleanBasket}
            />
        </div>
    )
}

export default OrderContainer;