import api from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import { setLoading } from "@/features/loading/loadingSlice";
import { useAppDispatch } from "@/hooks/hooksStoreRedux";

async function updateCallback(
  dispatch: ReturnType<typeof useAppDispatch>,
  id: string,
  isCallback: boolean,
  handleError: () => void,
  handleOnCompleted: () => void
): Promise<any> {
  dispatch(setLoading(true))
  try {
    const numericId = parseInt(id, 10)
    if (isNaN(numericId)) {
      throw new Error(`ID inválido para callback: "${id}"`)
    }

    const response = await api.post("/changeCallback", {
      id: numericId,
      callback: isCallback ? 0 : 1,
    });

    if (response.problem) {
      throw new Error(response.problem);
    }

    handleOnCompleted();

    return response;
  } catch (error) {
    handleError();
    throw error
  } finally {
    dispatch(setLoading(false))
  }
}

export function useChangeCallback(
  id: string,
  isCallback: boolean,
  handleError: () => void,
  handleOnCompleted: () => void
) {
  const dispatch = useAppDispatch();

  const query = useQuery({
    queryKey: ["callback", id],
    queryFn: () =>
      updateCallback(dispatch, id, isCallback, handleError, handleOnCompleted),
    enabled: Boolean(id),
    retry: false,
  });

  return query;
}
