#!/bin/bash
echo "======================================================================"
echo "Phase 17 Validation: GitHub Actions Workflow Updates"
echo "======================================================================"
echo ""

checks_passed=0
checks_total=0

workflow_file=".github/workflows/deploy.yml"

# Check 1: Workflow file exists
checks_total=$((checks_total + 1))
if [ -f "$workflow_file" ]; then
    echo "  ✓ deploy.yml exists"
    checks_passed=$((checks_passed + 1))
else
    echo "  ✗ deploy.yml missing"
    exit 1
fi

# Check 2: Pandoc installation step
checks_total=$((checks_total + 1))
if grep -q "Install Pandoc" "$workflow_file"; then
    echo "  ✓ Pandoc installation step added"
    checks_passed=$((checks_passed + 1))
else
    echo "  ✗ Pandoc installation step missing"
fi

# Check 3: PDF generation step
checks_total=$((checks_total + 1))
if grep -q "Generate PDFs from resources" "$workflow_file"; then
    echo "  ✓ PDF generation step added"
    checks_passed=$((checks_passed + 1))
else
    echo "  ✗ PDF generation step missing"
fi

# Check 4: S3 upload for PDFs
checks_total=$((checks_total + 1))
if grep -q "Upload PDFs to S3" "$workflow_file"; then
    echo "  ✓ S3 PDF upload step added"
    checks_passed=$((checks_passed + 1))
else
    echo "  ✗ S3 PDF upload step missing"
fi

# Check 5: CloudFront invalidation includes /resources/*
checks_total=$((checks_total + 1))
if grep -q "/resources/\*" "$workflow_file"; then
    echo "  ✓ CloudFront invalidation includes /resources/*"
    checks_passed=$((checks_passed + 1))
else
    echo "  ✗ CloudFront invalidation missing /resources/*"
fi

# Check 6: Pandoc command present
checks_total=$((checks_total + 1))
if grep -q "pandoc" "$workflow_file"; then
    echo "  ✓ Pandoc command present"
    checks_passed=$((checks_passed + 1))
else
    echo "  ✗ Pandoc command missing"
fi

# Check 7: PDF output directory
checks_total=$((checks_total + 1))
if grep -q "out/resources/pdfs" "$workflow_file"; then
    echo "  ✓ PDF output directory configured"
    checks_passed=$((checks_passed + 1))
else
    echo "  ✗ PDF output directory missing"
fi

echo ""
echo "======================================================================"
echo "Results: $checks_passed/$checks_total checks passed"
echo "======================================================================"

if [ $checks_passed -eq $checks_total ]; then
    echo ""
    echo "✅ Phase 17 implementation is COMPLETE!"
    echo ""
    echo "GitHub Actions workflow updated:"
    echo "  • Pandoc installation (with LaTeX)"
    echo "  • PDF generation from markdown"
    echo "  • S3 upload for PDFs"
    echo "  • CloudFront cache invalidation"
    echo ""
    echo "✨ Ready for Phase 18: Dynamic Resources Page"
    exit 0
else
    echo ""
    echo "❌ Phase 17 implementation is INCOMPLETE"
    exit 1
fi
