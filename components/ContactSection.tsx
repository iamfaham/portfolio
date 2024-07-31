'use client';

import { useState } from 'react';
import emailjs from 'emailjs-com';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const publicKey: any = process.env.NEXT_PUBLIC_EMAILJS_KEY;
  const templateId: any = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const serviceId: any = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const result = await emailjs.send(
        serviceId, 
        templateId, 
        formData,
        publicKey 
      );
      if (result.text === 'OK') {
        toast.success('Your message has been sent successfully!');
        setFormData({ name: '', email: '', message: '' });
        setIsSubmitted(true); // Disable the button after successful submission
      } else {
        toast.error('Failed to send your message. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred while sending your message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <section id="contact" className="section w-full py-12 md:py-24 lg:py-32 z-100">
        <div className="container max-w-6xl mx-auto px-4 md:px-6 text-center">
          <div className="flex flex-col items-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get in Touch</h2>
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              Have a project in mind? Let&apos;s discuss how I can help.
            </p>
            <form className="w-full max-w-lg mx-auto space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-md bg-background px-4 py-2 text-foreground shadow-sm hover:bg-gray-900 hover:text-accent-foreground focus:outline-none focus:ring-1 focus:ring-accent disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-md bg-background px-4 py-2 text-foreground shadow-sm hover:bg-gray-900 hover:text-accent-foreground focus:outline-none focus:ring-1 focus:ring-accent disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full rounded-md bg-background px-4 py-2 text-foreground shadow-sm hover:bg-gray-900 hover:text-accent-foreground focus:outline-none focus:ring-1 focus:ring-accent disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
              <button
                type="submit"
                className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isSending || isSubmitted} // Disable the button if sending or already submitted
              >
                {isSending ? 'Sending...' : 'Submit'}
              </button>
            </form>
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Connect with me at:</h3>
              <div className="flex justify-center space-x-6">
                <a href="https://www.linkedin.com/in/iamfaham" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FontAwesomeIcon icon={faLinkedin} className="text-3xl hover:text-soft-purple" />
                </a>
                <a href="https://twitter.com/iamfaham" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <FontAwesomeIcon icon={faXTwitter} className="text-3xl hover:text-soft-purple" />
                </a>
                <a href="https://github.com/iamfaham" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <FontAwesomeIcon icon={faGithub} className="text-3xl hover:text-soft-purple" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
}
