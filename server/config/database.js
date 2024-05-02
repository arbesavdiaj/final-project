const mysql = require("mysql2");

const connection = mysql.createPool({
  host: "localhost",
  user: "arbes",
  database: "LakeSite",
  password: "1234",
  connectionLimit: 10,
});

module.exports = connection.promise();
