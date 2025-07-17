// URL编码解码工具JavaScript功能

// 全局变量
let currentMode = 'encode'; // 'encode' 或 'decode'

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔗 URL编码解码工具已加载完成');
    
    // 延迟初始化工具菜单，确保main.js已加载
    setTimeout(initializeToolsMenu, 100);
    
    // 初始化事件监听器
    initializeEventListeners();
    
    // 初始化统计信息
    updateInputStats();
    updateOutputStats();
});

// 初始化工具菜单
function initializeToolsMenu() {
    const container = document.getElementById('tools-menu-container');
    if (container && window.toolsMenu) {
        container.innerHTML = window.toolsMenu.generateMenuHTML();
        console.log('工具菜单已初始化');
    } else {
        console.log('工具菜单初始化失败:', { container: !!container, toolsMenu: !!window.toolsMenu });
        // 如果还没有加载，再次尝试
        if (!window.toolsMenu) {
            setTimeout(initializeToolsMenu, 200);
        }
    }
}

// 初始化事件监听器
function initializeEventListeners() {
    const urlInput = document.getElementById('urlInput');
    const urlOutput = document.getElementById('urlOutput');
    
    // 输入框变化监听
    urlInput.addEventListener('input', function() {
        updateInputStats();
        // 自动检测内容类型并提示
        autoDetectContentType();
    });
    
    urlOutput.addEventListener('input', function() {
        updateOutputStats();
    });
    
    // 键盘快捷键
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'Enter':
                    e.preventDefault();
                    encodeURL();
                    break;
                case 'd':
                case 'D':
                    if (e.shiftKey) {
                        e.preventDefault();
                        decodeURL();
                    }
                    break;
            }
        }
    });
}

// URL编码功能
function encodeURL() {
    const input = document.getElementById('urlInput').value.trim();
    
    if (!input) {
        showMessage('请输入需要编码的URL或文本', 'warning');
        return;
    }
    
    try {
        // 使用encodeURIComponent进行编码
        const encoded = encodeURIComponent(input);
        
        document.getElementById('urlOutput').value = encoded;
        updateOutputStats();
        analyzeURL(encoded);
        
        showMessage('URL编码成功！', 'success');
        currentMode = 'encode';
        
    } catch (error) {
        console.error('编码错误:', error);
        showMessage('编码失败：' + error.message, 'error');
    }
}

// URL解码功能
function decodeURL() {
    const input = document.getElementById('urlInput').value.trim();
    
    if (!input) {
        showMessage('请输入需要解码的URL', 'warning');
        return;
    }
    
    try {
        // 使用decodeURIComponent进行解码
        const decoded = decodeURIComponent(input);
        
        document.getElementById('urlOutput').value = decoded;
        updateOutputStats();
        analyzeURL(decoded);
        
        showMessage('URL解码成功！', 'success');
        currentMode = 'decode';
        
    } catch (error) {
        console.error('解码错误:', error);
        showMessage('解码失败：可能包含无效的编码字符', 'error');
        
        // 尝试部分解码
        try {
            const partialDecoded = input.replace(/%[0-9A-Fa-f]{2}/g, function(match) {
                try {
                    return decodeURIComponent(match);
                } catch (e) {
                    return match; // 保持原样
                }
            });
            
            document.getElementById('urlOutput').value = partialDecoded;
            updateOutputStats();
            analyzeURL(partialDecoded);
            
            showMessage('部分解码完成，某些字符可能无法解码', 'warning');
        } catch (partialError) {
            console.error('部分解码也失败:', partialError);
        }
    }
}

// 验证URL格式
function validateURL() {
    const input = document.getElementById('urlInput').value.trim();
    
    if (!input) {
        showMessage('请输入需要验证的URL', 'warning');
        return;
    }
    
    try {
        // 尝试创建URL对象来验证
        const url = new URL(input);
        
        const validationInfo = {
            protocol: url.protocol,
            hostname: url.hostname,
            port: url.port || '默认端口',
            pathname: url.pathname,
            search: url.search,
            hash: url.hash
        };
        
        console.log('URL验证结果:', validationInfo);
        showMessage('URL格式有效！', 'success');
        
        // 更新URL分析信息
        analyzeURL(input);
        
    } catch (error) {
        console.error('URL验证失败:', error);
        
        // 检查是否是相对URL或其他格式
        if (input.startsWith('/') || input.startsWith('./') || input.startsWith('../')) {
            showMessage('这是一个相对路径URL', 'info');
        } else if (input.includes('://')) {
            showMessage('URL格式无效：' + error.message, 'error');
        } else {
            showMessage('这可能不是一个完整的URL，缺少协议部分', 'warning');
        }
    }
}

