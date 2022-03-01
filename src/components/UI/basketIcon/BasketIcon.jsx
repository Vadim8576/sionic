import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './basketIcon.module.css';



const BasketIcon = ({basketCount}) => {

    return (
        <div className={css.headerLine1Basket}>
            
            <NavLink to={'/basket/'} className='link'>
                <div className={css.basketBtnWrapper}>
                <div className={css.basketIcon}></div>
                <div className={css.basketCount}>{basketCount < 100 ? basketCount : '99+'}</div>
            </div>
            </NavLink>
            
        </div>
    )
}


export default BasketIcon;
