# Setup Commands for Sijil Frontend
# Run these commands locally in the sijil-studio directory

# Step 1: Create Next.js Project (if starting fresh)
# npx create-next-app@latest sijil-frontend
# Choose:
# ✔ TypeScript → Yes
# ✔ ESLint → Yes
# ✔ Tailwind CSS → Yes
# ✔ src/ directory → Yes
# ✔ App Router → Yes
# ✔ Turbopack → Yes
# ✔ Import alias → @/*

# Step 2: Install Dependencies
npm install \
  axios \
  @tanstack/react-query \
  @tanstack/react-query-devtools \
  react-hook-form \
  zod \
  @hookform/resolvers \
  lucide-react \
  class-variance-authority \
  clsx \
  tailwind-merge \
  next-themes

# Step 3: Install Development Dependencies
npm install -D \
  prettier \
  prettier-plugin-tailwindcss \
  husky \
  lint-staged \
  @types/node

# Step 4: Initialize Husky
npx husky init

# Step 5: Verify setup by running dev server
npm run dev
