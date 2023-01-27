/* eslint-disable react/button-has-type */
import { Grid } from '@mui/material'
import Image from 'next/image'
import styles from './banditManchot.module.css'

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
					src="/bandit/logojeunoel2.png"
					width={windowSize > 500 ? 320 : 300}
					height={windowSize > 500 ? 240 : 220}
					alt="Welcome"
				/>
			</Grid>
			<Grid item xs={11} md={12}>
				<div className={styles.welcomePg}>
					Lancez le Bandit Manchot
					<br /> et tentez de gagner l'un des&nbsp;
					<b>2 Paniers gourmands Bord à Bord</b>,
					<br />
					composé d'un <b>"Tsukudani d'algue kombu confit"</b>,
					<br />
					d'un <b>"pesto vert aux algues et basilic"</b>
					<br /> et d'un <b>"pesto rouge aux algues et tomates"</b>.
					<br />
					<div style={{ marginTop: '1rem' }}>
						Tirage au sort parmi les vainqueurs le 24 décembre !
					</div>
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
