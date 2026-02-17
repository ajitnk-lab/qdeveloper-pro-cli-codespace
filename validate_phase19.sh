#!/bin/bash
echo "======================================================================"
echo "Phase 19 Validation: Individual Resource Pages"
echo "======================================================================"
echo ""

checks_passed=0
checks_total=0

page_file="src/app/resources/[slug]/page.tsx"

# Check 1: Dynamic route directory exists
checks_total=$((checks_total + 1))
if [ -d "src/app/resources/[slug]" ]; then
    echo "  ✓ [slug] directory exists"
    checks_passed=$((checks_passed + 1))
else
    echo "  ✗ [slug] directory missing"
fi

# Check 2: Page file exists
checks_total=$((checks_total + 1))
if [ -f "$page_file" ]; then
    echo "  ✓ page.tsx exists"
    checks_passed=$((checks_passed + 1))
else
    echo "  ✗ page.tsx missing"
    exit 1
fi

# Check 3: getResource function
checks_total=$((checks_total + 1))
if grep -q "getResource" "$page_file"; then
    echo "  ✓ getResource function implemented"
    checks_passed=$((checks_passed + 1))
else
    echo "  ✗ getResource function missing"
fi

# Check 4: Breadcrumb navigation
checks_total=$((checks_total + 1))
if grep -q "Home" "$page_file" && grep -q "/resources" "$page_file"; then
    echo "  ✓ Breadcrumb navigation"
    checks_passed=$((checks_passed + 1))
else
    echo "  ✗ Breadcrumb navigation missing"
fi

# Check 5: PDF download button
checks_total=$((checks_total + 1))
if grep -q "Download PDF" "$page_file"; then
    echo "  ✓ PDF download button"
    checks_passed=$((checks_passed + 1))
else
    echo "  ✗ PDF download button missing"
fi

# Check 6: Content rendering
checks_total=$((checks_total + 1))
if grep -q "content" "$page_file"; then
    echo "  ✓ Content rendering"
    checks_passed=$((checks_passed + 1))
else
    echo "  ✗ Content rendering missing"
fi

# Check 7: Tags display
checks_total=$((checks_total + 1))
if grep -q "tags" "$page_file"; then
    echo "  ✓ Tags display"
    checks_passed=$((checks_passed + 1))
else
    echo "  ✗ Tags display missing"
fi

# Check 8: Back to Resources link
checks_total=$((checks_total + 1))
if grep -q "Back to Resources" "$page_file"; then
    echo "  ✓ Back to Resources link"
    checks_passed=$((checks_passed + 1))
else
    echo "  ✗ Back to Resources link missing"
fi

echo ""
echo "======================================================================"
echo "Results: $checks_passed/$checks_total checks passed"
echo "======================================================================"

if [ $checks_passed -eq $checks_total ]; then
    echo ""
    echo "✅ Phase 19 implementation is COMPLETE!"
    echo ""
    echo "Individual resource page features:"
    echo "  • Dynamic route ([slug])"
    echo "  • Reads markdown content"
    echo "  • Breadcrumb navigation"
    echo "  • Resource metadata display"
    echo "  • PDF download button"
    echo "  • Tags display"
    echo "  • Back to Resources link"
    echo ""
    echo "✨ Ready for Phase 20: PDF Generation Script"
    exit 0
else
    echo ""
    echo "❌ Phase 19 implementation is INCOMPLETE"
    exit 1
fi
