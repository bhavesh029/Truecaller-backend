import sequelize from './db'
;(async () => {
    try {
        // Sync all models with the database
        await sequelize.sync({ alter: true, logging: console.log })
        console.log('Database & tables created!')
    } catch (error) {
        console.error('Error syncing the database:', error)
    } finally {
        await sequelize.close()
    }
})()
