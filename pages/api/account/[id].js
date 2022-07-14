import Account from '../../../models/account';
import dbConnect from '../../../utilities/dbConnect';

export default async function handler (req,res) {
    const {
        query: {id},
        method
    } = req;

    dbConnect();

    if (method === 'PUT') {
        try {
            const account = await Account.findByIdAndUpdate(id, req.body, {
                new: true,
                runValidators: true,
            })
            // if account not found
            if (!account) {
                res.status(400).json({message: 'Account cannot be updated. Account not found.'});
            }
            // if sucessfully found
            res.status(200).json({message: 'PUT request successful', data: account});
        } catch (err) {
            console.log(err);
            res.status(400).json({message: 'PUT request failed'});
        }
    } else if (method === 'DELETE') {
        try {
            const accountDeleted = await Account.findOneAndDelete({ _id: id});
            // if no account
            if (!accountDeleted) {
                res.status(400).json({message: 'Account not found. Account can not be deleted.'})
            }
            res.status(200).json({message: 'Account deleted', data: accountDeleted});
        } catch (err) {
            console.log(err);
            res.status(400).json({message: 'DELETE request failed'})
        }
    }
}
