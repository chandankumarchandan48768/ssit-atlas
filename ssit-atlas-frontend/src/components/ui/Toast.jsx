import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const Toast = ({ type = 'info', message, onClose, duration = 5000, id }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        // Trigger enter animation
        requestAnimationFrame(() => {
            setIsVisible(true);
        });

        // Auto dismiss
        const timer = setTimeout(() => {
            handleClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            onClose(id);
        }, 300);
    };

    const icons = {
        success: <CheckCircle size={20} />,
        error: <AlertCircle size={20} />,
        warning: <AlertTriangle size={20} />,
        info: <Info size={20} />,
    };

    const typeClasses = {
        success: 'toast-success',
        error: 'toast-error',
        warning: 'toast-warning',
        info: 'toast-info',
    };

    return (
        <div
            className={`toast ${typeClasses[type]} transform transition-all duration-300 ${isVisible && !isExiting
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-full opacity-0'
                }`}
            role="alert"
        >
            <div className="flex-shrink-0">{icons[type]}</div>
            <div className="flex-1">{message}</div>
            <button
                onClick={handleClose}
                className="flex-shrink-0 hover:opacity-75 transition-opacity"
                aria-label="Close notification"
            >
                <X size={18} />
            </button>
            <div
                className="toast-progress"
                style={{ animationDuration: `${duration}ms` }}
            />
        </div>
    );
};

Toast.propTypes = {
    type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    duration: PropTypes.number,
    id: PropTypes.string.isRequired,
};

// Toast Container Component
export const ToastContainer = ({ toasts, onRemove }) => {
    return (
        <div className="fixed top-4 right-4 z-[9999] space-y-3">
            {toasts.map((toast) => (
                <Toast key={toast.id} {...toast} onClose={onRemove} />
            ))}
        </div>
    );
};

ToastContainer.propTypes = {
    toasts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            type: PropTypes.string,
            message: PropTypes.string.isRequired,
            duration: PropTypes.number,
        })
    ).isRequired,
    onRemove: PropTypes.func.isRequired,
};

export default Toast;
