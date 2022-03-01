import React from "react";
import ProductsList from "../productsList/productsList";




const MainPage = ({ products , images, productVariations, addInButtonHandler, range}) => {


    const {currentRange, setCurrentRange, productTotal} = range;

    const fetchingMoreProducts = () => {
        if((currentRange + 50) <= productTotal) setCurrentRange(currentRange + 50)
    }

    return (
        <>     
            <button onClick={fetchingMoreProducts}>еще</button>
            <ProductsList
                products={products}
                images={images}
                productVariations={productVariations}
                addInButtonHandler={addInButtonHandler}
            />
        </>

    )
}


export default MainPage;
