import * as React from "react";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 5000;

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
};

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

const toastTimeouts = new Map();

function addToRemoveQueue(toastId, dispatch) {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({ type: actionTypes.REMOVE_TOAST, toastId });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
}

const ToastContext = React.createContext(null);

function toastReducer(state, action) {
  switch (action.type) {
    case actionTypes.ADD_TOAST: {
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };
    }
    case actionTypes.UPDATE_TOAST: {
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };
    }
    case actionTypes.DISMISS_TOAST: {
      const toastId = action.toastId;

      if (toastId) {
        addToRemoveQueue(toastId, action.dispatch);
      } else {
        state.toasts.forEach((t) => addToRemoveQueue(t.id, action.dispatch));
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          toastId === undefined || t.id === toastId
            ? { ...t, open: false }
            : t
        ),
      };
    }
    case actionTypes.REMOVE_TOAST: {
      if (action.toastId === undefined) {
        return { ...state, toasts: [] };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
    }
    default:
      return state;
  }
}

export function ToastProvider({ children }) {
  const [state, dispatch] = React.useReducer(toastReducer, { toasts: [] });

  const api = React.useMemo(() => {
    function show({ title, description, variant } = {}) {
      const id = genId();

      const toast = {
        id,
        open: true,
        title,
        description,
        variant,
        onOpenChange: (open) => {
          if (!open) {
            dispatch({
              type: actionTypes.DISMISS_TOAST,
              toastId: id,
              dispatch,
            });
          }
        },
      };

      dispatch({ type: actionTypes.ADD_TOAST, toast });

      return {
        id,
        dismiss: () =>
          dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id, dispatch }),
        update: (next) =>
          dispatch({ type: actionTypes.UPDATE_TOAST, toast: { ...next, id } }),
      };
    }

    function dismiss(toastId) {
      dispatch({ type: actionTypes.DISMISS_TOAST, toastId, dispatch });
    }

    return { state, show, dismiss };
  }, [state]);

  return <ToastContext.Provider value={api}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
}
