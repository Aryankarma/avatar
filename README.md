# Avatar Generator

A Next.js application that generates unique, deterministic SVG avatars from email addresses. Each email address produces a consistent avatar with initials and colorful patterns.

This project includes:
- 🌐 **Web Application** - Full-featured Next.js app with UI
- 🔌 **REST API** - HTTP endpoint for generating avatars
- 📦 **React Package** - Reusable React component (`@avatar-generator/react`)

## Features

- 🎨 Generate unique avatars from email addresses
- 🔄 Deterministic generation (same email = same avatar)
- 📐 Customizable avatar size (50-1000px)
- 💾 Download avatars as SVG files
- 🌐 RESTful API for programmatic access
- 📦 NPM package for React applications
- 🎯 Responsive design with dark mode support

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd avatar
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Documentation

### Generate Avatar

Generate an SVG avatar from an email address.

**Endpoint:** `GET /api/avatar`

**Query Parameters:**

| Parameter | Type   | Required | Default | Description                          |
|-----------|--------|----------|---------|--------------------------------------|
| `email`   | string | Yes      | -       | Email address to generate avatar for |
| `size`    | number | No       | 200     | Avatar size in pixels (50-1000)     |

**Response:**

- **Success (200):** Returns SVG image with `Content-Type: image/svg+xml`
- **Error (400):** Returns JSON error message for invalid parameters
- **Error (500):** Returns JSON error message for server errors

**Example Requests:**

```bash
# Basic request
curl "http://localhost:3000/api/avatar?email=john.doe@example.com"

# With custom size
curl "http://localhost:3000/api/avatar?email=john.doe@example.com&size=400"

# Using fetch in JavaScript
fetch('http://localhost:3000/api/avatar?email=john.doe@example.com&size=300')
  .then(response => response.text())
  .then(svg => console.log(svg));

# Using in HTML img tag
<img src="http://localhost:3000/api/avatar?email=user@example.com&size=200" alt="Avatar" />
```

**Example Response (SVG):**

```svg
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="hsl(123, 70%, 45%)"/>
  <circle cx="45" cy="67" r="32" fill="hsl(223, 80%, 90%)" opacity="0.3"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="80" font-weight="bold" fill="hsl(223, 80%, 90%)" text-anchor="middle" dominant-baseline="central">JD</text>
</svg>
```

**Error Responses:**

```json
// Missing email parameter
{
  "error": "Email parameter is required"
}

// Invalid email format
{
  "error": "Invalid email format"
}

// Invalid size
{
  "error": "Size must be between 50 and 1000"
}

// Server error
{
  "error": "Failed to generate avatar"
}
```

**Usage Examples:**

### In a React Component

```tsx
function UserAvatar({ email, size = 200 }: { email: string; size?: number }) {
  const avatarUrl = `/api/avatar?email=${encodeURIComponent(email)}&size=${size}`;
  
  return (
    <img 
      src={avatarUrl} 
      alt={`Avatar for ${email}`}
      width={size}
      height={size}
    />
  );
}
```

### In HTML

```html
<img 
  src="http://localhost:3000/api/avatar?email=user@example.com&size=150" 
  alt="User Avatar"
/>
```

### In CSS Background

```css
.avatar {
  background-image: url('/api/avatar?email=user@example.com&size=100');
  background-size: cover;
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
```

### Using fetch API

```javascript
async function getAvatarSVG(email, size = 200) {
  const response = await fetch(
    `/api/avatar?email=${encodeURIComponent(email)}&size=${size}`
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }
  
  return await response.text(); // Returns SVG string
}
```

## How It Works

1. **Email Processing:** The email address is used to generate a deterministic hash
2. **Color Generation:** Colors are derived from the hash using HSL color space
3. **Initials Extraction:** Initials are extracted from the email (e.g., "john.doe@example.com" → "JD")
4. **Pattern Generation:** Decorative patterns (circles, squares, or lines) are added based on the hash
5. **SVG Generation:** All elements are combined into a scalable SVG image

## Avatar Characteristics

- **Deterministic:** Same email always produces the same avatar
- **Unique Colors:** Each email gets a unique color scheme
- **Initials:** Automatically extracts initials from email address
- **Patterns:** Includes decorative patterns for visual interest
- **Scalable:** SVG format ensures crisp display at any size

## React Package

This project includes a reusable React component package that can be installed and used in any React application.

### Installation

```bash
npm install @avatar-generator/react
# or
yarn add @avatar-generator/react
# or
pnpm add @avatar-generator/react
```

### Usage

```tsx
import { Avatar } from '@avatar-generator/react';

function App() {
  return <Avatar email="user@example.com" size={200} />;
}
```

See the [package README](./packages/avatar-generator/README.md) for complete documentation.

### Building the Package

To build the React package locally:

```bash
cd packages/avatar-generator
npm install
npm run build
```

### Publishing the Package

To publish the package to npm:

```bash
cd packages/avatar-generator
npm login
npm publish --access public
```

## Project Structure

```
avatar/
├── packages/
│   └── avatar-generator/         # React component package
│       ├── src/
│       │   ├── Avatar.tsx        # React component
│       │   ├── avatar-generator.ts # Core logic
│       │   └── index.ts          # Package exports
│       ├── dist/                 # Built package files
│       └── package.json
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── avatar/
│   │   │       └── route.ts      # Avatar API endpoint
│   │   ├── page.tsx              # Frontend UI
│   │   └── layout.tsx            # Root layout
│   └── lib/
│       ├── avatar-generator.ts   # Avatar generation logic
│       └── api.ts                # API utility functions
├── public/                       # Static assets
└── package.json
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React 19** - UI library

## License

This project is open source and available under the MIT License.
