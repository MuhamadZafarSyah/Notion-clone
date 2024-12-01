"use client";

import { LiveblocksProvider } from "@liveblocks/react/suspense";

function LiveBlockProvider({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY) {
    throw new Error(
      "You must provide a NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY in your .env.local file",
    );
  }

  return (
    <LiveblocksProvider throttle={16} authEndpoint={"/auth-endpoint"}>
      {children}
    </LiveblocksProvider>
  );
}
export default LiveBlockProvider;
