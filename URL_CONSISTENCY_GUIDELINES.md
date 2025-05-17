# URL Consistency Guidelines for Canvas Wonderland

This document outlines the guidelines for maintaining URL consistency across the Canvas Wonderland website to improve SEO performance and ensure proper indexing by search engines.

## Domain Consistency

### WWW vs Non-WWW

1. **Official Domain Format**: Always use `www.canvaswonderland.com` as the primary domain format for all new content and internal links.

2. **Internal Links**: All internal links within the website should consistently use the WWW version:
   - Correct: `https://www.canvaswonderland.com/gallery.html`
   - Avoid: `https://canvaswonderland.com/gallery.html`

3. **Sitemap Entries**: All entries in the sitemap.xml file should use the WWW version for consistency.

4. **Server Configuration**: Ensure that the server is configured to redirect non-WWW URLs to their WWW equivalents (301 redirect).

## Protocol Consistency

1. **Always Use HTTPS**: All URLs should use the HTTPS protocol instead of HTTP.
   - Correct: `https://www.canvaswonderland.com/`
   - Avoid: `http://www.canvaswonderland.com/`

2. **Redirect HTTP to HTTPS**: Configure server to automatically redirect HTTP requests to HTTPS.

## Trailing Slashes

1. **Consistency Rule**: Choose one format (with or without trailing slashes) and stick to it.
   - Our standard: Do not use trailing slashes for HTML files
   - Correct: `https://www.canvaswonderland.com/about.html`
   - Avoid: `https://www.canvaswonderland.com/about.html/`

## URL Structure

1. **Use Hyphens for Separation**: When creating new pages, use hyphens (-) to separate words in URLs, not underscores (_) or spaces.
   - Correct: `blog-new-painting.html`
   - Avoid: `blog_new_painting.html` or `blognewpainting.html`

2. **Lowercase URLs**: All URLs should be lowercase to avoid confusion.
   - Correct: `https://www.canvaswonderland.com/our-story.html`
   - Avoid: `https://www.canvaswonderland.com/Our-Story.html`

## Canonicalization

1. **Canonical Tags**: Implement canonical tags in the HTML head of each page to indicate the preferred version of a URL:
   ```html
   <link rel="canonical" href="https://www.canvaswonderland.com/page.html" />
   ```

2. **Update Template**: Ensure the canonical tag is included in the site's template and automatically populated with the correct URL.

## Checking and Maintaining Consistency

1. **Pre-Deployment Check**: Before uploading any new content, run the `pre-deploy.sh` script to ensure URL consistency.

2. **Regular Audits**: Conduct quarterly URL structure audits to identify and fix any inconsistencies.

3. **Link Checking**: Use tools like Screaming Frog or similar to check for broken links and URL consistency issues.

## Implementation in Components

When using the component system:

1. Update `includes/header.html` to ensure all navigation links use the WWW version.
2. Update any JavaScript that dynamically generates URLs to follow these guidelines.

Following these guidelines will help improve search engine visibility and ensure that all pages are properly indexed.