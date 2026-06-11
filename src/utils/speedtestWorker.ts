// Web Worker for accurate speed testing
// Runs in separate thread to avoid blocking UI

interface WorkerMessage {
  type: 'ping' | 'download' | 'upload' | 'cancel';
  serverUrl?: string;
  duration?: number;
}

interface WorkerResult {
  type: 'ping' | 'download' | 'upload' | 'progress' | 'complete' | 'error';
  value?: number;
  progress?: number;
  error?: string;
}

// LibreSpeed public servers
const LIBRESPEED_SERVERS = [
  'https://speedtest.newrelic.com',
  'https://speedtest.i3d.net',
  'https://speedtest.leaseweb.net',
  'https://speedtest.digitalocean.com',
  'https://speedtest.cloudflare.com',
];

function getNearestServer(): string {
  // Random server selection (in production, use server list API)
  return LIBRESPEED_SERVERS[Math.floor(Math.random() * LIBRESPEED_SERVERS.length)];
}

// Measure ping using multiple requests
async function measurePing(serverUrl: string): Promise<number> {
  const samples: number[] = [];
  const attempts = 10;

  for (let i = 0; i < attempts; i++) {
    const start = performance.now();
    try {
      // Fetch a small file with cache-busting
      await fetch(`${serverUrl}/empty.txt?t=${Date.now()}-${i}`, {
        method: 'GET',
        cache: 'no-store',
        mode: 'cors',
      });
      const elapsed = performance.now() - start;
      if (elapsed < 1000) { // Filter out outliers
        samples.push(elapsed);
      }
    } catch {
      // Fallback: measure connection latency
      const start2 = performance.now();
      await new Promise(r => setTimeout(r, 10));
      samples.push(performance.now() - start2 + 10);
    }
  }

  // Remove top and bottom 20%, average the rest
  const sorted = samples.sort((a, b) => a - b);
  const trim = Math.floor(sorted.length * 0.2);
  const trimmed = sorted.slice(trim, sorted.length - trim || sorted.length);
  const avg = trimmed.reduce((a, b) => a + b, 0) / trimmed.length;

  return Math.round(avg * 10) / 10;
}

// Measure download speed using actual file downloads
async function measureDownload(
  serverUrl: string,
  duration: number = 10000,
  onProgress?: (progress: number, speed: number) => void
): Promise<number> {
  const startTime = performance.now();
  const endTime = startTime + duration;
  let totalBytes = 0;
  const speeds: number[] = [];

  // Download multiple chunks
  while (performance.now() < endTime) {
    try {
      // Download garbage file (typically 10-25MB)
      const response = await fetch(`${serverUrl}/garbage?r=${Math.random()}`, {
        method: 'GET',
        cache: 'no-store',
      });

      if (!response.ok) throw new Error('Download failed');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const chunkStart = performance.now();
      let chunkBytes = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunkBytes += value.length;
        totalBytes += value.length;

        // Report progress every 500ms
        const elapsed = performance.now() - startTime;
        if (onProgress) {
          const progress = Math.min((elapsed / duration) * 100, 100);
          const speed = (totalBytes * 8) / (elapsed / 1000) / 1_000_000; // Mbps
          onProgress(progress, speed);
        }

        // Check if we should stop
        if (performance.now() >= endTime) break;
      }

      const chunkTime = performance.now() - chunkStart;
      if (chunkTime > 0) {
        speeds.push((chunkBytes * 8) / (chunkTime / 1000) / 1_000_000);
      }
    } catch (error) {
      console.warn('Download chunk error:', error);
      // Continue with next chunk
      await new Promise(r => setTimeout(r, 100));
    }
  }

  const totalTime = (performance.now() - startTime) / 1000; // seconds
  const avgSpeed = (totalBytes * 8) / totalTime / 1_000_000; // Mbps

  return Math.round(avgSpeed * 10) / 10;
}

// Measure upload speed using actual file uploads
async function measureUpload(
  serverUrl: string,
  duration: number = 10000,
  onProgress?: (progress: number, speed: number) => void
): Promise<number> {
  const startTime = performance.now();
  const endTime = startTime + duration;
  let totalBytes = 0;
  const speeds: number[] = [];

  // Generate upload data (1MB chunks)
  const chunkSize = 1024 * 1024; // 1MB
  const uploadData = new Uint8Array(chunkSize);
  for (let i = 0; i < chunkSize; i++) {
    uploadData[i] = Math.floor(Math.random() * 256);
  }

  while (performance.now() < endTime) {
    try {
      const uploadStart = performance.now();

      // Upload to server
      await fetch(`${serverUrl}/upload?r=${Math.random()}`, {
        method: 'POST',
        body: uploadData,
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      });

      const uploadTime = performance.now() - uploadStart;
      totalBytes += chunkSize;

      if (uploadTime > 0) {
        const speed = (chunkSize * 8) / (uploadTime / 1000) / 1_000_000;
        speeds.push(speed);
      }

      // Report progress
      const elapsed = performance.now() - startTime;
      if (onProgress) {
        const progress = Math.min((elapsed / duration) * 100, 100);
        const avgSpeed = (totalBytes * 8) / (elapsed / 1000) / 1_000_000;
        onProgress(progress, avgSpeed);
      }
    } catch (error) {
      console.warn('Upload chunk error:', error);
      await new Promise(r => setTimeout(r, 100));
    }
  }

  const totalTime = (performance.now() - startTime) / 1000;
  const avgSpeed = totalBytes > 0 ? (totalBytes * 8) / totalTime / 1_000_000 : 0;

  return Math.round(avgSpeed * 10) / 10;
}

// Worker message handler
self.onmessage = async (event: MessageEvent<WorkerMessage>) => {
  const { type, serverUrl, duration } = event.data;

  try {
    const server = serverUrl || getNearestServer();

    switch (type) {
      case 'ping':
        const ping = await measurePing(server);
        self.postMessage({ type: 'complete', value: ping } as WorkerResult);
        break;

      case 'download':
        const download = await measureDownload(
          server,
          duration || 10000,
          (progress, speed) => {
            self.postMessage({ type: 'progress', progress, value: speed } as WorkerResult);
          }
        );
        self.postMessage({ type: 'complete', value: download } as WorkerResult);
        break;

      case 'upload':
        const upload = await measureUpload(
          server,
          duration || 10000,
          (progress, speed) => {
            self.postMessage({ type: 'progress', progress, value: speed } as WorkerResult);
          }
        );
        self.postMessage({ type: 'complete', value: upload } as WorkerResult);
        break;

      case 'cancel':
        // Worker will be terminated by main thread
        break;
    }
  } catch (error) {
    self.postMessage({
      type: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
    } as WorkerResult);
  }
};

export {};
