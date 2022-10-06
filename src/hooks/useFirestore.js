import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {

        case 'IS_PENDING':
            return { isPending: true, document: null, success: false, error: null }

        case 'ADD_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null }
        
        case 'DELETED_DOCUMENT':
            return { isPending: false, document: null, success: true, error: null }

        case 'ERROR':
            return { isPending: false, document: null, success: false, error: action.payload } 
    
        default: 
            return state;
    }
}

export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState);
    const [isCancelled, setIsCancelled] = useState(false)

    // collection refernce 
    const ref = projectFirestore.collection(collection)

    // only dispatch if not canceled 
    const dispatchIfNotCalled = (action) => {
        if(!isCancelled) {
            dispatch(action)
        }
    }

    // add document
    const addDocument = async (doc) => {
        dispatch({type: 'IS_PENDING'})

        try {
            const createdAt =  timestamp.fromDate(new Date())
            const addedDocument = await ref.add({...doc, createdAt})
            dispatchIfNotCalled({type: 'ADD_DOCUMENT', payload: addedDocument})
        } catch (error) {
            dispatchIfNotCalled({type: 'ERROR', payload: error.message})
            console.log(error.message)
        }
    }


    // delete document 
    const deleteDocument = async (id) => {
        dispatch({type: 'IS_PENDING'})

        try {
             await ref.doc(id).delete()
            dispatchIfNotCalled({ type: 'DELETED_DOCUMENT'})
        } catch (error) {
            console.log(error.message);
            dispatchIfNotCalled({type: 'ERROR', payload: 'could not delete'})
        }
    }

    // clean up function 
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { addDocument, deleteDocument, response}
}
