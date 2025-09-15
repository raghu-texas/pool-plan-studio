// Pool plans data
const popularPlans = [
    {
        id: 1,
        name: "Azure Infinity",
        images: [
            "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1566842600175-97dca489844f?w=800&h=600&fit=crop"
        ],
        tags: ["Infinity Edge", "Modern", "Luxury"],
        category: "Modern",
        style: "High End",
        shape: "Infinity Edge",
        function: "Entertaining",
        dimensions: "40' x 20'",
        price: "$299",
        rating: 4.9,
        reviews: 127,
        featured: true,
        specialFeatures: ["Tanning Ledge", "Water Features"]
    },
    {
        id: 2,
        name: "Resort Paradise",
        images: [
            "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1571268929207-d3298a5a8b28?w=800&h=600&fit=crop"
        ],
        tags: ["Entertaining", "Spa", "Large"],
        category: "Entertaining",
        style: "High End",
        shape: "Freeform",
        function: "With Spa",
        dimensions: "50' x 25'",
        price: "$449",
        rating: 4.8,
        reviews: 89,
        featured: false,
        specialFeatures: ["Swim-up Bar", "Spa", "Rock Accents"]
    },
    {
        id: 3,
        name: "Modern Zen",
        images: [
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=800&h=600&fit=crop"
        ],
        tags: ["Modern", "Minimalist", "Spa"],
        category: "Modern",
        style: "Modern",
        shape: "Geometric",
        function: "With Spa",
        dimensions: "35' x 18'",
        price: "$199",
        rating: 4.7,
        reviews: 156,
        featured: true,
        specialFeatures: ["Sundeck", "Minimalist Design"]
    },
    {
        id: 4,
        name: "Family Fun Pool",
        images: [
            "https://images.unsplash.com/photo-1565985050384-a5dff2a6e7c0?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop"
        ],
        tags: ["Family", "Play", "Slide"],
        category: "Family",
        style: "Classic",
        shape: "Freeform",
        function: "Play",
        dimensions: "45' x 30'",
        price: "$349",
        rating: 4.9,
        reviews: 203,
        featured: false,
        specialFeatures: ["Slide", "Jump Rock", "Play Area"]
    },
    {
        id: 5,
        name: "Tropical Escape",
        images: [
            "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1571268929207-d3298a5a8b28?w=800&h=600&fit=crop"
        ],
        tags: ["Tropical", "Rock Features", "Waterfall"],
        category: "Tropical",
        style: "Classic",
        shape: "Freeform",
        function: "Entertaining",
        dimensions: "38' x 22'",
        price: "$379",
        rating: 4.8,
        reviews: 94,
        featured: true,
        specialFeatures: ["Waterfall", "Rock Features", "Tropical Design"]
    },
    {
        id: 6,
        name: "Urban Oasis",
        images: [
            "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop"
        ],
        tags: ["Urban", "Compact", "Modern"],
        category: "Modern",
        style: "Simple",
        shape: "Geometric",
        function: "Without Spa",
        dimensions: "25' x 15'",
        price: "$159",
        rating: 4.6,
        reviews: 78,
        featured: false,
        specialFeatures: ["Compact Design", "Urban Style"]
    }
];

// Filter state
let currentFilters = {
    category: "All Categories",
    style: "All Styles",
    shape: "All Shapes",
    function: "All Functions",
    specialFeatures: "All Features"
};

// DOM elements
const plansGrid = document.getElementById('plans-grid');
const resultsCount = document.getElementById('results-count');
const modal = document.getElementById('plan-modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');
const clearFiltersBtn = document.getElementById('clear-filters');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    renderPlans();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Category buttons
    const categoryButtons = document.querySelectorAll('.btn-category');
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            currentFilters.category = category;
            
            // Update active state
            categoryButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            renderPlans();
        });
    });

    // Filter selects
    const styleFilter = document.getElementById('style-filter');
    const shapeFilter = document.getElementById('shape-filter');
    const functionFilter = document.getElementById('function-filter');
    const featuresFilter = document.getElementById('features-filter');

    styleFilter.addEventListener('change', function() {
        currentFilters.style = this.value;
        renderPlans();
    });

    shapeFilter.addEventListener('change', function() {
        currentFilters.shape = this.value;
        renderPlans();
    });

    functionFilter.addEventListener('change', function() {
        currentFilters.function = this.value;
        renderPlans();
    });

    featuresFilter.addEventListener('change', function() {
        currentFilters.specialFeatures = this.value;
        renderPlans();
    });

    // Clear filters
    clearFiltersBtn.addEventListener('click', function() {
        currentFilters = {
            category: "All Categories",
            style: "All Styles",
            shape: "All Shapes",
            function: "All Functions",
            specialFeatures: "All Features"
        };
        
        // Reset UI
        document.querySelector('.btn-category.active').classList.remove('active');
        document.querySelector('[data-category="All Categories"]').classList.add('active');
        
        styleFilter.value = "All Styles";
        shapeFilter.value = "All Shapes";
        functionFilter.value = "All Functions";
        featuresFilter.value = "All Features";
        
        renderPlans();
    });

    // Modal close
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Filter plans
function filterPlans() {
    return popularPlans.filter(plan => {
        return (
            (currentFilters.category === "All Categories" || plan.category === currentFilters.category) &&
            (currentFilters.style === "All Styles" || plan.style === currentFilters.style) &&
            (currentFilters.shape === "All Shapes" || plan.shape === currentFilters.shape) &&
            (currentFilters.function === "All Functions" || plan.function === currentFilters.function) &&
            (currentFilters.specialFeatures === "All Features" || plan.specialFeatures.includes(currentFilters.specialFeatures))
        );
    });
}

