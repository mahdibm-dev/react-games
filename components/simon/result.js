/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
import { Grid } from '@mui/material'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from './simon.module.css'
import Social from '../social/social'
async function updateUser(email, gagnant, points) {
	const url = `${process.env.URL}update_user_simon`
	var myHeaders = new Headers()
	myHeaders.append('token', process.env.TOKEN)
	myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

	var urlencoded = new URLSearchParams()
	urlencoded.append('email', email)
	urlencoded.append('gagnant', gagnant)
	urlencoded.append('points', points)
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
function Result({ won, width, setLost, points }) {
	const [showMe, setShowMe] = useState(false)
	function click() {
		setShowMe(!showMe)
	}
	const [message, setMessage] = useState('')
	useEffect(() => {
		if (points > 12000)
			setMessage(
				'Alors là, la victoire est certainement proche, mais on ne sait jamais, la concurrence est rude !'
			)
		else if (points > 8000)
			setMessage(
				'Félicitations ! Quelle mémoire ! Vous êtes peut-être dans les 2 premiers !'
			)
		else if (points > 3000)
			setMessage(
				'Félicitations ! Quelle mémoire ! Vous êtes peut-être dans les 2 premiers !'
			)
		else setMessage(' C’est pas mal, mais vous pouvez faire mieux !')
	}, [])
	const reultofgame = async () => {
		try {
			const email = localStorage.getItem('email')
			const res = await updateUser(email, won, points)
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
				<Image src="/simon/jeu.png" width={354} height={271} />
			</Grid>
			<Grid item xs={11} md={12}>
				<div className={styles.remplirText}>votre score:&nbsp;{points}</div>
			</Grid>

			<Grid item xs={11} md={12}>
				<div
					className={styles.welcomePg}
					style={{ padding: '0', marginBottom: '1rem' }}
				>
					{message}
				</div>
			</Grid>

			<Grid item xs={7} md={1.5} style={{ marginTop: '2rem' }}>
				<button
					onClick={() => {
						setLost(false)
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
	)
}
export default Result
