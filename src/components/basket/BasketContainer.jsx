import React from "react";
import css from './basketContainer.module.css';
import BasketList from "./BasketList";


const BasketContainer = ({productsInBasket, setProductsInBasket}) => {


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
                                1185000 Р
                            </div>
                        </div>
                        <div className={css.orderBtnwrapper}>
                            <div className={css.orderBtn}>Оформить</div>
                        </div>
                    </div>


                    <BasketList productsInBasket={productsInBasket} setProductsInBasket={setProductsInBasket}/>
                   
                </div>
            </div>
        </>
    )
}


export default BasketContainer;
