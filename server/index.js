import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import twilio from 'twilio';
import { Client as WhatsAppClient } from 'whatsapp-web.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

const prisma = new PrismaClient();

// Initialize notification clients
const telegramBot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const whatsappClient = new WhatsAppClient();

app.use(cors());
app.use(express.json());

// Middleware to check for booking conflicts
const checkBookingConflict = async (req, res, next) => {
  const { roomId, startTime, endTime } = req.body;
  
  try {
    const existingBooking = await prisma.booking.findFirst({
      where: {
        roomId,
        status: 'CONFIRMED',
        OR: [
          {
            AND: [
              { startTime: { lte: new Date(startTime) } },
              { endTime: { gt: new Date(startTime) } }
            ]
          },
          {
            AND: [
              { startTime: { lt: new Date(endTime) } },
              { endTime: { gte: new Date(endTime) } }
            ]
          }
        ]
      }
    });

    if (existingBooking) {
      return res.status(409).json({ error: 'Room is already booked for this time slot' });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'Error checking booking conflicts' });
  }
};

// Send notifications through multiple channels
const sendNotification = async (userId, bookingId, message) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    // Create notification records
    await prisma.notification.createMany({
      data: [
        { type: 'SMS', message, userId, bookingId },
        { type: 'TELEGRAM', message, userId, bookingId },
        { type: 'WHATSAPP', message, userId, bookingId }
      ]
    });

    // Send real-time notification via Socket.IO
    io.to(userId).emit('notification', { message });

    // Send SMS via Twilio
    if (user.phone) {
      await twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: user.phone
      });
    }

    // Send Telegram message
    if (user.telegramChatId) {
      await telegramBot.sendMessage(user.telegramChatId, message);
    }

    // Send WhatsApp message
    if (user.whatsappNumber) {
      const chat = await whatsappClient.getChatById(user.whatsappNumber);
      await chat.sendMessage(message);
    }
  } catch (error) {
    console.error('Error sending notifications:', error);
  }
};

// Booking routes
app.post('/api/bookings', checkBookingConflict, async (req, res) => {
  const { roomId, startTime, endTime, purpose, attendees, userId } = req.body;

  try {
    const booking = await prisma.booking.create({
      data: {
        roomId,
        userId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        purpose,
        attendees,
        status: 'CONFIRMED'
      },
      include: {
        room: true,
        user: true
      }
    });

    // Send notification
    await sendNotification(
      userId,
      booking.id,
      `Your booking for ${booking.room.name} has been confirmed for ${new Date(startTime).toLocaleString()}`
    );

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Error creating booking' });
  }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('join', (userId) => {
    socket.join(userId);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});