import mongoose from 'mongoose';

// Vercel serverless functions can reuse a warm container between invocations.
// We cache the connection on `global` so we don't reconnect on every request.
let cached = global._mongooseConn;
if (!cached) {
  cached = global._mongooseConn = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI environment variable is not set');
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
    }).then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// --- Schemas ---

const ResultSchema = new mongoose.Schema({
  download: { type: Number, required: true },
  upload: { type: Number, required: true },
  ping: { type: Number, required: true },
  jitter: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ContentSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true }, // e.g. "site"
  data: { type: mongoose.Schema.Types.Mixed, default: {} },
  updatedAt: { type: Date, default: Date.now },
});

const AdsSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true }, // e.g. "ads"
  data: { type: mongoose.Schema.Types.Mixed, default: {} },
  updatedAt: { type: Date, default: Date.now },
});

// Prevent model overwrite errors on hot-reload / repeated invocations
export const Result = mongoose.models.Result || mongoose.model('Result', ResultSchema);
export const Content = mongoose.models.Content || mongoose.model('Content', ContentSchema);
export const Ads = mongoose.models.Ads || mongoose.model('Ads', AdsSchema);
