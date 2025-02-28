import redis.asyncio as redis
import json
import os
from fastapi import Depends
import logging
from typing import Optional, Any

logger = logging.getLogger(__name__)

# Default to localhost for development
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")
CACHE_EXPIRATION = int(os.getenv("CACHE_EXPIRATION", 3600))  # 1 hour default

async def get_cache_client():
    """
    Create and return a Redis client.
    
    For local development, this will connect to a local Redis instance.
    For production on Fly.io, it will connect to the Redis service.
    """
    try:
        client = redis.from_url(REDIS_URL, encoding="utf-8", decode_responses=False)
        # Test connection
        await client.ping()
        return client
    except Exception as e:
        logger.warning(f"Redis connection failed: {str(e)}. Using dummy cache.")
        return DummyCache()

async def get_from_cache(client, key: str) -> Optional[Any]:
    """
    Retrieve a value from the cache.
    
    Args:
        client: Redis client
        key: Cache key
        
    Returns:
        The cached value or None if not found
    """
    try:
        if isinstance(client, DummyCache):
            return client.get(key)
            
        data = await client.get(key)
        if data:
            return json.loads(data)
        return None
    except Exception as e:
        logger.error(f"Cache retrieval error: {str(e)}")
        return None

async def store_in_cache(client, key: str, value: Any) -> bool:
    """
    Store a value in the cache.
    
    Args:
        client: Redis client
        key: Cache key
        value: Value to store (will be JSON serialized)
        
    Returns:
        True if successful, False otherwise
    """
    try:
        if isinstance(client, DummyCache):
            client.set(key, value)
            return True
            
        serialized = json.dumps(value, default=lambda o: o.dict() if hasattr(o, 'dict') else o)
        await client.set(key, serialized, ex=CACHE_EXPIRATION)
        return True
    except Exception as e:
        logger.error(f"Cache storage error: {str(e)}")
        return False

class DummyCache:
    """
    A simple in-memory cache for development when Redis is not available.
    """
    def __init__(self):
        self.cache = {}
        logger.warning("Using in-memory dummy cache instead of Redis")
    
    def get(self, key):
        return self.cache.get(key)
    
    def set(self, key, value, ex=None):
        self.cache[key] = value
        return True
        
    async def ping(self):
        return True 