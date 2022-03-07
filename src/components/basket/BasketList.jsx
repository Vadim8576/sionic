import React from "react";
import BasketItem from "./BasketItem";
import css from './basketList.module.css'


const BasketList = ({ productsInBasket, deleteBasketItem, setCount }) => {

    console.log(productsInBasket)

    return (
        <div className={css.basketList}>
            {productsInBasket.length
            ? productsInBasket.map((product, index) =>
                <BasketItem
                    key={product.id}
                    product={product}
                    deleteBasketItem={deleteBasketItem}
                    setCount={setCount}
                    index={index}
                />
            )
            : <h3>Корзина пуста</h3>
            }
        </div>
    )
}


export default BasketList;
