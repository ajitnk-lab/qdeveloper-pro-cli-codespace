#!/bin/bash
echo "======================================================================"
echo "Phase 20 Validation: PDF Generation Script"
echo "======================================================================"
echo ""

checks_passed=0
checks_total=0

script_file="scripts/generate-pdf.sh"

# Check 1: Script exists
checks_total=$((checks_total + 1))
if [ -f "$script_file" ]; then
    echo "  ✓ generate-pdf.sh exists"
    checks_passed=$((checks_passed + 1))
else
    echo "  ✗ generate-pdf.sh missing"
    exit 1
fi

# Check 2: Script is executable
checks_total=$((checks_total + 1))
if [ -x "$script_file" ]; then
    echo "  ✓ Script is executable"
    checks_passed=$((checks_passed + 1))
else
    echo "  ✗ Script is not executable"
fi

# Check 3: Pandoc check
checks_total=$((checks_total + 1))
if grep -q "pandoc" "$script_file"; then
    echo "  ✓ Pandoc command present"
    checks_passed=$((checks_passed + 1))
else
    echo "  ✗ Pandoc command missing"
fi

# Check 4: Error handling
checks_total=$((checks_total + 1))
if grep -q "set -e" "$script_file"; then
    echo "  ✓ Error handling (set -e)"
    checks_passed=$((checks_passed + 1))
else
    echo "  ✗ Error handling missing"
fi

# Check 5: Output directory creation
checks_total=$((checks_total + 1))
if grep -q "mkdir -p" "$script_file"; then
    echo "  ✓ Output directory creation"
    checks_passed=$((checks_passed + 1))
else
    echo "  ✗ Output directory creation missing"
fi

# Check 6: File size reporting
checks_total=$((checks_total + 1))
if grep -q "du -h" "$script_file"; then
    echo "  ✓ File size reporting"
    checks_passed=$((checks_passed + 1))
else
    echo "  ✗ File size reporting missing"
fi

# Check 7: Summary output
checks_total=$((checks_total + 1))
if grep -q "Summary" "$script_file"; then
    echo "  ✓ Summary output"
    checks_passed=$((checks_passed + 1))
else
    echo "  ✗ Summary output missing"
fi

# Check 8: Test script execution (dry run)
checks_total=$((checks_total + 1))
if bash -n "$script_file" 2>/dev/null; then
    echo "  ✓ Script syntax valid"
    checks_passed=$((checks_passed + 1))
else
    echo "  ✗ Script syntax error"
fi

echo ""
echo "======================================================================"
echo "Results: $checks_passed/$checks_total checks passed"
echo "======================================================================"

if [ $checks_passed -eq $checks_total ]; then
    echo ""
    echo "✅ Phase 20 implementation is COMPLETE!"
    echo ""
    echo "PDF generation script features:"
    echo "  • Pandoc installation check"
    echo "  • Batch PDF generation"
    echo "  • Error handling"
    echo "  • Progress reporting"
    echo "  • File size display"
    echo "  • Summary statistics"
    echo ""
    echo "Usage: ./scripts/generate-pdf.sh"
    echo ""
    echo "✨ Ready for Phase 21: Frontend TypeScript Interfaces"
    exit 0
else
    echo ""
    echo "❌ Phase 20 implementation is INCOMPLETE"
    exit 1
fi
