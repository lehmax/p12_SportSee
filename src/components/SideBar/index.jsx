import { NavLink } from 'react-router-dom'
import styles from './sidebar.module.scss'

import DumbbellIcon from '../../assets/dumbbell.svg?react'
import SwimIcon from '../../assets/swim.svg?react'
import VeloIcon from '../../assets/velo.svg?react'
import YogaIcon from '../../assets/yoga.svg?react'

const SideBar = () => {
  return (
    <aside className={styles.sidebar}>
      <nav>
        <NavLink className={styles.link} to="/a">
          <YogaIcon />
        </NavLink>
        <NavLink className={styles.link} to="/b">
          <SwimIcon />
        </NavLink>
        <NavLink className={styles.link} to="/c">
          <VeloIcon />
        </NavLink>
        <NavLink className={styles.link} to="/d">
          <DumbbellIcon />
        </NavLink>
      </nav>
      <small>Copyright, SportSee 2020</small>
    </aside>
  )
}

export default SideBar
