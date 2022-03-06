import React from "react";
import BasketItem from "./BasketItem";
import css from './basketList.module.css'


const BasketList = ({productsInBasket, setProductsInBasket}) => {

    console.log(productsInBasket)

    const deleteBasketItem = (id) => {
        let products = productsInBasket.filter(product => product.id !== id)
        console.log('после удаления', products)
        setProductsInBasket([...products]);
    }
    console.log(productsInBasket)

    return (
        <div className={css.basketList}>
            {productsInBasket.map(product => 
                <BasketItem key={product.id} product={product} deleteBasketItem={deleteBasketItem}/>
            )}
            
        </div>
    )
}


export default BasketList;
