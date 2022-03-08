import React from 'react';
import css from './header.module.css';
import logo from '../../assets/logo.png'
import geoPositionMarker from '../../assets/map-marker-alt.svg'
import CategoriesList from './CategoriesList';
import BasketIcon from '../UI/basketIcon/BasketIcon'
import { NavLink, useLocation } from 'react-router-dom';
import { Button, FormControl, InputGroup } from 'react-bootstrap';



const Header = ({ categories, setQueryType, setCurrentCategoryActionCreator, basketCount, setCurrentRange, cleanBasket, setCurrentRangeActionCreator }) => {

	let locationIsBasket = useLocation().pathname.includes('basket')
	let locationIsOrder = useLocation().pathname.includes('order')
	let locationIsHistory = useLocation().pathname.includes('history')



	return (
		<header className={css.pageHeader}>
			<div className={css.headerLine1}>
				<div className={css.headerLine1Logo}>
					<NavLink to={'/'}>
						<img src={logo} />
					</NavLink>
				</div>
				{/* <div className={css.headerLine1GeoPosition}>
					<img src={geoPositionMarker} />
					<p>Санкт-Петербург, Ленинский пр., д. 344</p>
				</div> */}
				<div className={css.headerLine1Seach}>
					{/* <input type='text' placeholder='Поиск бренда, товара, категории' />
					<button>S</button> */}
					<InputGroup className="">
						<FormControl
							placeholder="Поиск бренда, товара, категории"
							aria-label="Поиск бренда, товара, категории"
							aria-describedby="basic-addon2"
						/>
						<Button variant="outline-secondary" id="button-addon2">
							Поиск
						</Button>
					</InputGroup>
				</div>

				<BasketIcon basketCount={basketCount} />


				<div className={css.headerLine1UserAvatar}>
					<NavLink to={'/history'}>
						<div className={css.userAvatar}></div>
					</NavLink>
				</div>
			</div>
			<div className={css.headerLine2}>

				{locationIsBasket &&
					<div className={css.headerBasketTitle}>
						<h2>Корзина</h2>
						<div className={css.cleanBasketBtn} onClick={cleanBasket}>Очистить корзину</div>
					</div>

				}
				{locationIsOrder &&
					<h2>Сформировать заказ</h2>
				}
				{locationIsHistory &&
					<h2>История заказов</h2>
				}
				{!locationIsBasket && !locationIsOrder && !locationIsHistory &&
					<>
						<h2>Категории товаров</h2>
						<CategoriesList
							categories={categories}
							setCurrentCategoryActionCreator={setCurrentCategoryActionCreator}
							setCurrentRange={setCurrentRange}
							setCurrentRangeActionCreator={setCurrentRangeActionCreator}
							setQueryType={setQueryType}
						/>
					</>
				}
			</div>
		</header>
	)
}


export default Header;
