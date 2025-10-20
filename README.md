# Corelia - Contact Management Application

A modern, production-ready contact management application built with React, TypeScript, and Redux Toolkit.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Visit http://localhost:5173 to see the app.

## ✨ Features

- ✅ User Registration & Authentication
- ✅ Contact CRUD Operations (Create, Read, Update, Delete)
- ✅ Form Validation (Email, Phone, Password)
- ✅ Sorting by Name (Ascending/Descending)
- ✅ Pagination (10 contacts per page)
- ✅ Responsive Design (Mobile, Tablet, Desktop)
- ✅ Data Persistence (LocalStorage)
- ✅ Type-Safe with TypeScript
- ✅ Redux Toolkit State Management

## 📦 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Zod** - Schema validation
- **TailwindCSS 4** - Styling
- **Vite** - Build tool & dev server

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Button, Input, Modal, etc.
│   ├── contacts/       # Contact-specific components
│   └── layout/         # Header, PageLayout
│
├── pages/              # Page components
│   ├── Register.tsx
│   ├── Login.tsx
│   └── Contacts.tsx
│
├── store/              # Redux store & slices
│   ├── index.ts        # Store configuration
│   ├── hooks.ts        # Typed Redux hooks
│   ├── authSlice.ts    # Authentication state
│   └── contactsSlice.ts # Contacts state
│
├── hooks/              # Custom React hooks
│   ├── usePagination.ts
│   └── useSorting.ts
│
├── utils/              # Utility functions
│   ├── validation.ts   # Zod schemas
│   └── storage.ts      # LocalStorage helpers
│
├── types/              # TypeScript types
│   └── index.ts
│
├── App.tsx             # Main app with routing
├── main.tsx            # App entry point
└── index.css           # Global styles
```

## 🎯 Key Features

### Authentication
- Register with unique email validation
- Login with "Remember me" functionality
- Persistent sessions via localStorage

### Contact Management
- Add contacts with phone validation
- Edit existing contacts
- Delete with confirmation dialog
- Sort by name (A-Z / Z-A)
- Pagination (10 per page)
- Per-user contact isolation

### Data Persistence
- Auto-save to localStorage
- Survives page refresh
- Namespace isolation (`corelia_auth`, `corelia_contacts`)

## 📱 Usage

1. **Register** - Create account with name, email, password
2. **Login** - Sign in with credentials (check "Remember me" to stay logged in)
3. **Add Contact** - Click "Add Contact" button, enter name and phone
4. **Edit Contact** - Click edit icon on any contact
5. **Delete Contact** - Click delete icon (with confirmation)
6. **Sort** - Click "Sort by Name" to toggle order
7. **Navigate** - Use pagination controls for multiple pages

## 🔒 Security Notes

⚠️ **For Demo Purposes Only**
- Passwords stored in plain text in localStorage
- No encryption
- Client-side validation only

**For Production:**
- Never store passwords client-side
- Implement proper backend authentication
- Use JWT tokens
- Add HTTPS, CSRF protection, rate limiting

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Docker
```bash
docker build -t corelia-contacts .
docker run -p 80:80 corelia-contacts
```

### Build Settings
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

## 🧪 Validation Rules

### User Registration
- **Name**: 3-100 characters
- **Email**: Valid email format, must be unique
- **Password**: 6-128 characters

### Contacts
- **Name**: 1-100 characters, required
- **Phone**: 7-15 digits, optional + prefix

## 🎨 UI/UX

- **Design**: Modern, clean interface with Teal/Violet theme
- **Responsive**: Mobile-first approach, works on all devices
- **Accessible**: ARIA labels, keyboard navigation
- **Loading States**: Visual feedback on actions
- **Error Handling**: Clear, user-friendly error messages

## 📊 State Management

### Redux Store Structure
```typescript
{
  auth: {
    users: User[]              // All registered users
    currentUserId: string | null // Currently logged-in user
    remember: boolean          // Remember me preference
  },
  contacts: {
    byUserId: {
      [userId]: Contact[]      // Contacts grouped by user
    }
  }
}
```

## 🔧 Development

### Available Scripts
```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 📝 Code Quality

- **TypeScript**: Strict mode, full type coverage
- **ESLint**: Zero linting errors
- **Clean Code**: DRY principles, clear naming
- **Maintainable**: Well-organized, documented

## 🚀 Performance

- **Bundle Size**: ~315KB JS (98KB gzipped)
- **Fast Build**: Vite with HMR
- **Optimized**: Memoization, code splitting ready

## 📚 Documentation

All code is documented with inline comments explaining:
- Component purpose and usage
- Function parameters and return values
- Complex logic and business rules

## 🐛 Troubleshooting

### Port Already in Use
```bash
npx kill-port 5173
npm run dev
```

### Dependencies Not Installing
```bash
rm -rf node_modules package-lock.json
npm install
```

### Lost Data
- Data is stored in localStorage
- Check browser settings (ensure cookies/storage enabled)
- Incognito mode clears data on close

## 🎓 Learning Points

This project demonstrates:
- Modern React patterns (hooks, functional components)
- Redux Toolkit best practices
- TypeScript for type safety
- Form validation with Zod
- Responsive design with TailwindCSS
- Client-side routing with React Router
- LocalStorage for persistence

## 📄 License

This project is created as a technical assessment for Corelia (A RICOH Company).

## 👨‍💻 Development Notes

- **No Backend**: All data persisted in localStorage
- **Production Ready**: Error handling, validation, accessibility
- **Scalable**: Easy to add new features
- **Maintainable**: Clear structure, consistent patterns
- **Performant**: Optimized renders, efficient state updates

---

**Built with ❤️ for Corelia Task**
