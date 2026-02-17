#!/bin/bash

# PDF Generation Script for CloudNestle Resources
# Generates PDFs from markdown files in content/resources/

set -e

CONTENT_DIR="content/resources"
OUTPUT_DIR="out/resources/pdfs"
ERRORS=0

echo "======================================================================"
echo "CloudNestle PDF Generator"
echo "======================================================================"
echo ""

# Check if pandoc is installed
if ! command -v pandoc &> /dev/null; then
    echo "❌ Error: pandoc is not installed"
    echo "Install with: sudo apt-get install pandoc texlive-latex-base texlive-fonts-recommended texlive-latex-extra"
    exit 1
fi

echo "✓ Pandoc found: $(pandoc --version | head -1)"
echo ""

# Create output directory
mkdir -p "$OUTPUT_DIR"
echo "✓ Output directory: $OUTPUT_DIR"
echo ""

# Count markdown files (excluding README.md)
MD_COUNT=$(find "$CONTENT_DIR" -maxdepth 1 -name "*.md" ! -name "README.md" 2>/dev/null | wc -l)

if [ "$MD_COUNT" -eq 0 ]; then
    echo "ℹ️  No resource markdown files found in $CONTENT_DIR"
    echo "   Create resources first using the content generator"
    exit 0
fi

echo "Found $MD_COUNT resource(s) to process"
echo "======================================================================"
echo ""

# Process each markdown file
for md_file in "$CONTENT_DIR"/*.md; do
    # Skip if no files found or if it's README.md
    if [ ! -f "$md_file" ] || [ "$(basename "$md_file")" = "README.md" ]; then
        continue
    fi
    
    slug=$(basename "$md_file" .md)
    output_file="$OUTPUT_DIR/${slug}.pdf"
    
    echo "Processing: $slug"
    
    # Generate PDF with pandoc
    if pandoc "$md_file" \
        -o "$output_file" \
        --pdf-engine=pdflatex \
        -V geometry:margin=1in \
        -V fontsize=11pt \
        -V documentclass=article \
        --toc \
        --highlight-style=tango \
        2>/dev/null; then
        
        # Get file size
        size=$(du -h "$output_file" | cut -f1)
        echo "  ✓ Generated: $output_file ($size)"
    else
        echo "  ✗ Failed to generate PDF for $slug"
        ERRORS=$((ERRORS + 1))
    fi
    echo ""
done

echo "======================================================================"
echo "Summary"
echo "======================================================================"
echo "Total resources: $MD_COUNT"
echo "Successful: $((MD_COUNT - ERRORS))"
echo "Failed: $ERRORS"
echo ""

if [ "$ERRORS" -eq 0 ]; then
    echo "✅ All PDFs generated successfully!"
    echo ""
    echo "PDFs saved to: $OUTPUT_DIR"
    ls -lh "$OUTPUT_DIR"
    exit 0
else
    echo "⚠️  Some PDFs failed to generate"
    exit 1
fi
