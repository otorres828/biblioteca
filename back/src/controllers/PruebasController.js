const sequelize = require('../../config/database.js');
const moment = require("moment");

const que_hora_es = async (req, res) => {
    const query = `select NOW() as fecha`;

    const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

    var mysqlDate = result[0].fecha; // Esta es la fecha y hora que recibiste de MySQL
    var date = moment(mysqlDate);
    var dateInMyTimezone = date.tz('America/Caracas').format('YYYY-MM-DD');
    
    var currentTime = new Date();

    return res.json({"hora_bdd":dateInMyTimezone,"hora_servidor":currentTime.getHours()+":"+currentTime.getMinutes()})
}
module.exports = { que_hora_es,};
