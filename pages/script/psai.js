document.addEventListener('DOMContentLoaded', function() {
    const protocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
    const hostname = window.location.hostname || '127.0.0.1';
    const origin = (window.location.origin && window.location.origin !== 'null')
        ? window.location.origin
        : `${protocol}//${hostname}:3000`;
    const basePath = (typeof window.location.pathname === 'string' && window.location.pathname.indexOf('/PEDIASCAPE_Student_Platform-main/') === 0)
        ? '/PEDIASCAPE_Student_Platform-main'
        : '';
    
    function uniqueStrings(arr) {
        return Array.from(new Set((arr || []).filter(Boolean)));
    }

    function buildBackendOrigins() {
        const list = [origin];
        const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';

        if (isLocalhost) {
            const ports = ['3000', '3001'];
            const hosts = uniqueStrings([hostname, hostname === '127.0.0.1' ? 'localhost' : '127.0.0.1', 'localhost']);
            for (const h of hosts) {
                for (const p of ports) {
                    list.push(`${protocol}//${h}:${p}`);
                }
            }
        }

        return uniqueStrings(list);
    }

    const backendOrigins = buildBackendOrigins();

    async function postChat(body) {
        const candidates = [];
        for (const backendOrigin of backendOrigins) {
            if (basePath) candidates.push(`${backendOrigin}${basePath}/api/chatbot/chat`);
            candidates.push(`${backendOrigin}/api/chatbot/chat`);
            candidates.push(`${backendOrigin}/chatbot/chat`);
        }
        let lastError;
        for (const url of uniqueStrings(candidates)) {
            try {
                const res = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                });
                if (res.ok) return res;
                lastError = await safeReadError(res);
            } catch (e) {
                lastError = e;
            }
        }
        if (lastError) throw lastError instanceof Error ? lastError : new Error('Failed to get response');
        throw new Error('Failed to get response');
    }
    
    async function postRoadmap(body) {
        const candidates = [];
        for (const backendOrigin of backendOrigins) {
            if (basePath) candidates.push(`${backendOrigin}${basePath}/api/roadmap`);
            candidates.push(`${backendOrigin}/api/roadmap`);
        }
        let lastError;
        for (const url of uniqueStrings(candidates)) {
            try {
                const res = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                });
                if (res.ok) return res;
                lastError = await safeReadError(res);
            } catch (e) {
                lastError = e;
            }
        }
        if (lastError) throw lastError instanceof Error ? lastError : new Error('Failed to get response');
        throw new Error('Failed to get response');
    }

    async function safeReadError(res) {
        try {
            const data = await res.json();
            if (data && typeof data.error === 'string' && data.error.trim() !== '') return new Error(data.error);
        } catch (_) {}
        return new Error('Failed to get response');
    }

    // Tab switching functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to the clicked button
            this.classList.add('active');
            
            // Show the corresponding tab content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Chat functionality
    const chatMessages = document.getElementById('chat-messages');
    const questionForm = document.getElementById('question-form');
    const questionInput = document.getElementById('question-input');
    const conversationHistory = [];
    
    questionForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const question = questionInput.value.trim();
        if (!question) return;

        // Add user message to chat
        addMessage('user', question);

        // Clear input
        questionInput.value = '';

        // Add loading message
        const loadingId = addMessage('bot', 'Thinking...');

        try {
            // Send request to Hugging Face-backed PSAI Chatbot
            conversationHistory.push({ role: 'user', content: question });
            const response = await postChat({ message: question, conversationHistory });

            if (!response.ok) {
                let errorMessage = 'Failed to get response';
                try {
                    const errorData = await response.json();
                    if (errorData && typeof errorData.error === 'string' && errorData.error.trim() !== '') {
                        errorMessage = errorData.error;
                    }
                } catch (_) {
                }
                throw new Error(errorMessage);
            }

            const data = await response.json();

            // Remove loading message
            removeMessage(loadingId);

            // Add bot response to chat with enhanced formatting
            const botText = (data && data.message) ? data.message : (data && data.answer) ? data.answer : '';
            addFormattedMessage('bot', botText);
            if (botText) {
                conversationHistory.push({ role: 'assistant', content: botText });
            }
        } catch (error) {
            console.error('Error:', error);

            // Remove loading message
            removeMessage(loadingId);

            // Add error message
            addMessage('bot', error && error.message ? error.message : 'Sorry, I encountered an error processing your request. Please try again.');
        }

        // Scroll to the bottom of the chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });
    
    // Function to add a simple message to the chat
    function addMessage(type, text) {
        const messageId = 'msg-' + Date.now();
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.id = messageId;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        
        contentDiv.appendChild(paragraph);
        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to the bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        return messageId;
    }
    
    // Function to add a formatted message with proper paragraph breaks and formatting
    function addFormattedMessage(type, text) {
        const messageId = 'msg-' + Date.now();
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.id = messageId;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        // Format the message content with proper paragraphs
        const formattedContent = formatMessageContent(text);
        contentDiv.innerHTML = formattedContent;
        
        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to the bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        return messageId;
    }
    
    // Format message content with proper HTML structure
    function formatMessageContent(text) {
        // Replace double asterisks with bold tags
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Replace single asterisks with italic tags
        text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // Split text into paragraphs based on double new lines
        const paragraphs = text.split(/\n\n+/);
        
        // Process each paragraph
        const formattedParagraphs = paragraphs.map(paragraph => {
            // Check if the paragraph is a list
            if (/^[-*]\s/.test(paragraph.trim())) {
                // It's a bullet list
                const listItems = paragraph.split(/\n[-*]\s/).filter(item => item.trim() !== '');
                return '<ul>' + listItems.map(item => `<li>${item}</li>`).join('') + '</ul>';
            } else if (/^\d+\.\s/.test(paragraph.trim())) {
                // It's a numbered list
                const listItems = paragraph.split(/\n\d+\.\s/).filter(item => item.trim() !== '');
                return '<ol>' + listItems.map(item => `<li>${item}</li>`).join('') + '</ol>';
            } else if (/^#\s/.test(paragraph.trim())) {
                // It's a heading
                return '<h3>' + paragraph.replace(/^#\s/, '') + '</h3>';
            } else if (/^##\s/.test(paragraph.trim())) {
                // It's a subheading
                return '<h4>' + paragraph.replace(/^##\s/, '') + '</h4>';
            } else {
                // Replace single newlines with <br> tags within paragraphs
                let processedParagraph = paragraph.replace(/\n/g, '<br>');
                return '<p>' + processedParagraph + '</p>';
            }
        });
        
        return formattedParagraphs.join('');
    }
    
    // Function to remove a message
    function removeMessage(messageId) {
        const message = document.getElementById(messageId);
        if (message) {
            message.remove();
        }
    }
    
    // Roadmap functionality
    const roadmapForm = document.getElementById('roadmap-form');
    const roadmapLoading = document.getElementById('roadmap-loading');
    const roadmapContent = document.getElementById('roadmap-content');
    
    roadmapForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const topic = document.getElementById('topic').value.trim();
        const level = document.getElementById('level').value;
        const timeframe = document.getElementById('timeframe').value;

        if (!topic) return;

        // Show loading spinner
        roadmapLoading.style.display = 'flex';
        roadmapContent.innerHTML = '';

        try {
            const response = await postRoadmap({ topic, level, timeframe });

            if (!response.ok) {
                let errorMessage = 'Failed to get response';
                try {
                    const errorData = await response.json();
                    if (errorData && typeof errorData.error === 'string' && errorData.error.trim() !== '') {
                        errorMessage = errorData.error;
                    }
                } catch (_) {
                }
                throw new Error(errorMessage);
            }

            const data = await response.json();

            // Hide loading spinner
            roadmapLoading.style.display = 'none';

            // Format and display the roadmap
            displayRoadmap(data.roadmap);
        } catch (error) {
            console.error('Error:', error);

            // Hide loading spinner
            roadmapLoading.style.display = 'none';

            // Display error message
            const message = error && error.message ? error.message : 'Sorry, I encountered an error generating your roadmap. Please try again.';
            roadmapContent.innerHTML = `<div class="error-message">${message}</div>`;
        }
    });
    
    // Function to display the roadmap with proper formatting
    function displayRoadmap(roadmapText) {
        // Convert markdown-like text to HTML
        let html = roadmapText;
    
        // Convert headers (1st, 2nd, 3rd level)
        html = html.replace(/# (.*?)(\n|$)/g, '<h2>$1</h2>');
        html = html.replace(/## (.*?)(\n|$)/g, '<h3>$1</h3>');
        html = html.replace(/### (.*?)(\n|$)/g, '<h4>$1</h4>');
    
        // Convert bullet points (handle "*" and "-")
        html = html.replace(/\n\s*[-*] (.*?)(\n|$)/g, '\n<li>$1</li>$2');
    
        // Convert numbered lists
        html = html.replace(/\n\d+\. (.*?)(\n|$)/g, '\n<li>$1</li>$2');
    
        // Wrap lists in <ul> and <ol> tags (wrap only when necessary)
        let inList = false;
        const lines = html.split('\n');
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes('<li>') && !inList) {
                lines[i] = '<ul>' + lines[i];
                inList = true;
            } else if (!lines[i].includes('<li>') && inList) {
                lines[i - 1] += '</ul>';
                inList = false;
            }
        }
        if (inList) {
            lines[lines.length - 1] += '</ul>';
        }
        html = lines.join('\n');
    
        // Convert bold and italic formatting
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Bold
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>'); // Italics
    
        // Remove extra line breaks
        html = html.replace(/\n\n+/g, '</p><p>');
        html = '<p>' + html + '</p>';
        html = html.replace(/<p><\/p>/g, ''); // Remove empty paragraphs
    
        // Set the formatted content in the page
        roadmapContent.innerHTML = html;
    }
});
