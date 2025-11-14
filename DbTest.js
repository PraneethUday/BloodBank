const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://praneethp227:12345@cluster0.fkhlcjn.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const database = client.db("bloodbankDB");  // your DB name
    const users = database.collection("donors"); // your collection name

    const sampleDonors = [
      {
        name: "Arjun Kumar",
        age: 28,
        bloodGroup: "O+",
        phone: "9876543210",
        location: "Bangalore"
      },
      {
        name: "Rohit Sharma",
        age: 32,
        bloodGroup: "A+",
        phone: "9123456780",
        location: "Chennai"
      },
      {
        name: "Sita Devi",
        age: 24,
        bloodGroup: "B-",
        phone: "9012345678",
        location: "Hyderabad"
      }
    ];

    const result = await users.insertMany(sampleDonors);
    console.log(`${result.insertedCount} sample donors added successfully!`);

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

run();
