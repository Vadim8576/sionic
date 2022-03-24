import React from "react";
import { QueryTypes, Product } from '../../types/types';
import ProductsList from "../productsList/productsList";
import { Spinner } from 'react-bootstrap';

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
                fetchingMoreProducts={fetchingMoreProducts}
                isLoading={isLoading}
            />
            <br />
            <br />
            
            {!isLoading
                ?
                <div style={{ width: '100%', display: "flex", justifyContent: 'center', marginBottom: '50px' }}>
                    <button onClick={fetchingMoreProducts}>еще</button>
                </div>
                :
                <>
                    <div style={{  width: '100vw', height: '100vh', display: "flex", justifyContent: 'center', alignItems: 'center', position: 'fixed', top: '0', left: '0' }}>
                        <Spinner animation={"border"} />
                    </div>
                </>
            }


        </div>

    )
}


export default MainPage;
