import { connect, Provider, useDispatch } from 'react-redux';
import './App.css';
import MainPage from './components/pages/MainPage';
import { Route, Routes } from 'react-router-dom';
import BasketPage from './components/pages/BasketPage';
import Header from './components/header/Header';
import { useEffect, useMemo, useState } from 'react';
import Order from './components/pages/Order';
import { fetchingCategories, fetchingProducts, setCurrentCategoryActionCreator } from './redux/reducer';
import { loadBasketToStorage, saveBasketToStorage } from './helpFunctions/helpFunctions';






const App = (props) => {

  const {categories, products, productTotal, currentCategory, setCurrentCategoryActionCreator} = props;

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('fetchingCategories')
    dispatch(fetchingCategories(currentCategory));
  }, [currentCategory])


  const [productsInBasket, setProductsInBasket] = useState(loadBasketToStorage() || []);
  const [currentRange, setCurrentRange] = useState(50);
  const [basketCount, setBasketCount] = useState(0);




  useMemo(() => {
    setBasketCount(productsInBasket.length)
  }, [productsInBasket.length]);


 

  const addProductToBasket = (dataForBasket) => {
    // setBasketCount(productsInBasket.length + 1);

    // Кол-во одного вида товара в корзине!!!!!!!!!!!!!!!!!!!!!

    // let recurringProduct = productsInBasket.filter(productInBasket => {
    //   if (productInBasket.product_id === dataForBasket.product_id) return productInBasket.mount + 1
    // }
    // );

    // if(recurringProduct.length) {
    //   dataForBasket = [...productsInBasket]
    // } else {
    //   dataForBasket = {...dataForBasket, id: productsInBasket.length + 1, mount: 1}
    // }


    

    dataForBasket = {...dataForBasket, id: productsInBasket.length + 1, mount: 1}
    
    setProductsInBasket([...productsInBasket, { ...dataForBasket }])
    
  }



  useMemo(() => {
    saveBasketToStorage(productsInBasket)
  }, [productsInBasket])



  console.log('render')



  let range = {currentRange, setCurrentRange, productTotal};

  
  // if(!categories && !currentCategory && !products && !images && !productVariations) return <>Loading...</>

  return (
    <>
      
          <Header
            categories={categories}
            setCurrentCategoryActionCreator={setCurrentCategoryActionCreator}
            basketCount={basketCount}
            setCurrentRange={setCurrentRange}
          />
          <Routes>
            {/* <Route exact path='/main-page' element={<MainPage />} /> */}
            <Route path='/' element={
                <MainPage
                  products={products}
                  addProductToBasket={addProductToBasket}
                  range={range}
                />
              } />
            <Route path='/basket' element={
              <BasketPage
                productsInBasket={productsInBasket}
                setProductsInBasket={setProductsInBasket}
            />} />
            <Route path='/order' element={
             <Order/>} />
            <Route path='*' element={<div>404 NOT FOUND</div>} />
          </Routes>
  
    </>
  );
}



const mapStateToProps = (state) => {
// console.log(state)
  return {
    categories: state.categories,
    products: state.products,
    productTotal: state.productTotal,
    currentCategory: state.currentCategory
  }
}



// export default compose connect(mapStateToProps, 
//   mapDispatchToProps,
// )(App);


  
  export default connect(mapStateToProps,
    {
      fetchingCategories,
      fetchingProducts,
      setCurrentCategoryActionCreator
    })(App);