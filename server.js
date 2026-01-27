import { createClient } from "redis";

async function start() {
  // 🔹 Create Redis Client
  const redis = createClient({
    url: "redis://localhost:6379",
  });

  // 🔹 Events
  redis.on("connect", () => {
    console.log("✅ Redis connected");
  });

  redis.on("error", (err) => {
    console.error("❌ Redis error:", err);
  });

  // 🔹 Connect
  await redis.connect();

  // ===============================
  // BASIC REDIS OPERATIONS
  // ===============================

  // SET
  await redis.set("name", "Rehan");
  console.log("SET name");

  // GET
  const name = await redis.get("name");
  console.log("GET name:", name);

  // SET with expiry (cache example)
  await redis.setEx("otp", 30, "123456");
  console.log("OTP stored for 30 sec");

  // EXISTS
  const exists = await redis.exists("otp");
  console.log("OTP exists?", exists);

  // DELETE
  await redis.del("name");
  console.log("name deleted");

  // ===============================
  // REAL-LIFE CACHE EXAMPLE
  // ===============================

  async function getUser(userId) {
    const key = `user:${userId}`;

    // 1️⃣ Check Cache
    const cachedUser = await redis.get(key);
    if (cachedUser) {
      console.log("⚡ Data from Redis cache");
      return JSON.parse(cachedUser);
    }

    // 2️⃣ Fake DB Call
    console.log("🐢 Data from DB");
    const user = {
      id: userId,
      name: "Rehan",
      city: "Indore",
    };

    // 3️⃣ Save to Cache
    await redis.setEx(key, 60, JSON.stringify(user));

    return user;
  }

  await getUser(1);
  await getUser(1); // second time → cache

  // ===============================
  // CLEANUP
  // ===============================
  await redis.quit();
  process.exit(0);
}

start();
