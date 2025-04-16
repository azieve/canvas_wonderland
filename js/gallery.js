document.addEventListener('DOMContentLoaded', function() {
    // Gallery filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Set up filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter the gallery items
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    // Trigger animation
                    item.style.animation = 'none';
                    setTimeout(() => {
                        item.style.animation = 'fadeIn 0.5s ease';
                    }, 10);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Modal functionality
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');
    const closeModal = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    
    let currentIndex = 0;
    let visibleItems = [];
    
    // Function to update visible items array
    function updateVisibleItems() {
        visibleItems = [];
        galleryItems.forEach((item, index) => {
            if (item.style.display !== 'none') {
                visibleItems.push({
                    index: index,
                    src: item.querySelector('img').src,
                    title: item.querySelector('h3').textContent,
                    desc: item.querySelector('p').textContent
                });
            }
        });
    }
    
    // Open modal when clicking on view button
    document.querySelectorAll('.view-btn').forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            updateVisibleItems();
            
            // Find the index in visible items array
            const itemSrc = this.getAttribute('href');
            currentIndex = visibleItems.findIndex(item => item.src.includes(itemSrc.split('/').pop()));
            
            modal.style.display = 'block';
            modalImg.src = visibleItems[currentIndex].src;
            captionText.innerHTML = `<h3>${visibleItems[currentIndex].title}</h3><p>${visibleItems[currentIndex].desc}</p>`;
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Click outside to close
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Escape key to close
    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
    
    // Previous image
    prevBtn.addEventListener('click', function() {
        if (visibleItems.length > 0) {
            currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
            modalImg.src = visibleItems[currentIndex].src;
            captionText.innerHTML = `<h3>${visibleItems[currentIndex].title}</h3><p>${visibleItems[currentIndex].desc}</p>`;
        }
    });
    
    // Next image
    nextBtn.addEventListener('click', function() {
        if (visibleItems.length > 0) {
            currentIndex = (currentIndex + 1) % visibleItems.length;
            modalImg.src = visibleItems[currentIndex].src;
            captionText.innerHTML = `<h3>${visibleItems[currentIndex].title}</h3><p>${visibleItems[currentIndex].desc}</p>`;
        }
    });
    
    // Arrow keys for navigation
    window.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            }
        }
    });
    
    // Update the active menu item
    const navLinks = document.querySelectorAll('nav ul li a');
    const currentPage = window.location.pathname.split('/').pop();
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
});