import React from "react";
import ProductsList from "../productsList/productsList";


const MainPage = ({ products, setQueryType, addProductToBasket, range, setCurrentRangeActionCreator }) => {
    const {currentRange, productTotal} = range;

    const fetchingMoreProducts = () => {
        if((currentRange + 50) <= productTotal) {         
            setCurrentRangeActionCreator(currentRange + 50)
            setQueryType('ADD')
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
