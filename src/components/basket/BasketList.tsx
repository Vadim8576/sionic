import React from "react";
import BasketItem from "./BasketItem";
import css from './basketList.module.css'
import { Obj, ProductsInBasket } from '../../types/types';



interface BasketListProps {
    productsInBasket: ProductsInBasket[]
    deleteBasketItem: (s: string) => void
    setCount: (obj: Obj) => void
}

const BasketList: React.FC<BasketListProps> = ({ productsInBasket, deleteBasketItem, setCount }) => {

    console.log(productsInBasket)

    return (
        <div className={css.basketList}>
            {productsInBasket.length
            ? productsInBasket.map((product: ProductsInBasket, index: number) =>
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
