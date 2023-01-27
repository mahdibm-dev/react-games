import { Grid } from '@mui/material'
import Image from 'next/image'
import styles from './header.module.css'

export const WeeklyMenu = [
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
function NavItem1() {
	return (
		<Grid
			item
			container
			xs={11}
			md={8}
			style={{
				backgroundColor: 'white',
				boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
			}}
		>
			{WeeklyMenu.map((item, i) => (
				<Grid
					key={item.title}
					item
					md={3}
					xs={12}
					style={{
						borderRight: i < 3 ? 'solid 0.5px #e1e3e3' : '',
						padding: '0.5rem 0',
					}}
				>
					<a target="_top" className={styles.NavItem1} href={item.url}>
						<div>
							<Image src={item.image} width={50} height={40} alt={item.title} />
						</div>
						<div className={styles.navItemTitle}>{item.title}</div>
					</a>
				</Grid>
			))}
		</Grid>
	)
}
export default NavItem1
