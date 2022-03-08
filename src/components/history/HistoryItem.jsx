import React from "react";
import { basketCount, basketSum } from "../../helpFunctions/helpFunctions";
import css from './historyItem.module.css';

const HistoryItem = ({historiItem}) => {

    let {adress, orderData} = historiItem;


    let sum = basketSum(historiItem.products);

    let count = basketCount(historiItem.products);

    return (
        <div className={css.historyItemsWrapper}>
            <div className={css.historyItemsHeader}>
                Дата заказа: {orderData}
            </div>
            <div className={css.row}>
                <div className={css.col}>
                    <div className={css.row}>
                        <span>Статус заказа:</span>
                    </div>
                    <div className={css.row}>
                        Оплачен/завершен
                    </div>
                </div>
                <div className={css.col}>
                    <div className={css.row}>
                        <span>Номер заказа:</span>
                    </div>
                    <div className={css.row}>
                        <div className={css.orderNumber}>#664-333</div>
                    </div>
                </div>
            </div>

            <div className={css.row}>
                <div className={css.col}>
                    <div className={css.row}>
                       <span>Кол-во товаров:</span>
                    </div>
                    <div className={css.row}>
                        {count} шт.
                    </div>
                </div>
                <div className={css.col}>
                    <div className={css.row}>
                        <span>Стоимость заказа:</span>
                    </div>
                    <div className={css.row}>
                        {sum} &#8381;
                    </div>
                </div>
                <div className={css.col}>
                    <div className={css.row}>
                        <span>Адрес доставки:</span>
                    </div>
                    <div className={css.row}>
                        <div className={css.adres}>
                            <p>{adress}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HistoryItem;