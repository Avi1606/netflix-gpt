#!/bin/bash

# Interview Code Detection Script
# This script checks if job interview simulator code has been added to the repository

echo "🔍 Checking for Job Interview Simulator code in repository..."
echo "=================================================="

# Check for interview-related files by name
echo -e "\n📁 Checking for interview-related files by name:"
interview_files=$(find . -name "*interview*" -o -name "*Interview*" -o -name "*job*" -o -name "*Job*" -o -name "*coaching*" -o -name "*Coaching*" 2>/dev/null | grep -v node_modules | grep -v .git | grep -v "check-interview-code.sh" | grep -v "MIGRATION" | grep -v "JOB_INTERVIEW_SIMULATOR_TEMPLATE" | grep -v "ENVIRONMENT_TEMPLATES")

if [ -n "$interview_files" ]; then
    echo "✅ Found interview-related files:"
    echo "$interview_files"
else
    echo "❌ No interview-related files found by name"
fi

# Check for interview content in source files
echo -e "\n📝 Checking for interview-related content in source files:"
interview_content=$(grep -r -i "interview\|job.*simulator\|ai.*coach\|emotion.*recognition\|video.*recording.*interview" . --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" --include="*.java" --exclude-dir=node_modules --exclude-dir=.git --exclude="check-interview-code.sh" --exclude="MIGRATION*" --exclude="JOB_INTERVIEW_SIMULATOR_TEMPLATE*" --exclude="ENVIRONMENT_TEMPLATES*" 2>/dev/null)

if [ -n "$interview_content" ]; then
    echo "✅ Found interview-related content:"
    echo "$interview_content" | head -10
    if [ $(echo "$interview_content" | wc -l) -gt 10 ]; then
        echo "... and $(echo "$interview_content" | tail -n +11 | wc -l) more lines"
    fi
else
    echo "❌ No interview-related content found in source files"
fi

# Check for interview-related dependencies
echo -e "\n📦 Checking for interview-related dependencies:"
interview_deps=$(grep -i "interview\|emotion\|recording\|webcam\|video.*analysis" package.json pom.xml 2>/dev/null)

if [ -n "$interview_deps" ]; then
    echo "✅ Found interview-related dependencies:"
    echo "$interview_deps"
else
    echo "❌ No interview-related dependencies found"
fi

# Check for interview-related routes or URLs
echo -e "\n🌐 Checking for interview-related routes:"
interview_routes=$(grep -r -i "interview\|coaching\|feedback\|emotion" . --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" --exclude-dir=node_modules --exclude-dir=.git 2>/dev/null | grep -i "route\|path\|url\|endpoint")

if [ -n "$interview_routes" ]; then
    echo "✅ Found interview-related routes:"
    echo "$interview_routes" | head -5
else
    echo "❌ No interview-related routes found"
fi

# Check for interview-related database collections or models
echo -e "\n🗄️ Checking for interview-related database models:"
interview_models=$(grep -r -i "interview\|question\|feedback\|emotion\|recording" . --include="*.java" --include="*.js" --include="*.jsx" --exclude-dir=node_modules --exclude-dir=.git 2>/dev/null | grep -i "model\|entity\|collection\|schema")

if [ -n "$interview_models" ]; then
    echo "✅ Found interview-related database models:"
    echo "$interview_models" | head -5
else
    echo "❌ No interview-related database models found"
fi

echo -e "\n=================================================="
echo "📊 Summary:"

# Determine if interview code exists
has_interview_code=false

if [ -n "$interview_files" ] || [ -n "$interview_content" ] || [ -n "$interview_deps" ] || [ -n "$interview_routes" ] || [ -n "$interview_models" ]; then
    has_interview_code=true
fi

if [ "$has_interview_code" = true ]; then
    echo "🎯 INTERVIEW CODE DETECTED: This repository contains job interview simulator code"
    echo "📋 Next steps:"
    echo "   1. Review MIGRATION_CHECKLIST.md"
    echo "   2. Follow the migration process in MIGRATION.md"
    echo "   3. Use templates from JOB_INTERVIEW_SIMULATOR_TEMPLATE.md"
    echo "   4. Begin the migration process"
else
    echo "✅ NO INTERVIEW CODE FOUND: This repository is clean - contains only Netflix GPT functionality"
    echo "📋 Status: Repository is ready for future migration when interview code is added"
fi

echo -e "\n📚 Documentation available:"
echo "   - MIGRATION.md - Step-by-step migration guide"
echo "   - MIGRATION_CHECKLIST.md - Complete migration checklist"
echo "   - JOB_INTERVIEW_SIMULATOR_TEMPLATE.md - Repository structure template"
echo "   - ENVIRONMENT_TEMPLATES.md - Configuration templates"

echo -e "\n🏁 Done!"