// 分析URL结构
function analyzeURL(url) {
    try {
        // 尝试解析URL
        const urlObj = new URL(url);
        
        document.getElementById('urlProtocol').textContent = urlObj.protocol.replace(':', '');
        document.getElementById('urlDomain').textContent = urlObj.hostname || '-';
        document.getElementById('urlPath').textContent = urlObj.pathname || '/';
        
        // 计算查询参数数量
        const params = new URLSearchParams(urlObj.search);
        document.getElementById('urlParams').textContent = params.size;
        
    } catch (error) {
        // 如果不是完整URL，尝试简单分析
        const protocolMatch = url.match(/^([a-zA-Z][a-zA-Z0-9+.-]*):\/\//);
        const domainMatch = url.match(/\/\/([^\/\?#]+)/);
        const pathMatch = url.match(/\/\/[^\/]*([^\?#]*)/);
        const paramsMatch = url.match(/\?([^#]*)/);
        
        document.getElementById('urlProtocol').textContent = protocolMatch ? protocolMatch[1] : '-';
        document.getElementById('urlDomain').textContent = domainMatch ? domainMatch[1] : '-';
        document.getElementById('urlPath').textContent = pathMatch ? pathMatch[1] || '/' : '-';
        
        if (paramsMatch) {
            const params = new URLSearchParams(paramsMatch[1]);
            document.getElementById('urlParams').textContent = params.size;
        } else {
            document.getElementById('urlParams').textContent = '0';
        }
    }
}

// 自动检测内容类型
function autoDetectContentType() {
    const input = document.getElementById('urlInput').value.trim();
    
    if (!input) return;
    
    // 检测是否已编码
    const hasEncodedChars = /%[0-9A-Fa-f]{2}/.test(input);
    
    if (hasEncodedChars) {
        // 可能是已编码的URL
        console.log('检测到编码字符，建议使用解码功能');
    } else if (input.includes('://')) {
        // 可能是普通URL
        console.log('检测到URL格式，建议使用编码功能');
    }
}

// 交换输入输出内容
function swapContent() {
    const input = document.getElementById('urlInput');
    const output = document.getElementById('urlOutput');
    
    const temp = input.value;
    input.value = output.value;
    output.value = temp;
    
    updateInputStats();
    updateOutputStats();
    
    if (output.value) {
        analyzeURL(input.value);
    }
    
    showMessage('内容已交换', 'info');
}

// 从剪贴板粘贴
async function pasteFromClipboard() {
    try {
        if (navigator.clipboard && navigator.clipboard.readText) {
            const text = await navigator.clipboard.readText();
            document.getElementById('urlInput').value = text;
            updateInputStats();
            autoDetectContentType();
            showMessage('已从剪贴板粘贴内容', 'success');
        } else {
            showMessage('您的浏览器不支持剪贴板API，请手动粘贴', 'warning');
        }
    } catch (error) {
        console.error('粘贴失败:', error);
        showMessage('粘贴失败，请手动粘贴', 'error');
    }
}

// 复制输出结果
async function copyOutput() {
    const output = document.getElementById('urlOutput').value;
    
    if (!output) {
        showMessage('没有可复制的内容', 'warning');
        return;
    }
    
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(output);
            showMessage('结果已复制到剪贴板', 'success');
        } else {
            // 降级方案
            const textArea = document.createElement('textarea');
            textArea.value = output;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showMessage('结果已复制到剪贴板', 'success');
        }
    } catch (error) {
        console.error('复制失败:', error);
        showMessage('复制失败，请手动复制', 'error');
    }
}

// 加载示例数据
function loadSample() {
    const sampleURL = 'https://example.com/search?q=中文查询&type=文档&page=1&sort=时间';
    document.getElementById('urlInput').value = sampleURL;
    updateInputStats();
    showMessage('已加载示例数据', 'info');
}

// 清空输入
function clearInput() {
    document.getElementById('urlInput').value = '';
    updateInputStats();
    showMessage('输入已清空', 'info');
}

// 清空输出
function clearOutput() {
    document.getElementById('urlOutput').value = '';
    updateOutputStats();
    
    // 重置URL分析信息
    document.getElementById('urlProtocol').textContent = '-';
    document.getElementById('urlDomain').textContent = '-';
    document.getElementById('urlPath').textContent = '-';
    document.getElementById('urlParams').textContent = '0';
    
    showMessage('输出已清空', 'info');
}

// 下载结果文件
function downloadResult() {
    const output = document.getElementById('urlOutput').value;
    
    if (!output) {
        showMessage('没有可下载的内容', 'warning');
        return;
    }
    
    try {
        const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        a.href = url;
        a.download = `url-${currentMode}-result-${new Date().getTime()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showMessage('文件下载已开始', 'success');
    } catch (error) {
        console.error('下载失败:', error);
        showMessage('下载失败：' + error.message, 'error');
    }
}

// 更新输入统计信息
function updateInputStats() {
    const input = document.getElementById('urlInput').value;
    const charCount = input.length;
    const lineCount = input.split('\n').length;
    const sizeKB = (new Blob([input]).size / 1024).toFixed(2);
    
    document.getElementById('inputCharCount').textContent = `${charCount} 字符`;
    document.getElementById('inputLineCount').textContent = `${lineCount} 行`;
    document.getElementById('inputSize').textContent = `${sizeKB} KB`;
}

// 更新输出统计信息
function updateOutputStats() {
    const output = document.getElementById('urlOutput').value;
    const charCount = output.length;
    const lineCount = output.split('\n').length;
    const sizeKB = (new Blob([output]).size / 1024).toFixed(2);
    
    document.getElementById('outputCharCount').textContent = `${charCount} 字符`;
    document.getElementById('outputLineCount').textContent = `${lineCount} 行`;
    document.getElementById('outputSize').textContent = `${sizeKB} KB`;
}

// 显示消息提示
function showMessage(message, type = 'info') {
    const container = document.getElementById('messageContainer');
    const messageDiv = document.createElement('div');
    
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    
    container.appendChild(messageDiv);
    
    // 3秒后自动移除消息
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    container.removeChild(messageDiv);
                }
            }, 300);
        }
    }, 3000);
}

// 页面性能监控
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`URL编码解码工具加载完成，耗时: ${loadTime.toFixed(2)}ms`);
    
    // 检查浏览器特性支持
    const features = {
        'Clipboard API': 'clipboard' in navigator,
        'File Download': 'download' in document.createElement('a'),
        'Blob Support': typeof Blob !== 'undefined',
        'URL API': typeof URL !== 'undefined'
    };
    
    console.log('浏览器特性支持情况:', features);
});