# @avatar-generator/react

A lightweight React component for generating deterministic SVG avatars from email addresses. Each email address produces a unique, consistent avatar with initials and colorful patterns.

## Features

- 🎨 **Deterministic Generation** - Same email always produces the same avatar
- ⚡ **Zero Dependencies** - No external dependencies (except React)
- 📦 **Lightweight** - Small bundle size
- 🎯 **TypeScript Support** - Full TypeScript definitions included
- 🎨 **Customizable** - Control size, styling, and more
- 🌈 **Unique Patterns** - Colorful patterns and initials for each email

## Installation

```bash
npm install @avatar-generator/react
# or
yarn add @avatar-generator/react
# or
pnpm add @avatar-generator/react
```

## Usage

### Basic Usage

```tsx
import { Avatar } from '@avatar-generator/react';

function App() {
  return <Avatar email="john.doe@example.com" />;
}
```

### With Custom Size

```tsx
import { Avatar } from '@avatar-generator/react';

function App() {
  return (
    <Avatar 
      email="john.doe@example.com" 
      size={150} 
    />
  );
}
```

### With Custom Styling

```tsx
import { Avatar } from '@avatar-generator/react';

function App() {
  return (
    <Avatar 
      email="john.doe@example.com" 
      size={100}
      className="rounded-full border-2 border-gray-300"
      style={{ margin: '10px' }}
    />
  );
}
```

### In a User Profile Component

```tsx
import { Avatar } from '@avatar-generator/react';

function UserProfile({ user }) {
  return (
    <div className="user-profile">
      <Avatar 
        email={user.email} 
        size={80}
        className="rounded-full"
        alt={`${user.name}'s avatar`}
      />
      <h2>{user.name}</h2>
    </div>
  );
}
```

## API Reference

### Avatar Component Props

| Prop      | Type            | Default | Description                                    |
|-----------|-----------------|---------|------------------------------------------------|
| `email`   | `string`        | -       | Email address to generate avatar for (required) |
| `size`    | `number`        | `200`   | Avatar size in pixels (50-1000)                |
| `className` | `string`      | `''`    | CSS class name to apply to the img element    |
| `style`   | `CSSProperties` | `{}`    | Inline styles to apply to the img element     |
| `alt`     | `string`        | Auto    | Alt text for the image (defaults to email)     |

### Utility Functions

You can also use the utility functions directly:

```tsx
import { generateAvatarSVG, generateAvatarDataURL } from '@avatar-generator/react';

// Get SVG string
const svg = generateAvatarSVG('user@example.com', 200);

// Get data URL
const dataUrl = generateAvatarDataURL('user@example.com', 200);
```

## Examples

### Circular Avatar

```tsx
<Avatar 
  email="user@example.com" 
  size={100}
  className="rounded-full"
/>
```

### Avatar List

```tsx
const users = [
  { email: 'alice@example.com', name: 'Alice' },
  { email: 'bob@example.com', name: 'Bob' },
  { email: 'charlie@example.com', name: 'Charlie' },
];

function UserList() {
  return (
    <div>
      {users.map(user => (
        <div key={user.email} className="user-item">
          <Avatar email={user.email} size={50} className="rounded-full" />
          <span>{user.name}</span>
        </div>
      ))}
    </div>
  );
}
```

## How It Works

1. **Email Processing**: The email address is hashed to generate a deterministic seed
2. **Color Generation**: Colors are derived from the hash using HSL color space
3. **Initials Extraction**: Initials are extracted from the email (e.g., "john.doe@example.com" → "JD")
4. **Pattern Generation**: Decorative patterns (circles, squares, or lines) are added based on the hash
5. **SVG Generation**: All elements are combined into a scalable SVG image

## Browser Support

Works in all modern browsers that support:
- React 16.8+
- SVG images
- Data URLs

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

