// npm install pg

// Importa a classe Client da biblioteca PG
const { Client } = require('pg')

const client = new Client( 
    {
        connectionString: process.env.DATABASE_URL || 'postgres://isbommapwwgfux:97179543704d8282751a71475af53db1d4ede609dbe25a86f86e6f0883a2f4c8@ec2-54-173-77-184.compute-1.amazonaws.com:5432/d9lg26vfqbktpi',
        ssl: {
            rejectUnauthorized: false
        }
    } 
)

client.connect()

module.exports = client