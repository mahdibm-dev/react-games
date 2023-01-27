import { Grid } from '@mui/material'
import Image from 'next/image'
import styles from './header.module.css'

export const Alimentation = [
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
function NavItem3() {
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
			{Alimentation.map((item, i) => (
				<Grid
					key={item.title}
					item
					md={3}
					xs={3}
					style={{
						borderRight: i < 3 ? 'solid 1px #e1e3e3' : '',
						padding: '0.5rem 0',
					}}
				>
					<a target="_top" className={styles.NavItem1} href={item.url}>
						<div>
							<Image
								src={item.image}
								width={100}
								height={100}
								alt={item.title}
							/>
						</div>
						<div className={styles.navItemTitle}>{item.title}</div>
					</a>
				</Grid>
			))}
		</Grid>
	)
}
export default NavItem3
