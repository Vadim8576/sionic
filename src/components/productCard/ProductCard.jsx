import React, { useState } from 'react';
import css from './productCard.module.css';
import noimage from '../../assets/noimage.png';
import NavigationArrow from '../UI/navigationArrow/NavigationArrow';
import { useMemo } from 'react';
import AddnBasketButton from '../UI/addInBasketButton/AddInBasketButton';


function ProductCard({ product, addProductToBasket }) {


    // console.log(product)

    let { imgs, description, variations } = product;

    let [currentProduct, setCurrentProduct] = useState(0);

    let calc = Math.max(imgs?.length ? imgs?.length : 0, variations?.length ? variations?.length : 0);

    let [maxProductVariants, setmaxProductVariants] = useState(0);

    useMemo(() => {
        setmaxProductVariants(calc)
        // console.log('setmaxProductVariants')
    }, [calc])



    let dataForBasket = {
        description: product.description,
        product_id: product.id,
        imgs: imgs && imgs[currentProduct],
        name: product.name,
        variations: variations && variations[currentProduct],
        count: 1,
        id: variations && product?.id + '_' + variations[currentProduct]?.id
    }




    let cardImageStyle = {
        backgroundImage:
            (imgs?.length > 0 && currentProduct < imgs?.length)
                ? `url(https://test2.sionic.ru${imgs[currentProduct].image_url})`
                : `url(${noimage})`
    }


    let priceStr = variations && variations[currentProduct]?.price;

    return (
        <>
            <div className={css.card}>
                <NavigationArrow
                    type={'left'}
                    currentProduct={currentProduct}
                    setCurrentProduct={setCurrentProduct}
                    maxProductVariants={maxProductVariants}
                />
                <NavigationArrow
                    type={'right'}
                    currentProduct={currentProduct}
                    setCurrentProduct={setCurrentProduct}
                    maxProductVariants={maxProductVariants}
                />
                <div className={css.cardHeader}>
                    <div className={css.cardImage} style={cardImageStyle}></div>
                    <div className={css.cardDescription}>
                        <p>{description}</p>
                    </div>
                </div>
                <div className={css.cardPrice}>
                    <div className={css.price}>от {priceStr} &#8381;</div>
                    <div className={css.percent}><span>{priceStr} &#8381;</span>-0%</div>
                </div>


                <AddnBasketButton addProductToBasket={addProductToBasket} dataForBasket={dataForBasket} />
            </div>
        </>
    );
}


export default ProductCard;