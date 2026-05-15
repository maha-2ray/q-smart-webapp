import React from "react";

const RELOAD_KEY = "chunk_reload_ts";
const RELOAD_COOLDOWN_MS = 10_000;

/**
 * Wraps React.lazy to auto-reload once when a chunk fails to load,
 * recovering gracefully from stale hashes after a deployment.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function lazyWithReload<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
) {
  return React.lazy(() =>
    importFn().catch((error) => {
      const lastReload = Number(sessionStorage.getItem(RELOAD_KEY) || 0);
      if (Date.now() - lastReload > RELOAD_COOLDOWN_MS) {
        sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
        window.location.reload();
        return new Promise(() => {});
      }
      throw error;
    }),
  );
}
