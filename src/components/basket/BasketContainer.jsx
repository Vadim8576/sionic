import React, { useMemo, useState } from "react";
import css from './basketContainer.module.css';
import BasketList from "./BasketList";


const BasketContainer = ({productsInBasket, setProductsInBasket}) => {

    const [sum, setSum] = useState(0)

    const setCount = (obj) => {
        let {index, value} = obj;
        let productCount = value < 0 ? productsInBasket[index].count - 1 : productsInBasket[index].count + 1;
        if(productCount <= 0) {
            deleteBasketItem(productsInBasket[index].product_id);
            return;
        }

        setProductsInBasket(productsInBasket.map((product,index2) => {
            if(index === index2) {
                product.count = productCount
            }
            return product
        }))
    }
    

    const deleteBasketItem = (id) => {
        let products = productsInBasket.filter(product => product.id !== id)
        setProductsInBasket([...products]);
    }

  
    const calcSum = () => {
        let s = 0;
        productsInBasket.forEach(product => {
            s += product.variations.price * product.count
        })
        setSum(s)
    }

    useMemo(() => calcSum(), [productsInBasket])


    return (
        <>
            <div className={css.basketContainer}>
                <div className={css.basketListWrapper}>
                    <div className={css.basketTitle}>
                        <div className={css.basketIconWrapper}>
                        </div>
                        <div className={css.costWrapper}>
                            <div className={css.costTitle}>
                                Стоимость корзины:
                            </div>
                            <div className={css.cost}>
                                {sum} &#8381;
                            </div>
                        </div>
                        <div className={css.orderBtnwrapper}>
                            <div className={css.orderBtn}>Оформить</div>
                        </div>
                    </div>


                    <BasketList
                        productsInBasket={productsInBasket}
                        deleteBasketItem={deleteBasketItem}
                        setCount={setCount}
                    />
                   
                </div>
            </div>
        </>
    )
}


export default BasketContainer;
