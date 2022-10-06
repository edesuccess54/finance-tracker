import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup';

// styles 
import styles from './signup.module.css'

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');

    const { signup, pending, error} = useSignup()

    const handleSubmit = (e) => {
        e.preventDefault();

        signup(email, password, displayName);
    }


  return (
    <form className={styles['signup-form']} onSubmit={handleSubmit}>
      <h2>Sign up</h2>

      <label>
        <span>Email:</span>
        <input 
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={ email }
            required
        />
      </label>

      <label>
        <span>Password: </span>
        <input 
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={ password } 
            required
        />
      </label>

      <label>
        <span>Display Name</span>
        <input 
            type="text" 
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
            required
        />
      </label>
      { !pending && <button className='btn'>signup</button> }
      { pending && <button className='btn' disabled>Loading</button>}
      { error && <p>{error}</p> }
    </form>
  )
}
