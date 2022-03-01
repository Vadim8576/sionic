import React, { useState } from 'react';
import css from './productCard.module.css';
import noimage from '../../assets/noimage.png';
import NavigationArrow from '../UI/navigationArrow/NavigationArrow';
import { useMemo } from 'react';
import AddnBasketButton from '../UI/addInBasketButton/AddInBasketButton';


function ProductCard({ product, addInButtonHandler }) {
    let { img, description, variants } = product;

    let [currentProduct, setCurrentProduct] = useState(0);

    let calc = Math.max(img?.length ? img?.length : 0, variants?.length ? variants?.length : 0);

    let [maxProductVariants, setmaxProductVariants] = useState(0);

    useMemo(() => {
        setmaxProductVariants(calc)
        // console.log('setmaxProductVariants')
    }, [calc])



    let dataForBasket = {
        category_id: product.category_id,
        description: product.description,
        product_id: product.id,
        img: img[currentProduct],
        name: product.name,
        variants: variants[currentProduct]
    }




    let cardImageStyle = {
        backgroundImage:
            (img?.length > 0 && currentProduct < img?.length)
                ? `url(https://test2.sionic.ru${img[currentProduct].image_url})`
                : `url(${noimage})`
    }


    let priceStr = variants && variants[currentProduct]?.price;

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


                <AddnBasketButton addInButtonHandler={addInButtonHandler} dataForBasket={dataForBasket} />
            </div>
        </>
    );
}


export default ProductCard;