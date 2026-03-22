// Toast Manager - Global toast notification management
let toastListeners = [];
let toastId = 0;

export const subscribe = (callback) => {
    toastListeners.push(callback);
    return () => {
        toastListeners = toastListeners.filter((listener) => listener !== callback);
    };
};

const emit = (toast) => {
    toastListeners.forEach((listener) => listener(toast));
};

/**
 * Show a success toast
 */
export const showSuccess = (message, duration = 5000) => {
    emit({
        id: `toast-${toastId++}`,
        type: 'success',
        message,
        duration,
    });
};

/**
 * Show an error toast
 */
export const showError = (message, duration = 5000) => {
    emit({
        id: `toast-${toastId++}`,
        type: 'error',
        message,
        duration,
    });
};

/**
 * Show a warning toast
 */
export const showWarning = (message, duration = 5000) => {
    emit({
        id: `toast-${toastId++}`,
        type: 'warning',
        message,
        duration,
    });
};

/**
 * Show an info toast
 */
export const showInfo = (message, duration = 5000) => {
    emit({
        id: `toast-${toastId++}`,
        type: 'info',
        message,
        duration,
    });
};

/**
 * Generic toast function
 */
export const toast = (message, type = 'info', duration = 5000) => {
    emit({
        id: `toast-${toastId++}`,
        type,
        message,
        duration,
    });
};

export default {
    success: showSuccess,
    error: showError,
    warning: showWarning,
    info: showInfo,
    show: toast,
    subscribe,
};
