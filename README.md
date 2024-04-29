# LakeSite.com

Welcome to LakeSite.com! This is a full-stack web application designed to provide users with a platform to explore and make reservations at various lakes in Albania. Whether you're an outdoor enthusiast or someone looking to connect with nature, LakeSite.com offers an opportunity to discover the beauty of Albania's lakes while engaging in recreational activities and social interactions.

## Features

- **User Registration and Authentication**: Users can create an account and log in securely to access the website's features.
- **Explore Lakes**: Browse through a curated list of lakes in Albania, each with detailed descriptions and location information.
- **Make Reservations**: Reserve a spot at your favorite lake for a day of fun activities, such as swimming, boating, or picnicking.
- **Connect with Others**: Meet like-minded individuals who share your passion for outdoor adventures and recreational sports.
- **Responsive Design**: Enjoy a seamless experience across desktop, tablet, and mobile devices.

## Technologies Used

- **Backend**: Node.js with Express.js framework for server-side development.
- **Frontend**: React.js for building the user interface.
- **Database**: MySQL for storing user data, lake information, and reservations.
- **Authentication**: JSON Web Tokens (JWT) for user authentication and authorization.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- Node.js and npm (or yarn)
- MySQL database server

### Installation

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/your-username/LakeSite.git
    cd LakeSite
    ```

2. **Install Backend Dependencies**:

    ```bash
    cd backend
    npm install
    ```

3. **Configure the Database**:

   - Create a MySQL database named `LakeSite`.
   - Import the provided SQL schema file (`lakesite.sql`) to create the necessary tables.
   - Update the database configuration in `config/database.js` if necessary.

4. **Start the Backend Server**:

    ```bash
    npm start
    ```

5. **Install Frontend Dependencies**:

    ```bash
    cd ../frontend
    npm install
    ```

6. **Start the Frontend Development Server**:

    ```bash
    npm start
    ```

7. **Access the Application**:

    Open your web browser and navigate to `http://localhost:3000` to access LakeSite.com.

## Contributing

Contributions are welcome! If you have any suggestions, feature requests, or bug reports, please submit them via GitHub issues or create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
