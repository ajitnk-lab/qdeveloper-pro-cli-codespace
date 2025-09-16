#!/bin/bash

set -e

echo "🧹 Clearing cache and cleaning build..."
rm -rf .next out node_modules/.cache

echo "📦 Installing dependencies..."
npm ci

echo "🔨 Building static site..."
npm run build

echo "🚀 Starting server on port 3005..."
npx serve out -p 3005
.