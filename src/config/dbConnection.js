const mongoose = require('mongoose');
const retry = require('retry');

// MongoDB connection string
const mongoURI = 'mongodb://myTester:xyz123@localhost:27017/test';

// Retry options
const retryOptions = {
  retries: 3, // Number of retries
  factor: 1.5, // Exponential backoff factor
  minTimeout: 5000, // Minimum timeout in ms
  maxTimeout: 5000, // Maximum timeout in ms
  randomize: true // Randomize the timeouts
};

async function connectWithRetry() {
  const operation = retry.operation(retryOptions);
  
  return new Promise((resolve, reject) => {
    operation.attempt(async () => {
      try {
        await mongoose.connect(mongoURI);

        console.log('MongoDB connected successfully');
        resolve();
      } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        if (operation.retry(err)) {
          console.log(`Retrying ${operation.attempts()} more times...`);
          return;
        }
        reject(new Error('MongoDB connection retry limit exceeded'));
      }
    });
  });

}

module.exports = connectWithRetry;