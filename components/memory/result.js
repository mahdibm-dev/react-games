/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
import { Grid } from '@mui/material'
import Image from 'next/image'
import styles from './game.module.css'
import { useState } from 'react'
import Social from '../social/social'
async function updateUser(email, temp, gagnant, clicks) {
	const url = `${process.env.URL}update_user_memory`
	var myHeaders = new Headers()
	myHeaders.append('token', process.env.TOKEN)
	myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

	var urlencoded = new URLSearchParams()
	urlencoded.append('email', email)
	urlencoded.append('temp', temp)
	urlencoded.append('gagnant', gagnant)
	urlencoded.append('clicks', clicks)
	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: urlencoded,
		redirect: 'follow',
	}
	let res = await fetch(url, requestOptions)
	res = await res.json()
	return res
}
function Result({ handleClose, won, elapsedTime, clicks, startHandler }) {
	const [showMe, setShowMe] = useState(false)
	function click() {
		setShowMe(!showMe)
	}
	const reultofgame = async () => {
		try {
			const email = localStorage.getItem('email')
			const res = await updateUser(email, elapsedTime, won, clicks)
			if (!res.success) {
				console.log(res)
				return
			}
		} catch (error) {
			console.log(error)
		}
	}
	reultofgame()
	return (
		<Grid
			item
			xs={12}
			md={12}
			container
			justifyContent="center"
			rowSpacing={1}
			columnSpacing={1}
			style={{ marginBottom: window.innerWidth > 500 ? '15rem' : '' }}
		>
			<Grid
				item
				xs={12}
				md={12}
				container
				justifyContent="center"
				style={{ marginTop: '-50px' }}
			>
				<Image src="/memory/logo2.png" width={354} height={271} />
			</Grid>
			<Grid item xs={11} md={12}>
				<div className={styles.remplirText}>
					{won
						? 'Félicitations ! Vous vous en êtes bien sorti(e) !'
						: 'Oups ! Vous avez échoué'}
				</div>
			</Grid>
			<Grid item xs={11} md={12}>
				<div className={styles.welcomePg} style={{ padding: '0' }}>
					Voici vos résultats
				</div>
			</Grid>
			<Grid item xs={11} md={12} container justifyContent="center">
				<Grid item xs={11} md={3.5}>
					<div className={styles.results} style={{ padding: '0' }}>
						<div className={styles.row}>
							<div>Temps écoulé</div>
							<div>{elapsedTime}</div>
						</div>
						<div className={styles.row}>
							<div>Coups joués</div>
							<div>{clicks}</div>
						</div>
					</div>
				</Grid>
			</Grid>
			<Grid item xs={11} md={12}>
				<div className={styles.welcomePg} style={{ padding: '0' }}>
					Les deux personnes ayant réalisé les meilleurs scores
					<br /> recevront le Panier Gourmand l’Atelier V
				</div>
			</Grid>
			<Grid item xs={7} md={1.5}>
				<button
					onClick={() => {
						handleClose()
						startHandler()
					}}
					className={styles.resultButton}
				>
					Réessayer
				</button>
			</Grid>
			<Grid item xs={7} md={1.5}>
				<button onClick={click} className={styles.resultButton}>
					Partager
				</button>
			</Grid>
			<br></br>
			<div style={{ width: '100%', height: '100px' }}>
				<Social showMe={showMe}></Social>
			</div>
		</Grid>
	)
}
export default Result
