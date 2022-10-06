import { useState, useEffect } from "react"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    
    const [error, setError] = useState(null);
    const [pending, setpending] = useState(false);
    const { dispatch } = useAuthContext()
    const [isCancelled, setIsCancelled] = useState(false)

    const signup = async (email, password, displayName) => {
        setError(null);
        setpending(true);

        try {
            // sign up user 
            const response = await projectAuth.createUserWithEmailAndPassword(email, password)
            
            if(!response) {
                throw new Error('coild not complete sign up')
            }
            
            // add display name to user  
            await response.user.updateProfile({
                displayName
            })

            // dispatch login action 
            dispatch({type: 'LOGIN', payload: response.user })

             // udeate states
             setpending(false);
             setError(null)

        } catch (error) {
            console.log(error.message);
            setpending(false)
            setError(error.message)
        }
    }

    return { error, pending, signup }
}