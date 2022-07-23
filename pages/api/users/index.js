import dbConnect from '../../../utilities/dbConnect';
import User from '../../../models/user';

export default async function handler (req,res) {
    res.status(200).json({success: true, message: 'hello'})
}