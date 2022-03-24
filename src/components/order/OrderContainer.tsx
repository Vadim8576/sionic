import React from "react";
import { saveOrdersToStorage } from "../../helpFunctions/helpFunctions";
import Order from "./Order";
import css from './orderContainer.module.css'


interface OrderContainerProps {
    cleanBasket: () => void
}

const OrderContainer: React.FC<OrderContainerProps> = ({cleanBasket}) => {

    const saveOrder = (order) => {
        saveOrdersToStorage(order);
    }

    return (
        <div className={css.orderContainer}>
            <Order
                saveOrder={saveOrder}
                cleanBasket={cleanBasket}
            />
        </div>
    )
}

export default OrderContainer;