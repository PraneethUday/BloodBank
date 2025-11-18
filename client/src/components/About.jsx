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
            className="fade-up"
          />
        </div>
      </section>

      <section className="mission-section">
        <h2>Our Mission</h2>
        <div className="mission-statements">
          <div className="mission-statement">
            <p>
              "Our mission is to design and develop an innovative blood bank
              management system that enhances donor engagement, improves request
              handling, and supports healthcare providers with accurate,
              real-time information."
            </p>
          </div>
          <div className="mission-statement">
            <p>
              "Our mission is to ensure safe, timely, and easy access to blood
              for every individual in need by building a trusted digital
              platform that connects donors, hospitals, and patients."
            </p>
          </div>
          <div className="mission-statement">
            <p>
              "Our mission is to leverage modern technology to develop a
              real-time blood management system that simplifies donor
              registration, improves request processing, and ensures that
              lifesaving blood reaches people without delay."
            </p>
          </div>
          <div className="mission-statement">
            <p>
              "Our mission is to promote voluntary blood donation and create a
              community-driven platform where every donor's contribution can
              help save lives and make healthcare more accessible."
            </p>
          </div>
          <div className="mission-statement">
            <p>
              "Our mission is to design an efficient blood bank management
              system that enhances transparency, improves communication between
              donors and hospitals, and ensures accurate and reliable data
              handling."
            </p>
          </div>
          <div className="mission-statement">
            <p>
              "Our mission is to build a user-friendly digital blood bank that
              allows donors and recipients to connect instantly and ensures that
              no life is lost due to shortage of blood."
            </p>
          </div>
        </div>
      </section>

      <section className="story-section">
        <h2>Our Story</h2>
        <div className="story-content">
          <p>
            Founded in 2020, BloodBank was born from a simple yet powerful idea:
            no one should lose their life due to blood shortage. Our founders, a
            group of healthcare professionals and technology enthusiasts,
            witnessed firsthand the challenges faced by hospitals and patients
            in accessing blood during emergencies.
          </p>
          <p>
            What started as a small community initiative has now grown into a
            comprehensive blood management platform serving thousands of donors
            and healthcare facilities. We've revolutionized the way blood
            donation works by making it more accessible, transparent, and
            efficient.
          </p>
          <p>
            Today, we're proud to be at the forefront of digital healthcare
            innovation, continuously improving our services to ensure that every
            drop of blood donated reaches those who need it most.
          </p>
        </div>
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

      <section className="blood-types-section">
        <h2>Understanding Blood Types</h2>
        <div className="blood-types-grid">
          <div className="blood-type-card">
            <h3>A+</h3>
            <p>Can donate to: A+, AB+</p>
            <p>Can receive from: A+, A-, O+, O-</p>
            <span className="percentage">35.7% of population</span>
          </div>
          <div className="blood-type-card">
            <h3>A-</h3>
            <p>Can donate to: A+, A-, AB+, AB-</p>
            <p>Can receive from: A-, O-</p>
            <span className="percentage">6.3% of population</span>
          </div>
          <div className="blood-type-card">
            <h3>B+</h3>
            <p>Can donate to: B+, AB+</p>
            <p>Can receive from: B+, B-, O+, O-</p>
            <span className="percentage">8.5% of population</span>
          </div>
          <div className="blood-type-card">
            <h3>B-</h3>
            <p>Can donate to: B+, B-, AB+, AB-</p>
            <p>Can receive from: B-, O-</p>
            <span className="percentage">1.5% of population</span>
          </div>
          <div className="blood-type-card">
            <h3>AB+</h3>
            <p>Can donate to: AB+</p>
            <p>Can receive from: All blood types</p>
            <span className="percentage">3.4% of population</span>
          </div>
          <div className="blood-type-card">
            <h3>AB-</h3>
            <p>Can donate to: AB+, AB-</p>
            <p>Can receive from: All negative types</p>
            <span className="percentage">0.6% of population</span>
          </div>
          <div className="blood-type-card">
            <h3>O+</h3>
            <p>Can donate to: All positive types</p>
            <p>Can receive from: O+, O-</p>
            <span className="percentage">37.4% of population</span>
          </div>
          <div className="blood-type-card">
            <h3>O-</h3>
            <p>Can donate to: All blood types</p>
            <p>Can receive from: O-</p>
            <span className="percentage">6.6% of population</span>
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

      <section className="benefits-section">
        <h2>Benefits of Blood Donation</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">❤️</div>
            <h3>Health Benefits</h3>
            <p>
              Regular blood donation can help reduce iron levels, lower risk of
              heart disease, and provide a free health screening.
            </p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🎯</div>
            <h3>Save Lives</h3>
            <p>
              One donation can save up to three lives. Your contribution
              directly impacts patients in emergency situations.
            </p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🔬</div>
            <h3>Free Health Check</h3>
            <p>
              Every donation includes a mini health screening including blood
              pressure, hemoglobin levels, and infectious disease testing.
            </p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🌟</div>
            <h3>Community Impact</h3>
            <p>
              Join a community of heroes making a difference. Your donation
              supports local hospitals and patients in your area.
            </p>
          </div>
        </div>
      </section>

      <section className="eligibility-section">
        <h2>Donor Eligibility Requirements</h2>
        <div className="eligibility-content">
          <div className="eligibility-column">
            <h3>✓ You Can Donate If:</h3>
            <ul>
              <li>You are 18-65 years old</li>
              <li>You weigh at least 50 kg (110 lbs)</li>
              <li>You are in good health</li>
              <li>Your hemoglobin level is adequate</li>
              <li>You haven't donated in the last 3 months</li>
              <li>You have a valid ID</li>
            </ul>
          </div>
          <div className="eligibility-column">
            <h3>✗ You Cannot Donate If:</h3>
            <ul>
              <li>You have a cold, flu, or fever</li>
              <li>You're pregnant or breastfeeding</li>
              <li>You have certain chronic conditions</li>
              <li>You've had recent tattoos or piercings (within 6 months)</li>
              <li>You've traveled to malaria-endemic areas recently</li>
              <li>You're taking certain medications</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="safety-section">
        <h2>Safety & Quality Standards</h2>
        <div className="safety-grid">
          <div className="safety-card">
            <h3>🛡️ Sterile Equipment</h3>
            <p>
              All needles and equipment are sterile, single-use, and disposed of
              immediately after donation.
            </p>
          </div>
          <div className="safety-card">
            <h3>🔍 Rigorous Testing</h3>
            <p>
              Every donation is tested for infectious diseases including HIV,
              Hepatitis B & C, and other blood-borne pathogens.
            </p>
          </div>
          <div className="safety-card">
            <h3>👨‍⚕️ Trained Staff</h3>
            <p>
              Our medical professionals are highly trained and certified in
              blood collection and donor care.
            </p>
          </div>
          <div className="safety-card">
            <h3>📋 Quality Control</h3>
            <p>
              We follow international standards and maintain strict quality
              control measures throughout the process.
            </p>
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

      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>How long does blood donation take?</h3>
            <p>
              The entire process takes about 45-60 minutes, including
              registration, screening, and the actual donation which takes only
              10-15 minutes.
            </p>
          </div>
          <div className="faq-item">
            <h3>Is blood donation safe?</h3>
            <p>
              Yes, blood donation is completely safe. We use sterile, single-use
              equipment and follow strict safety protocols.
            </p>
          </div>
          <div className="faq-item">
            <h3>How often can I donate blood?</h3>
            <p>
              You can donate whole blood every 3 months (12 weeks). Platelet
              donations can be made more frequently.
            </p>
          </div>
          <div className="faq-item">
            <h3>Will I feel weak after donating?</h3>
            <p>
              Most donors feel fine after donating. We provide refreshments and
              recommend resting for 10-15 minutes before leaving.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Make a Difference?</h2>
        <p>
          Join thousands of donors who are saving lives every day. Your donation
          can make a real difference in someone's life.
        </p>
        <div className="cta-buttons">
          <button className="btn-primary">Register as Donor</button>
          <button className="btn-secondary">Request Blood</button>
        </div>
      </section>
    </main>
  );
}
