import { useEffect, useState } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [pending, setPending] = useState(false)
    const { dispatch } = useAuthContext()

    const logOut =  async() => {
        setError(null)
        setPending(true)

        // sign use out 
        try {
            await projectAuth.signOut()

            // dispatch logout action 
            dispatch({ type: 'LOGOUT'})


            // udeate states
            if(!isCancelled) {
                setPending(false)
                setError(null)
            }
            
            
        } catch (error) {
            if(!isCancelled) {
                console.log(error.message)
                setError(error.message)
                setPending(false)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { logOut, error, pending}
}