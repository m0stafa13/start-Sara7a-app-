import { client } from "../../main.js";

export const get = async (key) => {
    return await client.get(key)
}
export const set = (key, value, EX) => {
    return client.set(key, value, { EX })
}
export const del = (key) => {
    return client.del(key)
}
export const ttl = (key) => {
    return client.ttl(key)
}
export const inc = (key) => {
    return client.incr(key)
}
export const decr = (key) => {
    return client.decr(key)
}

export const mset = (key) => {
    return client.mSet(key)
}
export const mget = (key) => {
    return client.mGet(key)
}
export const exists = (key) => {
    return client.exists(key)
}
