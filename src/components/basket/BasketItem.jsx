import React from "react";
import css from './basketItem.module.css';
import noimage from '../../assets/noimage.png';

const BasketItem = ({product, deleteBasketItem}) => {


    let {img, name, variants, id } = product;

    console.log(product)


    name = name ? name : 'Нет данных';
    let price = variants?.price ? variants?.price : null;

    const bgi = {
        backgroundImage: 
        img?.image_url ? `url(https://test2.sionic.ru${img.image_url})`
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
                                <div className={css.CountMinus}>-</div>
                                <div className={css.Count}>1</div>
                                <div className={css.CountPlus}>+</div>
                            </div>
                        </div>
                        <div className={css.basketListItemCost}>
                            <div className={css.coast}>{price ? `от ${price}` : 'нет данных'}</div>
                            <div className={css.percent}>{price ? `от ${price}` : 'нет данных'}</div>
                        </div>
                    </div>
                    <div className={css.basketListItemDelBtnWrapper}>
                        <div className={css.basketListItemDelBtn} onClick={() => deleteBasketItem(id)}></div>
                    </div>
                </div>
            </div>

        </>
    )
}


export default BasketItem;
