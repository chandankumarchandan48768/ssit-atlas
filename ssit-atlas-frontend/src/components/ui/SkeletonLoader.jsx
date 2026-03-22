import PropTypes from 'prop-types';

const SkeletonLoader = ({ variant = 'card', count = 1, className = '' }) => {
    const variants = {
        card: 'h-48 w-full',
        text: 'h-4 w-full mb-2',
        title: 'h-8 w-3/4 mb-4',
        circle: 'h-12 w-12 rounded-full',
        button: 'h-10 w-24 rounded-lg',
    };

    const skeletonClass = variants[variant] || variants.card;

    return (
        <>
            {[...Array(count)].map((_, index) => (
                <div
                    key={index}
                    className={`skeleton ${skeletonClass} ${className}`}
                    aria-label="Loading..."
                />
            ))}
        </>
    );
};

SkeletonLoader.propTypes = {
    variant: PropTypes.oneOf(['card', 'text', 'title', 'circle', 'button']),
    count: PropTypes.number,
    className: PropTypes.string,
};

// Specific skeleton components for common use cases
export const CardSkeleton = ({ className = '' }) => (
    <div className={`p-6 rounded-2xl bg-white dark:bg-slate-850 shadow-xl ${className}`}>
        <SkeletonLoader variant="circle" className="mb-4" />
        <SkeletonLoader variant="title" />
        <SkeletonLoader variant="text" count={3} />
        <SkeletonLoader variant="button" className="mt-4" />
    </div>
);

CardSkeleton.propTypes = {
    className: PropTypes.string,
};

export const TableSkeleton = ({ rows = 5, className = '' }) => (
    <div className={`space-y-3 ${className}`}>
        <SkeletonLoader variant="title" className="w-1/4" />
        {[...Array(rows)].map((_, index) => (
            <div key={index} className="flex gap-4">
                <SkeletonLoader variant="text" className="flex-1" />
                <SkeletonLoader variant="text" className="flex-1" />
                <SkeletonLoader variant="text" className="flex-1" />
            </div>
        ))}
    </div>
);

TableSkeleton.propTypes = {
    rows: PropTypes.number,
    className: PropTypes.string,
};

export const ListSkeleton = ({ items = 5, className = '' }) => (
    <div className={`space-y-4 ${className}`}>
        {[...Array(items)].map((_, index) => (
            <div key={index} className="flex items-center gap-4">
                <SkeletonLoader variant="circle" />
                <div className="flex-1 space-y-2">
                    <SkeletonLoader variant="text" className="w-3/4" />
                    <SkeletonLoader variant="text" className="w-1/2" />
                </div>
            </div>
        ))}
    </div>
);

ListSkeleton.propTypes = {
    items: PropTypes.number,
    className: PropTypes.string,
};

export default SkeletonLoader;
