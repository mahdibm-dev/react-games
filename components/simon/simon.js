import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ReactConfetti from 'react-confetti'
import Circle from './circle'
import Result from './result'
import styles from './simon.module.css'
function Simon() {
	const [points, setPoints] = useState(0)
	const [lost, setLost] = useState(false)
	const [timer, setTimer] = useState(false)
	const [playerTurn, setPlayerTurn] = useState(false)
	const [currentSeconds, setCurrentSeconds] = useState(3)
	const [windowSize, setSize] = useState({
		width: 0,
		height: 0,
	})
	const handleResize = () => {
		setSize({
			width: window.innerWidth,
			height: window.innerHeight,
		})
	}
	useEffect(() => {
		setSize(window.innerWidth)
		window.addEventListener('resize', handleResize, false)
		return () => {
			window.removeEventListener('resize', handleResize, false)
		}
	}, [])
	return (
		<>
			{lost && (
				<ReactConfetti
					width={windowSize.width}
					height={windowSize.height}
					tweenDuration={1000}
				/>
			)}

			<Grid
				item
				container
				justifyContent="center"
				xs={12}
				md={12}
				style={{ height: 'calc(100vh - 135px)' }}
			>
				{!lost && (
					<>
						<Grid item container justifyContent="center" xs={11} md={10}>
							<Grid item xs={5} md={2} style={{ height: '70px' }}>
								{timer && (
									<div className={styles.timer}>
										00
										<span>:</span>0{currentSeconds}
									</div>
								)}
							</Grid>
						</Grid>

						<Grid item xs={11} md={10} style={{ padding: ' 0 0 5rem 0' }}>
							<Circle
								setLost={setLost}
								setPoints={setPoints}
								setTimer={setTimer}
								playerTurn={playerTurn}
								setPlayerTurn={setPlayerTurn}
							/>
						</Grid>
					</>
				)}
				{lost && <Result won={!lost} points={points} setLost={setLost} />}
			</Grid>
		</>
	)
}
export default Simon
