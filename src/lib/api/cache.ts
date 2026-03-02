/**
 * Simple in-memory LRU cache with TTL support.
 * Max 200 entries, 5-minute TTL.
 */

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

const MAX_ENTRIES = 200;
const TTL_MS = 5 * 60 * 1000; // 5 minutes

class LRUCache {
  private cache = new Map<string, CacheEntry<unknown>>();

  get<T>(key: string): T | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return undefined;
    }

    // Move to end (most recently used) by re-inserting
    this.cache.delete(key);
    this.cache.set(key, entry);

    return entry.data as T;
  }

  set<T>(key: string, data: T): void {
    // If key already exists, delete it first so insertion order is updated
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    // Evict oldest entry if at capacity
    if (this.cache.size >= MAX_ENTRIES) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(key, {
      data,
      expiresAt: Date.now() + TTL_MS,
    });
  }
}

/** Singleton cache instance shared across API routes */
export const cache = new LRUCache();
