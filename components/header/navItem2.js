import { Grid } from '@mui/material'
import Image from 'next/image'
import styles from './header.module.css'
import { row2 } from './mobileHeader'

export const row3 = [
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
export const row4 = [
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

function NavItem2() {
	return (
		<Grid
			item
			container
			xs={11}
			md={8}
			style={{
				backgroundColor: 'white',
				boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
				borderRight: 'solid 0.5px #e1e3e3',
			}}
		>
			<Grid
				item
				container
				justifyContent="center"
				md={3}
				xs={3}
				style={{ padding: '1.5rem 0' }}
			>
				<a
					target="_top"
					className={styles.NavItem1}
					href="https://menu-vegetarien.com/recettes-vegetariennes-faciles/"
				>
					<div>
						<Image
							src="/memory/rec1.webp"
							width={195}
							height={110}
							alt="Recettes végétariennes"
						/>
					</div>
					<div className={styles.recetteText}>Recettes végétariennes</div>
				</a>
				<a
					target="_top"
					className={styles.NavItem1}
					href="https://menu-vegetarien.com/recettes-vegan-faciles/"
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
			</Grid>
			<Grid
				item
				container
				justifyContent="center"
				md={3}
				xs={3}
				style={{
					borderRight: 'solid 0.5px #e1e3e3',
					padding: '2rem 1.3rem',
				}}
			>
				{row2.map(item => (
					<Grid item md={12} xs={12} key={item.title}>
						<a target="_top" className={styles.recetterow2} href={item.url}>
							<div style={{ marginRight: '0.3rem' }}>{item.icon}</div>
							<div className={styles.recetteText}>{item.title}</div>
						</a>
					</Grid>
				))}
			</Grid>
			<Grid
				item
				container
				justifyContent="center"
				alignContent="start"
				md={3}
				xs={3}
				style={{
					borderRight: 'solid 0.5px #e1e3e3',
					padding: '2rem 1.3rem',
				}}
			>
				{row3.map((item, i) => (
					<Grid item md={12} xs={12} key={item.title}>
						<div className={styles.recetterow3}>
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
					</Grid>
				))}
			</Grid>
			<Grid
				item
				container
				alignContent="start"
				md={3}
				xs={3}
				style={{
					borderRight: 'solid 0.5px #e1e3e3',
					padding: '2rem 1.3rem',
				}}
			>
				{row4.map((item, i) => (
					<Grid md={12} xs={12} item key={item.title}>
						<div className={styles.recetterow3}>
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
					</Grid>
				))}
			</Grid>
		</Grid>
	)
}
export default NavItem2
