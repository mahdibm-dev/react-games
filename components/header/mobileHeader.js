import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import styles from './header.module.css'
import Icon from '../../public/icons/index'

export const row2 = [
	{
		title: 'Apéritif',
		icon: <Icon.Cup />,
		url: 'https://menu-vegetarien.com/plat/aperitifs/',
	},
	{
		title: 'Petit-déjeuner',
		icon: <Icon.Petit />,
		url: 'https://menu-vegetarien.com/plat/petits-dejeuners/',
	},
	{
		title: 'Entrées',
		icon: <Icon.Entree />,
		url: 'https://menu-vegetarien.com/plat/entrees/',
	},
	{
		title: 'Plats',
		icon: <Icon.Plat />,
		url: 'https://menu-vegetarien.com/plat/plat-principal/',
	},
	{
		title: 'Desserts',
		icon: <Icon.Dessert />,
		url: 'https://menu-vegetarien.com/plat/dessert/',
	},
]
const row3 = [
	{ title: 'Recettes du monde', url: '#' },
	{
		title: 'Recettes indiennes',
		url: 'https://menu-vegetarien.com/cuisine/indienne/',
	},
	{
		title: 'Recettes asiatiques',
		url: 'https://menu-vegetarien.com/cuisine/asiatique/',
	},
	{
		title: 'Recettes italiennes',
		url: 'https://menu-vegetarien.com/cuisine/italienne/',
	},
]
const row4 = [
	{ title: 'Autre recettes', url: '#' },
	{
		title: '30 minutes max',
		url: 'https://menu-vegetarien.com/cuisine/moins-de-30-minutes/',
	},
	{
		title: 'Régime',
		url: 'https://menu-vegetarien.com/cuisine/faible-en-calories/',
	},
	{
		title: 'Sans gluten',
		url: 'https://menu-vegetarien.com/cuisine/sans-gluten/',
	},
	{
		title: 'Moins de 5 ingrédients',
		url: 'https://menu-vegetarien.com/cuisine/moins-de-5-ingredients/',
	},
]

