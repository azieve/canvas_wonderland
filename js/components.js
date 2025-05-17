// Function to insert header and footer content
document.addEventListener('DOMContentLoaded', function() {
    // Function to load HTML content using XMLHttpRequest
    function loadHTML(url, targetElement) {
        const xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                targetElement.innerHTML = this.responseText;
                
                // If this is the header, handle the active navigation state and header scroll
                if (targetElement.id === 'site-header') {
                    // Set active class for current page
                    const currentPage = window.location.pathname.split('/').pop();
                    if (currentPage === '' || currentPage === 'index.html') {
                        const navHome = document.getElementById('nav-home');
                        if (navHome) navHome.classList.add('active');
                    } else if (currentPage.includes('about')) {
                        const navAbout = document.getElementById('nav-about');
                        if (navAbout) navAbout.classList.add('active');
                    } else if (currentPage.includes('gallery')) {
                        const navGallery = document.getElementById('nav-gallery');
                        if (navGallery) navGallery.classList.add('active');
                    } else if (currentPage.includes('blog') && !currentPage.includes('our-story')) {
                        const navBlog = document.getElementById('nav-blog');
                        if (navBlog) navBlog.classList.add('active');
                    } else if (currentPage.includes('our-story')) {
                        const navOurStory = document.getElementById('nav-our-story');
                        if (navOurStory) navOurStory.classList.add('active');
                    } else if (currentPage.includes('contact')) {
                        const navContact = document.getElementById('nav-contact');
                        if (navContact) navContact.classList.add('active');
                    }
                    
                    // Initialize mobile menu toggle
                    const menuToggle = document.querySelector('.menu-toggle');
                    const nav = document.querySelector('nav ul');
                    
                    if (menuToggle && nav) {
                        menuToggle.addEventListener('click', function() {
                            const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
                            menuToggle.setAttribute('aria-expanded', !expanded);
                            nav.classList.toggle('active');
                        });
                    }
                    
                    // Reinitialize header scroll behavior
                    initHeaderScrollBehavior();
                }
            } else if (this.readyState === 4) {
                // Handle error - display a fallback if the component can't be loaded
                console.error('Failed to load component from: ' + url);
                
                if (targetElement.id === 'site-header') {
                    targetElement.innerHTML = `
                    <header>
                        <div class="container">
                            <div class="logo">
                                <a href="index.html">
                                    <img src="images/logo-white.svg" alt="Canvas Wonderland Logo" class="site-logo" width="120" height="60">
                                </a>
                                <div class="logo-content">
                                    <p>Transforming Imagination into Art</p>
                                </div>
                            </div>
                            <nav aria-label="Main Navigation">
                                <ul>
                                    <li><a href="index.html" id="nav-home">Home</a></li>
                                    <li><a href="about.html" id="nav-about">About</a></li>
                                    <li><a href="gallery.html" id="nav-gallery">Gallery</a></li>
                                    <li><a href="blog.html" id="nav-blog">Blog</a></li>
                                    <li><a href="our-story.html" id="nav-our-story">Our Story</a></li>
                                    <li><a href="contact.html" id="nav-contact">Contact</a></li>
                                </ul>
                            </nav>
                            <div class="menu-toggle" aria-expanded="false" aria-controls="mobile-menu" aria-label="Toggle Mobile Menu">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </header>`;
                    
                    // Reinitialize header scroll behavior with the fallback
                    initHeaderScrollBehavior();
                } else if (targetElement.id === 'site-footer') {
                    targetElement.innerHTML = `
                    <footer>
                        <div class="container">
                            <div class="footer-content">
                                <div class="footer-logo">
                                    <h3>Canvas Wonderland</h3>
                                    <p>Transforming Imagination into Art</p>
                                </div>
                                <div class="footer-links">
                                    <h4>Quick Links</h4>
                                    <ul>
                                        <li><a href="index.html">Home</a></li>
                                        <li><a href="about.html">About</a></li>
                                        <li><a href="gallery.html">Gallery</a></li>
                                        <li><a href="blog.html">Blog</a></li>
                                        <li><a href="our-story.html">Our Story</a></li>
                                        <li><a href="contact.html">Contact</a></li>
                                    </ul>
                                </div>
                                <div class="footer-contact">
                                    <h4>Contact Us</h4>
                                    <p>Email: <a href="mailto:info@canvaswonderland.com">info@canvaswonderland.com</a></p>
                                    <p>Phone: <a href="tel:+15551234567">(555) 123-4567</a></p>
                                    <div class="social-links" aria-label="Social Media Links">
                                        <a href="#" aria-label="Facebook"><span class="social-icon">Facebook</span></a>
                                        <a href="#" aria-label="Instagram"><span class="social-icon">Instagram</span></a>
                                        <a href="#" aria-label="Twitter"><span class="social-icon">Twitter</span></a>
                                    </div>
                                </div>
                            </div>
                            <div class="copyright">
                                <p>&copy; 2025 Canvas Wonderland. All Rights Reserved. <a href="terms-conditions.html">Terms & Conditions</a> | <a href="privacy-policy.html">Privacy Policy</a></p>
                            </div>
                        </div>
                    </footer>`;
                }
            }
        };
        
        xhr.open('GET', url, true);
        xhr.send();
    }
    
    // Function to initialize header scroll behavior
    function initHeaderScrollBehavior() {
        const header = document.querySelector('header');
        
        if (header) {
            // Apply scroll listener
            window.addEventListener('scroll', function() {
                if (window.scrollY > 100) {
                    header.classList.add('header-scrolled');
                } else {
                    header.classList.remove('header-scrolled');
                }
            });
            
            // Check scroll position on load
            if (window.scrollY > 100) {
                header.classList.add('header-scrolled');
            }
        }
    }
    
    // Insert header
    const headerElement = document.querySelector('#site-header');
    if (headerElement) {
        loadHTML('includes/header.html', headerElement);
    }
    
    // Insert footer
    const footerElement = document.querySelector('#site-footer');
    if (footerElement) {
        loadHTML('includes/footer.html', footerElement);
    }
});