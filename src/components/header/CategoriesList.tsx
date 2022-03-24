import React from 'react';
import { useState } from 'react';
import { Categories } from '../../types/types';
import css from './categoriesList.module.css';
import Category from './Category';

interface CategoriesListProps {
	categories: Categories[]
    setQueryType: (s: string) => void
    setCurrentCategoryAC: (id: number) => void
    setCurrentRangeAC: (n: number) => void
}

interface CategoryType {
    id: number
    name: string
}

const CategoriesList: React.FC<CategoriesListProps> = ({categories, setQueryType, setCurrentCategoryAC, setCurrentRangeAC}) => {


    let [categoryIsActive, setCategoryIsActive] = useState(0);


    return (
        <>         
			<div className={css.categories}>
                {categories.map((category: CategoryType, index: number) =>
                    <Category
                        setCurrentCategoryAC={setCurrentCategoryAC}
                        setCurrentRangeAC={setCurrentRangeAC}
                        key={category.id}
                        category={category}
                        categoryIsActive={categoryIsActive}
                        setCategoryIsActive={setCategoryIsActive}
                        index={index}
                        // setCurrentRange={setCurrentRange}
                        setQueryType={setQueryType}
                    />)}
			</div>
        </>

    )
}


export default CategoriesList;
