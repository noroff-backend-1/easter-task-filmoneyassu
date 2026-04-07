require("dotenv").config()
const { Sequelize } = require("sequelize")


const sequelize = new Sequelize ({

    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    hostname: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT

})

const db = {}

db.sequelize = sequelize


db.Eggs = require("./eggs")(sequelize)

module.exports = db