# Rule Engine

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Overview

The **Rule Engine** is a web application that allows users to create, combine, and evaluate business rules using a simple and intuitive interface. Users can define rules using a straightforward syntax, combine multiple rules, and evaluate them against given data.

## Features

- **Create Rule**: Define business rules using a custom syntax.
- **Combine Rules**: Combine multiple rules using logical operators (AND, OR).
- **Evaluate Rules**: Evaluate combined rules against provided data.
- **User-Friendly UI**: A modern, responsive interface with a dark theme and glassy card design.

## Technologies Used

- **Frontend**: React.js, Axios
- **Backend**: Node.js, Express.js
- **Database**: In-memory storage (for simplicity, replace with a database in production)
- **Styling**: CSS with Flexbox for layout and glassy card design

## Project Structure

rule-engine/
├── api/ # Backend code │
    ├── controllers/ # Controllers for handling requests │
    ├── models/ # Data models (AST) │ 
    ├── routes/ # API routes │ 
    └── index.js # Server entry point 
├── ui/ # Frontend code │ 
    ├── src/ │
        ├── api.js # API service calls │ │   
        ├── App.js # Main React component │ 
        └── App.css # Styles for the React app └── README.md


## Setup Instructions

### Prerequisites

- Node.js (version 14 or above)
- npm (Node Package Manager)

### Step-by-Step Setup

1. **Clone the repository**:
   ```bash
   git clone <https://github.com/Hamza1821/RuleEngine.git>
   cd RuleEngine
   ```
2. **Install dependencies for the backend**:
    ```bash
    cd api
    npm install
    ```
3.  **Install dependencies for the frontend**:
    ```bash
    cd ../ui
    npm install
    ```
4.  **Start the Backend**:
    ```bash
    cd api
    npm run dev
    ```
    **The backend server will run at http://localhost:3000.**

5.  **Start the Frontend**:
    ```bash
    cd ui
    npm run dev
    ```
    **The frontend application will run at http://localhost:5173.**



