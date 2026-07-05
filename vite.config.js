import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import nodemailer from 'nodemailer'

// Custom Vite plugin to handle email sending API requests
const emailPlugin = () => ({
  name: 'send-email-api',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url === '/api/send-email' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });
        req.on('end', async () => {
          try {
            const { email, subject, message } = JSON.parse(body);
            if (!email || !message) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, error: 'Email and message are required fields.' }));
              return;
            }

            console.log(`Sending email from ${email}...`);

            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'shubhamxa7557@gmail.com',
                pass: 'eyoj mfnp ppbk xsfp'
              }
            });

            const mailOptions = {
              from: 'shubhamxa7557@gmail.com',
              to: 'shubhamxa7557@gmail.com',
              replyTo: email,
              subject: `[Portfolio Contact] ${subject || 'New Message'}`,
              text: `You received a new message from your portfolio contact form:\n\nSender Email: ${email}\nSubject: ${subject || 'N/A'}\n\nMessage:\n${message}`
            };

            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully!');

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, message: 'Email sent successfully!' }));
          } catch (error) {
            console.error('Failed to send email:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: error.message }));
          }
        });
      } else {
        next();
      }
    });
  },
  configurePreviewServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url === '/api/send-email' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });
        req.on('end', async () => {
          try {
            const { email, subject, message } = JSON.parse(body);
            
            console.log(`Sending email from ${email}...`);

            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'shubhamxa7557@gmail.com',
                pass: 'eyoj mfnp ppbk xsfp'
              }
            });

            const mailOptions = {
              from: 'shubhamxa7557@gmail.com',
              to: 'shubhamxa7557@gmail.com',
              replyTo: email,
              subject: `[Portfolio Contact] ${subject || 'New Message'}`,
              text: `You received a new message from your portfolio contact form:\n\nSender Email: ${email}\nSubject: ${subject || 'N/A'}\n\nMessage:\n${message}`
            };

            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully!');

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, message: 'Email sent successfully!' }));
          } catch (error) {
            console.error('Failed to send email:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: error.message }));
          }
        });
      } else {
        next();
      }
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteCompression(), emailPlugin()],
})
