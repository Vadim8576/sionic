import React, { useMemo } from "react";
import { basketSum, loadBasketToStorage } from "../../helpFunctions/helpFunctions";
import OrderForm from "../orderForm/OrderForm";
import css from './order.module.css';

const Order = ({saveOrder, cleanBasket}) => {

    let sum;
    let productsInBasket = loadBasketToStorage();



    useMemo(() => {
        sum = basketSum(productsInBasket) || 0;
    }, [productsInBasket])

    console.log(productsInBasket)

    return (
        <div className={css.orderWrapper}>
            <div className={css.orderSide}>
                <OrderForm saveOrder={saveOrder} cleanBasket={cleanBasket}/>
            </div>
            <div className={css.orderSide}>
                <div className={css.orderSum}>
                    <div className={css.orderSumLine}>
                        <span>Стоимость товаров:</span>
                        <span>{sum} &#8381;</span>
                    </div>
                    <div className={css.orderSumLine}>
                        <span>Стоимость доставки:</span>
                        <span>200 &#8381;</span>
                    </div>
                    <div className={css.orderSumLine}>
                        <span>Итого:</span>
                        <span>{sum + 200} &#8381;</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order;