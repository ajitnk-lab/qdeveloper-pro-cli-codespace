#!/bin/bash
echo "======================================================================"
echo "Phase 18 Validation: Dynamic Resources Page"
echo "======================================================================"
echo ""

checks_passed=0
checks_total=0

page_file="src/app/resources/page.tsx"

# Check 1: Page file exists
checks_total=$((checks_total + 1))
if [ -f "$page_file" ]; then
    echo "  ✓ page.tsx exists"
    checks_passed=$((checks_passed + 1))
else
    echo "  ✗ page.tsx missing"
    exit 1
fi

# Check 2: Removed "use client" (server component)
checks_total=$((checks_total + 1))
if ! grep -q '"use client"' "$page_file"; then
    echo "  ✓ Server component (no 'use client')"
    checks_passed=$((checks_passed + 1))
else
    echo "  ✗ Still using client component"
fi

# Check 3: Reads from _index.json
checks_total=$((checks_total + 1))
if grep -q "_index.json" "$page_file"; then
    echo "  ✓ Reads from _index.json"
    checks_passed=$((checks_passed + 1))
else
    echo "  ✗ Not reading from _index.json"
fi

# Check 4: Resource interface defined
checks_total=$((checks_total + 1))
if grep -q "interface Resource" "$page_file"; then
    echo "  ✓ Resource interface defined"
    checks_passed=$((checks_passed + 1))
else
    echo "  ✗ Resource interface missing"
fi

# Check 5: Dynamic data loading
checks_total=$((checks_total + 1))
if grep -q "getResources" "$page_file"; then
    echo "  ✓ Dynamic data loading function"
    checks_passed=$((checks_passed + 1))
else
    echo "  ✗ Dynamic data loading missing"
fi

# Check 6: PDF download link
checks_total=$((checks_total + 1))
if grep -q "pdf_url" "$page_file"; then
    echo "  ✓ PDF download link implemented"
    checks_passed=$((checks_passed + 1))
else
    echo "  ✗ PDF download link missing"
fi

# Check 7: Empty state handling
checks_total=$((checks_total + 1))
if grep -q "No resources available" "$page_file"; then
    echo "  ✓ Empty state handling"
    checks_passed=$((checks_passed + 1))
else
    echo "  ✗ Empty state handling missing"
fi

echo ""
echo "======================================================================"
echo "Results: $checks_passed/$checks_total checks passed"
echo "======================================================================"

if [ $checks_passed -eq $checks_total ]; then
    echo ""
    echo "✅ Phase 18 implementation is COMPLETE!"
    echo ""
    echo "Dynamic resources page features:"
    echo "  • Server-side rendering"
    echo "  • Reads from _index.json"
    echo "  • Dynamic resource cards"
    echo "  • Working PDF download links"
    echo "  • Empty state handling"
    echo ""
    echo "✨ Ready for Phase 19: Individual Resource Pages"
    exit 0
else
    echo ""
    echo "❌ Phase 18 implementation is INCOMPLETE"
    exit 1
fi
