import { createClient } from "redis"

export const redisConnection = async () => {
    const client = createClient({
        url: "rediss://default:gQAAAAAAA6fZAAIgcDI2ZmJiZWY5NjQzNWQ0MjFlYWI5ZWY5MzljZDYzY2JkYw@sacred-gopher-239577.upstash.io:6379"
    });

    client.on("error", function (err) {
        throw err;
    });
    await client.connect()
    console.log("redis connected");
    return client
}