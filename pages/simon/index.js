import Head from 'next/head'
import React from 'react'
import Game from '../../components/simon/game'

export default function Home() {
	return (
		<>
			<Head>
				<title>Jeu Simon</title>
				<meta name="description" content="" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Game />
		</>
	)
}
