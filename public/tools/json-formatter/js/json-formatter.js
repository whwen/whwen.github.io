// JSON格式化工具JavaScript功能

// 全局变量
let originalSize = 0;
let formattedSize = 0;
let isTreeViewMode = false;
let currentJsonData = null;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('📝 JSON格式化工具已加载完成');
    
    // 延迟初始化工具菜单，确保main.js已加载
    setTimeout(initializeToolsMenu, 100);
    
    // 初始化事件监听器
    initializeEventListeners();
    
    // 添加键盘快捷键
    addKeyboardShortcuts();
    
    // 初始化统计信息
    updateInputStats();
});

// 初始化工具菜单
function initializeToolsMenu() {
    const container = document.getElementById('tools-menu-container');
    console.log('尝试初始化工具菜单:', { 
        container: !!container, 
        toolsMenu: !!window.toolsMenu,
        toolsMenuType: typeof window.toolsMenu
    });
    
    if (container && window.toolsMenu) {
        const menuHTML = window.toolsMenu.generateMenuHTML();
        container.innerHTML = menuHTML;
        console.log('工具菜单已初始化，HTML长度:', menuHTML.length);
        console.log('工具菜单HTML:', menuHTML.substring(0, 200) + '...');
    } else {
        console.log('工具菜单初始化失败:', { 
            container: !!container, 
            toolsMenu: !!window.toolsMenu,
            containerElement: container
        });
        // 如果还没有加载，再次尝试
        if (!window.toolsMenu) {
            setTimeout(initializeToolsMenu, 200);
        }
    }
}

// 初始化事件监听器
function initializeEventListeners() {
    const jsonInput = document.getElementById('jsonInput');
    
    // 输入框实时统计
    jsonInput.addEventListener('input', function() {
        updateInputStats();
        // 延迟验证，避免频繁验证
        clearTimeout(this.validateTimeout);
        this.validateTimeout = setTimeout(() => {
            validateJSONSilently();
        }, 500);
    });
    
    // 输入框粘贴事件
    jsonInput.addEventListener('paste', function() {
        setTimeout(() => {
            updateInputStats();
        }, 10);
    });
}

// JSON格式化功能
function formatJSON() {
    const input = document.getElementById('jsonInput').value.trim();
    const output = document.getElementById('jsonOutput');

    if (!input) {
        showMessage('请输入 JSON 数据', 'error');
        return;
    }

    try {
        const parsed = JSON.parse(input);
        const formatted = JSON.stringify(parsed, null, 2);
        output.value = formatted;
        
        originalSize = new Blob([input]).size;
        formattedSize = new Blob([formatted]).size;
        
        updateOutputStats();
        updateJSONStats(parsed);
        currentJsonData = parsed;
        
        // 如果当前是树形视图模式，也更新树形视图
        if (isTreeViewMode) {
            renderTreeView(parsed);
        }
        
        showMessage('JSON 格式化成功！', 'success');
        
    } catch (error) {
        showMessage('JSON 格式错误: ' + getDetailedError(error), 'error');
        output.value = '';
        updateOutputStats();
        resetJSONStats();
        currentJsonData = null;
        
        // 清空树形视图
        if (isTreeViewMode) {
            clearTreeView();
        }
    }
}

// JSON压缩功能
function minifyJSON() {
    const input = document.getElementById('jsonInput').value.trim();
    const output = document.getElementById('jsonOutput');

    if (!input) {
        showMessage('请输入 JSON 数据', 'error');
        return;
    }

    try {
        const parsed = JSON.parse(input);
        const minified = JSON.stringify(parsed);
        output.value = minified;
        
        originalSize = new Blob([input]).size;
        formattedSize = new Blob([minified]).size;
        
        updateOutputStats();
        updateJSONStats(parsed);
        showMessage('JSON 压缩成功！', 'success');
        
    } catch (error) {
        showMessage('JSON 格式错误: ' + getDetailedError(error), 'error');
        output.value = '';
        updateOutputStats();
        resetJSONStats();
    }
}

