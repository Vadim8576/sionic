import React from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import css from './category.module.css';


const Category = ({category, setCurrentCategory, categoryIsActive, setCategoryIsActive, index, setCurrentRange}) => {
    const {name, id} = category;
    

    const categoryHandler = (id) => {
        setCurrentCategory(id);
        setCategoryIsActive(index);
        setCurrentRange(50);
    }

    let style =  css.categoriesItem;
    if(index === categoryIsActive) style = css.categoriesItem + ' ' + css.activeCategory

    return (
        <div
            className={style}
            onClick={() => categoryHandler(id)}
        >
            {name}
        </div>
    )
}


export default Category;
