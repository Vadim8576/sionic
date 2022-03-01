import React from 'react';
import { useState } from 'react';
import css from './categoriesList.module.css';
import Category from './Category';


const CategoriesList = ({categories, setCurrentCategory, setCurrentRange}) => {

    
    let [categoryIsActive, setCategoryIsActive] = useState(0);


    return (
        <>         
			<div className={css.categories}>
                {categories.map((category, index) =>
                    <Category
                        setCurrentCategory={setCurrentCategory}
                        key={category.id}
                        category={category}
                        categoryIsActive={categoryIsActive}
                        setCategoryIsActive={setCategoryIsActive}
                        index={index}
                        setCurrentRange={setCurrentRange}
                    />)}
			</div>
        </>

    )
}


export default CategoriesList;
