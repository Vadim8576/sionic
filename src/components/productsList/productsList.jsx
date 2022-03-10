import React from 'react';
import ProductCard from '../productCard/ProductCard';
import css from './productsList.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';

function ProductsList({ products, addProductToBasket }) {

    return (
        <>
            {products.length
            && <div className={css.cardsContainer}>
                {products.map(
                    product =>
                    <ProductCard
                        key={product.id}
                        product={product}
                        addProductToBasket={addProductToBasket}
                    />)}
                </div>
            || <p>Нет товаров в данной категории</p>
            }
        </>
    );
    
}


export default ProductsList;