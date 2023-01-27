/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable function-paren-newline */
import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import ReactConfetti from 'react-confetti'
import Card from './card'
import styles from './game.module.css'
import uniqueCardsArray from './images'
import Result from './result'

function swap(arrayi, i, j) {
	const array = arrayi
	const temp = array[i]
	array[i] = array[j]
	array[j] = temp
	return array
}
function shuffleCards(array) {
	const { length } = array
	let myarray = array
	for (let i = length; i > 0; i -= 1) {
		const randomIndex = Math.floor(Math.random() * i)
		const currentIndex = i - 1
		myarray = swap(myarray, currentIndex, randomIndex)
	}
	return array
}
const START_MINUTES = '02'
const START_SECOND = '00'
const START_DURATION = 10

function GameBoard() {
	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
	}, [])
	const [cards, setCards] = useState(() =>
		shuffleCards(uniqueCardsArray.concat(uniqueCardsArray))
	)
	const [open, setOpen] = useState(false)

	const handleClose = () => {
		setOpen(false)
	}
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
	const [clicks, setClicks] = useState(0)
	const [won, setWon] = useState(false)
	const [activeCards, setActiveCards] = useState([])
	const [foundPairs, setFoundPairs] = useState([])
	const [currentMinutes, setMinutes] = useState(START_MINUTES)
	const [currentSeconds, setSeconds] = useState(START_SECOND)
	const [elapsedTime, setElapsedTime] = useState('')
	const [duration, setDuration] = useState(START_DURATION)
	const [isRunning, setIsRunning] = useState(false)
	const startHandler = () => {
		setActiveCards([])
		setFoundPairs([])
		setCards(shuffleCards(uniqueCardsArray.concat(uniqueCardsArray)))
		setDuration(parseInt(START_SECOND, 10) + 60 * parseInt(START_MINUTES, 10))
		setMinutes(START_MINUTES)
		setSeconds(START_SECOND)
		setIsRunning(true)
		setClicks(0)
	}
	const calculeTimeElapsed = () => {
		let seconds
		let minutes
		const te =
			duration -
			(parseInt(currentSeconds, 10) + 60 * parseInt(currentMinutes, 10))

		minutes = parseInt(te / 60, 10)
		seconds = parseInt(te % 60, 10)

		minutes = minutes < 10 ? `0${minutes}` : minutes
		seconds = seconds < 10 ? `0${seconds}` : seconds
		if (te) {
			setElapsedTime(`${minutes}:${seconds}`)
		} else {
			setElapsedTime('02:00')
		}
	}
	useEffect(() => {
		startHandler()
	}, [])

	useEffect(() => {
		if (isRunning === true) {
			let timer = duration
			let minutes
			let seconds
			const interval = setInterval(() => {
				if (--timer < 0) {
					setIsRunning(false)
					setCards(shuffleCards(uniqueCardsArray.concat(uniqueCardsArray)))
					setFoundPairs([])
					setWon(false)
					setOpen(true)
					calculeTimeElapsed()
				} else {
					minutes = parseInt(timer / 60, 10)
					seconds = parseInt(timer % 60, 10)

					minutes = minutes < 10 ? `0${minutes}` : minutes
					seconds = seconds < 10 ? `0${seconds}` : seconds

					setMinutes(minutes)
					setSeconds(seconds)
				}
			}, 1000)
			return () => clearInterval(interval)
		}
	}, [isRunning])

	function flipCard(index) {
		if (activeCards.length === 0) {
			setActiveCards([index])
		}
		if (activeCards.length === 1) {
			const firstIndex = activeCards[0]
			const secondsIndex = index
			if (
				cards[firstIndex] === cards[secondsIndex] &&
				firstIndex != secondsIndex
			) {
				if (foundPairs.length + 2 === cards.length) {
					setWon(true)
					setIsRunning(false)
					setOpen(true)
					calculeTimeElapsed()
				}
				setFoundPairs([...foundPairs, firstIndex, secondsIndex])
			}
			setActiveCards([...activeCards, index])
			setTimeout(() => {
				setActiveCards([])
			}, 500)
		}

		setClicks(clicks + 1)
	}
	return (
		<>
			{open && won && (
				<ReactConfetti
					width={windowSize.width}
					height={windowSize.height}
					tweenDuration={1000}
				/>
			)}
			<Grid container justifyContent="center">
				{!open && (
					<Grid
						item
						container
						justifyContent="center"
						xs={12}
						md={12}
						style={{
							marginBottom: window.innerWidth > 500 ? '15rem' : '',
						}}
					>
						<Grid
							item
							container
							justifyContent="center"
							xs={11}
							md={10}
							columnSpacing={2}
						>
							<Grid item xs={5} md={2}>
								<div
									className={styles.timer}
									style={{ marginTop: '-20px', transform: 'scale(0.8,0.8)' }}
								>
									{currentMinutes}
									<span>:</span>
									{currentSeconds}
								</div>
							</Grid>
						</Grid>
						<Grid
							xs={11}
							md={10}
							item
							container
							justifyContent="center"
							style={{
								maxWidth: '360px',
								transform: 'scale(0.8,0.8)',
							}}
							columnSpacing={1}
						>
							{cards.map((card, index) => {
								const flippedToFront =
									activeCards.indexOf(index) !== -1 ||
									foundPairs.indexOf(index) !== -1
								return (
									<Grid
										item
										xs={3}
										md={3}
										key={index}
										onClick={() => isRunning && flipCard(index)}
									>
										<Card card={card.image} flippedToFront={flippedToFront} />
									</Grid>
								)
							})}
						</Grid>
					</Grid>
				)}
				{open && (
					<Result
						handleClose={handleClose}
						won={won}
						elapsedTime={elapsedTime}
						clicks={clicks}
						startHandler={startHandler}
					/>
				)}
			</Grid>
		</>
	)
}
export default GameBoard
