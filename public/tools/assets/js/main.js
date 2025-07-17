// 页面加载性能监控
const startTime = performance.now();

// 工具集合主页面功能
class ToolsHomePage {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.initAnimations();
        this.logPerformance();
    }

    bindEvents() {
        // 工具卡片点击效果
        document.addEventListener('click', function(e) {
            const toolCard = e.target.closest('.tool-card');
            if (toolCard && !toolCard.classList.contains('coming-soon')) {
                toolCard.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    toolCard.style.transform = '';
                }, 150);
            }
        });
    }

    initAnimations() {
        // 添加淡入动画
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });

        document.querySelectorAll('.tool-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }

    logPerformance() {
        const loadTime = performance.now() - startTime;
        console.log(`🛠️ 开发者工具集合已加载完成`);
        console.log(`页面加载完成，耗时: ${loadTime.toFixed(2)}ms`);
        
        // 检测浏览器特性支持
        const features = {
            'CSS Grid': CSS.supports('display', 'grid'),
            'CSS Backdrop Filter': CSS.supports('backdrop-filter', 'blur(10px)'),
            'Intersection Observer': 'IntersectionObserver' in window,
            'Clipboard API': 'clipboard' in navigator
        };
        console.log('浏览器特性支持情况:', features);
    }
}

// 工具页面导航功能
function navigateToTool(toolId) {
    const toolPaths = {
        'json-formatter': './json-formatter/index.html',
        'url-encoder': './url-encoder/index.html',
        'timestamp-converter': './timestamp-converter/index.html',
        'base64-encoder': './base64-encoder/index.html',
        'color-converter': './color-converter/index.html',
        'text-processor': './text-processor/index.html'
    };

    const path = toolPaths[toolId];
    if (path) {
        window.location.href = path;
    } else {
        console.warn(`工具 ${toolId} 暂未实现`);
    }
}

// 通用模态框功能
class Modal {
    constructor(modalId) {
        this.modal = document.getElementById(modalId);
        this.init();
    }

    init() {
        if (!this.modal) return;

        const modal = this.modal;
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        // ESC键关闭
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }

    show() {
        if (this.modal) {
            this.modal.style.display = 'block';
        }
    }

    hide() {
        if (this.modal) {
            this.modal.style.display = 'none';
        }
    }
}

