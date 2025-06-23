import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send the form data to your backend or email service
    setSubmitted(true);
  };

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', padding: '24px', background: '#f9f9f9', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
      <h1 style={{ color: '#2563eb', marginBottom: '16px' }}>Contact Us</h1>
    <p style={{ marginBottom: '8px' }}><strong>Email:</strong> <a href="mailto:support@medirural.com" style={{ color: '#2563eb' }}>support@medirural.com</a></p>
      <p style={{ marginBottom: '8px' }}><strong>Phone:</strong> +91-9876543210</p>
      <p style={{ marginBottom: '8px' }}><strong>Office Address:</strong><br />MediRural Private Limited<br />Surat Gujrat India</p>
      <p style={{ marginBottom: '16px' }}><strong>Customer Support Hours:</strong> Monday to Saturday, 9am to 6pm</p>
      <div style={{ marginBottom: '18px' }}>
        <strong>Follow us:</strong>
        <span style={{ marginLeft: '12px' }}>
          <a href="/facebook" style={{ color: '#2563eb', marginRight: '10px' }}><i className="fa-brands fa-facebook"></i></a>
          <a href="/instagram" style={{ color: '#2563eb', marginRight: '10px' }}><i className="fa-brands fa-instagram"></i></a>
          <a href="/linkedin" style={{ color: '#2563eb' }}><i className="fa-brands fa-linkedin"></i></a>
        </span>
      </div>
      <h2 style={{ color: '#2563eb', fontSize: '1.2rem', marginTop: '24px' }}>Send us a message</h2>
      {submitted ? (
        <div style={{ color: 'green', marginTop: '16px' }}>Thank you for contacting us! We will get back to you soon.</div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
          <button
            type="submit"
            style={{
              background: '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '10px 24px',
              fontSize: '1rem',
              cursor: 'pointer',
              marginTop: '8px',
              transition: 'background 0.2s'
            }}
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
};

export default Contact; 