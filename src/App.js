import { connect } from 'react-redux';
import './App.css';
import MainPage from './components/pages/MainPage';
import { Route, Routes } from 'react-router-dom';
import BasketPage from './components/pages/BasketPage';
import Header from './components/header/Header';
import { useEffect, useMemo, useState } from 'react';
import OrderPage from './components/pages/OrderPage';
import { fetchingCategories, fetchingProducts, setCurrentCategoryActionCreator, setCurrentRangeActionCreator } from './redux/reducer';
import { addProductToBasketHelp, createProductList, loadBasketToStorage, saveBasketToStorage } from './helpFunctions/helpFunctions';
import HistoryPage from './components/pages/HistoryPage';





const App = (props) => {

  const { categories, products, images, variations, productTotal, currentCategory, currentRange, setCurrentCategoryActionCreator, setCurrentRangeActionCreator, fetchingCategories, fetchingProducts } = props;

  let [productsInBasket, setProductsInBasket] = useState(loadBasketToStorage() || []);
  const [basketCount, setBasketCount] = useState(0);
  const [queryType, setQueryType] = useState('NEW');

  let productList = createProductList(products, images, variations);


  useEffect(() => {
    console.log('fetchingCategories')
    fetchingCategories();
  }, [])



  useEffect(() => {
    if(currentCategory && currentRange) {
      console.log('fetchingProducts');
      let query = {currentCategory, currentRange, queryType}
      fetchingProducts(query);
    }
  }, [currentCategory, currentRange])



  const addProductToBasket = (dataForBasket) => {
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
          setCurrentCategoryActionCreator={setCurrentCategoryActionCreator}
          basketCount={basketCount}
          cleanBasket={cleanBasket}
          setCurrentRangeActionCreator={setCurrentRangeActionCreator}
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
            setCurrentRangeActionCreator={setCurrentRangeActionCreator}
            setQueryType={setQueryType}
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



const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    products: state.products,
    images: state.images,
    variations: state.variations,
    productTotal: state.productTotal,
    currentCategory: state.currentCategory,
    currentRange: state.currentRange
  }
}




export default connect(mapStateToProps,
  {
    fetchingCategories,
    fetchingProducts,
    setCurrentCategoryActionCreator,
    setCurrentRangeActionCreator
  })(App);