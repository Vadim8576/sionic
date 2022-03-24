import { connect, ConnectedProps } from 'react-redux';
import './App.css';
import MainPage from './components/pages/MainPage';
import { Route, Routes } from 'react-router-dom';
import BasketPage from './components/pages/BasketPage';
import Header from './components/header/Header';
import { useEffect, useMemo, useState } from 'react';
import OrderPage from './components/pages/OrderPage';
import { fetchingCategories, fetchingProducts } from './redux/thunks';
import {  setCurrentCategoryActionCreator, setCurrentRangeActionCreator } from './redux/actionCreators';
import { addProductToBasketHelp, createProductList, loadBasketToStorage, saveBasketToStorage } from './helpFunctions/helpFunctions';
import HistoryPage from './components/pages/HistoryPage';
// import { compose, Dispatch } from 'redux';
import { ProductsState, Query, ProductsInBasket } from './types/types';



type Props = PropsFromRedux

const App = (props: Props) => {
  const { categories, products, images, variations, productTotal, currentCategory, currentRange, setCurrentCategoryAC, setCurrentRangeAC, fetchingCategories, fetchingProducts, isLoading } = props;

  const [productsInBasket, setProductsInBasket] = useState(loadBasketToStorage() || []);
  const [basketCount, setBasketCount] = useState(0);
  const [queryType, setQueryType] = useState('NEW');

  let productList = createProductList(products, images, variations);



  useEffect(() => {
    console.log('fetchingCategories')
    fetchingCategories('');
  }, [])



  useEffect(() => {
    if(currentCategory && currentRange) {
      console.log('fetchingProducts');
      let query: Query = {currentCategory, currentRange, queryType}
      fetchingProducts(query);
    }
  }, [currentCategory, currentRange])



  const addProductToBasket = (dataForBasket: ProductsInBasket) => {
    setProductsInBasket(addProductToBasketHelp(productsInBasket, dataForBasket))
  }


  useMemo(() => {
    setBasketCount(productsInBasket.length)
  }, [productsInBasket.length]);

  useMemo(() => {
    saveBasketToStorage(productsInBasket)
  }, [productsInBasket])


  const cleanBasket = () => {
    setProductsInBasket([])
  }


  let range = { currentRange, productTotal };


  return (
    <>
      <div style={{width: '100%'}}>
        <Header
          categories={categories}
          setCurrentCategoryAC={setCurrentCategoryAC}
          basketCount={basketCount}
          cleanBasket={cleanBasket}
          setCurrentRangeAC={setCurrentRangeAC}
          setQueryType={setQueryType}
        />
      </div>
      
      <Routes>
        {/* <Route exact path='/main-page' element={<MainPage />} /> */}
        <Route path='/sionic' element={
          <MainPage
            products={productList}
            addProductToBasket={addProductToBasket}
            range={range}
            setCurrentRangeAC={setCurrentRangeAC}
            setQueryType={setQueryType}
            isLoading={isLoading}
          />
        } />
        <Route path='/basket' element={
          <BasketPage
            productsInBasket={productsInBasket}
            setProductsInBasket={setProductsInBasket}
          />} />
        <Route path='/order' element={
          <OrderPage productsInBasket={productsInBasket} cleanBasket={cleanBasket} />} />
          <Route path='/history' element={
            <HistoryPage />} />
          
        <Route path='*' element={<div>404 NOT FOUND</div>} />
      </Routes>

    </>
  );
}



const mapStateToProps = (state: ProductsState): ProductsState => {
  return {
    categories: state.categories,
    products: state.products,
    images: state.images,
    variations: state.variations,
    productTotal: state.productTotal,
    currentCategory: state.currentCategory,
    currentRange: state.currentRange,
    isLoading: state.isLoading
  }
}



const mapDispatchToProps = (dispatch: any) => {
  return {
    setCurrentCategoryAC: (currentCategory: number) => {
      dispatch(setCurrentCategoryActionCreator(currentCategory))
    },
    setCurrentRangeAC: (currentRange: number) => {
      dispatch(setCurrentRangeActionCreator(currentRange))
    },
    fetchingCategories: (params: string) => {
      dispatch(fetchingCategories(params))
    },
    fetchingProducts: (params: Query) => {
      dispatch(fetchingProducts(params))
    }
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>


export default connector(App);