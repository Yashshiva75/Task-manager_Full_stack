const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // We use the URI from your .env file
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`✅ Database Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Database Connection Error: ${error.message}`);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;