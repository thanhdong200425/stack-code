"use client";

import Link from "next/link";

export default function Error() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
                {/* Error icon/number section */}
                <div className="mb-8 select-none">
                    <div className="text-[100px] leading-none font-bold text-red-600">⚠️</div>
                </div>

                <div className="space-y-6">
                    <h1 className="text-4xl font-bold text-gray-900">Something went wrong</h1>

                    <div className="space-y-4">
                        <p className="text-lg text-gray-600">We encountered an unexpected error. Do not worry, we are on it.</p>

                        <div className="bg-gray-100 rounded-lg p-6 border border-gray-200">
                            <p className="text-gray-700 mb-4">You can try these steps:</p>
                            <ul className="text-left list-disc list-inside space-y-2 text-gray-600">
                                <li>Refresh the page</li>
                                <li>Clear your browser cache</li>
                                <li>Try again in a few minutes</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8 space-x-4">
                        <button onClick={() => window.location.reload()} className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
                            Refresh Page
                        </button>
                        <Link href="/" className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
                            Go to Homepage
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
