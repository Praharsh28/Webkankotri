import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">😕</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Invitation Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The invitation you're looking for doesn't exist or hasn't been published yet.
        </p>
        <Link 
          href="/"
          className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        >
          ← Go to Homepage
        </Link>
      </div>
    </div>
  )
}
