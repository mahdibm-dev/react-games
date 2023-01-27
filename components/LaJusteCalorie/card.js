import { Grid } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import styles from './simon.module.css'
const Card = ({ house }) => {
	return (
		<Grid item xs={12} md={4}>
			<div className={styles.card}>
				<header className={styles.header}>
					Pouvez-vous deviner combien de calories contient cette recette ?
				</header>
				<Image src={house.img} width={459} height={280} />
				<footer className={styles.footer}>
					<span className={styles.spans}>Recette : </span>
					{house.title}
					<br />
					{house.details.map(item => (
						<div key={item.title}>
							<span className={styles.spans}>{item.title} : </span>
							{item.description} <br />
						</div>
					))}
				</footer>
			</div>
		</Grid>
	)
}

export default Card
