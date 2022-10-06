import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import {useAuthContext} from '../hooks/useAuthContext'

// styles
import styles from './navbar.module.css'
import Signup from '../pages/signup/Signup'


export default function Navbar() {
  const { logOut } = useLogout()
  const { user } = useAuthContext()
  return (
    <nav className={styles.navbar}>
        <ul>
            <li className={styles.title}><Link to='/'>myMoneyApp</Link></li>

          {!user && (
            <>
              <li><Link to='/login' >Login</Link></li>
              <li><Link to='/signup' >Signup</Link></li>
              </>
            )}

            {user && (
              <>
                <li>Hello, {user.displayName}</li>
                <li><button className='btn' onClick={ logOut }>Logout</button></li>
              </>
            )}
        </ul>
    </nav>
  )
}
