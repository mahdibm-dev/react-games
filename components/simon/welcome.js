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
					src="/simon/jeu.png"
					width={windowSize > 500 ? 320 : 300}
					height={windowSize > 500 ? 240 : 220}
					alt="Welcome"
				/>
			</Grid>
			<Grid item xs={11} md={12}>
				<div className={styles.welcomePg}>
					Jouez et tentez de gagner un des<b> 2 Paniers gourmands</b> <br />
					La Belle Iloise composé d’un Indie Veggie,
					<br /> d’un Tartare aux algues de Bretagne, <br />
					et d’une Soupe Arvorig
					<br /> Les paniers seront attribués
					<br /> aux 2 joueurs qui auront fait le plus de points !
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
