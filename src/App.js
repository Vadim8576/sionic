import { connect, Provider, useDispatch } from 'react-redux';
import './App.css';
import MainPage from './components/pages/MainPage';
import { Route, Routes } from 'react-router-dom';
import BasketPage from './components/pages/BasketPage';
import Header from './components/header/Header';
import { useEffect, useMemo, useState } from 'react';
import Order from './components/pages/Order';
import { fetchingCategories, fetchingNewProducts, fetchingProducts, setCurrentCategoryActionCreator, setCurrentRangeActionCreator } from './redux/reducer';
import { loadBasketToStorage, saveBasketToStorage } from './helpFunctions/helpFunctions';






const App = (props) => {

  const {categories, products, images, variations, productTotal, currentCategory, currentRange, setCurrentCategoryActionCreator, setCurrentRangeActionCreator, fetchingCategories, fetchingNewProducts, fetchingProducts} = props;
 

  let productList = products?.map(product => {
    let img = [];
    images.forEach(image => {
      if(product.id === image.product_id) img.push(image)
    })
    product.imgs = [...img]

    let variat = [];
    variations.forEach(variation => {
      if(product.id === variation.product_id) variat.push(variation)
    })
    product.variations = [...variat]

    return product
  })

  // console.log(productList)



  const dispatch = useDispatch();


  let [productsInBasket, setProductsInBasket] = useState(loadBasketToStorage() || []);
  const [basketCount, setBasketCount] = useState(0);

  useEffect(() => {
    console.log('fetchingCategories')
    // dispatch(fetchingCategories());
    fetchingCategories();
  }, [])


  useEffect(() => {
    
    if(currentCategory && currentRange) {
      console.log('fetchingProducts');


      // dispatch(fetchingNewProducts(currentCategory, currentRange));
      fetchingNewProducts(currentCategory, currentRange);
    }
  }, [currentCategory, currentRange])

  // useEffect(() => {
    
  //   if(currentRange) {
  //     console.log('fetchingProducts2');

  //     // dispatch(fetchingProducts(currentCategory, currentRange));
  //     fetchingProducts(currentCategory, currentRange);
  //   }
  // }, [currentRange])


  
// console.log('currentCategory!!', currentCategory)
// console.log('currentRange!!', currentRange)


  useMemo(() => {
    setBasketCount(productsInBasket.length)
  }, [productsInBasket.length]);



  const addProductToBasket = (dataForBasket) => {
    let addNew = true;
    let items = [];
    let variations = [];

    productsInBasket.length
    ? items = productsInBasket.map(product => {
      if(dataForBasket.product_id === product.product_id && dataForBasket.variations.id === product.variations.id) {
        product.count++;

        addNew = false;
      }
      return product
    })
    : items = []

    addNew ? setProductsInBasket([...items, dataForBasket]) : setProductsInBasket(items)
  }


  useMemo(() => {
    // console.log(productsInBasket)
    saveBasketToStorage(productsInBasket)
  }, [productsInBasket])


const cleanBasket = () => {
  setProductsInBasket([])
}







  console.log('render')

  let range = {currentRange, productTotal};

  

  return (
    <>
      
          <Header
            categories={categories}
            setCurrentCategoryActionCreator={setCurrentCategoryActionCreator}
            basketCount={basketCount}
            cleanBasket={cleanBasket}
            setCurrentRangeActionCreator={setCurrentRangeActionCreator}
          />
          <Routes>
            {/* <Route exact path='/main-page' element={<MainPage />} /> */}
            <Route path='/' element={
                <MainPage
                  products={productList}
                  addProductToBasket={addProductToBasket}
                  range={range}
                  setCurrentRangeActionCreator={setCurrentRangeActionCreator}
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
      fetchingNewProducts,
      setCurrentCategoryActionCreator,
      setCurrentRangeActionCreator
    })(App);