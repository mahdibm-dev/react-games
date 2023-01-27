import styles from '../simon/simon.module.css'
import { Grid } from '@mui/material'
import {
	FacebookShareButton,
	FacebookIcon,
	WhatsappShareButton,
	WhatsappIcon,
	TwitterShareButton,
	TwitterIcon,
	RedditShareButton,
	RedditIcon,
	TelegramShareButton,
	TelegramIcon,
} from 'next-share'

export default function Social({ showMe }) {
	return (
		<>
			{/*The bottom code should toggle on and off when the button is pressed*/}
			<div
				style={{
					display: showMe ? 'block' : 'none',
					width: '100%',
				}}
			>
				<br></br>
				<Grid
					item
					xs={12}
					md={12}
					container
					justifyContent="center"
					rowSpacing={1}
					columnSpacing={1}
					style={{ marginTop: '1rem' }}
				>
					<FacebookShareButton
						url={'https://jeux.menu-vegetarien.com/memory'}
						quote={'Jouez et gagnez des prix 100% vegan'}
						hashtag={'#MenuVeganCadeau'}
						className={styles.resultButton}
					>
						<FacebookIcon size={55} style={{ marginLeft: '6px' }} round />
					</FacebookShareButton>
					<TelegramShareButton
						url={'https://jeux.menu-vegetarien.com/memory'}
						title={'Jouez et gagnez des prix 100% vegan'}
					>
						<TelegramIcon size={55} style={{ marginLeft: '6px' }} round />
					</TelegramShareButton>
					<TwitterShareButton
						url={'https://jeux.menu-vegetarien.com/memory'}
						title={'Jouez et gagnez des prix 100% vegan'}
					>
						<TwitterIcon size={55} style={{ marginLeft: '6px' }} round />
					</TwitterShareButton>
					<WhatsappShareButton
						url={'https://jeux.menu-vegetarien.com/memory'}
						title={'Jouez et gagnez des prix 100% vegan'}
						separator=":: "
					>
						<WhatsappIcon size={55} style={{ marginLeft: '6px' }} round />
					</WhatsappShareButton>
					<RedditShareButton
						url={'https://jeux.menu-vegetarien.com/memory'}
						title={'Jouez et gagnez des prix 100% vegan'}
					>
						<RedditIcon size={55} style={{ marginLeft: '6px' }} round />
					</RedditShareButton>
				</Grid>
			</div>
		</>
	)
}
