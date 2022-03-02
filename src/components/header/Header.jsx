import React from 'react';
import css from './header.module.css';
import logo from '../../assets/logo.png'
import geoPositionMarker from '../../assets/map-marker-alt.svg'
import CategoriesList from './CategoriesList';
import BasketIcon from '../UI/basketIcon/BasketIcon'
import { NavLink, useLocation } from 'react-router-dom';



const Header = ({ categories, setCurrentCategory, basketCount, setCurrentRange }) => {

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
					<div className={css.userAvatar}></div>
				</div>
			</div>
			<div className={css.headerLine2}>

				{
					locationIsBasket
						? <h2>Корзина</h2>
						: <>
							<h2>Категория товаров</h2>
							<CategoriesList
								categories={categories}
								setCurrentCategory={setCurrentCategory}
								setCurrentRange={setCurrentRange}
							/>
						</>
				}
			</div>
		</header>
	)
}


export default Header;
