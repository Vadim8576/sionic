import React from "react";
import { historyCount, historySum } from "../../helpFunctions/helpFunctions";
import css from './historyItem.module.css';
import { HistoriItemType } from '../../types/types';

interface HistoryItemProps {
    historiItem: HistoriItemType
}


const HistoryItem: React.FC<HistoryItemProps> = ({historiItem}) => {

    let {adress, orderData} = historiItem;


    let sum: number = historySum(historiItem);
    let count: number = historyCount(historiItem);


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