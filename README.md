# Canvas Wonderland

Website for Canvas Wonderland, showcasing AI-designed art hand-painted in oils.

## About

Canvas Wonderland specializes in abstract impressionist style paintings. The brush strokes are often thick, and you can see the oils. The images are suggestions and abstract, and not crisp.

## Development Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/canvas_wonderland.git
   cd canvas_wonderland
   ```

2. Run a local server:
   ```
   python -m http.server 8000
   ```

3. Visit http://localhost:8000 in your browser

## Deployment

1. Make sure to run pre-deployment checks:
   ```
   ./pre-deploy.sh
   ```

2. Merge changes to the main branch:
   ```
   git checkout main
   git merge development
   git push origin main
   ```

3. Deploy via FTP to www.canvaswonderland.com

## File Structure

- `includes/` - Contains header and footer components
- `css/` - Stylesheets
- `js/` - JavaScript files
- `images/` - Image assets

## Best Practices

Refer to documentation files for more information:
- COMPONENT-SYSTEM.md
- GALLERY_PERFORMANCE_IMPROVEMENTS.md
- OPTIMIZATION_CHANGES.md
- PERFORMANCE_NOTES.md
- RESPONSIVE_IMAGES.md
- URL_CONSISTENCY_GUIDELINES.md
