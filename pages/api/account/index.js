import Account from "../../../models/account";
import dbConnect from '../../../utilities/dbConnect';

export default async function handler (req,res) {
    const {method} = req;

    dbConnect();

    if (method === 'GET') {
        try {
            // get all accounts
            const accounts = await Account.find({});
            res.status(200).json({message: 'GET request succeeded', data: accounts})
        } catch(err) {
            console.log(err);
            res.status(400).json({message: 'GET request failed'})
        }
    } else if (method === 'POST') {
        try {
            const account = await Account.create(req.body);
            res.status(201).json({message: 'POST request succeeded', data: account})
        } catch (err) {
            console.log(err);
            res.status(400).json({message: 'POST request failed'})
        }
    } else {
        res.status(400).json({message: 'Request failed'})
    }
}