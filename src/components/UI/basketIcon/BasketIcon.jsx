import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './basketIcon.module.css';



const BasketIcon = ({ basketCount }) => {

    return (

        <>
            <NavLink to={'/basket/'} className='link'>
                <div className={css.basketBtnWrapper}>
                    <div className={css.basketIcon}></div>
                    <div className={css.basketCount}>{basketCount < 100 ? basketCount : '99+'}</div>
                </div>
            </NavLink>

        </>
    )
}


export default BasketIcon;
