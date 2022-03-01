import React, { useState } from 'react';
import css from './addInBasketButton.module.css';


function AddnBasketButton({ addInButtonHandler, dataForBasket }) {

   

    return (
        <div className={css.cardsButton}>
            <button className={css.button} onClick={() => addInButtonHandler(dataForBasket)}>Добавить в корзину</button>
        </div>

    );
}


export default AddnBasketButton;