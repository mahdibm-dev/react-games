import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import Form from '../form/form'
import styles from './game.module.css'
import GameBoard from './gameBoard'
import Welcome from './welcome'

function MemoryGame() {
	const [isPlaying, setIsPlaying] = useState(false)
	const [isParticipated, setIsParticipated] = useState(false)
	const [windowSize, setWindowSize] = useState(0)
	const handleResize = () => {
		setWindowSize(window.innerWidth)
	}
	useEffect(() => {
		handleResize()
		window.addEventListener('resize', handleResize, false)
		return () => {
			window.removeEventListener('resize', handleResize, false)
		}
	}, [windowSize])

	return (
		<>
			<Grid container justifyContent="center">
				<div className={styles.container}>
					<div className={styles.header} />

					{!isPlaying && !isParticipated && (
						<Welcome
							setIsParticipated={setIsParticipated}
							style={{ zIndex: '99' }}
							windowSize={windowSize}
						/>
					)}
					{isParticipated && !isPlaying && (
						<Form
							setIsPlaying={setIsPlaying}
							gameName="memory"
							imgSrc="/memory/logo2.png"
							instaTitle="Atelier V"
						/>
					)}
					{isPlaying && <GameBoard />}
				</div>
			</Grid>
		</>
	)
}
export default MemoryGame
