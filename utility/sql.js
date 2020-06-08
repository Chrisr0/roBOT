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
exports.getPlace = "SELECT COUNT(1) place FROM scores WHERE level >= ? AND guild = ?";
exports.getRandomCharacter = "SELECT * FROM characters WHERE is_gold = ? ORDER BY RAND() LIMIT 1";
exports.claimCharacter = "INSERT INTO ownedcharacters (name,middlename,surname,gid,HP,DMG,SPD,EVA,DEF,is_gold,lvl,exp,owner_id) VALUES (?,?,?,?,?,?,?,?,?,?,1,1,?)";
exports.listCharacters = "SELECT * FROM ownedcharacters WHERE owner_id = ? ORDER BY id ASC LIMIT 10 OFFSET ?";
exports.getCharacter = "SELECT * FROM ownedcharacters WHERE id = ?";
exports.getCharacterById = "SELECT * FROM characters WHERE id = ?";
exports.updateCharacterLevel = "UPDATE ownedcharacters SET exp=?,lvl=?,HP=?,DMG=?,SPD=?,EVA=?,DEF=? WHERE id = ?";