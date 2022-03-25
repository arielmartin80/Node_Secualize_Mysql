const dbConfig = require('../config/dbConfig.js')

const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(
    'node_sequalize_mysql',
    'root',
    '', {
        host: 'localhost',
        dialect: 'mysql',

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
)

sequelize.authenticate()
    .then(() => {
        console.log('conected...')
    })
    .catch(err => {
        console.log('Error ' + err)
    })

// Creacion de modelos

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.product = require('./productModel.js')(sequelize, DataTypes)
db.review = require('./reviewModel.js')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done!')
    })

module.exports = db