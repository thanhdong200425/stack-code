import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
                {/* GitHub-style spaceship illustration */}
                <div className="mb-8 select-none">
                    <div className="text-[120px] leading-none font-bold text-gray-900">404</div>
                </div>

                <div className="space-y-6">
                    <h1 className="text-4xl font-bold text-gray-900">This is not the web page you are looking for.</h1>

                    <div className="space-y-4">
                        <p className="text-lg text-gray-600">Looks like the page you are trying to visit does not exist.</p>

                        <div className="bg-gray-100 rounded-lg p-6 border border-gray-200">
                            <p className="text-gray-700 mb-4">Here are some helpful links instead:</p>
                            <div className="space-x-4">
                                <Link href="/" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                                    🏠 Home
                                </Link>
                                <Link href="/sign-in" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                                    🗝️ Sign in
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <Link href="/" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
                            Back to Homepage
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
