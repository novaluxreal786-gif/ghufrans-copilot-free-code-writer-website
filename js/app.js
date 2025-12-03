// Application Logic

// Toggle Sidebar
function toggleSidebar() {
    const sidebarMenu = document.querySelector('.sidebar-menu');
    if (sidebarMenu) {
        sidebarMenu.classList. toggle('active');
    }
}

// Switch Tabs
function switchTab(e, tabName) {
    e. preventDefault();

    // Hide all tabs
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => tab.classList.remove('active'));

    // Remove active class from all menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => item.classList.remove('active'));

    // Show selected tab
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList. add('active');
    }

    // Add active class to clicked menu item
    event.target.closest('.menu-item').classList.add('active');

    // Update page title
    const titles = {
        chat: 'Chat with Copilot',
        categories: 'Categories',
        history: 'Chat History',
        settings: 'Settings'
    };
    document.getElementById('pageTitle').textContent = titles[tabName] || 'Dashboard';

    // Close sidebar on mobile
    const sidebarMenu = document.querySelector('.sidebar-menu');
    if (sidebarMenu && window.innerWidth <= 768) {
        sidebarMenu. classList.remove('active');
    }
}

// Send Message
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (! message) return;

    // Add user message
    addMessage(message, 'user');

    // Clear input
    messageInput.value = '';
    messageInput.style.height = 'auto';

    // Simulate AI response
    setTimeout(() => {
        const response = generateResponse(message);
        addMessage(response, 'bot');
    }, 500);
}

// Add Message to Chat
function addMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = `<p>${escapeHtml(text)}</p>`;

    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages. scrollHeight;

    // Add to history
    addToHistory(text);
}

// Generate AI Response
function generateResponse(userMessage) {
    const responses = {
        hello: 'Hello! How can I help you with your coding today?',
        html: 'HTML is the markup language used to create web pages.  Would you like to learn about HTML elements, structure, or semantic markup?',
        css: 'CSS is used for styling HTML elements. I can help you with layouts, flexbox, grid, animations, and responsive design.  What specifically would you like to learn? ',
        javascript: 'JavaScript is a powerful programming language for web development. I can help with variables, functions, DOM manipulation, async operations, and more. What interests you? ',
        python: 'Python is a versatile programming language great for beginners and professionals.  I can help with syntax, functions, data structures, and web development with Python.  What would you like to know?',
        code: 'I\'d be happy to help you with code! Please provide more details about what you\'re trying to build or fix.',
        help: 'I\'m here to help!  You can ask me about HTML, CSS, JavaScript, Python, React, Node.js, and more. What would you like to learn? ',
        default: 'That\'s an interesting question! Could you provide more details so I can give you a better answer?'
    };

    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(responses)) {
        if (lowerMessage.includes(key)) {
            return response;
        }
    }

    return responses.default;
}

// Add to History
function addToHistory(message) {
    const historyList = document.getElementById('historyList');
    
    // Remove empty state if present
    const emptyState = historyList.querySelector('.empty-state');
    if (emptyState) {
        emptyState. remove();
    }

    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    historyItem.style.cssText = `
        padding: 15px 20px;
        border-bottom: 1px solid var(--border-color);
        cursor: pointer;
        transition: background 0.3s ease;
    `;
    historyItem.textContent = message. substring(0, 50) + (message.length > 50 ?  '...' : '');
    historyItem.onmouseover = () => historyItem.style.background = 'var(--light-bg)';
    historyItem. onmouseout = () => historyItem.style.background = 'transparent';
    historyItem.onclick = () => {
        document.getElementById('messageInput').value = message;
    };

    historyList.insertBefore(historyItem, historyList.firstChild);
}

// Quick Action
function quickAction(language) {
    const sampleCode = {
        html: `<!DOCTYPE html>
<html>
<head>
    <title>Sample Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>`,
        css: `body {
    font-family: Arial, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    margin: 0;
    padding: 20px;
}`,
        js: `function greet(name) {
    return \`Hello, \${name}!\`;
}

console.log(greet('Copilot'));`,
        python: `def greet(name):
    return f"Hello, {name}!"

print(greet("Copilot"))`
    };

    const code = sampleCode[language] || 'Code example not available';
    addMessage(`Here's a sample ${language. toUpperCase()} code:\n\n\`\`\`${language}\n${code}\n\`\`\``, 'bot');
}

// Open Category
function openCategory(category) {
    const message = `Show me examples and tutorials for ${category. toUpperCase()}`;
    const messageInput = document.getElementById('messageInput');
    messageInput.value = message;
    
    // Switch to chat tab
    const chatTab = document. querySelector('[onclick*="chat"]');
    if (chatTab) {
        chatTab.click();
    }
    
    // Send message
    setTimeout(() => {
        sendMessage();
    }, 100);
}

// Escape HTML
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Format Code in Messages
function formatCodeInMessages() {
    const messages = document. querySelectorAll('.message-content p');
    messages.forEach(msg => {
        msg.innerHTML = msg.innerHTML.replace(/\`([^`]+)\`/g, '<code style="background: #f0f0f0; padding: 2px 6px; border-radius: 3px; font-family: monospace;">$1</code>');
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set default active menu item
    const chatMenuItem = document.querySelector('[onclick*="chat"]');
    if (chatMenuItem) {
        chatMenuItem.classList.add('active');
    }

    // Initialize chat with welcome message
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages && chatMessages.children.length === 0) {
        addMessage('👋 Hello! I\'m Ghufran\'s Copilot.  How can I help you with your code today?', 'bot');
    }
});

// Responsive sidebar toggle for mobile
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        const sidebarMenu = document.querySelector('. sidebar-menu');
        if (sidebarMenu) {
            sidebarMenu.classList.remove('active');
        }
    }
});