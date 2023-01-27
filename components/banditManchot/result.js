/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
import { Grid } from '@mui/material'
import Image from 'next/image'
import styles from './banditManchot.module.css'
import { useState } from 'react'
import Social from '../social/social'

async function updateUser(email, gagnant, numero_tentative) {
	const url = `${process.env.URL}update_user_bandit`

	var myHeaders = new Headers()
	myHeaders.append('token', process.env.TOKEN)
	myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

	var urlencoded = new URLSearchParams()
	urlencoded.append('email', email)
	urlencoded.append('gagnant', gagnant)
	urlencoded.append('numero_tentative', numero_tentative)
	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: urlencoded,
		redirect: 'follow',
	}
	var res = await fetch(url, requestOptions)
	res = await res.json()
	return res
}

async function reultofgame(email, won, numero_tentative) {
	try {
		if (numero_tentative == Math.ceil(numero_tentative)) {
			const res = await updateUser(email, won, numero_tentative)
			if (!res.success) {
				console.log(res)
				return
			}
		}
	} catch (error) {
		console.log(error)
	}
}
function Result({ won, width, startHandler, handleClose }) {
	const [showMe, setShowMe] = useState(false)
	function click() {
		setShowMe(!showMe)
	}
	const email = localStorage.getItem('email')
	var numero_tentative = localStorage.getItem('numero_tentative')
	numero_tentative = parseFloat(numero_tentative) + 1
	localStorage.setItem('numero_tentative', numero_tentative)

	reultofgame(email, won, numero_tentative)
	return (
		<>
			<Grid
				item
				xs={12}
				md={12}
				container
				justifyContent="center"
				rowSpacing={1}
				columnSpacing={1}
				style={{ marginBottom: width > 500 ? '20rem' : '6rem' }}
			>
				<Grid
					item
					xs={12}
					md={12}
					container
					justifyContent="center"
					style={{ marginTop: '-30px' }}
				>
					<Image src="/bandit/logojeunoel2.png" width={354} height={271} />
				</Grid>
				<Grid item xs={11} md={12}>
					<div className={styles.remplirText}>
						{won
							? 'Félicitations, vous avez gagné !'
							: "Désolé, ce n'est pas pour cette fois !"}
					</div>
				</Grid>
				{won && (
					<Grid item xs={11} md={12}>
						<div
							className={styles.welcomePg}
							style={{ padding: '0', marginBottom: '1rem' }}
						>
							Vous pouvez participer au tirage au sort qui se déroulera le 24
							décembre et ce, <br />
							pour tenter de gagner l’un des paniers gourmands Bord à Bord.
						</div>
					</Grid>
				)}
				<Grid item xs={7} md={1.5} style={{ marginTop: '2rem' }}>
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
				<Grid
					item
					xs={7}
					md={1.5}
					style={{ marginLeft: width > 900 ? '5rem' : '', marginTop: '2rem' }}
				>
					<button onClick={click} className={styles.resultButton}>
						Partager
					</button>
				</Grid>
				<br></br>
				<div style={{ width: '100%', height: '100px' }}>
					<Social showMe={showMe}></Social>
				</div>
			</Grid>
		</>
	)
}
export default Result
