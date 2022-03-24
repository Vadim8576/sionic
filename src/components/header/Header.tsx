import React from 'react';
import css from './header.module.css';
import logo from '../../assets/logo.png'
import CategoriesList from './CategoriesList';
import BasketIcon from '../UI/basketIcon/BasketIcon'
import { NavLink, useLocation } from 'react-router-dom';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { Categories } from '../../types/types';


interface HeaderProps {
	categories: Categories[]
	setQueryType: (s: string) => void
	setCurrentCategoryAC: (id: number) => void
	basketCount: number
	cleanBasket: () => void
	setCurrentRangeAC: (n: number) => void
}


const Header: React.FC<HeaderProps> = ({
	categories,
	setQueryType,
	setCurrentCategoryAC,
	basketCount,
	cleanBasket,
	setCurrentRangeAC
}) => {

	let locationIsBasket: boolean = useLocation().pathname.includes('basket')
	let locationIsOrder: boolean = useLocation().pathname.includes('order')
	let locationIsHistory: boolean = useLocation().pathname.includes('history')



	return (
		<header className={css.pageHeader}>
			<div className={css.headerLine1}>
				<div className={css.headerLine1Logo}>
					<NavLink to={'/sionic'}>
						<img src={logo} />
					</NavLink>
				</div>
				<div className={css.headerLine1GeoPosition}>
					{/* <img src={geoPositionMarker} />
					<p>Санкт-Петербург, Ленинский пр., д. 344</p> */}
				</div>
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

				<div className={css.headerLine1Basket}>
					<BasketIcon basketCount={basketCount} />
				</div>

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
							setCurrentCategoryAC={setCurrentCategoryAC}
							// setCurrentRange={setCurrentRange}
							setCurrentRangeAC={setCurrentRangeAC}
							setQueryType={setQueryType}
						/>
					</>
				}
			</div>
		</header>
	)
}


export default Header;
