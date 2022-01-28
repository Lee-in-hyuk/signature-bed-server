// import 대신 require를 씀.
// commonJS방식으로 쓰기 때문.
const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

const fs = require('fs');
const dataj = fs.readFileSync("./database.json");
const parseData = JSON.parse(dataj);    // database.json받아온거를 객체형태로 변수에 담음
const mysql = require('mysql');

// php에서 connect 만든거랑 같은 개념
const connection = mysql.createConnection({
    host:parseData.host,
    user: parseData.user,
    password: parseData.password,
    port: parseData.port,
    database: parseData.database
})

app.use(express.json()); //json형식의 데이터를 처리할 수 있도록 설정
app.use(cors());        // 브라우저의 다양한 사용을 위해 설정

// // get요청이 오면 res.send를 보내주겠다.
// app.get('/board', async(req,res)=>{
//     res.send('상품정보 리스트 입니다.')
// })
// post요청 오면 res.send를 보내주겠다.
app.post('/createboard', async(req,res)=>{
    res.send('등록되었습니다.')
})

app.get('/board', async(req,res)=>{
    // php할 때 result = mysqli_query()날려주는거랑 같은 개념
    // query(쿼리문, 콜백함수(에러값,결과,컬럼))
    connection.query(
        "SELECT * FROM board",
        (err, rows, fields) =>{
            res.send(rows);
        }
    )
    // 여기까지 작성하고 http://localhost:8080/board 브라우저에 입력했을 때 데이터 잘 나오면 성공
})

// 셋팅한 app을 실행
app.listen(port, ()=>{
    console.log('시그니처베드 서버가 돌아가고 있습니다.')
})