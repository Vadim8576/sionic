import React from 'react';
import css from './navigationArrow.module.css';
import arrow from '../../../assets/angle-left.svg'


const NavigationArrow = ({type, setCurrentProduct, currentProduct, maxProductVariants}) => {  
    let style = css.arrow;
    if (type === 'right') style = css.arrow + ' ' + css.arrowRight;

    const arrowHandler = () => {
        if(type === 'left' && currentProduct > 0) setCurrentProduct(currentProduct - 1);
        if(type === 'right' && currentProduct < maxProductVariants-1) setCurrentProduct(currentProduct + 1);
    }

    // console.log(maxProductVariants)

    return (
        <div className={style} onClick={arrowHandler}>
           <img src={arrow} />
        </div>
    );
}


export default NavigationArrow;