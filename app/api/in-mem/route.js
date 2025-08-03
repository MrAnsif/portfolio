
let cache = {};
const CACHE_TTL = 60 * 1000; // 60 seconds

export async function GET(request) {

  console.log(Response)

  const now = Date.now();
  const startTime = performance.now();

  // Check cache
  if (cache.data && now - cache.timestamp < CACHE_TTL) {
    const endTime = performance.now();
    return Response.json({
      source: "cache",
      time_taken: `${(endTime - startTime).toFixed(2)} ms`,
      data: cache.data,
    });
  }

  // Fetch fresh data
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await res.json();

  // Save to cache
  cache = {
    data: users,
    timestamp: now,
  };

  const endTime = performance.now();
  return Response.json({
    source: "API",
    time_taken: `${(endTime - startTime).toFixed(2)} ms`,
    data: users,
  });
}
