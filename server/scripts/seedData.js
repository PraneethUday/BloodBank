const mongoose = require("mongoose");
const Donation = require("../models/Donation");
const BloodRequest = require("../models/BloodRequest");
const BloodCenter = require("../models/BloodCenter");

// Sample data for seeding
const sampleDonations = [
  {
    donorName: "John Smith",
    email: "john.smith@email.com",
    phone: "555-0101",
    bloodType: "A+",
    age: 28,
    weight: 75,
    address: "123 Main St, City, State 12345",
    medicalHistory: "No significant medical history",
    lastDonation: new Date("2023-08-15"),
    emergencyContact: {
      name: "Jane Smith",
      phone: "555-0102",
      relationship: "Spouse",
    },
    status: "pending",
  },
  {
    donorName: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "555-0103",
    bloodType: "O-",
    age: 32,
    weight: 68,
    address: "456 Oak Ave, City, State 12345",
    medicalHistory: "Mild allergies",
    lastDonation: new Date("2023-06-20"),
    emergencyContact: {
      name: "Mike Johnson",
      phone: "555-0104",
      relationship: "Brother",
    },
    status: "pending",
  },
  {
    donorName: "David Brown",
    email: "david.brown@email.com",
    phone: "555-0105",
    bloodType: "B+",
    age: 25,
    weight: 80,
    address: "789 Pine Rd, City, State 12345",
    medicalHistory: "No medical issues",
    lastDonation: new Date("2023-09-10"),
    emergencyContact: {
      name: "Lisa Brown",
      phone: "555-0106",
      relationship: "Sister",
    },
    status: "approved",
  },
  {
    donorName: "Emily Davis",
    email: "emily.davis@email.com",
    phone: "555-0107",
    bloodType: "AB+",
    age: 29,
    weight: 65,
    address: "321 Elm St, City, State 12345",
    medicalHistory: "Asthma (controlled)",
    lastDonation: new Date("2023-07-05"),
    emergencyContact: {
      name: "Robert Davis",
      phone: "555-0108",
      relationship: "Father",
    },
    status: "completed",
  },
  {
    donorName: "Michael Wilson",
    email: "michael.wilson@email.com",
    phone: "555-0109",
    bloodType: "O+",
    age: 35,
    weight: 85,
    address: "654 Maple Dr, City, State 12345",
    medicalHistory: "No medical history",
    lastDonation: new Date("2023-05-12"),
    emergencyContact: {
      name: "Karen Wilson",
      phone: "555-0110",
      relationship: "Wife",
    },
    status: "pending",
  },
];

const sampleBloodRequests = [
  {
    requesterName: "Dr. Robert Martinez",
    requesterEmail: "robert.martinez@hospital.com",
    requesterPhone: "555-0201",
    patientName: "Maria Garcia",
    bloodType: "A+",
    unitsNeeded: 2,
    urgency: "high",
    hospitalName: "City General Hospital",
    hospitalAddress: "100 Hospital Way, City, State 12345",
    doctorName: "Dr. Robert Martinez",
    doctorPhone: "555-0201",
    reason: "Emergency surgery - blood loss",
    status: "pending",
  },
  {
    requesterName: "Dr. Jennifer Lee",
    requesterEmail: "jennifer.lee@hospital.com",
    requesterPhone: "555-0202",
    patientName: "Thomas Anderson",
    bloodType: "O-",
    unitsNeeded: 1,
    urgency: "critical",
    hospitalName: "Metropolitan Medical Center",
    hospitalAddress: "200 Medical Blvd, City, State 12345",
    doctorName: "Dr. Jennifer Lee",
    doctorPhone: "555-0202",
    reason: "Trauma patient - internal bleeding",
    status: "approved",
  },
  {
    requesterName: "Dr. William Chen",
    requesterEmail: "william.chen@hospital.com",
    requesterPhone: "555-0203",
    patientName: "Lisa Rodriguez",
    bloodType: "B+",
    unitsNeeded: 3,
    urgency: "medium",
    hospitalName: "Regional Health Center",
    hospitalAddress: "300 Health St, City, State 12345",
    doctorName: "Dr. William Chen",
    doctorPhone: "555-0203",
    reason: "Cancer treatment - chemotherapy support",
    status: "pending",
  },
  {
    requesterName: "Dr. Amanda Taylor",
    requesterEmail: "amanda.taylor@hospital.com",
    requesterPhone: "555-0204",
    patientName: "James Wilson",
    bloodType: "AB+",
    unitsNeeded: 1,
    urgency: "low",
    hospitalName: "Community Hospital",
    hospitalAddress: "400 Community Ave, City, State 12345",
    doctorName: "Dr. Amanda Taylor",
    doctorPhone: "555-0204",
    reason: "Elective surgery - anemia",
    status: "fulfilled",
  },
  {
    requesterName: "Dr. Christopher Brown",
    requesterEmail: "christopher.brown@hospital.com",
    requesterPhone: "555-0205",
    patientName: "Anna Johnson",
    bloodType: "O+",
    unitsNeeded: 2,
    urgency: "high",
    hospitalName: "Emergency Medical Services",
    hospitalAddress: "500 Emergency Rd, City, State 12345",
    doctorName: "Dr. Christopher Brown",
    doctorPhone: "555-0205",
    reason: "Accident victim - multiple injuries",
    status: "pending",
  },
];

