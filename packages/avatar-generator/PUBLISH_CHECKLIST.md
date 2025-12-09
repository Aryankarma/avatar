# Pre-Publishing Checklist

Use this checklist before publishing to npm:

## ✅ Package Configuration

- [ ] Package name is set correctly in `package.json`
- [ ] Version number is correct (start with 1.0.0 for first release)
- [ ] Description is clear and accurate
- [ ] Author field is filled (optional but recommended)
- [ ] License is specified (MIT is set)
- [ ] Repository URL is added (if you have a GitHub repo)
- [ ] Keywords are relevant and help discoverability

## ✅ Code Quality

- [ ] All TypeScript types are correct
- [ ] Component exports are working
- [ ] No console errors or warnings
- [ ] Code is clean and well-commented

## ✅ Build & Distribution

- [ ] `npm run build` completes without errors
- [ ] `dist/` folder contains all necessary files:
  - [ ] `index.js` (CommonJS)
  - [ ] `index.mjs` (ES Modules)
  - [ ] `index.d.ts` (TypeScript definitions)
  - [ ] `index.d.mts` (TypeScript definitions for ESM)
- [ ] `npm pack --dry-run` shows only necessary files
- [ ] `.npmignore` excludes source files and dev dependencies

## ✅ Documentation

- [ ] README.md is complete with:
  - [ ] Installation instructions
  - [ ] Usage examples
  - [ ] API documentation
  - [ ] Props/parameters explained
- [ ] Code examples are tested and work
- [ ] All features are documented

## ✅ Testing

- [ ] Component renders correctly
- [ ] Different email addresses produce different avatars
- [ ] Same email produces same avatar (deterministic)
- [ ] Size prop works correctly
- [ ] Styling props (className, style) work
- [ ] Error handling works (invalid emails)

## ✅ npm Account

- [ ] npm account is created
- [ ] Logged in via `npm login`
- [ ] Verified with `npm whoami`
- [ ] Two-factor authentication enabled (recommended)

## ✅ Package Name

- [ ] Checked if package name is available:
  ```bash
  npm search @avatar-generator/react
  ```
- [ ] If taken, updated to unique name
- [ ] Name follows npm naming conventions

## ✅ Final Steps

- [ ] Run `npm run build` one more time
- [ ] Test the built package locally:
  ```bash
  npm pack
  # Creates .tgz file - test installing it
  ```
- [ ] Ready to publish!

## 🚀 Publishing Command

Once all checks pass:

```bash
cd packages/avatar-generator
npm publish --access public
```

## 📝 After Publishing

- [ ] Verify package appears on npmjs.com
- [ ] Test installation in a fresh project
- [ ] Update main project README with package link
- [ ] Share on social media/communities (optional)
- [ ] Monitor for issues/feedback

