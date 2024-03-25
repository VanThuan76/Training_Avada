import { setLoading, storeTypes } from "@avada/actions/storeActions";

export async function getTodo(dispatch, payload) {
  try {
    setLoading(dispatch, true);
    dispatch({ type: storeTypes.GET_TODO, payload: payload });
    return payload;
  } catch (e) {
    setLoading(dispatch, false);
  } finally {
    setLoading(dispatch, false);
  }
}
export async function addTodo(dispatch, payload) {
  try {
    setLoading(dispatch, true);
    dispatch({ type: storeTypes.ADD_TODO, payload: payload });
    return payload;
  } catch (e) {
    setLoading(dispatch, false);
  } finally {
    setLoading(dispatch, false);
  }
}
export async function updateTodo(dispatch, payload) {
  try {
    setLoading(dispatch, true);
    dispatch({ type: storeTypes.UPDATE_TODO, payload: payload });
    return payload;
  } catch (e) {
    setLoading(dispatch, false);
  } finally {
    setLoading(dispatch, false);
  }
}
