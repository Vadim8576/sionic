import React from 'react';
import { useMemo } from 'react';
import ProductCard from '../productCard/ProductCard';


function ProductsList({products, addProductToBasket}) {
    // let productsList = [];
    // let count = 0;
        // productsList = products.map(product => {
        //     let imgs = images.filter(image => product.id == image.product_id);
        //     if(imgs.length > 0) count++;
        //     let variants = productVariations.filter(variant => product.id == variant.product_id);
        //     product.img = [...imgs];
        //     product.variants = [...variants];
        //     // console.log(product.img)
        //     return product;
        // })
        
        // console.log(count)
        // if(count < products.length) //запрос картинок []


    return (
        <>
            {products.length
            && <div className="cardContainer">
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