import Notification from './Notification';
import { useAuth } from '../context/auth';

export default function Layout({ children }) {
  const { user } = useAuth();
  
  return (
    <div>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Your App Name</h1>
          
          <div className="flex items-center space-x-4">
            {user && <Notification />}
            {/* Other header elements */}
          </div>
        </div>
      </header>
      
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>
    </div>
  );
}