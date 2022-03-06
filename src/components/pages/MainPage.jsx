import React from "react";
import ProductsList from "../productsList/productsList";




const MainPage = ({ products, addProductToBasket, range }) => {
    const {currentRange, setCurrentRange, productTotal} = range;

    const fetchingMoreProducts = () => {
        if((currentRange + 50) <= productTotal) setCurrentRange(currentRange + 50)
    }

    return (
        <>     
            <button onClick={fetchingMoreProducts}>еще</button>
            <ProductsList
                products={products}
                addProductToBasket={addProductToBasket}
            />
        </>

    )
}


export default MainPage;
