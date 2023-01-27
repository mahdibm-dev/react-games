/* eslint-disable react/button-has-type */
import { Grid } from '@mui/material'
import Image from 'next/image'
import styles from './simon.module.css'

function Welcome({ setIsParticipated, windowSize }) {
	const handleSubmit = () => {
		setIsParticipated(prev => !prev)
	}
	return (
		<Grid
			item
			xs={12}
			md={12}
			container
			justifyContent="center"
			style={{ zIndex: '999' }}
		>
			<Grid item xs={11} md={10} container justifyContent="center">
				<Image
					src="/laJuste/jeu.png"
					width={windowSize > 500 ? 320 : 300}
					height={windowSize > 500 ? 240 : 220}
					alt="Welcome"
				/>
			</Grid>
			<Grid item xs={11} md={12}>
				<div className={styles.welcomePg}>
					Jouez pour tenter de gagner l'un des <b>2 Paniers gourmands Nudj</b>
					<br /> composés de
					<b> galettes végétales Tomate-Oignon grillé</b>,
					<br /> de <b>galettes végétales piment-poivron</b>,
					<br /> et de <b>nuggets végétales originales</b>.
					<br /> Déterminez le nombre de calories de la recette en moins de 10
					essais !<br />
					Les paniers seront attribués aux 2 joueurs qui auront trouvé
					<br />
					la juste calorie en moins de coups.
				</div>
			</Grid>
			<Grid item xs={8} md={2}>
				<button onClick={handleSubmit} className={styles.participateButton}>
					Je joue
				</button>
			</Grid>
		</Grid>
	)
}
export default Welcome
