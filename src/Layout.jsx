import { useContext } from "react"
import { Link, Outlet } from "react-router-dom"
import './App.css'
import { ThemeContext } from "./ThemeProvider"
import { MdOutlineDarkMode, MdDarkMode } from 'react-icons/all'

export default function Layout() {
	const { theme, toogleTheme } = useContext(ThemeContext)

	return <>
		<nav className="navbar">
			<Link to="/">
				<img className="layout-logo" src="https://img.freepik.com/premium-vector/premium-jdm-japanese-sport-car-vector-isolated_289688-484.jpg?w=2000" />
			</Link>
			<div className="navbar-center">
				<Link to="/">Home</Link> &nbsp; | &nbsp;
				<Link to="/about">About</Link> &nbsp; | &nbsp;
				<Link to="/collections">Collections</Link>
			</div>
			<div className="navbar-right">
				<Link to="/admin">Login</Link> &nbsp; | &nbsp;
				<button onClick={toogleTheme}>{theme === 'light' ?
					<p><MdOutlineDarkMode size={20} />&nbsp;Light Mode</p> : <p className="nr-dark-mode"><MdDarkMode size={20} />&nbsp;Dark Mode</p>}</button>
			</div>
		</nav>
		<hr />
		<Outlet />
		<hr />
		<div className="bot-navbar-container">
			<div className="leftbot-navbar-container">
				<h3 className="title-bot-navbar">Garage</h3>
				<ul className="list-bot-navbar">
					<li>
						<a className="a-bot-navbar" href="/">Home</a>
					</li>
					<li>
						<a className="a-bot-navbar" href="/about">About</a>
					</li>
					<li>
						<a className="a-bot-navbar" href="/collections">Collections</a>
					</li>
				</ul>
			</div>
			<div className="rightbot-navbar-container">
				<h3 className="title-bot-navbar">Contact Us</h3>
				<ul className="list-bot-navbar">
					<li>
						<a href="https://www.facebook.com/" target="_blank">
							<img src="/facebook.svg" alt="Facebook" />
						</a>
					</li>
					<li>
						<a href="https://www.instagram.com/" target="_blank">
							<img src="/instagram.svg" alt="Instagram" />
						</a>
					</li>
					<li>
						<a href="https://gmail.com/" target="_blank">
							<img src="/gmail.svg" alt="Gmail" />
						</a>
					</li>
				</ul>
			</div>
		</div>
	</>
}
