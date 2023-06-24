import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
    //hook
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const check = () => {
        console.log(email)
        console.log(password)
        console.log('-----')

        if (email !== 'cheyonjin@snu.ac.kr') {
            alert('email is wrong')
            return false
        }
        if (password !== '1234') {
            alert('password is wrong')
            return false
        }

        router.push('/createMemo')
    }

    //mine
    const signup = async () => {
        const response = await fetch('/api/saveUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: email, password: password}),
        });

        // console.log(response.json());
        //router.push('/memoList')
    }

    return (
        <main>
            <h1>login page!!</h1>
            <br /> <br />
            <input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
            <input placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)}  />
            <br />
            <button onClick={check}>Login</button>
            <button onClick={signup}>Sign Up</button>
        </main>
    )
}