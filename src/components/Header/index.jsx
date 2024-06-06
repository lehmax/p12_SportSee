import { NavLink } from 'react-router-dom'
import Logo from '../../assets/logo.svg?react'
import styles from './header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <nav>
        <NavLink to="/">Accueil</NavLink>
        <NavLink to="/profil">Profil</NavLink>
        <NavLink to="/settings">Réglages</NavLink>
        <NavLink to="/community">Communauté</NavLink>
      </nav>
    </header>
  )
}

export default Header
