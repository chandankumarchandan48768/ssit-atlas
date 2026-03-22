/**
 * GPS Permission Modal — shown on first map visit
 */
export default function GPSPermissionModal({ onAllow, onDeny }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 text-center animate-fade-in-down">
        {/* Icon */}
        <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Enable Location
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">
          SSIT Atlas needs your GPS location to show your position on the campus map,
          provide live navigation, and help others find lost items near you.
        </p>

        <div className="space-y-3">
          <button
            onClick={onAllow}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors shadow-md hover:shadow-blue-200 dark:hover:shadow-blue-900"
          >
            📍 Allow Location Access
          </button>
          <button
            onClick={onDeny}
            className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 font-medium py-2.5 rounded-xl transition-colors text-sm"
          >
            Not Now
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-4">
          Your location is never stored without your permission.
        </p>
      </div>
    </div>
  );
}
