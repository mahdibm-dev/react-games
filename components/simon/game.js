import { Grid } from '@mui/material'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Form from '../form/form'
import Simon from './simon'
import styles from './simon.module.css'
import Welcome from './welcome'

function Game() {
	const [isPlaying, setIsPlaying] = useState(false)
	const [isParticipated, setIsParticipated] = useState(false)
	const [windowSize, setSize] = useState({
		width: 1200,
		height: 1200,
	})
	const handleResize = () => {
		setSize({
			width: window.innerWidth,
			height: window.innerHeight,
		})
	}
	useEffect(() => {
		setSize({ width: window.innerWidth, height: window.innerHeight })
		window.addEventListener('resize', handleResize, false)
		return () => {
			window.removeEventListener('resize', handleResize, false)
		}
	}, [])

	return (
		<>
			<Grid container justifyContent="center">
				<div className={styles.container}>
					<Grid
						item
						xs={12}
						md={12}
						container
						justifyContent="center"
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Image
							src="/simon/logo.png"
							width={162}
							height={110}
							alt="Welcome"
						/>
					</Grid>
					{!isPlaying && !isParticipated && (
						<Welcome
							setIsParticipated={setIsParticipated}
							style={{ zIndex: '99' }}
							windowSize={windowSize.width}
						/>
					)}
					{isParticipated && !isPlaying && (
						<Form
							setIsPlaying={setIsPlaying}
							gameName="simon"
							imgSrc="/simon/jeu.png"
							instaTitle="La Belle iloise"
						/>
					)}
					{isPlaying && <Simon />}
				</div>
			</Grid>
		</>
	)
}
export default Game