const Alimentation = [
	{
		title: 'Alimentation végétarienne',
		image: '/memory/al1.webp',
		url: 'https://menu-vegetarien.com/alimentation-vegetarienne/',
	},
	{
		title: 'Alimentation vegan',
		image: '/memory/al2.webp',
		url: 'https://menu-vegetarien.com/alimentation-vegan/',
	},
	{
		title: 'Fruits et légumes de saison',
		image: '/memory/al3.webp',
		url: 'https://menu-vegetarien.com/les-fruits-et-legumes-de-saison/',
	},
	{
		title: 'Produits substituts',
		image: '/memory/al4.webp',
		url: 'https://menu-vegetarien.com/boutique/',
	},
]
const WeeklyMenu = [
	{
		title: 'MENUS VÉGÉTARIENS',
		image: '/memory/veg1.webp',
		url: 'https://menu-vegetarien.com/idees-menus-vegetariens-semaine/',
	},
	{
		title: 'MENUS VEGAN',
		image: '/memory/veg2.webp',
		url: 'https://menu-vegetarien.com/idees-menus-vegan-semaine/',
	},
	{
		title: 'MENUS DE FETE',
		image: '/memory/veg3.webp',
		url: 'https://menu-vegetarien.com/menu-vegetarien-de-fete/',
	},
	{
		title: 'MENUS SUR ABONNEMENT',
		image: '/memory/veg4.webp',
		url: 'https://menu-vegetarien.com/abonnement/',
	},
]
const SwipeableDrawer = dynamic(() => import('@mui/material/SwipeableDrawer'))
export default function MobileHeader({ navItems }) {
	const [isClicked, setIsClicked] = useState({
		1: false,
		2: false,
		3: false,
		4: false,
		5: false,
		6: false,
	})
	const fn = n => {
		setIsClicked(prev => ({ ...prev, [n]: !prev[n] }))
	}
	const anchor = 'left'
	const [state, setState] = useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	})

	const toggleDrawer = (anchor, open) => event => {
		if (
			event &&
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return
		}

		setState({ ...state, [anchor]: open })
	}

	return (
		<>
			<div
				style={{
					fontSize: '25px',
					width: '100%',
					color: '#7f7f7f',
					display: 'flex',
					justifyContent: 'flex-end',
					alignItems: 'center',
					padding: '0.2rem',
					height: '65px',
				}}
				className={styles.icon}
				onClick={toggleDrawer(anchor, true)}
			>
				<span style={{ cursor: 'pointer' }}>&#9776;&nbsp;</span>
			</div>
			<SwipeableDrawer
				style={{ zIndex: '9999', width: '70%' }}
				anchor={anchor}
				open={state[anchor]}
				onClose={toggleDrawer(anchor, false)}
				onOpen={toggleDrawer(anchor, true)}
			>
				<ul
					style={{
						backgroundColor: 'white',
						listStyle: 'none',
						width: '350px',
						height: '100%',
						margin: 0,
						padding: '0',
					}}
				>
					<li
						className={styles.parentNavItem}
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							height: 'fit-content',
							paddingTop: '1.5rem',
						}}
					>
						<Link passHref href="/">
							<a aria-label="aneviroscope">
								<Image src="/memory/logo.png" width={120} height={35} />
							</a>
						</Link>
						<div
							style={{
								fontSize: '1.2rem',
								color: 'white',
								height: '42px',
								width: '45px',
								padding: '8px',
								backgroundColor: '#FFAF00',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								borderRadius: '3px',
							}}
							onClick={toggleDrawer(anchor, false)}
						>
							X
						</div>
					</li>
					{/*1 */}
					<div>
						<li className={styles.parentNavItem}>
							<Link passHref href="">
								<a onClick={toggleDrawer(anchor, false)}>Menus de la semaine</a>
							</Link>

							{
								<div
									onClick={() => {
										fn(1)
									}}
								>
									{isClicked[1] ? (
										<div
											style={{
												border: 'solid 1px #7a7a7a',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												height: '34px',
												width: '45px',
												borderRadius: '20px',
												padding: '4px 15px',
												fontSize: '1.2rem',
											}}
										>
											-
										</div>
									) : (
										<div
											style={{
												border: 'solid 1px #7a7a7a',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												height: '34px',
												width: '45px',
												borderRadius: '20px',
												padding: '4px 15px',
												fontSize: '1.2rem',
											}}
										>
											+
										</div>
									)}
								</div>
							}
						</li>
						<li>
							{isClicked[1] &&
								WeeklyMenu.map((item, i) => (
									<div
										key={item.title}
										className={styles.parentNavItem}
										style={{
											backgroundColor: 'white',
											color: '#44006B',
											borderColor: '#d5d5d5',
											borderTop: !i ? '3px solid #9FC22B' : '',
											height: 'fit-content',
											justifyContent: 'center',
										}}
									>
										<a
											target="_top"
											className={styles.NavItem1}
											href={item.url}
										>
											<div>
												<Image
													src={item.image}
													width={50}
													height={40}
													alt={item.title}
												/>
											</div>
											<div className={styles.navItemTitle}>{item.title}</div>
										</a>
									</div>
								))}
						</li>
					</div>
					{/*2 */}
					<div>
						<li className={styles.parentNavItem}>
							<Link passHref href="">
								<a onClick={toggleDrawer(anchor, false)}>Recette</a>
							</Link>

							{
								<div
									onClick={() => {
										fn(2)
									}}
								>
									{isClicked[2] ? (
										<div
											style={{
												border: 'solid 1px #7a7a7a',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												height: '34px',
												width: '45px',
												borderRadius: '20px',
												padding: '4px 15px',
												fontSize: '1.2rem',
											}}
										>
											-
										</div>
									) : (
										<div
											style={{
												border: 'solid 1px #7a7a7a',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												height: '34px',
												width: '45px',
												borderRadius: '20px',
												padding: '4px 15px',
												fontSize: '1.2rem',
											}}
										>
											+
										</div>
									)}
								</div>
							}
						</li>
						<li>
							{isClicked[2] && (
								<div
									style={{
										backgroundColor: 'white',
										borderColor: '',
										display: 'grid',
										gridTemplateColumns: '1fr 1fr',
										columnGap: '2rem',
										padding: '1rem',
										borderTop: '3px solid #9FC22B',
									}}
								>
									<div
										style={{
											backgroundColor: 'white',
											borderColor: '',
											display: 'grid',
											gridTemplateColumns: '1fr',
											gap: '10px 0',
										}}
									>
										<a
											className={styles.NavItem1}
											href="https://menu-vegetarien.com/recettes-vegetariennes-faciles/"
											target="_top"
										>
											<div>
												<Image
													src="/memory/rec1.webp"
													width={195}
													height={110}
													alt="Recettes végétariennes"
												/>
											</div>
											<div className={styles.recetteText}>
												Recettes végétariennes
											</div>
										</a>
										<a
											className={styles.NavItem1}
											href="https://menu-vegetarien.com/recettes-vegan-faciles/"
											target="_top"
										>
											<div>
												<Image
													src="/memory/rec2.webp"
													width={195}
													height={110}
													alt="Recettes vegan"
												/>
											</div>
											<div className={styles.recetteText}>Recettes vegan</div>
										</a>
									</div>
									<div
										style={{
											backgroundColor: 'white',
											borderColor: '',
											display: 'grid',
											gridTemplateColumns: '1fr',
											alignContent: 'start',
										}}
									>
										{row2.map(item => (
											<a
												target="_top"
												key={item.title}
												className={styles.recetterow2}
												href={item.url}
												style={{ display: 'flex', alignItems: 'center' }}
											>
												<div style={{ marginRight: '0.3rem' }}>{item.icon}</div>
												<div className={styles.recetteText}>{item.title}</div>
											</a>
										))}
									</div>
									<div
										style={{
											backgroundColor: 'white',
											borderColor: '',
											display: 'grid',
											gridTemplateColumns: '1fr',
											alignContent: 'start',
										}}
									>
										{row3.map((item, i) => (
											<div className={styles.recetterow3} key={item.title}>
												<div
													className={styles.recetteText}
													style={{
														color: i < 1 ? '#ffaa00' : 'black',
														fontWeight: i < 1 ? 'bold' : '400',
													}}
												>
													<a
														target="_top"
														href={item.url}
														style={{
															cursor: i < 1 ? 'auto' : 'pointer',
														}}
													>
														{item.title}
													</a>
												</div>
											</div>
										))}
									</div>
									<div
										style={{
											backgroundColor: 'white',
											borderColor: '',
											display: 'grid',
											gridTemplateColumns: '1fr',
											alignContent: 'start',
										}}
									>
										{row4.map((item, i) => (
											<div className={styles.recetterow3} key={item.title}>
												<div
													className={styles.recetteText}
													style={{
														color: i < 1 ? '#ffaa00' : 'black',
														fontWeight: i < 1 ? 'bold' : '400',
													}}
												>
													<a
														target="_top"
														href={item.url}
														style={{
															cursor: i < 1 ? 'auto' : 'pointer',
														}}
													>
														{item.title}
													</a>
												</div>
											</div>
										))}
									</div>
								</div>
							)}
						</li>
					</div>
					{/*3 */}
					<div>
						<li className={styles.parentNavItem}>
							<Link passHref href="">
								<a target="_top" onClick={toggleDrawer(anchor, false)}>
									Alimentation
								</a>
							</Link>

							{
								<div
									onClick={() => {
										fn(3)
									}}
								>
									{isClicked[3] ? (
										<div
											style={{
												border: 'solid 1px #7a7a7a',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												height: '34px',
												width: '45px',
												borderRadius: '20px',
												padding: '4px 15px',
												fontSize: '1.2rem',
											}}
										>
											-
										</div>
									) : (
										<div
											style={{
												border: 'solid 1px #7a7a7a',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												height: '34px',
												width: '45px',
												borderRadius: '20px',
												padding: '4px 15px',
												fontSize: '1.2rem',
											}}
										>
											+
										</div>
									)}
								</div>
							}
						</li>
						<li>
							{isClicked[3] && (
								<div
									className={styles.parentNavItem}
									style={{
										backgroundColor: 'white',
										color: '#44006B',
										borderColor: '',
										height: 'fit-content',
										justifyContent: 'center',
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'stretch',
										borderTop: '3px solid #9FC22B',
									}}
								>
									<div
										style={{
											display: 'flex',
											alignItems: 'stretch',
											justifyContent: 'center',
										}}
									>
										<a
											target="_top"
											className={styles.NavItem1}
											href={Alimentation[0].url}
										>
											<div>
												<Image
													src={Alimentation[0].image}
													width={100}
													height={100}
													alt={Alimentation[0].title}
												/>
											</div>
											<div className={styles.navItemTitle}>
												{Alimentation[0].title}
											</div>
										</a>
										<a
											target="_top"
											className={styles.NavItem1}
											href={Alimentation[1].url}
										>
											<div>
												<Image
													src={Alimentation[1].image}
													width={100}
													height={100}
													alt={Alimentation[1].title}
												/>
											</div>
											<div className={styles.navItemTitle}>
												{Alimentation[1].title}
											</div>
										</a>
									</div>
									<div
										style={{
											display: 'flex',
											alignItems: 'stretch',
											justifyContent: 'center',
										}}
									>
										<a
											target="_top"
											className={styles.NavItem1}
											href={Alimentation[2].url}
										>
											<div>
												<Image
													src={Alimentation[2].image}
													width={100}
													height={100}
													alt={Alimentation[2].title}
												/>
											</div>
											<div className={styles.navItemTitle}>
												{Alimentation[2].title}
											</div>
										</a>
										<a
											target="_top"
											className={styles.NavItem1}
											href={Alimentation[3].url}
										>
											<div>
												<Image
													src={Alimentation[3].image}
													width={100}
													height={100}
													alt={Alimentation[3].title}
												/>
											</div>
											<div className={styles.navItemTitle}>
												{Alimentation[3].title}
											</div>
										</a>
									</div>
								</div>
							)}
						</li>
					</div>
					{/*4 */}
					<div>
						<li className={styles.parentNavItem}>
							<a
								target="_top"
								onClick={toggleDrawer(anchor, false)}
								href="https://menu-vegetarien.com/boutique/"
							>
								Abonnement
							</a>
						</li>
					</div>
					{/*5 */}
					<div>
						<li className={styles.parentNavItem}>
							<a
								target="_top"
								onClick={toggleDrawer(anchor, false)}
								style={{
									display: 'flex',
									justifyContent: 'flex-start',
									alignItems: 'center',
								}}
								href="https://menu-vegetarien.com/espace-abonne/favoris/"
							>
								<Icon.Favoris />
								&nbsp;&nbsp;Mes favoris
							</a>
						</li>
					</div>
					{/*6 */}
					<div>
						<li className={styles.parentNavItem}>
							<a
								target="_top"
								onClick={toggleDrawer(anchor, false)}
								href="https://menu-vegetarien.com/connexion/"
							>
								<Icon.Compte />
							</a>
						</li>
					</div>
				</ul>
			</SwipeableDrawer>
		</>
	)
}
