# Complete Guide: Publishing to npm

## 📦 What We're Publishing

The React component package located at `packages/avatar-generator/` that allows users to:
```tsx
import { Avatar } from '@avatar-generator/react';
<Avatar email="user@example.com" />
```

## 🚀 Quick Start (5 Steps)

### 1. Create npm Account
- Go to https://www.npmjs.com/signup
- Verify your email

### 2. Login
```bash
npm login
```

### 3. Navigate & Build
```bash
cd packages/avatar-generator
npm run build
```

### 4. Check Package Name
**IMPORTANT:** The name `@avatar-generator/react` might be taken. Check:
```bash
npm search @avatar-generator/react
```

If taken, edit `package.json` and change the name:
```json
{
  "name": "your-unique-package-name"
}
```

Suggested alternatives:
- `@your-username/react-avatar-generator`
- `email-avatar-generator`
- `react-email-avatar`

### 5. Publish!
```bash
npm publish --access public
```

## 📋 Detailed Process

### Step 1: Prepare npm Account

1. **Create account** at https://www.npmjs.com/signup
2. **Verify email** (check your inbox)
3. **Enable 2FA** (recommended for security)
4. **Login via CLI:**
   ```bash
   npm login
   ```
   Enter:
   - Username
   - Password
   - Email
   - OTP (if 2FA enabled)

5. **Verify login:**
   ```bash
   npm whoami
   ```
   Should display your username.

### Step 2: Check Package Name Availability

The package name `@avatar-generator/react` might already exist. Check:

```bash
npm search @avatar-generator/react
```

Or visit: https://www.npmjs.com/package/@avatar-generator/react

**If the name is taken**, you have options:

**Option A: Use a different name**
Edit `packages/avatar-generator/package.json`:
```json
{
  "name": "your-unique-package-name"
}
```

**Option B: Use your username as scope**
```json
{
  "name": "@your-username/react-avatar-generator"
}
```

**Option C: Use unscoped name**
```json
{
  "name": "react-email-avatar-generator"
}
```

### Step 3: Update Package Information (Optional)

Edit `packages/avatar-generator/package.json`:

```json
{
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/avatar.git"
  },
  "homepage": "https://github.com/yourusername/avatar#readme",
  "bugs": {
    "url": "https://github.com/yourusername/avatar/issues"
  }
}
```

### Step 4: Build the Package

```bash
cd packages/avatar-generator
npm run build
```

This creates the `dist/` folder with:
- `index.js` - CommonJS build
- `index.mjs` - ES Modules build
- `index.d.ts` - TypeScript definitions
- `index.d.mts` - TypeScript definitions for ESM

### Step 5: Preview What Will Be Published

```bash
npm pack --dry-run
```

This shows what files will be included. Should only show:
- `dist/` folder files
- `package.json`
- `README.md`

### Step 6: Publish

```bash
npm publish --access public
```

**Note:** `--access public` is **required** for scoped packages (packages starting with `@`).

### Step 7: Verify Publication

1. Visit: https://www.npmjs.com/package/@avatar-generator/react
   (Replace with your actual package name)

2. Test installation:
   ```bash
   mkdir test-install
   cd test-install
   npm init -y
   npm install @avatar-generator/react react react-dom
   ```

3. Create test file `test.jsx`:
   ```jsx
   import { Avatar } from '@avatar-generator/react';
   
   function Test() {
     return <Avatar email="test@example.com" size={200} />;
   }
   ```

## 🔄 Updating the Package

When you make changes and want to publish an update:

### 1. Update Version

**Option A: Manual**
Edit `package.json`:
```json
{
  "version": "1.0.1"
}
```

**Option B: Using npm version (Recommended)**
```bash
npm version patch  # 1.0.0 → 1.0.1 (bug fixes)
npm version minor   # 1.0.0 → 1.1.0 (new features)
npm version major   # 1.0.0 → 2.0.0 (breaking changes)
```

This automatically:
- Updates `package.json`
- Creates a git commit (if in git repo)
- Creates a git tag

### 2. Build and Publish

```bash
npm run build
npm publish --access public
```

## 📊 After Publishing

### 1. Monitor Your Package

- **View stats:** https://www.npmjs.com/package/@avatar-generator/react
- **Download stats:** Available on npm website
- **Version history:** Tracked automatically

### 2. Share Your Package

- Add to GitHub repository (if applicable)
- Share on social media
- Post in relevant communities
- Add to awesome lists

### 3. Add Badges to README

Add to `packages/avatar-generator/README.md`:

```markdown
![npm version](https://img.shields.io/npm/v/@avatar-generator/react)
![npm downloads](https://img.shields.io/npm/dm/@avatar-generator/react)
![license](https://img.shields.io/npm/l/@avatar-generator/react)
```

### 4. Create CHANGELOG.md

Track changes:

```markdown
# Changelog

## [1.0.0] - 2024-01-01
### Added
- Initial release
- Avatar component
- Email-based avatar generation
```

## 🛠️ Common Commands

```bash
# Check if logged in
npm whoami

# View package info
npm view @avatar-generator/react

# View specific version
npm view @avatar-generator/react@1.0.0

# Unpublish (only within 72 hours)
npm unpublish @avatar-generator/react --force

# Deprecate a version (better than unpublish)
npm deprecate @avatar-generator/react@1.0.0 "Use version 1.0.1 instead"

# Test package locally before publishing
npm pack
# Creates .tgz file you can install locally
```

## ⚠️ Troubleshooting

### "Package name already exists"
- Choose a different name
- Check availability first: `npm search <package-name>`

### "You do not have permission"
- Verify login: `npm whoami`
- For scoped packages, use `--access public`
- Check if you own the package/scope

### "Invalid package name"
- Must be lowercase
- Can contain hyphens and underscores
- Scoped packages must start with `@`
- Cannot start with dot or underscore

### "Package name too similar"
- npm blocks similar names to prevent confusion
- Choose a more unique name

## 📚 Additional Resources

- [npm Documentation](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/)
- [npm Package Best Practices](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)

## ✅ Success Checklist

After publishing, you should be able to:

- [ ] See package on npmjs.com
- [ ] Install with `npm install @avatar-generator/react`
- [ ] Import and use in a React project
- [ ] See download stats on npm
- [ ] Update and republish new versions

## 🎉 You're Done!

Your package is now live on npm! Users can install it with:

```bash
npm install @avatar-generator/react
```

And use it like:

```tsx
import { Avatar } from '@avatar-generator/react';

<Avatar email="user@example.com" />
```

