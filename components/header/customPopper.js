/* eslint-disable object-curly-newline */
import { Grid } from '@mui/material'
import { useEffect, useRef } from 'react'
import NavItem1 from './navItem1'
import NavItem2 from './navItem2'
import NavItem3 from './navItem3'

function CustomPopper({ item, setChildHovered }) {
	const Element1 = useRef()
	useEffect(() => {
		Element1.current.style.opacity = '0'
		Element1.current.style.marginTop = '-20px'

		setTimeout(() => {
			if (Element1.current?.style) {
				Element1.current.style.opacity = '1'
				Element1.current.style.marginTop = '-10px'
			}
		}, 200)
	}, [item])

	const handlePopperMouseEnter = () => {
		setChildHovered(true)
	}
	const handlePopperMouseLeave = () => {
		setChildHovered(false)
	}
	return (
		<Grid
			ref={Element1}
			onMouseEnter={handlePopperMouseEnter}
			onMouseLeave={handlePopperMouseLeave}
			container
			justifyContent="center"
			style={{
				backgroundColor: '#ebeff2',
				position: 'fixed',
				zIndex: '100',
				boxShadow:
					'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px',
				borderTop: 'solid 3px #9fc22b',
				marginTop: '-200px',
				transition: 'all 200ms ease',
				opacity: '0',
			}}
		>
			{item === 1 && <NavItem1 />}
			{item === 2 && <NavItem2 />}
			{item === 3 && <NavItem3 />}
		</Grid>
	)
}
export default CustomPopper
