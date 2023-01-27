import { Grid } from '@mui/material'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ReactConfetti from 'react-confetti'
import Card from './card'
import PriceCard from './priceCard'
import Result from './result'
const HOUSES = [
	{
		id: 1,
		img: '/laJuste/recette1.webp',
		title: 'Risotto à la courge musquée',
		details: [
			{
				title: 'Ingrédients',
				description:
					'500g Courge musquée - 30 ml huile d’olive -Sel et poivre - 1 oignon - 1 gousse d’ail - 400g riz arborio - 1l bouillon de légumes - 10 cl vin blanc - 50g mascarpone - 50 g parmesan râpé - 8 tomates séchées.',
			},
		],
		calories: 597,
	},
	{
		id: 2,
		img: '/laJuste/recette2.webp',
		title: 'Pomme de terre au four vegan',
		details: [
			{
				title: 'Ingrédients',
				description:
					'4 grosses pommes de terre - 15 ml huile d’olive - 100 tofu fumé - 150 g champignons de Paris - 200 g brocoli - 45 ml sauce soja - 2 càs d’agave',
			},
			{
				title: 'Sauce',
				description:
					'10g margarine - 20g farine - 20 lait végétal - 1 càs levure nutritionnelle - 75 g râpé végétal.',
			},
		],
		calories: 386,
	},
]
async function getUserRecetteTries(email) {
	var myHeaders = new Headers()
	myHeaders.append('token', process.env.TOKEN)
	var urlencoded = new URLSearchParams()
	urlencoded.append('email', email)
	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: urlencoded,
		redirect: 'follow',
	}
	let res = await fetch(
		`${process.env.URL}get_juste_calorie_num_recette`,
		requestOptions
	)
	res = await res.json()
	return res
}
function LaJuste() {
	const [won, setWon] = useState(false)
	const [numRecette, setNumRecette] = useState(0)
	const [open, setOpen] = useState(false)
	const [clicks, setClicks] = useState(0)
	const [house, setHouse] = useState(0)
	const [resultMessage, setResultMessage] = useState('')
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
	const handleRestart = async () => {
		try {
			const email = localStorage.getItem('email')
			const res = await getUserRecetteTries(email)
			if (!res.success) {
				console.log('error occured')
				return
			}
			if (res.num_recette[0].num_recette > 1) {
				setResultMessage('Vous avez déjà joué 2 fois. Ressayez après 3 jours.')
				setNumRecette(0)
				setWon(false)
				setOpen(true)
			} else {
				setHouse(res.num_recette[0].num_recette)
				setOpen(false)
				setWon(false)
				setClicks(0)
				setNumRecette(res.num_recette[0].num_recette)
			}
		} catch (error) {
			console.log(error.message)
		}
	}
	useEffect(() => {
		handleRestart()
	}, [])

	useEffect(() => {
		setSize(window.innerWidth)
		window.addEventListener('resize', handleResize, false)
		return () => {
			window.removeEventListener('resize', handleResize, false)
		}
	}, [])
	return (
		<>
			{won && (
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
				alignContent="start"
				xs={12}
				md={12}
				style={{ minHeight: 'calc(100vh - 135px)', marginTop: '1rem' }}
			>
				{!open && (
					<>
						<Grid item container xs={11} md={10} justifyContent="center">
							<Card house={HOUSES[house]} />
						</Grid>
						<Grid item container xs={11} md={10} justifyContent="center">
							<Grid
								item
								xs={12}
								md={3}
								justifyContent="center"
								style={{ position: 'relative', height: '50px' }}
							>
								<Image
									src="/laJuste/corde1.png"
									layout="fill"
									objectFit="cover"
								/>
							</Grid>
						</Grid>
						<Grid item container xs={11} md={10} justifyContent="center">
							<PriceCard
								calories={HOUSES[house].calories}
								setOpen={setOpen}
								setWon={setWon}
								clicks={clicks}
								setClicks={setClicks}
								setResultMessage={setResultMessage}
							/>
						</Grid>
						<Grid item container xs={11} md={10} justifyContent="center">
							<Grid
								item
								xs={12}
								md={3}
								justifyContent="center"
								style={{
									position: 'relative',
									height: '90px',
									marginBottom: '7rem',
								}}
							>
								<Image
									src="/laJuste/corde2.png"
									layout="fill"
									objectFit="cover"
								/>
							</Grid>
						</Grid>
					</>
				)}
				{open && (
					<Result
						won={won}
						handleRestart={handleRestart}
						clicks={clicks}
						resultMessage={resultMessage}
						numRecette={numRecette}
					/>
				)}
			</Grid>
		</>
	)
}
export default LaJuste
