// src/app/api/landscaping.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '../../src/lib/databaseConnection';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // Handle POST request to add landscaping entry
        try {
            const { dateCompleted, clientName, address, lengthOfTime, amountPaid, notes } = req.body;

            const db = await connect();
            const result = await db.query(
                'INSERT INTO landscaping (dateCompleted, clientName, address, lengthOfTime, amountPaid, notes) VALUES (?, ?, ?, ?, ?, ?)',
                [dateCompleted, clientName, address, lengthOfTime, amountPaid, notes]
            );
            db.end();
            
            
            res.status(201).json({ message: 'Landscaping entry added successfully' });
        } catch (error) {
            console.error('Error adding landscaping entry:', error);
            res.status(500).json({ message: 'An error occurred while adding the landscaping entry' });
        }
    } else if (req.method === 'GET') {
        // Handle GET request to fetch landscaping entries
        try {
            const db = await connect();
            const [rows] = await db.query('SELECT * FROM landscaping');
            db.end();
            res.status(200).json(rows);
        } catch (error) {
            console.error('Error fetching landscaping entries:', error);
            res.status(500).json({ message: 'An error occurred while fetching landscaping entries' });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}

