const express = require('express');
const app = express();
const mysql = require('mysql2');

app.listen(900, () => {
    console.log("Listening to port number 90");
});

app.use(express.static("SF"));

let dbparams = {
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'node1l',
    port: 3306
}

const conn = mysql.createConnection(dbparams);

app.get("/insert", (req, resp) => {
    console.log("Inside insertemp function");

    let empdetails = {empid: req.query.empid, empname: req.query.empname, empmob: req.query.empmob}
    let output = {status: false}
   
    conn.query('insert into emp(empid, ename, emob) values (?,?,?)', 
            [empdetails.empid, empdetails.empname, empdetails.empmob],
            (error, res) => {
                if(error){
                    console.log(error);
                }
                else{
                    if(res.affectedRows > 0){
                        console.log("Insert Successful");
                        output.status = true;
                    }
                    else{
                        console.log("Insert failed");
                    }
                }
                resp.send(output);
            });



            app.get("/delete", (req, resp) => {
                console.log("Inside deleteemp function");
            
                let empdetails = {empno: req.query.empid}
                let output = {status: false}
            
                conn.query('delete from emp where empno = ?', 
                        [empdetails.empno],
                        (error, res) => {
                            if(error){
                                console.log(error);
                            }
                            else{
                                if(res.affectedRows > 0){
                                    console.log("Delete Successful");
                                    output.status = true;
                                }
                                else{
                                    console.log("Delete failed");
                                }
                            }
                            resp.send(output);
                        });
            });


});