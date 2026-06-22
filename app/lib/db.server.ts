import mongoose from "mongoose";

let isConnected = false;

export async function connectMongoDB(): Promise<void> {
  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }

  const rawMongoUri = process.env.MONGODB_URI;
  if (!rawMongoUri) {
    throw new Error("MONGODB_URI environment variable is required");
  }

  // Ensure SCRAM auth resolves against the `admin` database. The provisioned
  // user lives in `admin`, but without an explicit authSource the driver
  // authenticates against the URI's default DB and fails with
  // "Authentication failed" (code 18). Only inject when credentials are
  // present and authSource isn't already specified.
  const mongoUri = ((): string => {
    try {
      const url = new URL(rawMongoUri);
      const hasCredentials = Boolean(url.username);
      if (hasCredentials && !url.searchParams.has("authSource")) {
        url.searchParams.set("authSource", "admin");
        return url.toString();
      }
      return rawMongoUri;
    } catch {
      // Non-standard URI the URL parser can't handle; fall back as-is.
      return rawMongoUri;
    }
  })();

  try {
    const connection = await mongoose.connect(mongoUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    console.log("MongoDB connected successfully");

    // Handle connection events
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
      isConnected = false;
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
      isConnected = false;
    });

    mongoose.connection.on("reconnected", () => {
      console.log("MongoDB reconnected");
      isConnected = true;
    });

    // Graceful shutdown
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("MongoDB connection closed through app termination");
      process.exit(0);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    isConnected = false;
    throw error;
  }
}

export async function disconnectMongoDB(): Promise<void> {
  if (!isConnected) {
    return;
  }

  try {
    await mongoose.connection.close();
    isConnected = false;
    console.log("MongoDB disconnected");
  } catch (error) {
    console.error("Error disconnecting MongoDB:", error);
    throw error;
  }
}

export function getMongoConnection(): typeof mongoose.connection {
  return mongoose.connection;
}
