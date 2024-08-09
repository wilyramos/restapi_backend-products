import {connection} from "../server";
import db from "../config/db";



jest.mock('../config/db')

describe('connectDB', () => {
    it('Should handle database connection error', async () => {
        jest.spyOn(db, 'authenticate')
            .mockRejectedValue(new Error('Connection error'))
        const consoleSpy = jest.spyOn(console, 'log')
        await connection()

        expect(consoleSpy).toHaveBeenCalledWith('Error connecting to the database')
    })
})
