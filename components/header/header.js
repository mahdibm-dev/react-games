import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import Icon from '../../public/icons/index'
import CustomPopper from './customPopper'
import styles from './header.module.css'
import MobileHeader from './mobileHeader'

function Header() {
	const [hoveredItem, setHoveredITem] = useState(0)
	const [isChildHovered, setChildHovered] = useState(false)
	const [isParentHovered, setParentHovered] = useState(false)

	const handleMouseOver = (event, number) => {
		setHoveredITem(number)
		setParentHovered(true)
	}

	const handleMouseOut = () => {
		setParentHovered(false)
	}
	const [windowSize, setSize] = useState(0)
	const handleResize = () => {
		setSize(window.innerWidth)
	}
	useEffect(() => {
		setSize(window.innerWidth)
		window.addEventListener('resize', handleResize, false)
		return () => {
			window.removeEventListener('resize', handleResize, false)
		}
	}, [])
	return (
		<>
			<Grid
				container
				justifyContent="center"
				style={{
					position: 'fixed',
					width: '100%',
					top: 0,
					zIndex: '20',
					padding: '10px',
					boxShadow:
						'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
					backgroundColor: 'white',
					height: '135px',
				}}
			>
				<div className={styles.navLogo} />
				{windowSize > 773 ? (
					<div className={styles.itemContainer}>
						<div
							className={styles.navItemsText}
							onMouseEnter={e => handleMouseOver(e, 1)}
							onMouseLeave={handleMouseOut}
						>
							Menus de la semaine&nbsp;
							<span style={{ fontWeight: 'bold' }}>+</span>
						</div>

						<div
							className={styles.navItemsText}
							onMouseEnter={e => handleMouseOver(e, 2)}
							onMouseLeave={handleMouseOut}
						>
							Recette&nbsp;
							<span style={{ fontWeight: 'bold' }}>+</span>
						</div>

						<div
							className={styles.navItemsText}
							onMouseEnter={e => handleMouseOver(e, 3)}
							onMouseLeave={handleMouseOut}
						>
							Alimentation&nbsp;
							<span style={{ fontWeight: 'bold' }}>+</span>
						</div>

						<a
							className={styles.navItemsText}
							href="https://menu-vegetarien.com/boutique/"
							target="_top"
						>
							Abonnement
						</a>

						<a
							className={styles.navItemsText}
							href="https://menu-vegetarien.com/espace-abonne/favoris/"
							target="_top"
						>
							<Icon.Favoris />
							<div style={{ marginLeft: '0.3rem' }}>Mes favoris</div>
						</a>

						<a
							className={styles.navItemsText}
							href="https://menu-vegetarien.com/connexion/"
							target="_top"
						>
							<Icon.Compte />
						</a>
					</div>
				) : (
					<MobileHeader />
				)}
			</Grid>
			{(isChildHovered || isParentHovered) && (
				<CustomPopper item={hoveredItem} setChildHovered={setChildHovered} />
			)}
		</>
	)
}
export default Header
