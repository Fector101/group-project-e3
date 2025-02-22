const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(
            // process.env.MONGO_URI,
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_NAME}/usersdb`,
            {
            useNewUrlParser: true,
            // useUnifiedTopology: true
        });
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB Connection Error:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
