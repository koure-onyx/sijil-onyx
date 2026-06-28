# Frontend Implementation Standards

## Overview

This directory contains detailed implementation standards that supplement the main constitution (`CLAUDE.md`). These documents provide specific guidance for implementing each layer of the application.

---

## Documents

### 01-architecture-laws.md
**Purpose**: Deep dive into architectural boundaries and layer separation rules.

**Key Topics**:
- Domain-driven design principles
- Layer dependency graph
- Cross-domain communication patterns
- Module isolation strategies

---

### 02-coding-conventions.md
**Purpose**: Detailed coding standards and style guide.

**Key Topics**:
- TypeScript best practices
- React patterns and anti-patterns
- Functional programming guidelines
- Error handling patterns
- Logging strategy

---

### 03-folder-organization.md
**Purpose**: Comprehensive folder structure documentation.

**Key Topics**:
- Root-level organization
- Feature module anatomy
- Shared component placement
- Asset management
- Import path aliases

---

### 04-component-guidelines.md
**Purpose**: Component design and development standards.

**Key Topics**:
- Component composition patterns
- Props design principles
- State management in components
- Performance optimization
- Accessibility implementation

---

### 05-state-management.md
**Purpose**: State architecture implementation guide.

**Key Topics**:
- TanStack Query advanced patterns
- Zustand store design
- URL state synchronization
- Form state strategies
- Cache invalidation tactics

---

### 06-api-integration.md
**Purpose**: API client implementation standards.

**Key Topics**:
- REST client configuration
- Request/response typing
- Error handling strategies
- Retry mechanisms
- Authentication flow

---

### 07-testing-guide.md
**Purpose**: Comprehensive testing methodology.

**Key Topics**:
- Unit testing patterns
- Component testing strategies
- Integration testing approaches
- E2E testing scenarios
- Mock data generation
- Test coverage requirements

---

### 08-performance-optimization.md
**Purpose**: Performance best practices.

**Key Topics**:
- Code splitting strategies
- Lazy loading patterns
- Image optimization
- Bundle size management
- Runtime performance
- Core Web Vitals

---

### 09-accessibility-checklist.md
**Purpose**: WCAG compliance implementation guide.

**Key Topics**:
- Semantic HTML usage
- ARIA implementation
- Keyboard navigation
- Screen reader compatibility
- Color contrast requirements
- Focus management

---

### 10-seo-implementation.md
**Purpose**: SEO implementation standards.

**Key Topics**:
- Metadata generation
- Structured data (JSON-LD)
- Sitemap generation
- robots.txt configuration
- Open Graph integration
- Twitter Cards

---

### 11-security-guidelines.md
**Purpose**: Security best practices.

**Key Topics**:
- XSS prevention
- CSRF protection
- Input validation
- Authentication security
- Authorization patterns
- Sensitive data handling

---

### 12-deployment-guide.md
**Purpose**: Deployment and CI/CD procedures.

**Key Topics**:
- Environment configuration
- Build optimization
- Deployment workflows
- Rollback procedures
- Monitoring setup
- Incident response

---

## Usage

All implementation work MUST comply with these standards. Reference the appropriate document when:

1. Starting a new feature
2. Reviewing pull requests
3. Resolving architectural questions
4. Onboarding new contributors
5. Conducting code audits

---

## Relationship to Blueprint

These implementation standards align with and enforce the architecture defined in `docs/frontend-blueprint/`. Any conflicts should be resolved by:

1. Checking blueprint documents first (source of truth for architecture)
2. Consulting constitution (`CLAUDE.md`) for governing rules
3. Updating both documents if changes are needed

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2024 | Initial release | Engineering Team |

---

**Status**: Active  
**Review Cycle**: Per Phase Gate  
**Last Updated**: 2024
