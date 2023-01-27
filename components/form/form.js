/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
import { Grid } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../banditManchot/banditManchot.module.css'
import Icon from '../../public/icons/index'

function validateEmail(email) {
	const res =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return res.test(String(email).toLowerCase())
}
async function createUser(email, nom, prenom, jeux) {
	const url = `${process.env.URL}create_user`

	var myHeaders = new Headers()
	myHeaders.append('token', process.env.TOKEN)
	myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

	var urlencoded = new URLSearchParams()
	urlencoded.append('email', email)
	urlencoded.append('nom', nom)
	urlencoded.append('prenom', prenom)
	urlencoded.append('jeux', jeux)
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
function Form({ setIsPlaying, imgSrc, instaTitle, gameName }) {
	const [message, setMessage] = useState({
		emailError: '',
		firstNameError: '',
		lastNameError: '',
		checkedError: '',
		reqError: '',
	})
	const [email, setEmail] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [ischecked, setChecked] = useState(false)
	const handleEmail = e => {
		const { value } = e.target
		setEmail(value)
	}
	const handleLastName = e => {
		const { value } = e.target
		const regex = /^[A-Za-z-' ']+$/
		if (value === '' || regex.test(value)) {
			setLastName(value)
		}
	}
	const handleFirstName = e => {
		const { value } = e.target
		const regex = /^[A-Za-z-' ']+$/
		if (value === '' || regex.test(value)) {
			setFirstName(value)
		}
	}
	const handleChange = () => {
		setChecked(prev => !prev)
	}
	const handleSubmit = async e => {
		e.preventDefault()
		if (email === '') {
			setMessage(prev => ({
				...prev,
				emailError: 'Saisissez votre adresse mail',
			}))
			return
		}
		if (!validateEmail(email)) {
			setMessage(prev => ({ ...prev, emailError: 'Email incorrect' }))
			return
		}
		setMessage(prev => ({ ...prev, emailError: '' }))
		if (firstName === '') {
			setMessage(prev => ({
				...prev,
				firstNameError: 'Saisissez votre Prénom',
			}))
			return
		}
		setMessage(prev => ({ ...prev, firstNameError: '' }))
		if (lastName === '') {
			setMessage(prev => ({
				...prev,
				lastNameError: 'Saisissez votre Nom',
			}))
			return
		}
		setMessage(prev => ({ ...prev, lastNameError: '' }))
		if (!ischecked) {
			setMessage(prev => ({
				...prev,
				checkedError: 'Il faut accepter le règlement',
			}))
			return
		}
		setMessage(prev => ({ ...prev, checkedError: '' }))
		try {
			const res = await createUser(email, lastName, firstName, gameName)
			if (res.success) {
				localStorage.setItem('email', email)
				setMessage(prev => ({ ...prev, reqError: '' }))
				setIsPlaying(prev => !prev)
			} else {
				setMessage(prev => ({
					...prev,
					reqError: res.message,
				}))
			}
		} catch (error) {
			setMessage(prev => ({
				...prev,
				reqError: error.message,
			}))
		}
	}
	return (
		<Grid item xs={12} md={12} container justifyContent="center">
			<Grid
				item
				xs={11}
				md={10}
				container
				justifyContent="center"
				style={{ marginTop: '-70px' }}
			>
				<Image
					src={`${imgSrc}`}
					width={354}
					height={271}
					alt="Menu Végétarien"
					style={{ transform: 'scale(0.7,0.7)' }}
				/>
			</Grid>
			<Grid
				item
				xs={12}
				md={12}
				container
				justifyContent="center"
				style={{ marginTop: '-50px' }}
			>
				<Grid item xs={11} md={10}>
					<div
						className={styles.welcomePg}
						style={{ padding: '0', fontSize: '1.5rem' }}
					>
						1-Likez la page instagram de&nbsp;
						<span>
							<b>{instaTitle}</b>
						</span>
					</div>
				</Grid>
				<Grid item xs={11} md={11} container justifyContent="center">
					<button className={styles.instaButton}>
						<a
							className={styles.instaLink}
							href="https://www.instagram.com/bordabord.algues/"
							target="blank"
						>
							<Icon.Insta /> &nbsp;Abonnez-vous
						</a>
					</button>
				</Grid>
				<Grid item xs={11} md={10}>
					<div
						className={styles.welcomePg}
						style={{ padding: '0', fontSize: '1.5rem' }}
					>
						2-Remplissez ce formulaire
					</div>
				</Grid>
				<Grid item xs={11} md={3.1} container justifyContent="center">
					<Grid
						item
						xs={12}
						md={12}
						style={{ margin: '0.2rem auto 0.2rem auto' }}
					>
						<input
							type="text"
							className="textField"
							style={{
								backgroundColor: 'white',
							}}
							placeholder="Votre Email *"
							value={email}
							onChange={handleEmail}
						/>
						<div className={styles.error}>
							{message.emailError && <Icon.Danger />}
							&nbsp;
							{message.emailError}
						</div>
					</Grid>
					<Grid
						item
						xs={12}
						md={12}
						style={{ margin: '0.2rem auto 0.2rem auto' }}
					>
						<input
							type="text"
							className="textField"
							style={{
								backgroundColor: 'white',
							}}
							placeholder="Votre Prénom *"
							value={firstName}
							onChange={handleFirstName}
						/>
						<div className={styles.error}>
							{message.firstNameError && <Icon.Danger />}
							&nbsp;
							{message.firstNameError}
						</div>
					</Grid>
					<Grid
						item
						xs={12}
						md={12}
						style={{ margin: '0.2rem auto 0.2rem auto' }}
					>
						<input
							type="text"
							className="textField"
							style={{
								backgroundColor: 'white',
							}}
							placeholder="Votre Nom *"
							value={lastName}
							onChange={handleLastName}
						/>
						<div className={styles.error}>
							{message.lastNameError && <Icon.Danger />}
							&nbsp;
							{message.lastNameError}
						</div>
					</Grid>
					<Grid item xs={12} md={12} style={{ margin: '0 auto' }}>
						<div className={styles.reglement}>
							<input type="checkbox" onChange={handleChange} />
							<a
								href="https://menu-vegetarien.com/reglement-du-jeu-concours-de-noel/"
								rel="noopener noreferrer"
								target="blank"
							>
								<u>J’accepte le règlement</u>
							</a>
							&nbsp;*
						</div>
					</Grid>
					<Grid
						item
						xs={12}
						md={12}
						style={{ margin: '0.2rem auto 0.2rem auto' }}
					>
						<div className={styles.error}>
							{message.checkedError && <Icon.Danger />}
							&nbsp;
							{message.checkedError}
						</div>
					</Grid>
					<Grid item xs={8} md={6} style={{ margin: '0 auto' }}>
						<button
							onClick={handleSubmit}
							className={styles.participateButton}
							style={{ marginTop: '2rem' }}
						>
							Jouer
						</button>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	)
}
export default Form
