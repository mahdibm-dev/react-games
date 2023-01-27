import Head from 'next/head'
import React from 'react'
import Game from '../../components/LaJusteCalorie/game'

export default function Home() {
	return (
		<>
			<Head>
				<title>la-juste-calorie</title>
				<meta name="description" content="" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Game />
		</>
	)
}
