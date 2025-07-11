---
layout: page
title: Planner Bot
permalink: /planner/
description: A motivational AI partner to help plan your day and tackle postponed tasks with bite-sized actions.
no_title: true
no_description: true
nav: false
nav_order: 6
---

<div class="planner-container">
  <div class="chat-header">
    <h1>Live your dream. </h1>
    <p>This AI motivational partner helps you tackle the emotional blockers behind procrastination (e.g., fear, overwhelm, perfectionism) by helping you name them and understand them. Wanna try it out? Just say hi! </p>
    <div class="usage-info">
      <small>💡 Usage: <span id="usage-count">0</span>/30 messages today</small>
    </div>
  </div>

  <div id="chat-messages" class="chat-messages">
    <div class="message bot">
      Welcome! I'm your daily planning partner. I'll help you tackle postponed tasks and create actionable plans. Let's start! ✨
    </div>
  </div>

  <div class="chat-input-container">
    <input type="text" id="message-input" placeholder="Type your message...">
    <button id="send-button">Send</button>
  </div>

  <div id="loading" class="loading hidden">
    <div class="typing-indicator">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>

  <div id="rate-limit-warning" class="rate-limit-warning hidden">
    <p>⚠️ You've reached the daily message limit (30 messages). Please try again tomorrow!</p>
    <small>This helps manage server costs. Thank you for understanding! 💝</small>
  </div>
</div>

<style>
.planner-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.chat-header {
  text-align: center;
  margin-bottom: 30px;
}

.chat-header h1 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.usage-info {
  margin-top: 10px;
  padding: 8px 12px;
  background: #e8f4fd;
  border: 1px solid #bee5eb;
  border-radius: 15px;
  color: #0c5460;
  display: inline-block;
}

.chat-messages {
  min-height: 400px;
  max-height: 500px;
  overflow-y: auto;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  background: #f8f9fa;
}

.message {
  margin-bottom: 15px;
  padding: 12px 16px;
  border-radius: 18px;
  max-width: 80%;
  word-wrap: break-word;
  line-height: 1.5;
}

.message.user {
  background: #007bff;
  color: white;
  margin-left: auto;
  text-align: right;
}

.message.bot {
  background: white;
  color: #333;
  border: 1px solid #e0e0e0;
  margin-right: auto;
}

.message.system {
  background: #f0f0f0;
  color: #666;
  text-align: center;
  font-style: italic;
  margin: 10px auto;
  max-width: 90%;
}

.chat-input-container {
  display: flex;
  gap: 10px;
}

#message-input {
  flex: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 25px;
  font-size: 16px;
  outline: none;
}

#message-input:focus {
  border-color: #007bff;
}

#send-button {
  padding: 12px 24px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

#send-button:hover:not(:disabled) {
  background: #0056b3;
}

#send-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.loading {
  text-align: center;
  padding: 10px;
}

.typing-indicator {
  display: inline-block;
}

.typing-indicator span {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #007bff;
  margin: 0 2px;
  animation: typing 1.4s infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.5;
  }
  30% {
    transform: translateY(-10px);
    opacity: 1;
  }
}

.rate-limit-warning {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 12px;
  padding: 15px;
  margin-top: 15px;
  text-align: center;
}

.hidden {
  display: none;
}

/* Responsive design */
@media (max-width: 768px) {
  .planner-container {
    padding: 15px;
    margin: 0 -15px;
  }
  
  .chat-messages {
    min-height: 300px;
    max-height: 400px;
  }
  
  .message {
    max-width: 90%;
  }
}
</style>

<script>
class DailyPlannerBot {
  constructor() {
    this.chatMessages = document.getElementById('chat-messages');
    this.messageInput = document.getElementById('message-input');
    this.sendButton = document.getElementById('send-button');
    this.loadingElement = document.getElementById('loading');
    this.usageElement = document.getElementById('usage-count');
    this.rateLimitWarning = document.getElementById('rate-limit-warning');
    
    this.conversationId = null;
    this.apiUrl = 'https://working-chatbot-api-production.up.railway.app/api/chat';
    
    // Rate limiting
    this.maxMessages = 30;
    this.usageKey = 'dailyPlanner_usage_' + this.getTodayKey();
    
    this.init();
  }

  getTodayKey() {
    const today = new Date();
    return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  }

  getUsageCount() {
    const stored = localStorage.getItem(this.usageKey);
    return stored ? parseInt(stored) : 0;
  }

  incrementUsage() {
    const current = this.getUsageCount();
    localStorage.setItem(this.usageKey, (current + 1).toString());
    this.updateUsageDisplay();
  }

  updateUsageDisplay() {
    const usage = this.getUsageCount();
    this.usageElement.textContent = usage;
    
    if (usage >= this.maxMessages) {
      this.showRateLimit();
    }
  }

  showRateLimit() {
    this.disableInput();
    this.rateLimitWarning.classList.remove('hidden');
    this.addMessage('You\'ve reached today\'s message limit. See you tomorrow! 🌅', 'system');
  }

  isRateLimited() {
    return this.getUsageCount() >= this.maxMessages;
  }

  async init() {
    this.setupEventListeners();
    this.updateUsageDisplay();
    
    if (!this.isRateLimited()) {
      this.enableInput();
    } else {
      this.showRateLimit();
    }
  }

  setupEventListeners() {
    this.sendButton.addEventListener('click', () => this.sendMessage());
    this.messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });
  }

  async sendMessage() {
    if (this.isRateLimited()) {
      this.showRateLimit();
      return;
    }

    const message = this.messageInput.value.trim();
    if (!message) return;

    this.addMessage(message, 'user');
    this.messageInput.value = '';
    this.disableInput();

    // Increment usage before API call
    this.incrementUsage();

    try {
      const response = await this.callAPI(message);
      this.addMessage(response.message, 'bot');
      
      // Update conversation ID if provided
      if (response.conversationId) {
        this.conversationId = response.conversationId;
      }
    } catch (error) {
      this.addMessage('Sorry, I encountered an error. Please try again later.', 'bot');
      console.error('Error:', error);
      
      // Show more helpful error message
      if (error.message.includes('429')) {
        this.addMessage('The service is currently busy. Please wait a moment before trying again.', 'system');
      } else if (error.message.includes('500')) {
        this.addMessage('There seems to be a server issue. Please try again in a few minutes.', 'system');
      }
    } finally {
      if (!this.isRateLimited()) {
        this.enableInput();
      }
    }
  }

  async callAPI(message) {
    this.showLoading();
    
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          conversationId: this.conversationId
        })
      });

      this.hideLoading();

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Rate limit exceeded');
        } else if (response.status === 500) {
          throw new Error('Server error');
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      return await response.json();
    } catch (error) {
      this.hideLoading();
      throw error;
    }
  }

  addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = text;
    
    this.chatMessages.appendChild(messageDiv);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  }

  enableInput() {
    if (!this.isRateLimited()) {
      this.messageInput.disabled = false;
      this.sendButton.disabled = false;
      this.messageInput.focus();
    }
  }

  disableInput() {
    this.messageInput.disabled = true;
    this.sendButton.disabled = true;
  }

  showLoading() {
    this.loadingElement.classList.remove('hidden');
  }

  hideLoading() {
    this.loadingElement.classList.add('hidden');
  }
}

// Initialize the chatbot when page loads
document.addEventListener('DOMContentLoaded', () => {
  new DailyPlannerBot();
});
</script>
