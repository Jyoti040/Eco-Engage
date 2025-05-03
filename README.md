## EcoEngage

![alt text](client/src/assets/main-page.png)

A MERN stack application connecting organisations and individuals for environment initiatives.

## Features

- **Authentication** using JWT based token authentication
- **Responsive** UI design
- **Seperate** dashboards for organisations for event management

## Technologies Used

**Frontend** - ReactJS , Axios , Tailwind CSS
 
**Backend** - NodeJS , ExpressJS , MongoDB , Multer , Nodemailer ,Cloudinary

## Getting Started

### Environment Variables

Create a .env file in both frontend and backend

#### Backend .env 

   ```
PORT = 5000
MONGO_URI = MONGO_URI=your_mongo_connection_string
JWT_SECRET = your_jwt_secret
JWT_LIFETIME = your_jwt_lifetime
FORGET_PASSWORD_JWT_LIFETIME = your_jwt_forget_password_lifetime
CORS_ORIGIN = frontend_url
CLOUDINARY_CLOUD_NAME = your_cloudinary_name
CLOUDINARY_API_KEY = your_cloudinary_api_key
CLOUDINARY_API_SECRET = your_cloudinary_secret
EMAIL_HOST = your_email_host
EMAIL_SERVICE = gmail
EMAIL_USER = your_sender_email_address
EMAIL_PASS = your_email_password
   ```

#### Frontend .env 

   ```
   VITE_SERVER = your_backend_url
   ```

### Installation

1. Clone the repository
   ```
   git clone https://github.com/your_github_username/EcoEngage.git
   ```

2. Install backend dependencies and start backend

   ```
   cd server
   npm install
   npm run dev
   ```

3. Install frontend dependencies and start frontend

   ```
   cd client
   npm install
   npm run dev
   ```




