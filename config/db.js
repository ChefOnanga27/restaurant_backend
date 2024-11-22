import mysql from "mysql2";

// creation de la base donnee

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "3306",
    database: "lecosmos"
});


db.connect(error => {
  if (error) throw error;
  console.log(" Connecté à  la base de donnée.");
});

export default db;