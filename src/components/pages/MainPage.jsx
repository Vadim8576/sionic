import React from "react";
import ProductsList from "../productsList/productsList";




const MainPage = ({ products, addProductToBasket, range, setCurrentRangeActionCreator }) => {
    const {currentRange, productTotal} = range;

    const fetchingMoreProducts = () => {
        if((currentRange + 50) <= productTotal) {
            
            setCurrentRangeActionCreator(currentRange + 50)
        }
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
