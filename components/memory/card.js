import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from './game.module.css'

function Card({ card, flippedToFront }) {
	const [windowSize, setSize] = useState(0)
	const handleResize = () => {
		setSize(window.innerWidth)
	}
	useEffect(() => {
		setSize(window.innerWidth)
		window.addEventListener('resize', handleResize, false)
		return () => {
			window.removeEventListener('resize', handleResize, false)
		}
	}, [])
	return (
		<div>
			<div
				className={styles.card}
				style={{
					transform: !flippedToFront ? 'rotateY(180deg)' : 'rotateY(0deg)',
				}}
			>
				<div className={styles.front}>
					<div
						style={{
							width: windowSize <= 500 ? 60 : 80,
							height: windowSize <= 500 ? 60 : 80,
							position: 'relative',
						}}
					>
						{card}
					</div>
				</div>
				<div className={styles.back}>
					<Image
						src="/memory/cover.webp"
						width={windowSize <= 500 ? 60 : 80}
						height={windowSize <= 500 ? 60 : 80}
					/>
				</div>
			</div>
		</div>
		// <div style={{ border: 'solid 1px red' }}>{card}</div>
	)
}
export default Card
