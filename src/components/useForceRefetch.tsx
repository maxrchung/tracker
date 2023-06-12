import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useApplicationStore } from "../stores/application";

/** Encountering an issue with react-query where calling queryClient.clear()
 * doesn't work. I believe this is because useQuery() only refetches when its
 * respective component is re-rendered. To get around this I will use this hook
 * to update the state. */
export default function useForceRefetch() {
  const queryClient = useQueryClient();
  const setForceRefetch = useApplicationStore((state) => state.setForceRefetch);
  const forceRefetch = useCallback(() => {
    queryClient.clear();
    setForceRefetch();
  }, []);
  return forceRefetch;
}
