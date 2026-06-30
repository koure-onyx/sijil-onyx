# Setup Commands for Sijil Frontend
# Run these commands locally in the sijil-studio directory

# ============================================
# Milestone 1: Project Initialization
# ============================================

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

# ============================================
# Milestone 4: Design System (shadcn/ui)
# ============================================

# Step 5: Initialize shadcn/ui
npx shadcn@latest init
# Choose:
# Style: New York
# Base color: Slate
# CSS variables: Yes

# Step 6: Install shadcn/ui components
npx shadcn@latest add \
  button \
  card \
  input \
  badge \
  separator \
  skeleton \
  dropdown-menu \
  avatar \
  sheet \
  dialog \
  alert

# ============================================
# Verify Setup
# ============================================

# Step 7: Run dev server
npm run dev
