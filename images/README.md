# Images Directory

This directory contains all images for the Canvas Wonderland website.

## Structure

- `/optimized` - Contains optimized images with proper sizes and formats
  - `/mobile` - Mobile-optimized images (375px width)
  - `/small` - Small images (480px width)
  - `/medium` - Medium images (768px width)
  - Large images are placed directly in the `/optimized` directory

## Image Optimization Guidelines

1. All images should be optimized for web
2. Use WebP format with JPEG fallback
3. Follow responsive image implementation as described in RESPONSIVE_IMAGES.md
4. Target file sizes:
   - Hero image: Max 300KB
   - Feature images: Max 100KB
   - Gallery thumbnails: Max 80KB
