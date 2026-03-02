import { useState } from "react";

export function useSessionId(): string {
  const [sessionId] = useState(() => {
    let id = localStorage.getItem("aesthetic_session_id");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("aesthetic_session_id", id);
    }
    return id;
  });
  return sessionId;
}
