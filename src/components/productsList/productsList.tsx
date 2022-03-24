import React from 'react';
import ProductCard from '../productCard/ProductCard';
import css from './productsList.module.css';
import { Product } from '../../types/types';
import { Spinner } from 'react-bootstrap';


interface ProductListProps {
    products: Product[]
    addProductToBasket: any
    fetchingMoreProducts: () => void
    isLoading: boolean
}

const ProductsList: React.FC<ProductListProps> = ({ products, addProductToBasket, fetchingMoreProducts, isLoading }) => {

    return (
        <>

            {                             
                products.length
                && <div className={css.cardsContainer}>
                    {products.map(product =>
                        <ProductCard
                            key={product.id}
                            product={product}
                            addProductToBasket={addProductToBasket}
                        />)
                    }

                </div>
                || <>{!isLoading &&
                     <p>Нет товаров в данной категории</p>
                    }
                 </>
            }


            {/* {isLoading
                ? <>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Spinner animation={"border"} />
                    </div>
                </>
                : products.length
                && <div className={css.cardsContainer}>
                    {products.map(product =>
                        <ProductCard
                            key={product.id}
                            product={product}
                            addProductToBasket={addProductToBasket}
                        />)
                    }

                </div>
                || <p>Нет товаров в данной категории</p>
            } */}
        </>
    );

}


export default ProductsList;