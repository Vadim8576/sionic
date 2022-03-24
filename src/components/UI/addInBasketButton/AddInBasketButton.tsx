import React from 'react';
import { ProductsInBasket } from '../../../types/types';
import css from './addInBasketButton.module.css';


interface AddnBasketButtonProps {
    addProductToBasket: (obj: ProductsInBasket) => void
    dataForBasket: ProductsInBasket
}

const AddnBasketButton: React.FC<AddnBasketButtonProps> = ({ addProductToBasket, dataForBasket }) => {

   

    return (
        <div className={css.cardsButton}>
            <button className={css.button} onClick={() => addProductToBasket(dataForBasket)}>Добавить в корзину</button>
        </div>

    );
}


export default AddnBasketButton;