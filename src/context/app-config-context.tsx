"use client";

import {
  useState,
  useEffect,
  useContext,
  createContext,
  type PropsWithChildren,
} from "react";

import type { AppConfig } from "../types";

const DEFAULT_CONFIG: AppConfig = {
  similarityThreshold: 0.11,
  modelMinConfidence: 0.3,
};

const LOCAL_STORAGE_KEY = "face-recognition-app-config";

interface AppConfigContextType {
  config: AppConfig;
  resetConfig: () => void;
  setModelMinConfidence: (value: number) => void;
  setSimilarityThreshold: (value: number) => void;
}

const AppConfigContext = createContext<AppConfigContextType | undefined>(
  undefined,
);

export const AppConfigProvider = ({ children }: PropsWithChildren) => {
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);

  useEffect(() => {
    const storedConfig = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedConfig) setConfig(JSON.parse(storedConfig));
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  const resetConfig = () => setConfig(DEFAULT_CONFIG);

  const setModelMinConfidence = (value: number) =>
    setConfig((prev) => ({ ...prev, modelMinConfidence: value }));

  const setSimilarityThreshold = (value: number) =>
    setConfig((prev) => ({ ...prev, similarityThreshold: value }));

  return (
    <AppConfigContext.Provider
      value={{
        config,
        resetConfig,
        setModelMinConfidence,
        setSimilarityThreshold,
      }}
    >
      {children}
    </AppConfigContext.Provider>
  );
};

export const useAppConfig = () => {
  const context = useContext(AppConfigContext);

  if (context === undefined)
    throw new Error("useAppConfig must be used within an AppConfigProvider");

  return context;
};
