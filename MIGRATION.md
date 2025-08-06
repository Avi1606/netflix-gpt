# Repository Migration Guide

This document outlines the process for migrating different project components out of the netflix-gpt repository into dedicated repositories.

## Overview

The netflix-gpt repository is designed to focus solely on Netflix/movie discovery functionality. Any additional projects (like job interview simulators, AI coaching tools, etc.) should be migrated to separate, dedicated repositories to maintain clean project boundaries.

## Migration Process

### 1. Pre-Migration Assessment

Before migrating any code:
- [ ] Identify all files related to the project being migrated
- [ ] Document dependencies between netflix-gpt and the project
- [ ] Create a list of shared utilities that need to be copied
- [ ] Document environment variables and configurations

### 2. New Repository Setup

Create a new repository with the following structure:

#### For Job Interview Simulator Project
```
job-interview-simulator/
├── frontend/                 # React + Tailwind CSS
│   ├── src/
│   │   ├── components/
│   │   │   ├── interview/    # Interview room components
│   │   │   ├── questions/    # Question management
│   │   │   ├── auth/         # Authentication
│   │   │   └── dashboard/    # User dashboard
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── context/
│   │   └── utils/
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── backend/                  # Spring Boot + MongoDB
│   ├── src/main/java/
│   │   └── com/interviewsimulator/
│   │       ├── controller/
│   │       ├── service/
│   │       ├── repository/
│   │       ├── model/
│   │       ├── dto/
│   │       ├── config/
│   │       └── security/
│   ├── pom.xml
│   └── application.yml
├── docs/                     # Documentation
├── scripts/                  # Build and deployment scripts
├── .github/workflows/        # CI/CD pipelines
├── README.md
├── LICENSE
└── .gitignore
```

### 3. Code Migration Steps

#### Step 1: Identify Migration Files
```bash
# Search for project-specific files
find . -name "*interview*" -o -name "*job*" -o -name "*coaching*"
grep -r "interview\|job.*simulator\|ai.*coach" . --exclude-dir=node_modules
```

#### Step 2: Copy Files with History (if needed)
```bash
# For preserving git history
git subtree push --prefix=src/interview-components origin interview-feature
```

#### Step 3: Update Configurations
- [ ] Update package.json name and description
- [ ] Update import paths and references
- [ ] Configure new environment variables
- [ ] Update API endpoints and CORS settings
- [ ] Configure database connections

#### Step 4: Dependency Management
- [ ] Copy shared utilities to new repository
- [ ] Update package dependencies
- [ ] Remove netflix-gpt specific dependencies
- [ ] Add project-specific dependencies

### 4. Post-Migration Cleanup

After successful migration:

#### In the New Repository:
- [ ] Test all functionality works independently
- [ ] Update documentation and README
- [ ] Set up CI/CD pipelines
- [ ] Configure deployment
- [ ] Add proper licensing

#### In the Netflix-GPT Repository:
- [ ] Remove migrated files
- [ ] Clean up unused dependencies
- [ ] Update documentation to remove references
- [ ] Test that netflix-gpt functionality still works
- [ ] Create a clean commit documenting the migration

### 5. Migration Checklist Template

When migrating a project, use this checklist:

#### Pre-Migration
- [ ] Backup current state
- [ ] Document all project files
- [ ] Test current functionality
- [ ] Create new repository

#### Migration
- [ ] Copy code files
- [ ] Update package.json
- [ ] Fix import paths
- [ ] Update configurations
- [ ] Test in new environment

#### Post-Migration
- [ ] Clean up source repository
- [ ] Update documentation
- [ ] Verify both repositories work
- [ ] Set up deployment

## Shared Utilities

Some utilities might be used across projects. Consider creating shared npm packages for:
- Authentication helpers
- Common UI components
- Utility functions
- Configuration management

## Best Practices

1. **Clean Separation**: Ensure no cross-dependencies between repositories
2. **Independent Deployment**: Each project should deploy independently
3. **Separate Environments**: Use different environment configurations
4. **Documentation**: Keep comprehensive migration documentation
5. **Testing**: Thoroughly test both repositories after migration

## Contact

If you need help with migration, please:
1. Create an issue in the relevant repository
2. Follow the migration checklist
3. Test thoroughly before finalizing

---

*This document should be updated as migration patterns emerge and best practices are established.*