// 通用工具函数
const Utils = {
    // 复制到剪贴板
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showToast('已复制到剪贴板');
            return true;
        } catch (err) {
            console.error('复制失败:', err);
            this.showToast('复制失败', 'error');
            return false;
        }
    },

    // 显示提示消息
    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 24px;
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;

        document.body.appendChild(toast);

        // 显示动画
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
        }, 100);

        // 自动隐藏
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    },

    // 格式化文件大小
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    // 下载文件
    downloadFile(content, filename, contentType = 'text/plain') {
        const blob = new Blob([content], { type: contentType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
};

// 工具菜单类
class ToolsMenu {
    constructor() {
        this.currentTool = this.getCurrentTool();
        this.tools = [
            { id: 'json-formatter', name: 'JSON格式化', icon: '📝', path: '../json-formatter/index.html' },
            { id: 'url-encoder', name: 'URL编码', icon: '🔗', path: '../url-encoder/index.html' },
            { id: 'timestamp-converter', name: '时间戳转换', icon: '⏰', path: '../timestamp-converter/index.html' },
            // { id: 'base64-encoder', name: 'Base64编码', icon: '🔐', path: '../base64-encoder/index.html' },
            // { id: 'color-converter', name: '颜色转换', icon: '🎨', path: '../color-converter/index.html' },
            // { id: 'text-processor', name: '文本处理', icon: '🔤', path: '../text-processor/index.html' }
        ];
        this.init();
    }

    getCurrentTool() {
        const path = window.location.pathname;
        if (path.includes('json-formatter')) return 'json-formatter';
        if (path.includes('url-encoder')) return 'url-encoder';
        if (path.includes('timestamp-converter')) return 'timestamp-converter';
        return 'home';
    }

    init() {
        // 绑定点击事件
        document.addEventListener('click', (e) => {
            const navMore = e.target.closest('.nav-more');
            if (navMore) {
                if (e.target.closest('.more-button')) {
                    e.preventDefault();
                    this.toggleMenu(navMore);
                }
            } else {
                // 点击外部关闭菜单
                this.closeAllMenus();
            }
        });

        // ESC键关闭菜单
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllMenus();
            }
        });

        // 处理响应式导航
        this.handleResponsiveNav();
        window.addEventListener('resize', () => this.handleResponsiveNav());
    }

    toggleMenu(menu) {
        const isActive = menu.classList.contains('active');
        this.closeAllMenus();
        if (!isActive) {
            menu.classList.add('active');
        }
    }

    closeAllMenus() {
        document.querySelectorAll('.nav-more.active').forEach(menu => {
            menu.classList.remove('active');
        });
    }

    handleResponsiveNav() {
        const toolsNav = document.querySelector('.tools-nav');
        const navItems = document.querySelector('.nav-items');
        const navMore = document.querySelector('.nav-more');
        const moreDropdown = document.querySelector('.more-dropdown');
        
        if (!toolsNav || !navItems || !navMore) return;

        // 重置状态
        navMore.style.display = 'none';
        moreDropdown.innerHTML = '';
        
        // 将所有项目移回主导航
        const hiddenItems = moreDropdown.querySelectorAll('.nav-item');
        hiddenItems.forEach(item => {
            navItems.appendChild(item);
        });

        // 检查是否需要显示"更多"菜单
        const containerWidth = toolsNav.offsetWidth;
        const itemsWidth = navItems.scrollWidth;
        const moreButtonWidth = 80; // 预估"更多"按钮宽度

        if (itemsWidth > containerWidth - moreButtonWidth) {
            navMore.style.display = 'inline-block';
            
            // 逐个移动项目到"更多"菜单中
            const items = Array.from(navItems.querySelectorAll('.nav-item'));
            let currentWidth = 0;
            
            for (let i = items.length - 1; i >= 0; i--) {
                currentWidth = navItems.scrollWidth;
                if (currentWidth > containerWidth - moreButtonWidth) {
                    const item = items[i].cloneNode(true);
                    moreDropdown.insertBefore(item, moreDropdown.firstChild);
                    items[i].remove();
                } else {
                    break;
                }
            }
        }
    }

    generateMenuHTML() {
        // 添加主页链接
        const homeItem = `
            <a href="../index.html" class="nav-item">
                <span class="nav-icon">🏠</span>
                <span class="nav-text">主页</span>
            </a>
        `;
        
        // 显示所有工具，不过滤当前工具
        const toolItems = this.tools
            .map(tool => `
                <a href="${tool.path}" class="nav-item ${tool.id === this.currentTool ? 'active' : ''}">
                    <span class="nav-icon">${tool.icon}</span>
                    <span class="nav-text">${tool.name}</span>
                </a>
            `).join('');

        const allItems = homeItem + toolItems;

        return `
            <div class="tools-nav">
                <div class="nav-items">
                    ${allItems}
                </div>
                <div class="nav-more" style="display: none;">
                    <div class="more-button">
                        <span>更多</span>
                        <span class="arrow">▼</span>
                    </div>
                    <div class="more-dropdown">
                        <!-- 超出的项目会动态添加到这里 -->
                    </div>
                </div>
            </div>
        `;
    }
}

// 全局菜单实例
window.toolsMenu = new ToolsMenu();

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 如果是主页，初始化主页功能
    if (document.querySelector('.tools-grid')) {
        new ToolsHomePage();
    }
    
    // 初始化工具菜单
    const menuContainer = document.querySelector('.menu-container');
    if (menuContainer && window.toolsMenu) {
        console.log('尝试初始化工具菜单:', {
            container: !!menuContainer,
            toolsMenu: !!window.toolsMenu,
            toolsMenuType: typeof window.toolsMenu
        });
        
        const menuHTML = window.toolsMenu.generateMenuHTML();
        console.log('工具菜单已初始化，HTML长度:', menuHTML.length);
        console.log('工具菜单HTML:', menuHTML.substring(0, 200) + '...');
        
        menuContainer.innerHTML = menuHTML;
        
        // 重新初始化响应式导航
        setTimeout(() => {
            window.toolsMenu.handleResponsiveNav();
        }, 100);
    }
});

// 导出到全局作用域
window.Utils = Utils;
window.Modal = Modal;
window.navigateToTool = navigateToTool;