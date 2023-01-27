import Head from 'next/head'
import MemoryGame from '../../components/memory/game'

export default function Home() {
	return (
		<>
			<Head>
				<title>Memory</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<MemoryGame />
		</>
	)
}