// JSON验证功能
function validateJSON() {
    const input = document.getElementById('jsonInput').value.trim();

    if (!input) {
        showMessage('请输入 JSON 数据', 'error');
        return;
    }

    try {
        const parsed = JSON.parse(input);
        updateJSONStats(parsed);
        showMessage('JSON 格式验证通过！', 'success');
    } catch (error) {
        showMessage('JSON 格式错误: ' + getDetailedError(error), 'error');
        resetJSONStats();
    }
}

// 静默验证（不显示消息）
function validateJSONSilently() {
    const input = document.getElementById('jsonInput').value.trim();
    
    if (!input) {
        resetJSONStats();
        return;
    }

    try {
        const parsed = JSON.parse(input);
        updateJSONStats(parsed);
    } catch (error) {
        resetJSONStats();
    }
}

// 排序键名功能
function sortKeys() {
    const input = document.getElementById('jsonInput').value.trim();
    const output = document.getElementById('jsonOutput');

    if (!input) {
        showMessage('请输入 JSON 数据', 'error');
        return;
    }

    try {
        const parsed = JSON.parse(input);
        const sorted = sortObjectKeys(parsed);
        const formatted = JSON.stringify(sorted, null, 2);
        output.value = formatted;
        
        originalSize = new Blob([input]).size;
        formattedSize = new Blob([formatted]).size;
        
        updateOutputStats();
        updateJSONStats(sorted);
        showMessage('JSON 键名排序成功！', 'success');
        
    } catch (error) {
        showMessage('JSON 格式错误: ' + getDetailedError(error), 'error');
        output.value = '';
        updateOutputStats();
        resetJSONStats();
    }
}

// 递归排序对象键名
function sortObjectKeys(obj) {
    if (Array.isArray(obj)) {
        return obj.map(item => sortObjectKeys(item));
    } else if (obj !== null && typeof obj === 'object') {
        const sorted = {};
        Object.keys(obj).sort().forEach(key => {
            sorted[key] = sortObjectKeys(obj[key]);
        });
        return sorted;
    }
    return obj;
}

// 从剪贴板粘贴
async function pasteFromClipboard() {
    try {
        const text = await navigator.clipboard.readText();
        document.getElementById('jsonInput').value = text;
        updateInputStats();
        showMessage('已从剪贴板粘贴内容', 'success');
    } catch (error) {
        showMessage('无法访问剪贴板，请手动粘贴', 'error');
    }
}

// 加载示例数据
function loadSample() {
    const samples = [
        {
            "name": "张三",
            "age": 28,
            "city": "北京",
            "skills": ["JavaScript", "Python", "Java"],
            "contact": {
                "email": "zhangsan@example.com",
                "phone": "13800138000"
            },
            "projects": [
                {
                    "name": "电商网站",
                    "status": "completed",
                    "technologies": ["React", "Node.js", "MongoDB"]
                },
                {
                    "name": "移动应用",
                    "status": "in-progress",
                    "technologies": ["React Native", "Firebase"]
                }
            ]
        },
        {
            "company": "科技有限公司",
            "employees": [
                {"id": 1, "name": "李四", "department": "开发部"},
                {"id": 2, "name": "王五", "department": "设计部"},
                {"id": 3, "name": "赵六", "department": "产品部"}
            ],
            "config": {
                "theme": "dark",
                "language": "zh-CN",
                "features": {
                    "notifications": true,
                    "analytics": false,
                    "beta_features": ["ai_assistant", "voice_control"]
                }
            }
        }
    ];
    
    const randomSample = samples[Math.floor(Math.random() * samples.length)];
    document.getElementById('jsonInput').value = JSON.stringify(randomSample, null, 2);
    updateInputStats();
    showMessage('已加载示例数据', 'info');
}



