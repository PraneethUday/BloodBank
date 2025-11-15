import React from "react";

export default function Home() {
  return (
    <main className="home-root bounce-in">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="pulse glow bounce-in-red">BloodBank</h1>
          <p className="hero-subtitle slide-in-red">
            Your blood can save lives
          </p>
          <p>
            Welcome to our Blood Bank! Donate blood, save lives. Every drop
            counts in making a difference. Join our community of life-savers
            today.
          </p>
          <p>
            Join our mission to provide safe blood to those in need. Your
            donation can make a real impact.
          </p>
          <div className="hero-buttons">
            <a href="#donate" className="btn-primary">
              Donate Now
            </a>
            <a href="#about" className="btn-secondary">
              Learn More
            </a>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="/images/Blood-Donation-PNG-Picture.jpg"
            alt="Blood donation"
          />
        </div>
      </section>

      <section className="features-section">
        <h2 className="bounce-in-red">Why Choose BloodBank?</h2>
        <div className="features-grid">
          <div className="feature-card slide-in-red">
            <div className="feature-icon">🩸</div>
            <h3>Safe & Secure</h3>
            <p>All donations are screened with the highest safety standards</p>
          </div>
          <div className="feature-card slide-in-red">
            <div className="feature-icon">⚡</div>
            <h3>Quick Process</h3>
            <p>Complete donation in just 10-15 minutes</p>
          </div>
          <div className="feature-card slide-in-red">
            <div className="feature-icon">🏥</div>
            <h3>Hospital Network</h3>
            <p>Connected to 50+ hospitals across the region</p>
          </div>
          <div className="feature-card slide-in-red">
            <div className="feature-icon">📱</div>
            <h3>Easy Booking</h3>
            <p>Schedule appointments online 24/7</p>
          </div>
        </div>
      </section>

      <section className="impact-section">
        <h2 className="bounce-in-red">Our Impact</h2>
        <div className="impact-stats">
          <div className="impact-stat glow">
            <h3>10,000+</h3>
            <p>Lives Saved This Year</p>
          </div>
          <div className="impact-stat glow">
            <h3>5,000+</h3>
            <p>Regular Donors</p>
          </div>
          <div className="impact-stat glow">
            <h3>24/7</h3>
            <p>Emergency Blood Bank</p>
          </div>
        </div>
        <blockquote className="donation-quote slide-in-red">
          <p>
            "The gift of blood is the gift of life. There is no substitute for
            it."
          </p>
          <cite>- Unknown</cite>
        </blockquote>
        <blockquote className="donation-quote slide-in-red">
          <p>
            "Blood donation is a vital part of healthcare. Every drop counts."
          </p>
          <cite>- World Health Organization</cite>
        </blockquote>
      </section>

      <section className="cta-section">
        <h2 className="bounce-in-red">Ready to Make a Difference?</h2>
        <p>Every donation can save up to 3 lives. Your contribution matters.</p>
        <a href="#donate" className="btn-primary large glow">
          Start Donating Today
        </a>
      </section>
    </main>
  );
}
