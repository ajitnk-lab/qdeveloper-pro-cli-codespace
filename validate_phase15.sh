#!/bin/bash
echo "======================================================================"
echo "Phase 15 Validation: CloudNestle Website - Content Directory Structure"
echo "======================================================================"
echo ""

checks_passed=0
checks_total=0

# Check 1: content/resources/ exists
checks_total=$((checks_total + 1))
if [ -d "content/resources" ]; then
    echo "  ✓ content/resources/ directory exists"
    checks_passed=$((checks_passed + 1))
else
    echo "  ✗ content/resources/ directory missing"
fi

# Check 2: _index.json exists
checks_total=$((checks_total + 1))
if [ -f "content/resources/_index.json" ]; then
    echo "  ✓ content/resources/_index.json exists"
    checks_passed=$((checks_passed + 1))
else
    echo "  ✗ content/resources/_index.json missing"
fi

# Check 3: README exists
checks_total=$((checks_total + 1))
if [ -f "content/resources/README.md" ]; then
    echo "  ✓ content/resources/README.md exists"
    checks_passed=$((checks_passed + 1))
else
    echo "  ✗ content/resources/README.md missing"
fi

# Check 4: public/resources/pdfs/ exists
checks_total=$((checks_total + 1))
if [ -d "public/resources/pdfs" ]; then
    echo "  ✓ public/resources/pdfs/ directory exists"
    checks_passed=$((checks_passed + 1))
else
    echo "  ✗ public/resources/pdfs/ directory missing"
fi

# Check 5: _index.json is valid JSON
checks_total=$((checks_total + 1))
if python3 -m json.tool content/resources/_index.json > /dev/null 2>&1; then
    echo "  ✓ _index.json is valid JSON"
    checks_passed=$((checks_passed + 1))
else
    echo "  ✗ _index.json is not valid JSON"
fi

echo ""
echo "======================================================================"
echo "Results: $checks_passed/$checks_total checks passed"
echo "======================================================================"

if [ $checks_passed -eq $checks_total ]; then
    echo ""
    echo "✅ Phase 15 implementation is COMPLETE!"
    echo ""
    echo "Directory structure created:"
    echo "  • content/resources/ (for markdown files)"
    echo "  • content/resources/_index.json (resource listing)"
    echo "  • content/resources/README.md (documentation)"
    echo "  • public/resources/pdfs/ (for local PDFs)"
    echo ""
    echo "✨ Ready for Phase 16: Public PDF Directory"
    exit 0
else
    echo ""
    echo "❌ Phase 15 implementation is INCOMPLETE"
    exit 1
fi
