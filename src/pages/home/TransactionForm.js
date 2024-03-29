import { useState, useEffect } from 'react'
import { useFirestore } from '../../hooks/useFirestore'

export default function TransactionForm({uid}) {
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [pending, setPending] = useState(false)
    const { addDocument, response} = useFirestore('transactions')

    const handleSubmit =  (e) => {
        e.preventDefault();
        setPending(true)
        const adde = addDocument({
            uid,
            name,
            amount
        }) 
        setName('')
        setAmount('')
        setPending(false)
    }

    // // clear the input if success 
    // useEffect(() =>{
    //     if(response.success) {
    //         setName('')
    //         setAmount('')
    //     }
    // }, [response.success])

  return (
    <>
        <h3>Add a Transaction</h3>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Transaction Name: </span>
                <input 
                    type="text"
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    />
            </label>

            <label>
                <span>Amount ($): </span>
                <input 
                    type="number"
                    required
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                    />
            </label>
            {!pending && <button className='btn'>Add Transaction</button>}
            {pending && <button className='btn' disabled>proccessing</button>}
        </form>
    </>
  )
}
