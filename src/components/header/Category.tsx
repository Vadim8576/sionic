import React from 'react';
import css from './category.module.css';


interface Category {
    id: number
    name: string
}

interface CategoryProps {
    category: Category
    setQueryType: (s: string) => void
    setCurrentCategoryAC: (id: number) => void
    categoryIsActive: number
    setCategoryIsActive: (index: number) => void
    index: number
    setCurrentRangeAC: (n: number) => void
}

const Category: React.FC<CategoryProps> = ({category, setQueryType, setCurrentCategoryAC, categoryIsActive, setCategoryIsActive, index, setCurrentRangeAC}) => {
    const {name, id} = category;
    

    const categoryHandler = (id: number) => {
        setCurrentCategoryAC(id);
        setCategoryIsActive(index);
        setCurrentRangeAC(50)
        setQueryType('NEW')
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
