/* eslint-disable react/button-has-type */
import { Grid } from '@mui/material'
import Image from 'next/image'
import styles from './game.module.css'

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
			<Grid
				item
				xs={11}
				md={10}
				container
				justifyContent="center"
				style={{ marginTop: '-50px' }}
			>
				<Image
					src="/memory/logo2.png"
					width={windowSize > 500 ? 320 : 300}
					height={windowSize > 500 ? 240 : 220}
					alt="Welcome"
				/>
			</Grid>
			<Grid item xs={11} md={12}>
				<div className={styles.welcomePg}>
					Jouez pour tenter de gagner
					<br /> un des deux <b>Paniers gourmands</b> 100% végétal
					<b> l'Atelier V</b> composé
					<br /> d'un <b>Houmous haricots blancs truffe</b>,<br />
					<b>Houmous très sésame</b> ,<br /> d'un <b>Taharama</b> et
					<br /> d'une <b>Nouvelle Foie.</b>
				</div>
			</Grid>

			<Grid item xs={8} md={2}>
				<button
					onClick={handleSubmit}
					className={styles.participateButton}
					style={{ marginBottom: '17rem' }}
				>
					Je joue
				</button>
			</Grid>
		</Grid>
	)
}
export default Welcome
