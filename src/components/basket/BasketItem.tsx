import React from "react";
import css from './basketItem.module.css';
import noimage from '../../assets/noimage.png';
import { ProductsInBasket, Obj } from '../../types/types';





interface BasketItemProps {
    product: ProductsInBasket
    deleteBasketItem: (s: string) => void
    setCount: (obj: Obj) => void
    index: number
}


const BasketItem: React.FC<BasketItemProps> = ({product, deleteBasketItem, setCount, index}) => {

    let {imgs, name, variations } = product;


    name = name ? name : 'Нет данных';
    let price = variations?.price ? variations?.price : null;

    const bgi = {
        backgroundImage: 
        imgs?.image_url ? `url(https://test2.sionic.ru${imgs.image_url})`
        : `url(${noimage})`
    }

    return (
        <>
            <div className={css.basketListItem}>
                <div className={css.basketListItemSection1}>
                    <div className={css.basketListItemImage} style={bgi} ></div>
                    <div className={css.basketListItemName}>
                        <p>{name}</p>
                    </div>
                </div>
                <div className={css.basketListItemSection2}>
                    <div className={css.countCostWrapper}>
                        <div className={css.basketListItemCount}>
                            <div className={css.CountWrapper}>
                                <div className={css.CountMinus} onClick={() => setCount({index, value: -1})}>-</div>
                                <div className={css.Count}>{product.count}</div>
                                <div className={css.CountPlus} onClick={() => setCount({index, value: 1})}>+</div>
                            </div>
                        </div>
                        <div className={css.basketListItemCost}>
                            <div className={css.coast}>{price ? 'от ' + price + ' ₽' : 'нет данных'}</div>
                            <div className={css.percent}>{price ? 'от ' + price + ' ₽' : 'нет данных'}</div>
                        </div>
                    </div>
                    <div className={css.basketListItemDelBtnWrapper}>
                        <div className={css.basketListItemDelBtn} onClick={() => deleteBasketItem(product.id)}></div>
                    </div>
                </div>
            </div>

        </>
    )
}


export default BasketItem;
