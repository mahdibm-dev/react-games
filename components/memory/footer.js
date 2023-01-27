import { Grid } from '@mui/material'
import styles from './game.module.css'

const row3 = [
	{ title: 'A propos', url: 'https://menu-vegetarien.com/qui-sommes-nous/' },
	{
		title: 'Service client',
		url: 'https://menu-vegetarien.com/service-client/',
	},
	{
		title: 'Mentions légales',
		url: 'https://menu-vegetarien.com/mentions-legales/',
	},
	{
		title: 'Politique de Confidentialité',
		url: 'https://menu-vegetarien.com/politique-de-confidentialite/',
	},
	{
		title: 'CGV',
		url: 'https://menu-vegetarien.com/conditions-generales-de-vente/',
	},
]
function Footer() {
	return (
		<>
			<Grid container style={{ height: '10px', backgroundColor: '#ffaa00' }} />
			<Grid
				container
				style={{ backgroundColor: '#3c3d3d', padding: '1rem 0' }}
				justifyContent="center"
			>
				<Grid item container xs={11} md={7} style={{ padding: '1.5rem 0' }}>
					<Grid
						item
						container
						xs={11}
						md={6}
						justifyContent="center"
						alignContent="start"
					>
						<Grid item md={12} xs={12}>
							<div className={styles.footerTitles}>Menu-vegetarien.com</div>
						</Grid>
						{row3.map(item => (
							<Grid item md={12} xs={12} key={item.title}>
								<div className={styles.recetterow3}>
									<div className={styles.footerText}>
										<a href={item.url}>{item.title}</a>
									</div>
								</div>
							</Grid>
						))}
					</Grid>
					<Grid item container xs={11} md={6} alignContent="start">
						<Grid item md={12} xs={12}>
							<div className={styles.footerTitles}>NEWSLETTER</div>
						</Grid>
						<Grid item md={12} xs={12}>
							<div
								className={styles.footerText}
								style={{ marginBottom: '0.5rem', cursor: 'auto' }}
							>
								Tous les 15 jours, recevez nos menus et nos nouvelles recettes
								végétariennes.
							</div>
						</Grid>
						<Grid item md={12} xs={12}>
							<input className={styles.textField} placeholder="Email *" />
						</Grid>
						<Grid item md={12} xs={12}>
							<input className={styles.textField} placeholder="Prénom" />
						</Grid>
						<Grid item md={12} xs={12}>
							<button className={styles.footerButton}>S&apos;inscrire</button>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={11} md={7}>
					<hr className={styles.footerHr} />
				</Grid>
			</Grid>
		</>
	)
}
export default Footer
