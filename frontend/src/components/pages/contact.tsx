// pages/Contact.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  MapPin, Phone, Mail, Send, Check, Facebook, Twitter,
  Instagram, Linkedin, Clock, MessageCircle, Globe,
  ArrowRight, Copy, CheckCircle
} from 'lucide-react';
import SEO from '../SEO';
import './Contact.css';

// Footer wali ASLI details
const ADDRESS_LINES = [
  'Rua Fernão de Magalhães, Cerro Alagoa',
  'Apt L11, Lote 20',
  '8200-129 Albufeira, Portugal',
];
const ADDRESS_QUERY = encodeURIComponent(
  'Rua Fernão de Magalhães, Cerro Alagoa, 8200-129 Albufeira, Portugal'
);

const COMPANY = {
  email: 'fusixtech@gmail.com',
  phone: '+351 920 348 944',
  phoneRaw: '+351920348944',
  addressLines: ADDRESS_LINES,
  mapsLink: `https://www.google.com/maps/search/?api=1&query=${ADDRESS_QUERY}`,
  mapsEmbed: `https://www.google.com/maps?q=${ADDRESS_QUERY}&output=embed`,
};

const SOCIALS = {
  facebook: 'https://www.facebook.com/FusixTech',
  twitter: 'https://x.com/FusixTech',
  instagram: 'https://www.instagram.com/fusixtech/',
  linkedin: 'https://www.linkedin.com/company/fusix-tech/',
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ⚠️ Abhi form sirf simulate hota hai, message kahin nahi jata.
  // Asli API / EmailJS / backend se connect karna zaroori hai.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setFormStatus(''), 3000);
    }, 1500);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const contactInfo = [
    {
      id: 1,
      icon: <MapPin size={24} />,
      title: "Visit Us",
      details: COMPANY.addressLines,
      action: "Get Directions",
      link: COMPANY.mapsLink
    },
    {
      id: 2,
      icon: <Phone size={24} />,
      title: "Call Us",
      details: [COMPANY.phone],
      action: "Call Now",
      link: `tel:${COMPANY.phoneRaw}`
    },
    {
      id: 3,
      icon: <Mail size={24} />,
      title: "Email Us",
      details: [COMPANY.email],
      action: "Send Email",
      link: `mailto:${COMPANY.email}`
    },
    {
      id: 4,
      icon: <Clock size={24} />,
      title: "Working Hours",
      details: ["Monday - Friday: 9:00 - 18:00", "Saturday: 10:00 - 14:00", "Sunday: Closed"],
      action: "Schedule Meeting",
      link: `mailto:${COMPANY.email}?subject=Meeting Request`
    }
  ];

  const faqs = [
    {
      id: 1,
      question: "How quickly can you start my project?",
      answer: "We can typically start within 1-2 weeks after initial consultation and agreement."
    },
    {
      id: 2,
      question: "Do you offer ongoing support?",
      answer: "Yes, we provide 24/7 support and maintenance packages for all our projects."
    },
    {
      id: 3,
      question: "What is your pricing model?",
      answer: "We offer flexible pricing: fixed price, hourly, or monthly retainer based on project needs."
    },
    {
      id: 4,
      question: "Can I see examples of your work?",
      answer: "Absolutely! Check our portfolio or contact us for case studies in your industry."
    }
  ];

  // Structured data (Google ko company aur FAQs samajhne mein madad)
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "name": "Contact Fusix Tech",
        "url": "https://fusixtech.com/contact"
      },
      {
        "@type": "Organization",
        "name": "Fusix Tech",
        "url": "https://fusixtech.com",
        "email": COMPANY.email,
        "telephone": COMPANY.phoneRaw,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Rua Fernão de Magalhães, Cerro Alagoa, Apt L11, Lote 20",
          "addressLocality": "Albufeira",
          "postalCode": "8200-129",
          "addressCountry": "PT"
        },
        "sameAs": [
          SOCIALS.facebook,
          SOCIALS.twitter,
          SOCIALS.instagram,
          SOCIALS.linkedin
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
        }))
      }
    ]
  };

  return (
    <div className="contact-container">
      <SEO
        title="Contact Us | Get a Free Quote | Fusix Tech"
        description="Contact Fusix Tech for web development, software and IT solutions. Call, email or send us a message and we'll reply within 24 hours."
        path="/contact"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-particles"></div>
        <div className="container">
          <div className="contact-hero-content">
            <span className="hero-subtitle">Get In Touch</span>
            <h1 className="hero-title">
              Let's <span className="golden-text">Connect</span> & Create Something Amazing
            </h1>
            <p className="hero-description">
              Have a project in mind? We'd love to hear about it.
              Our team is ready to help you bring your ideas to life.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="info-cards-section">
        <div className="container">
          <div className="info-cards-grid">
            {contactInfo.map((info) => (
              <div key={info.id} className="info-card">
                <div className="info-icon">{info.icon}</div>
                <h3>{info.title}</h3>
                <div className="info-details">
                  {info.details.map((detail, index) => (
                    <p key={index}>{detail}</p>
                  ))}
                </div>
                <a
                  href={info.link}
                  className="info-action"
                  {...(info.link.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {info.action} <ArrowRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="form-map-section">
        <div className="container">
          <div className="form-map-grid">
            {/* Contact Form */}
            <div className="contact-form-container">
              <div className="form-header">
                <span className="form-subtitle">Send Message</span>
                <h2 className="form-title">Get in <span className="golden-text">Touch</span></h2>
                <p className="form-description">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Full Name"
                      aria-label="Your Full Name"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email Address"
                      aria-label="Your Email Address"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Your Phone Number"
                      aria-label="Your Phone Number"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      aria-label="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    aria-label="Your Message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn-primary submit-btn"
                  disabled={formStatus === 'sending'}
                >
                  {formStatus === 'sending' ? (
                    'Sending...'
                  ) : formStatus === 'success' ? (
                    <>
                      <Check size={20} />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>

                {formStatus === 'success' && (
                  <div className="success-message">
                    <CheckCircle size={20} />
                    <span>Thank you! Your message has been sent successfully.</span>
                  </div>
                )}
              </form>
            </div>

            {/* Map & Additional Info */}
            <div className="map-info-container">
              <div className="map-container">
                <iframe
                  title="Fusix Tech office location"
                  src={COMPANY.mapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Quick Contact */}
              <div className="quick-contact">
                <h3>Quick Contact</h3>
                <div className="quick-contact-item">
                  <div className="quick-contact-icon">
                    <Mail size={18} />
                  </div>
                  <div className="quick-contact-info">
                    <span>{COMPANY.email}</span>
                    <button
                      className="copy-btn"
                      aria-label="Copy email"
                      onClick={() => copyToClipboard(COMPANY.email, 'email')}
                    >
                      {copied === 'email' ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
                <div className="quick-contact-item">
                  <div className="quick-contact-icon">
                    <Phone size={18} />
                  </div>
                  <div className="quick-contact-info">
                    <span>{COMPANY.phone}</span>
                    <button
                      className="copy-btn"
                      aria-label="Copy phone number"
                      onClick={() => copyToClipboard(COMPANY.phoneRaw, 'phone')}
                    >
                      {copied === 'phone' ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>

                <div className="social-links">
                  <h4>Follow Us</h4>
                  <div className="social-icons">
                    <a href={SOCIALS.facebook} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                      <Facebook size={18} />
                    </a>
                    <a href={SOCIALS.twitter} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter">
                      <Twitter size={18} />
                    </a>
                    <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                      <Instagram size={18} />
                    </a>
                    <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                      <Linkedin size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">FAQ</span>
            <h2 className="section-title">Frequently Asked <span className="golden-text">Questions</span></h2>
            <p className="section-description">
              Find answers to common questions about our services and process
            </p>
          </div>

          <div className="faq-grid">
            {faqs.map((faq) => (
              <div key={faq.id} className="faq-card">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Project?</h2>
            <p>Let's discuss how we can help bring your ideas to life</p>
            <div className="cta-buttons">
              <a href={`tel:${COMPANY.phoneRaw}`} className="btn-primary">
                Schedule a Call <MessageCircle size={18} />
              </a>
              <Link to="/portfolio" className="btn-outline">
                View Portfolio <Globe size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;