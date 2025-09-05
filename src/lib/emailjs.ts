import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const sendEmail = async (templateParams: any) => {
  try {
    const result = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );
    return { success: true, result };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
};