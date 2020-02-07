const mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB
});

exports.pool = pool;
exports.getScore = "SELECT * FROM scores WHERE user = ? AND guild = ?";
exports.setScore = "INSERT INTO scores (id,user,guild,exp,level) VALUES (?,?,?,?,?) ON DUPLICATE KEY UPDATE exp = ?, level = ?";
exports.getRanking = "SELECT user, exp, level FROM scores WHERE guild = ? ORDER BY level DESC, exp DESC";
exports.getConfig = "SELECT prefix, greeting FROM config WHERE guild = ?"; //load on start and save to associative array(key=guild id, value=prefix)
