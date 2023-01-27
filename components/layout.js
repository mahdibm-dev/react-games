import Footer from './footer/footer'
import Header from './header/header'

export default function Layout({ children }) {
	return (
		<>
			<Header />
			<div style={{ marginTop: '135px' }} />
			{children}
			<Footer />
		</>
	)
}
