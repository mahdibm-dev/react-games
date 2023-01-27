/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
import { Grid } from '@mui/material'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from './simon.module.css'
import Social from '../social/social'

async function updateUser(email, gagnant, clicks, numRecette) {
	/*new Endpoint REQ */
	const url = `${process.env.URL}update_user_juste_calorie`

	var myHeaders = new Headers()
	myHeaders.append('token', process.env.TOKEN)
	myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

	var urlencoded = new URLSearchParams()
	urlencoded.append('email', email)
	urlencoded.append('gagnant', gagnant)
	urlencoded.append('nbr_tentative', clicks)
	urlencoded.append('num_recette', numRecette)
	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: urlencoded,
		redirect: 'follow',
	}

	var res = await fetch(url, requestOptions)
	var res = await res.json()
	return res
}
function Result({ won, handleRestart, clicks, resultMessage, numRecette }) {
	const [showMe, setShowMe] = useState(false)
	function click() {
		setShowMe(!showMe)
	}
	const reultofgame = async () => {
		try {
			const email = localStorage.getItem('email')
			let res = null
			if (numRecette > 1) res = await updateUser(email, won, Number(clicks), 0)
			else res = await updateUser(email, won, Number(clicks), numRecette + 1)
			if (!res.success) {
				console.log(res)
			}
		} catch (error) {
			console.log('error', error)
		}
	}

	useEffect(() => {
		try {
			reultofgame()
		} catch (error) {
			console.log(error)
		}
	}, [])

	return (
		<Grid
			item
			xs={12}
			md={12}
			container
			justifyContent="center"
			rowSpacing={1}
			columnSpacing={1}
			style={{ marginBottom: window.innerWidth > 500 ? '20rem' : '6rem' }}
		>
			<Grid
				item
				xs={12}
				md={12}
				container
				justifyContent="center"
				style={{ marginTop: '-20px' }}
			>
				<Image src="/laJuste/jeu.png" width={354} height={271} />
			</Grid>
			<Grid item xs={11} md={12}>
				<div className={styles.remplirText}>
					{resultMessage && resultMessage}
					{won && !resultMessage && (
						<div>
							Félicitations, c'est pas mal du tout !<br />
							Vous voulez retenter votre chance avec une autre recette ?
						</div>
					)}
					{!won && !resultMessage && (
						<div>
							Aïe, c'est raté !<br />
							Vous voulez retenter votre chance avec une autre recette ?
						</div>
					)}
				</div>
			</Grid>

			<Grid item xs={7} md={1.5} style={{ marginTop: '2rem' }}>
				<button onClick={handleRestart} className={styles.resultButton}>
					Réessayer
				</button>
			</Grid>
			<Grid
				item
				xs={7}
				md={1.5}
				style={{
					marginLeft: window.innerWidth > 900 ? '5rem' : '',
					marginTop: '2rem',
				}}
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
	)
}
export default Result
