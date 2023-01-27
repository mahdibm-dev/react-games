import Head from 'next/head'
import React from 'react'
import Game from '../../components/banditManchot/game'

export default function Home() {
	return (
		<>
			<Head>
				<title>Bandit Manchot</title>
				<meta name="description" content="" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Game />
		</>
	)
}
