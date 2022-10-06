import { useEffect, useState } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'


export const useLogin = () => {
    
    const [error, setError] = useState(null)
    const [pending, setPending] = useState(false)
    const { dispatch } = useAuthContext()
    const [isCancelled, setIsCancelled] = useState(null)

    const logIn =  async(email, password) => {
        setError(null)
        setPending(true)

        console.log('first one ',pending)

        // sign use out 
        try {
           const res = await projectAuth.signInWithEmailAndPassword(email, password)

            // dispatch logout action 
            dispatch({ type: 'LOGIN', payload: res.user})


            console.log('is cancelled value', isCancelled)
            // udeate states

            setPending(false)
            setError(null)
            console.log('Second one ',pending)
          
        } catch (error) {
            console.log(error.message)
            setError(error.message)
            setPending(false)

        }
    }

    return { logIn, error, pending}
}