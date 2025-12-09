# Quick Start: Publishing to npm

## Step-by-Step Instructions

### 1. Create npm Account (if needed)
Visit: https://www.npmjs.com/signup

### 2. Login to npm
```bash
npm login
```
Enter your username, password, and email.

### 3. Verify Login
```bash
npm whoami
```

### 4. Navigate to Package
```bash
cd packages/avatar-generator
```

### 5. Check Package Name Availability
The package name `@avatar-generator/react` might be taken. Check:
```bash
npm search @avatar-generator/react
```

If taken, update the name in `package.json`:
```json
{
  "name": "your-unique-package-name"
}
```

### 6. Update Package Info (Optional but Recommended)
Edit `package.json` and add:
- Your name in `author` field
- Repository URL if you have a GitHub repo
- Homepage URL

### 7. Build the Package
```bash
npm run build
```

### 8. Preview What Will Be Published
```bash
npm pack --dry-run
```

### 9. Publish!
```bash
npm publish --access public
```

**Note:** `--access public` is required for scoped packages (packages starting with `@`)

### 10. Verify
Visit: https://www.npmjs.com/package/@avatar-generator/react
(Replace with your actual package name)

## Testing Installation

After publishing, test it works:

```bash
# In a new directory
mkdir test-avatar-install
cd test-avatar-install
npm init -y
npm install @avatar-generator/react react react-dom
```

Create `test.jsx`:
```jsx
import { Avatar } from '@avatar-generator/react';

function Test() {
  return <Avatar email="test@example.com" />;
}
```

## Updating the Package

When you make changes:

1. Update version in `package.json`:
   ```bash
   npm version patch  # for bug fixes (1.0.0 → 1.0.1)
   npm version minor  # for new features (1.0.0 → 1.1.0)
   npm version major  # for breaking changes (1.0.0 → 2.0.0)
   ```

2. Build and publish:
   ```bash
   npm run build
   npm publish --access public
   ```

## Common Issues

**"Package name already exists"**
- Choose a different name in `package.json`
- Or use a different scope: `@your-username/react-avatar-generator`

**"You do not have permission"**
- Make sure you're logged in: `npm whoami`
- For scoped packages, you need to be the owner of the scope or use `--access public`

**"Invalid package name"**
- Must be lowercase
- Can contain hyphens
- Scoped packages must start with `@`

