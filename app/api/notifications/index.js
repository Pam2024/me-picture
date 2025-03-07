import { getSession } from 'next-auth/react'; // Assuming you use next-auth
import prisma from '../../../lib/prisma'; // Your Prisma client

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get authenticated user
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = session.user.id;
    
    // Fetch user's notifications
    const notifications = await prisma.notification.findMany({
      where: {
        toUserId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        fromUser: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      take: 50, // Limit to most recent 50
    });

    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Server error' });
  }
}