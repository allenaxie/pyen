import mongoose from 'mongoose';

const connection = {};

// connect to MongoDB
async function dbConnect() {
    if (connection.isConnected) {
        return;
    }

    const db = await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    connection.isConnected = db.connections[0].readyState;
};

export default dbConnect;


