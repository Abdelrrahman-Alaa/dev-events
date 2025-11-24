import mongoose, { Connection } from "mongoose";

/**
 * Interface for cached MongoDB connection
 * Stores both the connection promise and status
 */
interface CachedConnection {
  conn: Connection | null;
  promise: Promise<typeof mongoose> | null;
}

/**
 * Type-safe global declaration for MongoDB cache
 * Ensures TypeScript knows about the global mongodb variable
 */
declare global {
  // Allow global to have a mongodb property
  var mongodb: CachedConnection | undefined;
}

/**
 * Initialize the cached connection object
 * This prevents multiple connections during development
 */
const cached: CachedConnection = global.mongodb || {
  conn: null,
  promise: null,
};

if (!global.mongodb) {
  global.mongodb = cached;
}

/**
 * Connects to MongoDB using Mongoose
 * Implements connection caching to reuse existing connections in development
 *
 * @returns Promise that resolves to the mongoose instance
 * @throws Error if MONGODB_URI environment variable is not set
 */
async function connectDB(): Promise<typeof mongoose> {
  // Return cached connection if available
  if (cached.conn) {
    return mongoose;
  }

  // Wait for cached promise if connection is in progress
  if (cached.promise) {
    return cached.promise;
  }

  // Retrieve MongoDB URI from environment variables
  const mongodbUri = process.env.MONGODB_URI;

  // Validate that the connection string is provided
  if (!mongodbUri) {
    throw new Error(
      "MONGODB_URI environment variable is not defined. Please set it in your .env file."
    );
  }

  // Create a new connection promise
  cached.promise = mongoose
    .connect(mongodbUri, {
      // Connection options for optimal performance and stability
      maxPoolSize: 10,
      minPoolSize: 5,
      socketTimeoutMS: 45000,
    })
    .then((connection) => {
      cached.conn = connection.connection;
      return connection;
    })
    .catch((error) => {
      cached.promise = null;
      throw error;
    });

  // Await and return the connection
  return cached.promise;
}

export default connectDB;
