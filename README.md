**How to Run the Project Locally**
This project consists of two parts:

Backend (API) – located in ETechWebShop/api

Frontend (Client) – located in ETechWebShop/client

**Prerequisites**
Make sure you have installed:

.NET 6+ SDK

Node.js + npm

**Steps to Run the Application**
Clone the Repository:

```
git clone https://github.com/bociwess0/ETechWebShop.git
cd ETechWebShop
```

Start the Backend (Swagger-enabled API):

```
cd api
dotnet watch
```
Start the Frontend (React App):

Open a new terminal window/tab:

```
cd client
npm install
npm start
```

**After both servers are running:**

API Swagger will be available at: https://localhost:<your-port>/swagger

React App will run at: http://localhost:3000
