import React from "react";
import { QueryTypes, Product } from '../../types/types';
import ProductsList from "../productsList/productsList";


interface Range {
    currentRange: number
    productTotal: number
}

interface MainPageProps {
    products: Product[]
    setQueryType: any
    addProductToBasket: any
    range: Range
    setCurrentRangeAC: any
    isLoading: boolean
}


const MainPage: React.FC<MainPageProps> = ({ products, setQueryType, addProductToBasket, range, setCurrentRangeAC, isLoading }) => {
    const { currentRange, productTotal } = range;

    const fetchingMoreProducts = () => {
        if ((currentRange + 50) <= productTotal) {
            setCurrentRangeAC(currentRange + 50)
            const ADD: typeof QueryTypes = 'ADD';
            setQueryType(ADD)
        }
    }

    return (
        <div style={{ width: '100%' }}>

            <ProductsList
                products={products}
                addProductToBasket={addProductToBasket}
                isLoading={isLoading}
            />
            <br />
            <br />
            {!isLoading &&
                <div style={{ width: '100%', display: "flex", justifyContent: 'center', marginBottom: '50px' }}>
                    <button onClick={fetchingMoreProducts}>еще</button>
                </div>
            }


        </div>

    )
}


export default MainPage;
