import { useState, useEffect } from 'react';
import { getSocket } from '../lib/socket';
import { useAuth } from '../context/auth';

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user } = useAuth();
  
  // Fetch notifications from API on component mount
  useEffect(() => {
    if (!user?.id) return;
    
    const fetchNotifications = async () => {
      try {
        const res = await fetch('/api/notifications');
        if (res.ok) {
          const data = await res.json();
          setNotifications(data);
        }
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNotifications();
  }, [user?.id]);
  
  // Listen for real-time notifications
  useEffect(() => {
    if (!user?.id) return;
    
    const socket = getSocket();
    
    socket.on('newPhoto', (data) => {
      // Add new notification to the list
      const newNotification = {
        id: Date.now(), // Temporary ID until saved to DB
        message: `${data.addedByUsername} added a new photo to wallet ${data.walletId}`,
        photoUrl: data.photoUrl,
        walletId: data.walletId,
        fromUserId: data.addedByUserId,
        toUserId: user.id,
        isRead: false,
        createdAt: data.timestamp || new Date(),
        fromUser: {
          id: data.addedByUserId,
          name: data.addedByUsername
        }
      };
      
      setNotifications(prev => [newNotification, ...prev]);
      
      // Play notification sound
      playNotificationSound();
    });
    
    return () => {
      socket.off('newPhoto');
    };
  }, [user?.id]);
  
  // Simple notification sound function
  const playNotificationSound = () => {
    const audio = new Audio('/notification-sound.mp3');
    audio.play().catch(e => console.log('Error playing notification sound', e));
  };
  
  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      const res = await fetch(`/api/notifications/${notificationId}/read`, {
        method: 'PUT'
      });
      
      if (res.ok) {
        setNotifications(prev => 
          prev.map(notification => 
            notification.id === notificationId 
              ? { ...notification, isRead: true } 
              : notification
          )
        );
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };
  
  // Get unread count
  const unreadCount = notifications.filter(n => !n.isRead).length;
  
  if (!user) return null;
  
  return (
    <div className="relative">
      {/* Notification Bell Icon */}
      <button 
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 text-gray-700 hover:text-gray-900"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        
        {/* Notification Badge */}
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
      
      {/* Notification Dropdown */}
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50 max-h-96 overflow-y-auto">
          <div className="py-2 px-4 bg-gray-100 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
            {notifications.length > 0 && (
              <button 
                onClick={async () => {
                  try {
                    await fetch('/api/notifications/read-all', { method: 'PUT' });
                    setNotifications(prev => 
                      prev.map(n => ({ ...n, isRead: true }))
                    );
                  } catch (error) {
                    console.error('Error marking all as read:', error);
                  }
                }}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Mark all as read
              </button>
            )}
          </div>
          
          <div className="divide-y divide-gray-100">
            {loading ? (
              <div className="p-4 text-center text-gray-500">
                Loading notifications...
              </div>
            ) : notifications.length > 0 ? (
              notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`p-4 hover:bg-gray-50 transition-colors ${notification.isRead ? 'bg-white' : 'bg-blue-50'}`}
                  onClick={() => !notification.isRead && markAsRead(notification.id)}
                >
                  <div className="flex items-start">
                    {notification.photoUrl && (
                      <div className="flex-shrink-0 mr-3">
                        <img 
                          src={notification.photoUrl} 
                          alt="Photo thumbnail" 
                          className="h-10 w-10 rounded object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-800">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No notifications yet
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}