// Render plans
function renderPlans() {
    const filteredPlans = filterPlans();
    
    // Update results count
    resultsCount.textContent = filteredPlans.length;
    
    // Clear grid
    plansGrid.innerHTML = '';
    
    // Render each plan
    filteredPlans.forEach((plan, index) => {
        const planElement = createPlanElement(plan, index);
        plansGrid.appendChild(planElement);
    });
}

// Create plan element
function createPlanElement(plan, index) {
    const card = document.createElement('div');
    card.className = 'pool-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
        <div class="card-image">
            <img src="${plan.images[0]}" alt="${plan.name}" />
            
            <!-- Overlay -->
            <div class="card-overlay">
                <button class="overlay-btn" onclick="showPlanDetails(${plan.id})">
                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                </button>
                <button class="overlay-btn">
                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                </button>
            </div>

            <!-- Featured Badge -->
            ${plan.featured ? '<div class="featured-badge">Featured</div>' : ''}

            <!-- Rating -->
            <div class="rating-badge">
                <svg class="rating-star" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span class="rating-text">${plan.rating}</span>
            </div>

            <!-- Image dots -->
            <div class="image-dots">
                ${plan.images.map(() => '<div class="dot"></div>').join('')}
            </div>
        </div>

        <div class="card-content">
            <!-- Tags -->
            <div class="tags">
                ${plan.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>

            <!-- Plan name -->
            <h3 class="plan-name">${plan.name}</h3>

            <!-- Details -->
            <div class="plan-details">
                <span>${plan.dimensions}</span>
                <span>${plan.reviews} reviews</span>
            </div>

            <!-- Price section -->
            <div class="price-section">
                <div class="price">${plan.price}</div>
                <div class="category">${plan.category}</div>
            </div>

            <!-- Actions -->
            <div class="card-actions">
                <button class="btn btn-outline btn-sm" onclick="showPlanDetails(${plan.id})">
                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    View Details
                </button>
                <button class="btn btn-premium btn-sm" onclick="addToCart(${plan.id})">
                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5-5M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z"></path>
                    </svg>
                    Add to Cart
                </button>
            </div>
        </div>
    `;

    // Image hover effect for multiple images
    const img = card.querySelector('.card-image img');
    let currentImageIndex = 0;

    card.addEventListener('mouseenter', function() {
        const imageInterval = setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % plan.images.length;
            img.src = plan.images[currentImageIndex];
        }, 1000);

        card.addEventListener('mouseleave', function() {
            clearInterval(imageInterval);
            currentImageIndex = 0;
            img.src = plan.images[0];
        }, { once: true });
    });

    return card;
}

// Show plan details in modal
function showPlanDetails(planId) {
    const plan = popularPlans.find(p => p.id === planId);
    if (!plan) return;

    modalTitle.textContent = plan.name;
    modalBody.innerHTML = `
        <div style="margin-bottom: 1.5rem;">
            <img src="${plan.images[0]}" alt="${plan.name}" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.5rem;">
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
            <div>
                <h4 style="font-weight: 600; margin-bottom: 0.5rem;">Dimensions</h4>
                <p style="color: hsl(215.4, 16.3%, 46.9%);">${plan.dimensions}</p>
            </div>
            <div>
                <h4 style="font-weight: 600; margin-bottom: 0.5rem;">Category</h4>
                <p style="color: hsl(215.4, 16.3%, 46.9%);">${plan.category}</p>
            </div>
            <div>
                <h4 style="font-weight: 600; margin-bottom: 0.5rem;">Style</h4>
                <p style="color: hsl(215.4, 16.3%, 46.9%);">${plan.style}</p>
            </div>
            <div>
                <h4 style="font-weight: 600; margin-bottom: 0.5rem;">Shape</h4>
                <p style="color: hsl(215.4, 16.3%, 46.9%);">${plan.shape}</p>
            </div>
        </div>
        <div style="margin-bottom: 1.5rem;">
            <h4 style="font-weight: 600; margin-bottom: 0.5rem;">Special Features</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                ${plan.specialFeatures.map(feature => `<span class="tag">${feature}</span>`).join('')}
            </div>
        </div>
        <div style="margin-bottom: 1.5rem;">
            <h4 style="font-weight: 600; margin-bottom: 0.5rem;">Rating & Reviews</h4>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <svg class="rating-star" style="width: 1.25rem; height: 1.25rem;" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span style="font-weight: 600;">${plan.rating}</span>
                <span style="color: hsl(215.4, 16.3%, 46.9%);">(${plan.reviews} reviews)</span>
            </div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: hsl(210, 40%, 98%); border-radius: 0.5rem;">
            <div>
                <div style="font-size: 1.5rem; font-weight: 700; color: hsl(221.2, 83.2%, 53.3%);">${plan.price}</div>
                <div style="font-size: 0.875rem; color: hsl(215.4, 16.3%, 46.9%);">One-time purchase</div>
            </div>
            <button class="btn btn-premium" onclick="addToCart(${plan.id}); closeModal();">
                Add to Cart
            </button>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Add to cart (placeholder)
function addToCart(planId) {
    const plan = popularPlans.find(p => p.id === planId);
    if (!plan) return;

    // Simple toast notification
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: hsl(142.1, 76.2%, 36.3%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.3);
        z-index: 2000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    toast.innerHTML = `
        <div style="font-weight: 600; margin-bottom: 0.25rem;">Added to Cart</div>
        <div style="font-size: 0.875rem; opacity: 0.9;">${plan.name} has been added to your cart.</div>
    `;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);

    console.log('Added to cart:', plan.name);
}