# CrediKhaata - Digital Loan Ledger

A modern web application for small shopkeepers to manage customer credits digitally. CrediKhaata helps shopkeepers track credit sales, record repayments, and manage customer dues efficiently through an intuitive dashboard.

## Features

- 🔐 Secure Authentication
  - User registration and login
  - Persistent login state
  - Form validation

- 👥 Customer Management
  - Add and manage customer profiles
  - View customer credit history
  - Track outstanding balances

- 💰 Loan Management
  - Record new credit sales
  - Track due dates
  - Monitor overdue payments
  - Calculate outstanding balances

- 💳 Repayment Tracking
  - Record customer repayments
  - View repayment history
  - Track partial payments

- 📊 Dashboard
  - Overview of all customers
  - Quick status indicators
  - Outstanding amount summaries
  - Overdue payment alerts

- 🎨 User Interface
  - Responsive design for all devices
  - Dark/Light theme support
  - Clean and intuitive interface
  - Toast notifications for actions

## Tech Stack

- React.js (Frontend Framework)
- React Router (Navigation)
- React Hook Form (Form Management)
- CSS Modules (Styling)
- LocalStorage (Data Persistence)
- React Context API (State Management)

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/credi-khaata.git
   cd credi-khaata
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # React components
├── context/            # Context providers
├── styles/             # CSS modules
├── App.js              # Main app component
└── index.js            # Entry point
```

## Design Decisions

1. **State Management**
   - Used React Context API for global state management
   - Implemented customer context for managing customer data
   - Local storage for data persistence

2. **Component Architecture**
   - Modular component design
   - Reusable form components
   - Shared styling through CSS modules

3. **Form Validation**
   - Client-side validation using react-hook-form
   - Comprehensive error messages
   - Real-time validation feedback

4. **User Experience**
   - Modal forms for quick actions
   - Toast notifications for feedback
   - Responsive design for all screen sizes
   - Dark/Light theme support

5. **Data Structure**
   ```javascript
   Customer {
     id: number
     name: string
     phone: string
     loans: Loan[]
   }

   Loan {
     id: number
     amount: number
     dueDate: string
     item: string
     repayments: Repayment[]
   }

   Repayment {
     id: number
     amount: number
     date: string
   }
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Design inspired by modern financial applications
- Built as part of a coding assignment
