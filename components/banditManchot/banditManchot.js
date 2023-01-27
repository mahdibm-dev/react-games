import { Grid } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import ReactConfetti from 'react-confetti'
import styles from './banditManchot.module.css'
import Result from './result'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			winner: null,
			open: false,
		}
		this.finishHandler = this.finishHandler.bind(this)
		this.handleClick = this.handleClick.bind(this)
		this.handleClose = this.handleClose.bind(this)
	}
	componentDidMount() {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
	}

	handleClick() {
		this.setState({
			winner: null,
			open: false,
		})
		this.emptyArray()
		this._child1?.forceUpdateHandler()
		this._child2?.forceUpdateHandler()
		this._child3?.forceUpdateHandler()
	}
	handleClose() {
		this.setState({
			winner: null,
			open: false,
		})
	}

	static loser = [
		'Not quite',
		'Stop gambling',
		'Hey, you lost!',
		'Ouch! I felt that',
		"Don't beat yourself up",
		'There goes the college fund',
		'I have a cat. You have a loss',
		"You're awesome at losing",
		'Coding is hard',
		"Don't hate the coder",
	]

	static matches = []

	finishHandler(value) {
		App.matches.push(value)
		if (App.matches.length === 3) {
			const first = App.matches[0]
			let results = App.matches.every(match => match === first)
			setTimeout(() => {
				this.setState({ winner: results, open: true })
			}, 2000)
		}
	}

	emptyArray() {
		App.matches = []
	}

	render() {
		const { winner, open } = this.state
		const { width, height } = this.props.windowSize
		return (
			<>
				{open && winner && (
					<ReactConfetti width={width} height={height} tweenDuration={1000} />
				)}
				{!open && (
					<Grid
						item
						container
						justifyContent="center"
						style={{ marginBottom: width > 500 ? '10rem' : '1rem' }}
					>
						<Grid
							item
							xs={11}
							md={10}
							container
							justifyContent="center"
							style={{ marginTop: '-60px', transform: 'scale(0.7,0.7)' }}
						>
							<Image
								src="/bandit/logojeunoel2.png"
								width={354}
								height={271}
								alt="Menu Végétarien"
							/>
						</Grid>
						<Grid
							item
							md={10}
							xs={10}
							style={{
								position: 'relative',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'stretch',
								padding: '0',
								marginTop: width > 500 ? '-180px' : '-190px',
							}}
						>
							<div className={styles.spinnerContainer}>
								<Spinner
									onFinish={this.finishHandler}
									ref={child => {
										this._child1 = child
									}}
									timer="2000"
								/>
								<Spinner
									onFinish={this.finishHandler}
									ref={child => {
										this._child2 = child
									}}
									timer="2400"
								/>
								<Spinner
									onFinish={this.finishHandler}
									ref={child => {
										this._child3 = child
									}}
									timer="3200"
								/>
								<div className={styles.gradientFade}></div>
							</div>
						</Grid>
					</Grid>
				)}
				{open && (
					<Result
						won={winner}
						width={width}
						startHandler={this.handleClick}
						handleClose={this.handleClose}
					/>
				)}
			</>
		)
	}
}

class Spinner extends React.Component {
	constructor(props) {
		super(props)
		this.forceUpdateHandler = this.forceUpdateHandler.bind(this)
	}

	forceUpdateHandler() {
		this.reset()
	}

	reset() {
		if (this.timer) {
			clearInterval(this.timer)
		}

		this.start = this.setStartPosition()

		this.setState({
			position: this.start,
			timeRemaining: this.props.timer,
		})

		this.timer = setInterval(() => {
			this.tick()
		}, 100)
	}

	state = {
		position: 0,
		lastPosition: null,
	}
	static iconHeight = 188
	multiplier = 1 //Math.floor(Math.random() * (4 - 1) + 1)

	start = this.setStartPosition()
	speed = Spinner.iconHeight * this.multiplier

	setStartPosition() {
		return Math.floor(Math.random() * 9) * Spinner.iconHeight * -1
	}

	moveBackground() {
		this.setState({
			position: this.state.position - this.speed,
			timeRemaining: this.state.timeRemaining - 50,
		})
	}

	getSymbolFromPosition() {
		let { position } = this.state
		const totalSymbols = 9
		const maxPosition = Spinner.iconHeight * (totalSymbols - 1) * -1
		let moved = (this.props.timer / 100) * this.multiplier
		let startPosition = this.start
		let currentPosition = startPosition

		for (let i = 0; i < moved; i++) {
			currentPosition -= Spinner.iconHeight

			if (currentPosition < maxPosition) {
				currentPosition = 0
			}
		}

		this.props.onFinish(currentPosition)
	}

	tick() {
		if (this.state.timeRemaining <= 0) {
			clearInterval(this.timer)
			this.getSymbolFromPosition()
		} else {
			this.moveBackground()
		}
	}

	componentDidMount() {
		clearInterval(this.timer)

		this.setState({
			position: this.start,
			timeRemaining: this.props.timer,
		})

		this.timer = setInterval(() => {
			this.tick()
		}, 100)
	}

	render() {
		let { position, current } = this.state

		return (
			<div
				style={{
					backgroundPosition: '0px ' + position + 'px',
				}}
				className={styles.icons}
			/>
		)
	}
}
export default App
