"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export interface Property {
  id: string;
  name: string;
  slug: string;
  address: string | null;
}

interface PropertyContextValue {
  properties: Property[];
  selectedPropertyId: string | null;
  setSelectedPropertyId: (id: string | null) => void;
  loading: boolean;
  refetch: () => Promise<void>;
}

const PropertyContext = createContext<PropertyContextValue | null>(null);

export function PropertyProvider({ children }: { children: React.ReactNode }) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/properties");
      if (!res.ok) throw new Error("Failed to load properties");
      const json = await res.json();
      setProperties(json.data);
      setSelectedPropertyId((prev) => {
        if (prev && json.data.some((p: Property) => p.id === prev)) return prev;
        return json.data.length ? json.data[0].id : null;
      });
    } catch {
      setProperties([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (!loading && properties.length && selectedPropertyId) {
      const exists = properties.some((p) => p.id === selectedPropertyId);
      if (!exists) setSelectedPropertyId(properties[0].id);
    }
  }, [loading, properties, selectedPropertyId]);

  return (
    <PropertyContext.Provider
      value={{
        properties,
        selectedPropertyId,
        setSelectedPropertyId,
        loading,
        refetch,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperty() {
  const ctx = useContext(PropertyContext);
  if (!ctx) throw new Error("useProperty must be used within PropertyProvider");
  return ctx;
}