const sampleBloodCenters = [
  {
    name: "Central Blood Bank",
    location: "Downtown",
    address: "100 Main St, City, State 12345",
    phone: "555-0301",
    email: "central@bloodbank.com",
    bloodStock: {
      "A+": 15,
      "A-": 8,
      "B+": 12,
      "B-": 5,
      "AB+": 3,
      "AB-": 2,
      "O+": 20,
      "O-": 7,
    },
    operatingHours: {
      monday: { open: "8:00 AM", close: "6:00 PM" },
      tuesday: { open: "8:00 AM", close: "6:00 PM" },
      wednesday: { open: "8:00 AM", close: "6:00 PM" },
      thursday: { open: "8:00 AM", close: "6:00 PM" },
      friday: { open: "8:00 AM", close: "6:00 PM" },
      saturday: { open: "9:00 AM", close: "4:00 PM" },
      sunday: { open: "Closed", close: "Closed" },
    },
  },
  {
    name: "Northside Blood Center",
    location: "North District",
    address: "200 North Ave, City, State 12345",
    phone: "555-0302",
    email: "northside@bloodbank.com",
    bloodStock: {
      "A+": 10,
      "A-": 6,
      "B+": 8,
      "B-": 4,
      "AB+": 2,
      "AB-": 1,
      "O+": 18,
      "O-": 5,
    },
    operatingHours: {
      monday: { open: "7:00 AM", close: "7:00 PM" },
      tuesday: { open: "7:00 AM", close: "7:00 PM" },
      wednesday: { open: "7:00 AM", close: "7:00 PM" },
      thursday: { open: "7:00 AM", close: "7:00 PM" },
      friday: { open: "7:00 AM", close: "7:00 PM" },
      saturday: { open: "8:00 AM", close: "5:00 PM" },
      sunday: { open: "9:00 AM", close: "2:00 PM" },
    },
  },
  {
    name: "South Medical Center",
    location: "South District",
    address: "300 South Blvd, City, State 12345",
    phone: "555-0303",
    email: "south@bloodbank.com",
    bloodStock: {
      "A+": 22,
      "A-": 9,
      "B+": 14,
      "B-": 6,
      "AB+": 4,
      "AB-": 3,
      "O+": 25,
      "O-": 8,
    },
    operatingHours: {
      monday: { open: "8:00 AM", close: "8:00 PM" },
      tuesday: { open: "8:00 AM", close: "8:00 PM" },
      wednesday: { open: "8:00 AM", close: "8:00 PM" },
      thursday: { open: "8:00 AM", close: "8:00 PM" },
      friday: { open: "8:00 AM", close: "8:00 PM" },
      saturday: { open: "9:00 AM", close: "5:00 PM" },
      sunday: { open: "10:00 AM", close: "3:00 PM" },
    },
  },
  {
    name: "Eastside Hospital Blood Bank",
    location: "East District",
    address: "400 East St, City, State 12345",
    phone: "555-0304",
    email: "eastside@bloodbank.com",
    bloodStock: {
      "A+": 18,
      "A-": 7,
      "B+": 11,
      "B-": 4,
      "AB+": 5,
      "AB-": 2,
      "O+": 22,
      "O-": 6,
    },
    operatingHours: {
      monday: { open: "7:30 AM", close: "7:30 PM" },
      tuesday: { open: "7:30 AM", close: "7:30 PM" },
      wednesday: { open: "7:30 AM", close: "7:30 PM" },
      thursday: { open: "7:30 AM", close: "7:30 PM" },
      friday: { open: "7:30 AM", close: "7:30 PM" },
      saturday: { open: "8:30 AM", close: "4:30 PM" },
      sunday: { open: "Closed", close: "Closed" },
    },
  },
  {
    name: "West Regional Blood Center",
    location: "West District",
    address: "500 West Ave, City, State 12345",
    phone: "555-0305",
    email: "west@bloodbank.com",
    bloodStock: {
      "A+": 16,
      "A-": 8,
      "B+": 13,
      "B-": 5,
      "AB+": 3,
      "AB-": 2,
      "O+": 19,
      "O-": 7,
    },
    operatingHours: {
      monday: { open: "8:00 AM", close: "6:00 PM" },
      tuesday: { open: "8:00 AM", close: "6:00 PM" },
      wednesday: { open: "8:00 AM", close: "6:00 PM" },
      thursday: { open: "8:00 AM", close: "6:00 PM" },
      friday: { open: "8:00 AM", close: "6:00 PM" },
      saturday: { open: "9:00 AM", close: "4:00 PM" },
      sunday: { open: "10:00 AM", close: "2:00 PM" },
    },
  },
  {
    name: "Metro Blood Services",
    location: "Metro Area",
    address: "600 Metro Plaza, City, State 12345",
    phone: "555-0306",
    email: "metro@bloodbank.com",
    bloodStock: {
      "A+": 20,
      "A-": 10,
      "B+": 15,
      "B-": 7,
      "AB+": 4,
      "AB-": 3,
      "O+": 24,
      "O-": 9,
    },
    operatingHours: {
      monday: { open: "6:00 AM", close: "8:00 PM" },
      tuesday: { open: "6:00 AM", close: "8:00 PM" },
      wednesday: { open: "6:00 AM", close: "8:00 PM" },
      thursday: { open: "6:00 AM", close: "8:00 PM" },
      friday: { open: "6:00 AM", close: "8:00 PM" },
      saturday: { open: "7:00 AM", close: "6:00 PM" },
      sunday: { open: "8:00 AM", close: "4:00 PM" },
    },
  },
  {
    name: "Community Blood Drive Center",
    location: "Community Center",
    address: "700 Community Rd, City, State 12345",
    phone: "555-0307",
    email: "community@bloodbank.com",
    bloodStock: {
      "A+": 12,
      "A-": 5,
      "B+": 9,
      "B-": 3,
      "AB+": 2,
      "AB-": 1,
      "O+": 16,
      "O-": 4,
    },
    operatingHours: {
      monday: { open: "9:00 AM", close: "5:00 PM" },
      tuesday: { open: "9:00 AM", close: "5:00 PM" },
      wednesday: { open: "9:00 AM", close: "5:00 PM" },
      thursday: { open: "9:00 AM", close: "5:00 PM" },
      friday: { open: "9:00 AM", close: "5:00 PM" },
      saturday: { open: "10:00 AM", close: "3:00 PM" },
      sunday: { open: "Closed", close: "Closed" },
    },
  },
  {
    name: "University Medical Blood Bank",
    location: "University Campus",
    address: "800 University Dr, City, State 12345",
    phone: "555-0308",
    email: "university@bloodbank.com",
    bloodStock: {
      "A+": 14,
      "A-": 6,
      "B+": 10,
      "B-": 4,
      "AB+": 3,
      "AB-": 2,
      "O+": 17,
      "O-": 5,
    },
    operatingHours: {
      monday: { open: "8:00 AM", close: "6:00 PM" },
      tuesday: { open: "8:00 AM", close: "6:00 PM" },
      wednesday: { open: "8:00 AM", close: "6:00 PM" },
      thursday: { open: "8:00 AM", close: "6:00 PM" },
      friday: { open: "8:00 AM", close: "6:00 PM" },
      saturday: { open: "Closed", close: "Closed" },
      sunday: { open: "Closed", close: "Closed" },
    },
  },
  {
    name: "Emergency Blood Reserve",
    location: "Emergency District",
    address: "900 Emergency Way, City, State 12345",
    phone: "555-0309",
    email: "emergency@bloodbank.com",
    bloodStock: {
      "A+": 25,
      "A-": 12,
      "B+": 18,
      "B-": 8,
      "AB+": 6,
      "AB-": 4,
      "O+": 30,
      "O-": 10,
    },
    operatingHours: {
      monday: { open: "24/7", close: "24/7" },
      tuesday: { open: "24/7", close: "24/7" },
      wednesday: { open: "24/7", close: "24/7" },
      thursday: { open: "24/7", close: "24/7" },
      friday: { open: "24/7", close: "24/7" },
      saturday: { open: "24/7", close: "24/7" },
      sunday: { open: "24/7", close: "24/7" },
    },
  },
  {
    name: "Pediatric Blood Center",
    location: "Children's Hospital",
    address: "1000 Kids Ave, City, State 12345",
    phone: "555-0310",
    email: "pediatric@bloodbank.com",
    bloodStock: {
      "A+": 8,
      "A-": 4,
      "B+": 6,
      "B-": 2,
      "AB+": 1,
      "AB-": 1,
      "O+": 12,
      "O-": 3,
    },
    operatingHours: {
      monday: { open: "7:00 AM", close: "9:00 PM" },
      tuesday: { open: "7:00 AM", close: "9:00 PM" },
      wednesday: { open: "7:00 AM", close: "9:00 PM" },
      thursday: { open: "7:00 AM", close: "9:00 PM" },
      friday: { open: "7:00 AM", close: "9:00 PM" },
      saturday: { open: "8:00 AM", close: "8:00 PM" },
      sunday: { open: "9:00 AM", close: "6:00 PM" },
    },
  },
  {
    name: "Rural Blood Collection Point",
    location: "Rural Area",
    address: "1100 Rural Route, City, State 12345",
    phone: "555-0311",
    email: "rural@bloodbank.com",
    bloodStock: {
      "A+": 11,
      "A-": 5,
      "B+": 7,
      "B-": 3,
      "AB+": 2,
      "AB-": 1,
      "O+": 15,
      "O-": 4,
    },
    operatingHours: {
      monday: { open: "10:00 AM", close: "4:00 PM" },
      tuesday: { open: "10:00 AM", close: "4:00 PM" },
      wednesday: { open: "10:00 AM", close: "4:00 PM" },
      thursday: { open: "10:00 AM", close: "4:00 PM" },
      friday: { open: "10:00 AM", close: "4:00 PM" },
      saturday: { open: "11:00 AM", close: "3:00 PM" },
      sunday: { open: "Closed", close: "Closed" },
    },
  },
  {
    name: "Mobile Blood Unit Station",
    location: "Mobile Unit",
    address: "1200 Mobile St, City, State 12345",
    phone: "555-0312",
    email: "mobile@bloodbank.com",
    bloodStock: {
      "A+": 9,
      "A-": 4,
      "B+": 7,
      "B-": 3,
      "AB+": 2,
      "AB-": 1,
      "O+": 13,
      "O-": 4,
    },
    operatingHours: {
      monday: { open: "Variable", close: "Variable" },
      tuesday: { open: "Variable", close: "Variable" },
      wednesday: { open: "Variable", close: "Variable" },
      thursday: { open: "Variable", close: "Variable" },
      friday: { open: "Variable", close: "Variable" },
      saturday: { open: "Variable", close: "Variable" },
      sunday: { open: "Variable", close: "Variable" },
    },
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      "mongodb+srv://praneethp227:12345@cluster0.fkhlcjn.mongodb.net/bloodbank?retryWrites=true&w=majority",
      {
        ssl: true,
        tlsAllowInvalidCertificates: true,
        tlsAllowInvalidHostnames: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      }
    );

    console.log("Connected to MongoDB");

    // Clear existing data
    await Donation.deleteMany({});
    await BloodRequest.deleteMany({});
    await BloodCenter.deleteMany({});

    console.log("Cleared existing data");

    // Create blood centers first (needed for donations)
    const centers = await BloodCenter.insertMany(sampleBloodCenters);
    console.log(`Created ${centers.length} blood centers`);

    // Add blood center references to donations
    const donationsWithCenters = sampleDonations.map((donation, index) => ({
      ...donation,
      bloodCenter: centers[index % centers.length]._id,
    }));

    // Create donations
    const donations = await Donation.insertMany(donationsWithCenters);
    console.log(`Created ${donations.length} donations`);

    // Add blood center references to requests
    const requestsWithCenters = sampleBloodRequests.map((request, index) => ({
      ...request,
      assignedCenter: centers[index % centers.length]._id,
    }));

    // Create blood requests
    const requests = await BloodRequest.insertMany(requestsWithCenters);
    console.log(`Created ${requests.length} blood requests`);

    console.log("Database seeded successfully!");
    console.log(`- ${donations.length} donations`);
    console.log(`- ${requests.length} blood requests`);
    console.log(`- ${centers.length} blood centers`);
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
}

// Run the seed function
seedDatabase();
