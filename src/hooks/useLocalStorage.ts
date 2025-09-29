import { useState, useEffect } from 'react';

/**
 * Custom hook untuk mengelola localStorage dengan SSR safety
 * @param key - Key untuk localStorage
 * @param initialValue - Nilai default
 * @returns [value, setValue, isLoading]
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, boolean] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(`🔄 Loading localStorage for key: ${key}`);
    
    try {
      // Pastikan kita di client-side
      if (typeof window === 'undefined') {
        setIsLoading(false);
        return;
      }

      const item = window.localStorage.getItem(key);
      console.log(`📦 localStorage value for ${key}:`, item);
      
      if (item !== null) {
        try {
          const parsedValue = JSON.parse(item);
          console.log(`✅ Parsed value for ${key}:`, parsedValue);
          setStoredValue(parsedValue);
        } catch (parseError) {
          console.warn(`⚠️ Error parsing localStorage for ${key}:`, parseError);
          // Jika parsing gagal, hapus item yang corrupt dan gunakan initialValue
          window.localStorage.removeItem(key);
          setStoredValue(initialValue);
        }
      } else {
        console.log(`🆕 No existing value for ${key}, using initial:`, initialValue);
        // Jika tidak ada data, gunakan initialValue dan simpan ke localStorage
        setStoredValue(initialValue);
        window.localStorage.setItem(key, JSON.stringify(initialValue));
      }
    } catch (error) {
      console.warn(`❌ Error accessing localStorage for key "${key}":`, error);
      // Jika error (misalnya localStorage disabled), tetap gunakan initialValue
      setStoredValue(initialValue);
    } finally {
      setIsLoading(false);
      console.log(`✅ Finished loading localStorage for ${key}`);
    }
  }, [key]); // Hapus initialValue dari dependency array

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Izinkan nilai berupa fungsi untuk konsistensi dengan useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      console.log(`💾 Saving to localStorage ${key}:`, valueToStore);
      
      setStoredValue(valueToStore);
      
      // Simpan ke localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        console.log(`✅ Saved to localStorage ${key}`);
      }
    } catch (error) {
      console.warn(`❌ Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, isLoading];
}