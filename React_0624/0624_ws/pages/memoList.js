import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MemoList() {
  const router = useRouter();
  const [memos, setMemos] = useState([])

    useEffect(() => {
        getMemos()
    }, [])

    const getMemos = async () => {
        const response = await fetch('/api/getMemos')
        const json = await response.json()
        setMemos(json.memos)
    }

    const navigateToMemo = (id) => {
        router.push('/memo/' + id)
    }



  return (
    <div style={{}}>
      memoList!

      {memos.map((memo, index) => {
        return <div key={index} onClick={e => navigateToMemo(memo.id)}>
            <div>{memo.title}</div>
            <div>{memo.body}</div>
            <div>{memo.createdAt}</div>
        </div>
        }
      )
    }
    </div>
  )
}
