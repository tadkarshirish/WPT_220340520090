const express = require('express');
const app = express();
const mysql=require('mysql2');
const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');

app.listen(900,()=>{
    console.log("server listening at port 900...");
});

let dbparams={
	host:'localhost',
	user:'root',
	password:'cdac',
	databsae:'WBT',
	port:3306
}
console.log('DB working');

app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not

const conn=mysql.createConnection(dbparams);

app.get("/getdetail",(req, res)=> {
    console.log("Entered get");
		let bookid=req.query.bookid;
		console.log(bookid);
		let output={status:false, bookdetail:{bookid:0,bookname:"",price:0}}
		conn.query('select bookname price from book where bookid=?',[bookid],
		(error,rows)=>{
		if (error){
			console.log("Error Occurs");
				}
		else {
			if(rows.length>0){
				output.status=true;
				output.bookdetail=rows[0];
			}
			else{
				console.log("Book details not fount");
			}
		}

		res.send(output);

		});
	});


	app.get("/update",(req, res)=> {
		console.log("Entered get");
			
			let bookdetail= {bookid:req.query.bookid, bookname:req.query.bookname , price:req.query.price}
			console.log(bookdetail.bookid);
			let output={status:false}
			conn.query('update book set bookid=?,bookname=?,price=?',[bookdetail.bookid,bookdetail.bookname,bookdetail.price],
			(error,rows)=>{
			if (error){
				console.log("Error Occurs");
					}
			else {
				if(res.affectedRows>0){
					console.log("update occur");
					output.status=true;
				
				}
				else{
					console.log("update failed");
				}
			}
	
			res.send(output);
	
			});
		});