// 下载JSON文件
function downloadJSON() {
    const output = document.getElementById('jsonOutput');
    
    if (!output.value.trim()) {
        showMessage('没有可下载的内容', 'error');
        return;
    }

    const blob = new Blob([output.value], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `formatted_${new Date().getTime()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showMessage('JSON文件下载成功！', 'success');
}

// 清空输入
function clearInput() {
    document.getElementById('jsonInput').value = '';
    updateInputStats();
    resetJSONStats();
    showMessage('已清空输入内容', 'info');
}

// 清空输出
function clearOutput() {
    document.getElementById('jsonOutput').value = '';
    updateOutputStats();
    showMessage('已清空输出内容', 'info');
}

// 清空所有内容
function clearAll() {
    clearInput();
    clearOutput();
    showMessage('已清空所有内容', 'info');
}

// 更新输入统计信息
function updateInputStats() {
    const input = document.getElementById('jsonInput').value;
    const charCount = input.length;
    const lineCount = input ? input.split('\n').length : 0;
    const size = (new Blob([input]).size / 1024).toFixed(2);

    document.getElementById('inputCharCount').textContent = `字符：${charCount.toLocaleString()}`;
    document.getElementById('inputLineCount').textContent = `行：${lineCount.toLocaleString()}`;
    document.getElementById('inputSize').textContent = `大小：${size} KB`;
}

// 更新输出统计信息
function updateOutputStats() {
    const output = document.getElementById('jsonOutput').value;
    const charCount = output.length;
    const lineCount = output ? output.split('\n').length : 0;
    const size = (new Blob([output]).size / 1024).toFixed(2);

    document.getElementById('outputCharCount').textContent = `字符：${charCount.toLocaleString()}`;
    document.getElementById('outputLineCount').textContent = `行：${lineCount.toLocaleString()}`;
    document.getElementById('outputSize').textContent = `大小：${size} KB`;
    
    // 更新压缩比
    if (originalSize > 0 && formattedSize > 0) {
        const ratio = ((originalSize - formattedSize) / originalSize * 100).toFixed(1);
        document.getElementById('compressionRatio').textContent = `压缩比：${ratio}%`;
    }
}

// 更新JSON统计信息
function updateJSONStats(jsonObj) {
    const depth = getJSONDepth(jsonObj);
    const keyCount = getKeyCount(jsonObj);
    const valueCount = getValueCount(jsonObj);

    document.getElementById('jsonDepth').textContent = `嵌套深度：${depth.toLocaleString()}`;
    document.getElementById('keyCount').textContent = `键数量：${keyCount.toLocaleString()}`;
    document.getElementById('valueCount').textContent = `值数量：${valueCount.toLocaleString()}`;
}

// 重置JSON统计信息
function resetJSONStats() {
    document.getElementById('jsonDepth').textContent = '嵌套深度：0';
    document.getElementById('keyCount').textContent = '键数量：0';
    document.getElementById('valueCount').textContent = '值数量：0';
    document.getElementById('compressionRatio').textContent = '压缩比：0%';
}

// 获取JSON嵌套深度
function getJSONDepth(obj, currentDepth = 1) {
    if (typeof obj !== 'object' || obj === null) {
        return currentDepth;
    }

    let maxDepth = currentDepth;
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const depth = getJSONDepth(obj[key], currentDepth + 1);
            maxDepth = Math.max(maxDepth, depth);
        }
    }
    return maxDepth;
}

// 获取键数量
function getKeyCount(obj) {
    let count = 0;
    
    function countKeys(item) {
        if (Array.isArray(item)) {
            item.forEach(countKeys);
        } else if (item !== null && typeof item === 'object') {
            count += Object.keys(item).length;
            Object.values(item).forEach(countKeys);
        }
    }
    
    countKeys(obj);
    return count;
}

// 获取值数量
function getValueCount(obj) {
    let count = 0;
    
    function countValues(item) {
        if (Array.isArray(item)) {
            count += item.length;
            item.forEach(countValues);
        } else if (item !== null && typeof item === 'object') {
            Object.values(item).forEach(countValues);
        } else {
            count++;
        }
    }
    
    countValues(obj);
    return count;
}

// 获取详细错误信息
function getDetailedError(error) {
    const message = error.message;
    
    // 解析位置信息
    const positionMatch = message.match(/position (\d+)/);
    if (positionMatch) {
        const position = parseInt(positionMatch[1]);
        const input = document.getElementById('jsonInput').value;
        const lines = input.substring(0, position).split('\n');
        const line = lines.length;
        const column = lines[lines.length - 1].length + 1;
        return `${message} (第 ${line} 行，第 ${column} 列)`;
    }
    
    return message;
}

// 显示消息
function showMessage(text, type = 'info') {
    const container = document.getElementById('messageContainer');
    const message = document.createElement('div');
    message.className = `message message-${type}`;
    message.textContent = text;
    
    container.appendChild(message);
    
    // 自动移除消息
    setTimeout(() => {
        message.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 300);
    }, type === 'error' ? 5000 : 3000);
}

// 添加键盘快捷键
function addKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'Enter':
                    e.preventDefault();
                    formatJSON();
                    break;
            }
        }
    });
}

// 页面性能监控
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`JSON格式化工具加载完成，耗时: ${loadTime.toFixed(2)}ms`);
    
    // 检查浏览器特性支持
    const features = {
        'Clipboard API': 'clipboard' in navigator,
        'File Download': 'download' in document.createElement('a'),
        'Blob Support': typeof Blob !== 'undefined'
    };
    
    console.log('浏览器特性支持情况:', features);
});

// 切换树形视图
function toggleTreeView() {
    const jsonOutput = document.getElementById('jsonOutput');
    const jsonTreeView = document.getElementById('jsonTreeView');
    const treeViewButton = document.querySelector('button[onclick="toggleTreeView()"]');
    
    isTreeViewMode = !isTreeViewMode;
    
    if (isTreeViewMode) {
        jsonOutput.style.display = 'none';
        jsonTreeView.style.display = 'block';
        
        // 更新按钮状态
        treeViewButton.classList.add('btn-active');
        treeViewButton.innerHTML = '📄 文本视图';
        
        if (currentJsonData) {
            renderTreeView(currentJsonData);
        }
        
        showMessage('已切换到树形视图模式', 'info');
    } else {
        jsonOutput.style.display = 'block';
        jsonTreeView.style.display = 'none';
        
        // 更新按钮状态
        treeViewButton.classList.remove('btn-active');
        treeViewButton.innerHTML = '🌳 树形视图';
        
        showMessage('已切换到文本视图模式', 'info');
    }
}

// 渲染树形视图
function renderTreeView(data) {
    const treeView = document.getElementById('jsonTreeView');
    treeView.innerHTML = '';
    
    const rootNode = createTreeNode('root', data, true);
    treeView.appendChild(rootNode);
}

// 清空树形视图
function clearTreeView() {
    const treeView = document.getElementById('jsonTreeView');
    treeView.innerHTML = '<div class="tree-placeholder">格式化后的 JSON 树形视图将显示在这里...</div>';
}

// 创建树节点
function createTreeNode(key, value, isRoot = false, isExpanded = true) {
    const nodeDiv = document.createElement('div');
    nodeDiv.className = 'tree-node';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'tree-node-content';
    
    const isObject = typeof value === 'object' && value !== null;
    const isArray = Array.isArray(value);
    
    // 创建展开/折叠按钮
    const toggle = document.createElement('span');
    toggle.className = `tree-toggle ${isObject ? (isExpanded ? 'expanded' : 'collapsed') : 'leaf'}`;
    
    // 创建键名
    if (!isRoot) {
        const keySpan = document.createElement('span');
        keySpan.className = 'tree-key';
        keySpan.textContent = `"${key}"`;
        contentDiv.appendChild(keySpan);
        
        const colonSpan = document.createElement('span');
        colonSpan.className = 'tree-colon';
        colonSpan.textContent = ':';
        contentDiv.appendChild(colonSpan);
    }
    
    // 创建值
    const valueSpan = document.createElement('span');
    
    if (isArray) {
        valueSpan.innerHTML = `<span class="tree-bracket">[</span><span class="tree-count">${value.length} items</span><span class="tree-bracket">]</span>`;
    } else if (isObject) {
        const keys = Object.keys(value);
        valueSpan.innerHTML = `<span class="tree-bracket">{</span><span class="tree-count">${keys.length} keys</span><span class="tree-bracket">}</span>`;
    } else {
        valueSpan.className = `tree-value ${getValueType(value)}`;
        valueSpan.textContent = formatValue(value);
    }
    
    contentDiv.appendChild(toggle);
    contentDiv.appendChild(valueSpan);
    nodeDiv.appendChild(contentDiv);
    
    // 创建子节点容器
    if (isObject) {
        const childrenDiv = document.createElement('div');
        childrenDiv.className = `tree-children ${isExpanded ? '' : 'collapsed'}`;
        
        if (isArray) {
            value.forEach((item, index) => {
                const childNode = createTreeNode(index.toString(), item, false, false);
                childrenDiv.appendChild(childNode);
            });
        } else {
            Object.entries(value).forEach(([childKey, childValue]) => {
                const childNode = createTreeNode(childKey, childValue, false, false);
                childrenDiv.appendChild(childNode);
            });
        }
        
        nodeDiv.appendChild(childrenDiv);
        
        // 添加点击事件
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleNode(toggle, childrenDiv);
        });
        
        contentDiv.addEventListener('click', (e) => {
            if (e.target === contentDiv || e.target === valueSpan) {
                toggleNode(toggle, childrenDiv);
            }
        });
    }
    
    return nodeDiv;
}

// 切换节点展开/折叠状态
function toggleNode(toggle, childrenDiv) {
    const isExpanded = toggle.classList.contains('expanded');
    
    if (isExpanded) {
        toggle.classList.remove('expanded');
        toggle.classList.add('collapsed');
        childrenDiv.classList.add('collapsed');
    } else {
        toggle.classList.remove('collapsed');
        toggle.classList.add('expanded');
        childrenDiv.classList.remove('collapsed');
    }
}

// 获取值的类型
function getValueType(value) {
    if (value === null) return 'null';
    if (typeof value === 'string') return 'string';
    if (typeof value === 'number') return 'number';
    if (typeof value === 'boolean') return 'boolean';
    return 'object';
}

// 格式化值显示
function formatValue(value) {
    if (value === null) return 'null';
    if (typeof value === 'string') return `"${value}"`;
    if (typeof value === 'boolean') return value.toString();
    if (typeof value === 'number') return value.toString();
    return String(value);
}

// 复制输出内容 - 更新以支持树形视图
async function copyOutput() {
    let textToCopy = '';
    
    if (isTreeViewMode && currentJsonData) {
        // 如果是树形视图模式，复制格式化的JSON文本
        textToCopy = JSON.stringify(currentJsonData, null, 2);
    } else {
        const output = document.getElementById('jsonOutput');
        textToCopy = output.value;
    }
    
    if (!textToCopy.trim()) {
        showMessage('没有可复制的内容', 'error');
        return;
    }

    try {
        await navigator.clipboard.writeText(textToCopy);
        showMessage('已复制到剪贴板！', 'success');
    } catch (error) {
        // 降级方案
        const tempTextarea = document.createElement('textarea');
        tempTextarea.value = textToCopy;
        document.body.appendChild(tempTextarea);
        tempTextarea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextarea);
        showMessage('已复制到剪贴板！', 'success');
    }
}