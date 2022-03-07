import React from 'react';
import css from './header.module.css';
import logo from '../../assets/logo.png'
import geoPositionMarker from '../../assets/map-marker-alt.svg'
import CategoriesList from './CategoriesList';
import BasketIcon from '../UI/basketIcon/BasketIcon'
import { NavLink, useLocation } from 'react-router-dom';



const Header = ({ categories, setCurrentCategoryActionCreator, basketCount, setCurrentRange, cleanBasket, setCurrentRangeActionCreator }) => {

	let locationIsBasket = useLocation().pathname.includes('basket')



	return (
		<header className={css.pageHeader}>
			<div className={css.headerLine1}>
				<div className={css.headerLine1Logo}>
					<NavLink to={'/'} className='link'>
						<img src={logo} />
					</NavLink>
				</div>
				<div className={css.headerLine1GeoPosition}>
					<img src={geoPositionMarker} />
					<p>Санкт-Петербург, Ленинский пр., д. 344</p>
				</div>
				<div className={css.headerLine1Seach}>
					<input type='text' placeholder='Поиск бренда, товара, категории' />
					<button>S</button>
				</div>

				<BasketIcon basketCount={basketCount} />


				<div className={css.headerLine1UserAvatar}>
					<NavLink to={'/order'} className='link'>
						<div className={css.userAvatar}></div>
					</NavLink>
				</div>
			</div>
			<div className={css.headerLine2}>

				{
					locationIsBasket
						? <>
							<div className={css.headerBasketTitle}>
								<h2>Корзина</h2>
								<div className={css.cleanBasketBtn} onClick={cleanBasket}>Очистить корзину</div>
							</div>
						</>
						: <>
							<h2>Категория товаров</h2>
							<CategoriesList
								categories={categories}
								setCurrentCategoryActionCreator={setCurrentCategoryActionCreator}
								setCurrentRange={setCurrentRange}
								setCurrentRangeActionCreator={setCurrentRangeActionCreator}
							/>
						</>
				}
			</div>
		</header>
	)
}


export default Header;
