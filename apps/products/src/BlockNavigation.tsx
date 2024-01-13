import { useBlocker } from "react-router-dom";
import { useBlockNavigationStore } from "./Stores";
import { useEffect } from "react";

export function BlockNavigation() {
  const isBlocked = useBlockNavigationStore.useIsBlocked();
  const blocker = useBlocker(isBlocked);
  useEffect(() => {
    if (blocker.state === "blocked") {
      alert("blocked");
    }
  }, [blocker]);
  return <></>;
}
