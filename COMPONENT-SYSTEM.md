# Canvas Wonderland Component System

This document explains how the component system works for Canvas Wonderland website. The component system allows you to maintain consistent header and footer elements across all pages without having to duplicate code.

## How It Works

The component system uses JavaScript to load shared HTML components (header and footer) into placeholder elements on each page. This approach:

1. Reduces duplication across files
2. Makes site-wide changes easier (update once, apply everywhere)
3. Maintains consistency across all pages
4. Ensures mobile menu functionality works identically across the site

## File Structure

- `includes/header.html`: Contains the header HTML
- `includes/footer.html`: Contains the footer HTML
- `js/components.js`: JavaScript that loads the components
- `template.html`: Example template for creating new pages

## How to Use

### For All Pages (Required)

1. Include the components.js script in your HTML file:
   ```html
   <script src="js/components.js" defer></script>
   ```

2. Add placeholder elements for the header and footer:
   ```html
   <!-- Header Placeholder -->
   <div id="site-header"></div>
   
   <!-- Your page content here -->
   
   <!-- Footer Placeholder -->
   <div id="site-footer"></div>
   ```

### Creating New Pages

1. Copy `template.html` and rename it to your new page name (e.g., `new-page.html`)
2. Update the title, description, and content as needed
3. Add any additional CSS or JavaScript if required
4. **Important**: Make sure to keep the header and footer placeholders

## Making Changes to Components

### To update the header:

1. Edit `includes/header.html`
2. Save the file
3. The changes will be automatically applied to all pages using the component system

### To update the footer:

1. Edit `includes/footer.html` 
2. Save the file
3. The changes will be automatically applied to all pages using the component system

## Mobile Menu Functionality

The mobile hamburger menu toggle is implemented within the component system:

1. The header component contains the menu toggle HTML structure
2. The `components.js` file handles the click event and toggling the active class
3. This ensures consistent mobile menu behavior across all pages

## Active Navigation Links

The system automatically highlights the current page in the navigation menu. This works by detecting the current page filename and adding the "active" class to the corresponding navigation link.

## Best Practices

1. **Use the component system for all pages**: Even performance-critical pages like the homepage should use the component system
2. **Don't duplicate header/footer code**: Never hardcode the header or footer directly into your HTML
3. **Keep JavaScript organized**: Any page-specific JavaScript should be in separate files, not mixed with component functionality

## Troubleshooting

If components are not loading properly:

1. Make sure `components.js` is included in your HTML file
2. Check that the placeholder `<div id="site-header"></div>` and `<div id="site-footer"></div>` elements exist
3. Verify that your web server is properly configured to serve the included files
4. Check your browser's console for any JavaScript errors
5. For mobile menu issues, check that `components.js` is loaded before any other scripts that might interact with the menu

## Common Issues and Solutions

### Mobile Menu Not Working
- Ensure components.js is loaded before other scripts
- Check for JavaScript errors in console
- Verify that the menu structure matches what's expected in components.js

### Inconsistent Header/Footer Appearance
- Make sure all pages are using the component system
- Check if any page-specific CSS is overriding component styles
- Ensure the component placeholders are in the correct locations in the DOM

## Important Notes

- This system requires JavaScript to be enabled in the browser
- For users with JavaScript disabled, consider adding a `<noscript>` tag with a message or providing server-side fallbacks
- When testing locally, you may need to use a local server (due to CORS restrictions when loading local files)
- Never hardcode the header or footer directly into your HTML files, even for performance-critical pages