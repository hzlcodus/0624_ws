//여기부터는 server side. React가 아니라 NodeJS
const fs = require('fs');
const path = require('path');

const saveMemo = (obj) => {
  const filePath = path.join(process.cwd(), 'data.json');

  const jsonDataRead = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonDataRead);

  obj.id = data.memos.length ? Math.max(...data.memos.map(x => x.id)) + 1 : 1; //memos라는 key값이 있는 곳을 찾는다!
  //id를 1씩 증가하여 저장 
  obj.createdAt = new Date().toISOString();
  obj.updatedAt = new Date().toISOString();
  //현재 시간 timestamp를 저장
  data.memos.push(obj)
  //entry를 하나 push하여 data.memos를 업데이트 해주고

  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, jsonData);
  //최종적으로 data.json에 저장!
};

export default function handler(req, res) {
    if (req.method === 'POST') {
      const data = req.body;
      saveMemo(data);
      res.status(200).json({ message: 'Data saved successfully.'});
    } else {
      res.status(405).json({ message: 'Method not allowed.' });
    }
  }
  