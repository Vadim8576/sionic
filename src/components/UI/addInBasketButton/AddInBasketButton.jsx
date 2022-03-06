import React, { useState } from 'react';
import css from './addInBasketButton.module.css';


function AddnBasketButton({ addProductToBasket, dataForBasket }) {

   

    return (
        <div className={css.cardsButton}>
            <button className={css.button} onClick={() => addProductToBasket(dataForBasket)}>Добавить в корзину</button>
        </div>

    );
}


export default AddnBasketButton;