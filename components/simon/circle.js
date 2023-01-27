import { useEffect, useRef, useState } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import styles from './simon.module.css'

const renderTime = ({ remainingTime }) => {
	const minutes = Math.floor(remainingTime / 60)
	let seconds = remainingTime % 60
	if (seconds < 10) {
		seconds = `0${seconds}`
	}
	return (
		<div className={styles.timer}>
			{minutes}:{seconds}
		</div>
	)
}

function Circle({ setPoints, setLost, setTimer, playerTurn, setPlayerTurn }) {
	const [start, setStart] = useState(false)
	const [duration, setDuration] = useState(2)
	const [machineTurn, setMachineTurn] = useState(false)
	const [autoSequence, setAutoSequence] = useState([0])
	const [playerSequence, setPlayerSequence] = useState([0])
	const [audio, setAudio] = useState(null)
	const sounds = [
		'/simon/beep.mp3',
		'/simon/beep2.mp3',
		'/simon/beep3.mp3',
		'/simon/beep4.mp3',
	]

	useEffect(() => {
		if (audio) {
			audio.play()
			let timer = setTimeout(() => {
				audio.pause()
				audio.currentTime = 0
			}, 1000)
			return () => {
				clearTimeout(timer)
			}
		}
	}, [audio])
	const sq0 = useRef(null)
	const sq1 = useRef(null)
	const sq2 = useRef(null)
	const sq3 = useRef(null)
	const randomNumberInRange = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min
	}

	useEffect(() => {
		let i = 0
		let timer,
			timer2 = null
		if (machineTurn) {
			const interval = setInterval(() => {
				if (i < autoSequence.length) {
					let ref = null
					switch (autoSequence[i]) {
						case 0:
							ref = sq0
							break
						case 1:
							ref = sq1
							break
						case 2:
							ref = sq2
							break
						case 3:
							ref = sq3
							break
					}
					setAudio(new Audio(sounds[autoSequence[i]]))
					i++
					ref?.current?.classList?.add(styles.bright)

					timer = setTimeout(() => {
						ref?.current?.classList?.remove(styles.bright)
					}, 350)
				} else {
					setMachineTurn(false)
					setPlayerTurn(true)
					setDuration(prev => prev + 2)
				}
			}, 1000)

			return () => {
				clearInterval(interval)
				clearTimeout(timer)
				clearTimeout(timer2)
			}
		}
	}, [autoSequence, machineTurn])

	const handlePlay = () => {
		if (!start) {
			setPoints(0)
			setStart(true)
			setMachineTurn(true)
		}
	}
	// detect machine turn to  increment autoSequence
	useEffect(() => {
		if (machineTurn) {
			let rand = randomNumberInRange(0, 3)
			setAutoSequence(prev => [...prev, rand])
			setPlayerSequence([])
		}
	}, [machineTurn])

	const handleClick = number => {
		if (playerSequence < autoSequence && playerTurn && start) {
			setPlayerSequence(prev => [...prev, number])
		}
	}
	useEffect(() => {
		if (playerSequence.length > 0 && playerTurn) {
			let timer = null
			let portion = autoSequence.slice(0, playerSequence.length)
			if (
				portion.length === playerSequence.length &&
				portion.every((value, index) => value === playerSequence[index])
			) {
				setAudio(new Audio(sounds[playerSequence.slice(-1)[0]]))
				setPoints(prev => prev + 103)
				if (portion.length == autoSequence.length) {
					setPlayerTurn(false)
					setMachineTurn(true)
				}
			} else {
				setAudio(new Audio('/simon/error.mp3'))
				timer = setTimeout(() => {
					setPlayerTurn(false)
					setLost(true)
					setAutoSequence([0])
					setPlayerSequence([0])
					setStart(false)
				}, 1000)
			}
			return () => {
				clearTimeout(timer)
			}
		}
	}, [playerSequence])

	return (
		<div className={styles.circleContainer}>
			{playerTurn && (
				<div className={styles.countdown}>
					<CountdownCircleTimer
						isPlaying={playerTurn}
						duration={duration}
						colors={['#26cf0c', '#F7B801', '#A30000', '#A30000']}
						colorsTime={[7, 5, 2, 0]}
						size={95}
						onComplete={() => {
							setPlayerTurn(false)
							setLost(true)
							setAutoSequence([0])
							setPlayerSequence([0])
							setStart(false)
						}}
					>
						{renderTime}
					</CountdownCircleTimer>
				</div>
			)}
			<div className={styles.playButton} onClick={handlePlay}>
				{start ? '' : 'Jouer!'}
			</div>
			<div className={styles.lgSquare}>
				<div
					ref={sq0}
					className={styles.smSquare1}
					onClick={() => handleClick(0)}
				/>
				<div
					ref={sq1}
					className={styles.smSquare2}
					onClick={() => handleClick(1)}
				/>
				<div
					ref={sq2}
					className={styles.smSquare3}
					onClick={() => handleClick(2)}
				/>
				<div
					ref={sq3}
					className={styles.smSquare4}
					onClick={() => handleClick(3)}
				/>
			</div>
		</div>
	)
}
export default Circle
