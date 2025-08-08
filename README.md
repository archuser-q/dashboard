# Dashboard - TanStack Router + TanStack Query

Complete guide for setting up and running a dashboard web application using TanStack Router and TanStack Query.

## 🔧 System Requirements

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0
- **Git**

## 📥 Step 1: Clone Repository

```bash
# Clone repository from GitHub
git clone https://github.com/archuser-q/dashboard.git

# Navigate to project directory
cd dashboard
```

## 📦 Step 2: Install Dependencies

```bash
# Install all dependencies
npm install

# Or install specific TanStack packages
npm install @tanstack/react-router @tanstack/react-query
npm install @tanstack/router-devtools @tanstack/react-query-devtools --save-dev
```

## 🚀 Step 3: Run Application

### Development mode:
```bash
# Start development server
npm run dev
```

**Application will run at:** `http://localhost:3000`

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | 🔥 Start development server |
| `npm run build` | 📦 Build for production |
| `npm run preview` | 👀 Preview production build |
| `npm run lint` | 🔍 Lint code |
| `npm run format` | ✨ Format code |
| `npm run test` | 🧪 Run tests |

## 🏗️ Getting Started

Once you've completed the installation steps above, you can start developing:

1. **Development Server**: Run `npm run dev` to start the development server
2. **Open Browser**: Navigate to `http://localhost:3000`
3. **Start Coding**: Edit files in the `src/` directory
4. **Hot Reload**: Changes will automatically reload in the browser

## 📁 Project Structure

```
dashboard/
├── src/
│   ├── components/      # Reusable UI components
│   ├── routes/         # TanStack Router routes
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API services with TanStack Query
│   ├── utils/          # Helper functions
│   ├── types/          # TypeScript type definitions
│   └── main.tsx        # Application entry point
├── public/             # Static assets
├── package.json        # Dependencies and scripts
└── README.md          # This file
```

## 🛠️ Technologies Used

- **[TanStack Router](https://tanstack.com/router)** - Type-safe router for React
- **[TanStack Query](https://tanstack.com/query)** - Powerful data synchronization for React
- **[React](https://reactjs.org/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite](https://vitejs.dev/)** - Fast build tool

## 💡 Quick Examples

### TanStack Router Setup:

```typescript
// routes/__root.tsx
import { createRootRoute } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
        <Outlet />
      </div>
    </QueryClientProvider>
  )
})
```

## TanStack Query Usage

Example TanStack Query usage:

```typescript
import { useQuery } from '@tanstack/react-query'

function UserProfile({ userId }: { userId: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return <div>Welcome {data.name}!</div>
}
```

## Troubleshooting

### Common Issues:

1. **Port already in use:**
   ```bash
   Error: listen EADDRINUSE: address already in use :::5173
   ```
   Solution: Change port in `vite.config.ts` or kill the process using the port.

2. **Incompatible Node version:**
   ```bash
   npm ERR! engine Unsupported engine
   ```
   Solution: Update Node.js to version >= 18.0.0

3. **Module not found:**
   ```bash
   Cannot resolve module '@tanstack/react-router'
   ```
   Solution: Delete `node_modules` and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

## Development Tools

- **TanStack Router Devtools**: Automatically displays in development mode
- **TanStack Query Devtools**: Debug queries and mutations
- **TypeScript**: Type checking
- **ESLint**: Code linting
- **Prettier**: Code formatting

## Deployment

### Vercel:
```bash
npm run build
vercel --prod
```

### Netlify:
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Docker:
```bash
# Build Docker image
docker build -t tanstack-app .

# Run container
docker run -p 3000:3000 tanstack-app
```

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Create a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- [TanStack Router Documentation](https://tanstack.com/router)
- [TanStack Query Documentation](https://tanstack.com/query)
- [GitHub Issues](https://github.com/username/your-tanstack-app/issues)

---

**Happy coding!** 🚀