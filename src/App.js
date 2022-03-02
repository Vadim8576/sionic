import { Provider } from 'react-redux';
import './App.css';
import MainPage from './components/pages/MainPage';
import store from './redux/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BasketPage from './components/pages/BasketPage';
import Header from './components/header/Header';
import { useEffect, useMemo, useState } from 'react';
import { productsAPI } from './api/api';
import { fetchingData } from './fetchingData/fetchingData';
import { calcTotalItems, getIdsOfProducts } from './helpFunctions/helpFunctions';
import Order from './components/pages/Order';





const App = () => {
  const [productsInBasket, setProductsInBasket] = useState([]);

  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('');
  const [currentRange, setCurrentRange] = useState(50);
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [productVariations, setProductVariations] = useState([]); // цены, кол-во
  const [basketCount, setBasketCount] = useState(0);
  const [productTotal, setProductTotal] = useState(0); //общее кол-во продуктов

  

  /*
  useEffect(() => {
    fetchingData(currentRange).then(data => {
      console.log(data)
    })
  }, [])

*/




  // let categories, currentCategory, productTotal, products, images, productVariations, error;

  // const calcProductTotal = (response) => {

  //     let index = response.headers['content-range'].indexOf('/');
  //     let result = response.headers['content-range'].slice(index + 1);
  //     return result;
  // }

  // useEffect(() => {

  //     fetchingData().then(response => {
  //         console.log(response)
  //     })



  //     setCategories(categories);
  //     setcurrentCategory(currentCategory)
  //     setProducts(products);
  //     setImages(images);
  //     setProductVariations(productVariations);
  //     setProductTotal(productTotal);


  // }, [])



  //Получить Категории
  useEffect(() => {   
    productsAPI.getCategories(currentRange)
      .then(response => {
        setCategories(response);
      })
  }, [])

  //Получить продукты
  useEffect(() => {
    productsAPI.getProducts(currentCategory, currentRange)
      .then(response => {
        setProductTotal(calcTotalItems(response))
        setProducts(response.data);
      })
  }, [currentCategory, currentRange]);

  //Получить изображения продуктов
  useEffect(() => {
    productsAPI.getProductsImages(getIdsOfProducts(products))
      .then(response => {
        setImages(response);
      });
  }, [products]);


  //Получить цены продуктов и кол-во
  useEffect(() => {
    productsAPI.getProductVariations(getIdsOfProducts(products))
      .then(response => {
        setProductVariations(response);
      });
  }, [products]);


  useMemo(() => {
    categories[0]?.id && setCurrentCategory(categories[0].id)
  }, [categories]);




  useMemo(() => {
    setBasketCount(productsInBasket.length)
  }, [productsInBasket.length]);



 

  const addInButtonHandler = (dataForBasket) => {
    // setBasketCount(productsInBasket.length + 1);
    dataForBasket = {...dataForBasket, id: productsInBasket.length + 1}
    setProductsInBasket([...productsInBasket, { ...dataForBasket }])
  }


  console.log('render')



  let range = {currentRange, setCurrentRange, productTotal};

  
  if(!categories && !currentCategory && !products && !images && !productVariations) return <>Loading...</>

  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Header
            categories={categories}
            setCurrentCategory={setCurrentCategory}
            basketCount={basketCount}
            setCurrentRange={setCurrentRange}
          />
          <Routes>
            {/* <Route exact path='/main-page' element={<MainPage />} /> */}
            <Route path='/' element={
                <MainPage
                  products={products}
                  images={images}
                  productVariations={productVariations}
                  addInButtonHandler={addInButtonHandler}
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
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
