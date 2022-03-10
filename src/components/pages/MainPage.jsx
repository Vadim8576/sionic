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
        <div style={{width: '100%'}}> 
            
            <ProductsList
                products={products}
                addProductToBasket={addProductToBasket}
            />
            <br/>
            <br/>
            <div style={{width: '100%', display: "flex", justifyContent: 'center', marginBottom: '50px'}}>
                <button onClick={fetchingMoreProducts}>еще</button>
            </div>
            
        </div>

    )
}


export default MainPage;
