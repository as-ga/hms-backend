# Hospital Management System (HMS) Backend

This is the backend component of the Hospital Management System (HMS), designed to handle the server-side operations and data management for the system.

## Features

- **User Management**: Allows registration, login, and management of different types of users such as administrators, doctors, nurses, and patients.
- **Appointment Management**: Facilitates scheduling, updating, and canceling appointments between patients and doctors.
- **Patient Records**: Manages patient records including medical history, prescriptions, lab results, and other relevant information.
- **Inventory Management**: Tracks and manages hospital inventory including medicines, medical equipment, and supplies.
- **Billing and Payments**: Handles billing generation, payment processing, and invoice management for services rendered.
- **Reporting**: Generates various reports such as patient statistics, revenue reports, and inventory status for administrative purposes.
- **Security**: Implements authentication, authorization, and encryption mechanisms to ensure data security and privacy.

- **GraphQL API**: Provides a GraphQL API for flexible data querying and manipulation.
- **Database**: Uses PostgreSQL as the database management system.
- **ORM**: Utilizes Prisma as the ORM for database interaction, providing a type-safe query builder.

## Technologies Used

- **TypeScript**: Typed superset of JavaScript for enhanced development experience and code quality.
- **Node.js**: JavaScript runtime for building scalable and efficient server-side applications.
- **Express.js**: Web application framework for Node.js, providing robust routing and middleware capabilities.
- **PostgreSQL**: Powerful open-source relational database management system.
- **GraphQL**: Query language and runtime for APIs, providing a more efficient and powerful alternative to REST.
- **Prisma**: Modern database toolkit and ORM for TypeScript and Node.js, enabling type-safe database access.
- **JWT**: JSON Web Tokens for secure user authentication and authorization.
- **API Documentation**: Postman
- **Other Dependencies**: Additional libraries and packages used for specific functionalities.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- PostgreSQL database instance running locally or accessible via connection string.

### Installation

1. **Clone the repository**:

   ```bash
   git https://github.com/as-ga/hms-backend
   cd hms-backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**: 
- Create a `.env` file in the root directory and define the following variables:

    ```bash
    PORT=3000
    DATABASE_URL=your_postgres_database_url
    JWT_SECRET=your_jwt_secret 
    ```

4. **Run the application**:

   ```bash
   npm run dev
   ```



## Author

- [Ashutosh Gaurav](https://www.linkedin.com/in/ashutosh-li/)
## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.
