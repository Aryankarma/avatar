# Publishing Guide for @avatar-generator/react

This guide will walk you through publishing the package to npm and maintaining it.

## Prerequisites

1. **Create an npm account** (if you don't have one)
   - Go to https://www.npmjs.com/signup
   - Verify your email address

2. **Login to npm via CLI**
   ```bash
   npm login
   ```
   Enter your username, password, and email when prompted.

3. **Verify you're logged in**
   ```bash
   npm whoami
   ```
   This should display your npm username.

## Pre-Publishing Checklist

Before publishing, make sure:

- [ ] Package name is available (check on npmjs.com)
- [ ] All code is tested and working
- [ ] README.md is complete and accurate
- [ ] package.json has correct information:
  - [ ] Package name
  - [ ] Version number
  - [ ] Description
  - [ ] Author (optional but recommended)
  - [ ] Repository URL (if you have a git repo)
  - [ ] License
- [ ] Build succeeds without errors
- [ ] `.npmignore` or `files` field excludes unnecessary files

## Publishing Steps

### 1. Navigate to Package Directory

```bash
cd packages/avatar-generator
```

### 2. Build the Package

```bash
npm run build
```

This creates the `dist/` folder with compiled code.

### 3. Check What Will Be Published

```bash
npm pack --dry-run
```

This shows what files will be included in the package without actually creating the tarball.

### 4. Publish to npm

**For public packages (recommended):**
```bash
npm publish --access public
```

**For scoped packages (if using @avatar-generator scope):**
```bash
npm publish --access public
```

**Note:** The `--access public` flag is required for scoped packages (`@avatar-generator/react`). For unscoped packages, you can omit it.

### 5. Verify Publication

Check your package on npm:
```
https://www.npmjs.com/package/@avatar-generator/react
```

## Version Management

### Semantic Versioning

Follow [Semantic Versioning](https://semver.org/):
- **MAJOR** (1.0.0 → 2.0.0): Breaking changes
- **MINOR** (1.0.0 → 1.1.0): New features (backward compatible)
- **PATCH** (1.0.0 → 1.0.1): Bug fixes (backward compatible)

### Updating Version

**Option 1: Manual**
Edit `package.json` and change the version:
```json
{
  "version": "1.0.1"
}
```

**Option 2: Using npm version command**
```bash
# Patch version (1.0.0 → 1.0.1)
npm version patch

# Minor version (1.0.0 → 1.1.0)
npm version minor

# Major version (1.0.0 → 2.0.0)
npm version major
```

This automatically:
- Updates `package.json`
- Creates a git tag (if in a git repo)
- Commits the change (if in a git repo)

### Publishing Updates

After updating the version:

```bash
npm run build
npm publish --access public
```

## Post-Publishing

### 1. Test Installation

In a new project or directory:

```bash
npm install @avatar-generator/react
```

Then test importing:
```tsx
import { Avatar } from '@avatar-generator/react';
```

### 2. Update Documentation

- Update the main README if needed
- Add changelog entries
- Update examples if API changed

### 3. Share Your Package

- Add to your GitHub repository (if applicable)
- Share on social media/communities
- Add badges to README (npm version, downloads, etc.)

## Common Commands

```bash
# Check if package name is available
npm search @avatar-generator/react

# View package info
npm view @avatar-generator/react

# Unpublish (only within 72 hours of publishing)
npm unpublish @avatar-generator/react --force

# Deprecate a version (better than unpublishing)
npm deprecate @avatar-generator/react@1.0.0 "Use version 1.0.1 instead"
```

## Troubleshooting

### Error: "You do not have permission to publish"
- Make sure you're logged in: `npm whoami`
- Check if package name is already taken
- For scoped packages, ensure you have the right permissions

### Error: "Package name too similar"
- Choose a different package name
- Consider using a different scope

### Error: "Invalid package name"
- Package name must be lowercase
- Can contain hyphens and underscores
- Scoped packages must start with `@`

## Best Practices

1. **Always test before publishing**
   ```bash
   npm pack
   # Creates a .tgz file you can test locally
   npm install ./avatar-generator-react-1.0.0.tgz
   ```

2. **Use npm version for versioning**
   - Keeps versioning consistent
   - Creates git tags automatically

3. **Write clear commit messages**
   - Helps track changes
   - Useful for changelogs

4. **Keep CHANGELOG.md**
   - Document all changes
   - Helps users understand updates

5. **Add badges to README**
   ```markdown
   ![npm version](https://img.shields.io/npm/v/@avatar-generator/react)
   ![npm downloads](https://img.shields.io/npm/dm/@avatar-generator/react)
   ```

6. **Set up CI/CD** (optional)
   - Automate testing
   - Automate publishing on tags

## Next Steps After First Publish

1. ✅ Package is live on npm
2. 📝 Create a GitHub repository (if not exists)
3. 🔗 Link repository in package.json
4. 📊 Add npm badges to README
5. 📝 Create CHANGELOG.md
6. 🧪 Set up automated tests
7. 📦 Consider adding more features based on feedback

## Example Workflow

```bash
# 1. Make changes to code
# 2. Update version
npm version patch

# 3. Build
npm run build

# 4. Test locally
npm pack
# Install in test project to verify

# 5. Publish
npm publish --access public

# 6. Verify on npmjs.com
# 7. Update documentation if needed
```

