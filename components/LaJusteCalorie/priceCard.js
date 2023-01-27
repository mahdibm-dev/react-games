import { Grid } from '@mui/material'
import React, { useState } from 'react'
import styles from './simon.module.css'

const PriceCard = ({ calories, setOpen, setWon, clicks, setClicks }) => {
	const [state, setState] = useState('')
	const [message, setMessage] = useState('')
	const handleChange = e => {
		const { value } = e.target
		const re = /^[0-9]{0,4}$/
		if (value === '' || re.test(value)) {
			setState(value)
		}
	}

	const handleClick = e => {
		e.preventDefault()
		if (!state) {
			setMessage('entrer votre estimation')
			return
		}
		setClicks(prev => prev + 1)
		if (calories === Number(state)) {
			setOpen(true)
			setWon(true)

			return
		}
		if (clicks == 10) {
			setOpen(true)
			setWon(false)
			return
		}

		if (Number(state) > calories) {
			setMessage("C'est moins")
			return
		}

		setMessage("C'est plus")
	}
	return (
		<Grid item xs={12} md={3}>
			<div className={styles.card2}>
				<span className={styles.message}>{message}</span>
				<input
					type="text"
					className={styles.textField}
					style={{
						backgroundColor: 'white',
					}}
					placeholder="Nombre de calories"
					value={state}
					onChange={handleChange}
				/>
				<button className={styles.priceButton} onClick={handleClick}>
					Je valide
				</button>
			</div>
		</Grid>
	)
}

export default PriceCard
