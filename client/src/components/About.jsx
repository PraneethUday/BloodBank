import React from "react";

export default function About() {
  return (
    <main className="about-root fade-up">
      <section className="hero-section">
        <div className="hero-content">
          <h1>About BloodBank</h1>
          <p className="hero-subtitle">Saving lives, one donation at a time</p>
        </div>
        <div className="hero-image">
          <img
            src="/images/blood-donation-gd071f3ded_1920_1655893247578_1655893271863.png"
            alt="Blood donation"
          />
        </div>
      </section>

      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          At BloodBank, we are committed to ensuring a safe and adequate blood
          supply for patients in need. Our mission is to connect donors with
          recipients, promote blood donation awareness, and maintain the highest
          standards of safety and quality in blood collection and distribution.
        </p>
      </section>

      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>10,000+</h3>
            <p>Lives Saved</p>
          </div>
          <div className="stat-card">
            <h3>5,000+</h3>
            <p>Active Donors</p>
          </div>
          <div className="stat-card">
            <h3>50+</h3>
            <p>Hospitals Served</p>
          </div>
          <div className="stat-card">
            <h3>24/7</h3>
            <p>Emergency Support</p>
          </div>
        </div>
      </section>

      <section className="process-section">
        <h2>How Blood Donation Works</h2>
        <div className="process-steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Register</h3>
            <p>Create your account and fill out our donor questionnaire</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Screening</h3>
            <p>Medical professionals will assess your eligibility</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Donate</h3>
            <p>The donation process takes about 10-15 minutes</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Save Lives</h3>
            <p>Your donation helps patients in critical need</p>
          </div>
        </div>
      </section>

      <section className="team-section">
        <h2>Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img src="/images/images.jpeg" alt="Dr. Sarah Johnson" />
            <h3>Dr. Sarah Johnson</h3>
            <p>Medical Director</p>
          </div>
          <div className="team-member">
            <img src="/images/images.jpeg" alt="Nurse Michael Chen" />
            <h3>Nurse Michael Chen</h3>
            <p>Head Nurse</p>
          </div>
          <div className="team-member">
            <img src="/images/images.jpeg" alt="Admin Lisa Rodriguez" />
            <h3>Lisa Rodriguez</h3>
            <p>Operations Manager</p>
          </div>
        </div>
      </section>
    </main>
  );
}
