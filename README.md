# BloodBank Project

## Folders

- server → Express backend
- client → React frontend
- public → shared images/uploads

## How It Works

The BloodBank application is a comprehensive blood donation and request management system built with React frontend and Express.js backend. Here's an overview of its key functionalities:

### User Registration and Authentication

- Users can sign up and log in to access the platform
- Secure JWT-based authentication system
- Role-based access (regular users and admins)

### Blood Donation Process

1. **Donation Form**: Authenticated users can fill out a donation form with personal details, blood type, and preferred blood center
2. **Ticket Generation**: Upon submission, a unique ticket ID (format: DON-XXXXXX) is automatically generated
3. **Ticket Modal**: A success modal displays the ticket details immediately after submission
4. **Ticket Management**: Users can view, download, and print their donation tickets
5. **History Tracking**: All past donations are stored and accessible in the "My Donation Tickets" section

### Blood Request Process

1. **Request Form**: Users can submit blood requests specifying blood type, quantity, urgency, and hospital details
2. **Ticket Generation**: Each request gets a unique ticket ID (format: REQ-XXXXXX)
3. **Immediate Feedback**: Ticket details are shown in a modal after submission
4. **Request Tracking**: Users can monitor their requests through the "My Blood Request Tickets" section
5. **Download/Print**: Tickets can be downloaded as HTML files or printed directly

### Admin Dashboard

- **Donation Management**: Admins can view and manage all blood donations
- **Request Oversight**: Monitor and process blood requests
- **Blood Center Management**: Add and manage blood donation centers
- **Activity Logging**: Track system activities for auditing purposes

### Key Features

- **Real-time Ticket Generation**: Unique, random ticket IDs for all transactions
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Data Persistence**: All data stored securely in MongoDB
- **Security**: Helmet.js for security headers, CORS enabled
- **Activity Monitoring**: Comprehensive logging of user actions

### Technical Stack

- **Frontend**: React.js with modern hooks and routing
- **Backend**: Node.js with Express.js framework
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens
- **Styling**: Custom CSS with animations

The application ensures a smooth experience for both donors and those in need of blood, with robust tracking and management capabilities for administrators.
