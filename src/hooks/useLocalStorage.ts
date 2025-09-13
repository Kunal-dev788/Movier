import { useEffect, useState } from "react";

// Generic hook (not just for Item)
export function useLocalStorage<T>(key: string, initialData: T) {
  const [data, setData] = useState<T>(() => {
    try {
      const existing = localStorage.getItem(key);
      return existing ? (JSON.parse(existing) as T) : initialData;
    } catch {
      return initialData;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
      // optional: handle quota exceeded or storage errors
    }
  }, [key, data]);

  const updateLocalStorage = (newData: T | ((prev: T) => T)) => {
    setData((prev) => {
      const value = typeof newData === "function" ? (newData as (prev: T) => T)(prev) : newData;
      localStorage.setItem(key, JSON.stringify(value));
      return value;
    });
  };

  return [data, updateLocalStorage] as const;
}
