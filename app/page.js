import Header from './shared/header';
import Footer from './shared/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-indigo-600 to-purple-700">
      {/* Header Section */}
      <Header />

      {/* Main Content Section */}
      <main className="flex-grow flex justify-center items-center py-12 text-white">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-4">Get Started</h2>
          <p className="mb-8 text-lg">Create an account or sign in to begin uploading pictures.</p>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
              Sign Up
            </button>
            <button className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition">
              Log In
            </button>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
