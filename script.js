// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initRadishApp();
});

// Initialize Radish application
function initRadishApp() {
    console.log('Radish app initialized');
    bindEventListeners();
}

// Bind event listeners
function bindEventListeners() {
    // Post button click
    const postBtn = document.querySelector('.post-btn');
    if (postBtn) {
        postBtn.addEventListener('click', handlePost);
    }

    // Action buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', handleAction);
    });

    // Search functionality
    const searchInput = document.querySelector('input[type="text"]');
    if (searchInput) {
        searchInput.addEventListener('keypress', handleSearch);
    }

    // Category clicks
    const categories = document.querySelectorAll('.category-item');
    categories.forEach(category => {
        category.addEventListener('click', function() {
            categories.forEach(cat => cat.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Handle post creation
function handlePost() {
    const textarea = document.querySelector('textarea');
    const postContent = textarea.value.trim();
    
    if (postContent === '') {
        alert('Please enter your review or food recommendation!');
        return;
    }

    // Create new post
    const newPost = createPostElement(postContent);
    
    // Add to feed
    const feed = document.querySelector('.feed');
    feed.insertBefore(newPost, feed.firstChild);
    
    // Clear textarea
    textarea.value = '';
    
    // Show success message
    showNotification('Post published successfully!');
}

// Create post element
function createPostElement(content) {
    const post = document.createElement('div');
    post.className = 'post';
    
    const hoursAgo = Math.floor(Math.random() * 24);
    
    post.innerHTML = `
        <div class="post-header">
            <img src="radish_icon.png" alt="User" class="post-avatar">
            <div class="post-author">
                <h4 class="author-name">New Foodie</h4>
                <span class="author-handle">@new_foodie</span>
                <span class="post-time">${hoursAgo} hours ago</span>
            </div>
        </div>
        <div class="post-content">
            <p>${content}</p>
            <img src="radish.png" alt="Food" class="post-image">
            <div class="post-stats">
                <span>❤️ 0</span>
                <span>💬 0</span>
                <span>⭐ 4.5/5.0</span>
            </div>
            <div class="post-actions">
                <button class="action-btn">❤️</button>
                <button class="action-btn">💬</button>
                <button class="action-btn">⭐</button>
                <button class="action-btn">⭐</button>
            </div>
        </div>
    `;
    
    return post;
}

// Handle action buttons
function handleAction(e) {
    const button = e.target;
    const icon = button.textContent;
    
    // Handle like button
    if (icon === '❤️') {
        button.textContent = '❤️';
        button.style.color = '#e74848';
        showNotification('Liked!');
    } else if (icon === '⭐') {
        button.textContent = '⭐';
        button.style.color = '#f5c24a';
        showNotification('Starred!');
    } else if (icon === '💬') {
        showNotification('Comments feature coming soon!');
    }
}

// Handle search
function handleSearch(e) {
    if (e.key === 'Enter') {
        const searchQuery = e.target.value.trim();
        if (searchQuery !== '') {
            showNotification(`Searching for: ${searchQuery}`);
            // Here you would add search functionality
        }
    }
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #333;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initRadishApp,
        handlePost,
        handleAction,
        handleSearch,
        showNotification
    };
}