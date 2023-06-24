import { useState } from "react"
import { useRouter } from "next/router"

export default function CreateMemo() {

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const router = useRouter()

    const submit= async () => {
        //await 해결하려면 async를 써야 함
        //await를 쓰면 이 함수를 다 실행 후에 그 다음 부분이 실행됨
        const response = await fetch('/api/saveMemo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title: title, body: body}),
        });

        // console.log(response.json());
        //router.push('/memoList')

        if(response.ok) {
            const result = await response.json()
            console.log(result.message);
            router.push('/memoList')
        }
        
    }
        

    return (
        <main>
            <input value={title} onChange={e => setTitle(e.target.value)} />
            <br />
            <textarea style={{fontFamily:'Arial'}} value={body} onChange={e => setBody(e.target.value)} />
            <br />
            <button onClick={e=>submit()}>Submit</button>
        </main>
    )
}