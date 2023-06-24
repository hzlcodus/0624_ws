import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Memo = () => {

    const [memo, setMemo] = useState({title: "", body: "", createdAt: ""})
    const router = useRouter()
    const { id } = router.query

    //query parameter인 id를 가지고 온다
    useEffect(() => {

        if(id) { //id를 읽을 때까지 시간이 좀 걸림
            // console.log("???")
            // console.log(id)

            requestMemoData(id) //서버에 요청
        }

    }, [id])

    const requestMemoData = async (id) => {
        const response = await fetch("/api/getMemo?id="+id)
        const json = await response.json()
        console.log(json)

        if (!json.memo) {
            alert("memo not found")
        }
        else {
            setMemo(json.memo)
        }
    }

    

    return (
        <div>
            {id}
            <br />
            memo!!
            <br />
            {memo.title}<br />
            {memo.body}<br />
            {memo.createdAt}<br />
            ...?
        </div>
    )
}

export default Memo
