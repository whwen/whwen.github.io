// 时间戳转换工具JavaScript功能

// 全局变量
let currentTimestampInterval;

// 自动检测时间戳类型
function detectTimestampType(timestamp) {
    const timestampStr = timestamp.toString();
    const length = timestampStr.length;
    
    if (length === 10) {
        return { type: 'seconds', name: '秒级时间戳 (10位)' };
    } else if (length === 13) {
        return { type: 'milliseconds', name: '毫秒级时间戳 (13位)' };
    } else if (length === 16) {
        return { type: 'microseconds', name: '微秒级时间戳 (16位)' };
    } else if (length === 19) {
        return { type: 'nanoseconds', name: '纳秒级时间戳 (19位)' };
    } else {
        // 根据数值大小进行智能判断
        if (timestamp < 1e12) {
            return { type: 'seconds', name: '秒级时间戳 (推测)' };
        } else if (timestamp < 1e15) {
            return { type: 'milliseconds', name: '毫秒级时间戳 (推测)' };
        } else if (timestamp < 1e18) {
            return { type: 'microseconds', name: '微秒级时间戳 (推测)' };
        } else {
            return { type: 'nanoseconds', name: '纳秒级时间戳 (推测)' };
        }
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('⏰ 时间戳转换工具已加载完成');
    
    // 初始化事件监听器
    initializeEventListeners();
    
    // 启动当前时间更新
    startCurrentTimeUpdate();
    
    // 初始化当前时间到输入框
    initializeCurrentDateTime();
});

// 初始化事件监听器
function initializeEventListeners() {
    const timestampInput = document.getElementById('timestampInput');
    const dateInput = document.getElementById('dateInput');
    const timeInput = document.getElementById('timeInput');
    const timezoneSelect = document.getElementById('timezoneSelect');
    
    // 时间戳输入框变化监听
    timestampInput.addEventListener('input', function() {
        if (this.value.trim()) {
            convertTimestampToDate();
        }
    });
    
    // 日期时间输入框变化监听
    dateInput.addEventListener('change', function() {
        if (this.value && timeInput.value) {
            convertDateToTimestamp();
        }
    });
    
    timeInput.addEventListener('change', function() {
        if (this.value && dateInput.value) {
            convertDateToTimestamp();
        }
    });
    
    timezoneSelect.addEventListener('change', function() {
        if (dateInput.value && timeInput.value) {
            convertDateToTimestamp();
        }
    });
    
    // 时间戳单位选择器变化监听
    const unitRadios = document.querySelectorAll('input[name="timestampUnit"]');
    unitRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (timestampInput.value.trim()) {
                convertTimestampToDate();
            }
        });
    });
    
    // 键盘快捷键
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'Enter':
                    e.preventDefault();
                    if (e.shiftKey) {
                        convertDateToTimestamp();
                    } else {
                        convertTimestampToDate();
                    }
                    break;
            }
        }
    });
}

// 启动当前时间更新
function startCurrentTimeUpdate() {
    updateCurrentTime();
    currentTimestampInterval = setInterval(updateCurrentTime, 1000);
}

// 更新当前时间显示
function updateCurrentTime() {
    const now = new Date();
    const timestamp = Math.floor(now.getTime() / 1000);
    const dateTimeString = formatDateTime(now);
    
    document.getElementById('currentTimestamp').textContent = timestamp;
    document.getElementById('currentDateTime').textContent = dateTimeString;
}

// 初始化当前日期时间到输入框
function initializeCurrentDateTime() {
    const now = new Date();
    const dateString = now.toISOString().split('T')[0];
    const timeString = now.toTimeString().split(' ')[0];
    
    document.getElementById('dateInput').value = dateString;
    document.getElementById('timeInput').value = timeString;
    
    // 触发一次转换
    convertDateToTimestamp();
}

// 时间戳转日期时间
function convertTimestampToDate() {
    const input = document.getElementById('timestampInput').value.trim();
    
    if (!input) {
        showMessage('请输入时间戳', 'warning');
        return;
    }
    
    // 验证输入是否为数字
    if (!/^\d+$/.test(input)) {
        showMessage('时间戳必须是数字', 'error');
        clearTimestampResults();
        return;
    }
    
    try {
        let timestamp = parseInt(input);
        
        // 自动检测时间戳类型
        const detectedType = detectTimestampType(timestamp);
        
        // 自动切换对应的单选按钮
        const radioButton = document.querySelector(`input[name="timestampUnit"][value="${detectedType.type}"]`);
        if (radioButton) {
            radioButton.checked = true;
        }
        
        // 显示检测结果
        showMessage(`🤖 自动识别：${detectedType.name}`, 'success');
        
        // 根据检测的类型转换为毫秒
        let timestampMs;
        if (detectedType.type === 'seconds') {
            timestampMs = timestamp * 1000;
        } else if (detectedType.type === 'milliseconds') {
            timestampMs = timestamp;
        } else if (detectedType.type === 'microseconds') {
            timestampMs = timestamp / 1000;
        } else if (detectedType.type === 'nanoseconds') {
            timestampMs = timestamp / 1000000;
        }
        
        // 验证时间戳范围（1970-2100年之间）
        if (timestampMs < 0 || timestampMs > 4102444800000) {
            showMessage('时间戳超出有效范围 (1970-2100)', 'error');
            clearTimestampResults();
            return;
        }
        
        const date = new Date(timestampMs);
        
        // 检查日期是否有效
        if (isNaN(date.getTime())) {
            showMessage('无效的时间戳', 'error');
            clearTimestampResults();
            return;
        }
        
        // 格式化结果
        const localDateTime = formatDateTime(date);
        const utcDateTime = formatDateTime(date, true);
        const relativeTime = getRelativeTime(date);
        
        // 更新显示
        document.getElementById('timestampToDateResult').textContent = localDateTime;
        document.getElementById('timestampToUtcResult').textContent = utcDateTime;
        document.getElementById('timestampToRelativeResult').textContent = relativeTime;
        
        showMessage('时间戳转换成功！', 'success');
        
    } catch (error) {
        console.error('时间戳转换错误:', error);
        showMessage('转换失败：' + error.message, 'error');
        clearTimestampResults();
    }
}

// 日期时间转时间戳
function convertDateToTimestamp() {
    const dateValue = document.getElementById('dateInput').value;
    const timeValue = document.getElementById('timeInput').value;
    const timezone = document.getElementById('timezoneSelect').value;
    
    if (!dateValue || !timeValue) {
        showMessage('请选择日期和时间', 'warning');
        return;
    }
    
    try {
        let date;
        const dateTimeString = `${dateValue}T${timeValue}`;
        
        if (timezone === 'local') {
            date = new Date(dateTimeString);
        } else if (timezone === 'UTC') {
            date = new Date(dateTimeString + 'Z');
        } else {
            // 使用Intl.DateTimeFormat处理时区
            date = new Date(dateTimeString);
            // 这里简化处理，实际应用中可能需要更复杂的时区转换
        }
        
        // 检查日期是否有效
        if (isNaN(date.getTime())) {
            showMessage('无效的日期时间', 'error');
            clearDateResults();
            return;
        }
        
        const timestampSeconds = Math.floor(date.getTime() / 1000);
        const timestampMilliseconds = date.getTime();
        const timestampMicroseconds = date.getTime() * 1000;
        const timestampNanoseconds = date.getTime() * 1000000;
        const formattedDateTime = formatDateTime(date);
        
        // 更新显示
        document.getElementById('dateToTimestampSeconds').textContent = timestampSeconds;
        document.getElementById('dateToTimestampMilliseconds').textContent = timestampMilliseconds;
        document.getElementById('dateToTimestampMicroseconds').textContent = timestampMicroseconds;
        document.getElementById('dateToTimestampNanoseconds').textContent = timestampNanoseconds;
        document.getElementById('dateToFormattedResult').textContent = formattedDateTime;
        
        showMessage('日期时间转换成功！', 'success');
        
    } catch (error) {
        console.error('日期转换错误:', error);
        showMessage('转换失败：' + error.message, 'error');
        clearDateResults();
    }
}

// 格式化日期时间
function formatDateTime(date, isUTC = false) {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    };
    
    if (isUTC) {
        options.timeZone = 'UTC';
    }
    
    return date.toLocaleString('zh-CN', options);
}

// 获取相对时间
function getRelativeTime(date) {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (Math.abs(diffSeconds) < 60) {
        return diffSeconds === 0 ? '刚刚' : `${Math.abs(diffSeconds)}秒${diffSeconds > 0 ? '前' : '后'}`;
    } else if (Math.abs(diffMinutes) < 60) {
        return `${Math.abs(diffMinutes)}分钟${diffMinutes > 0 ? '前' : '后'}`;
    } else if (Math.abs(diffHours) < 24) {
        return `${Math.abs(diffHours)}小时${diffHours > 0 ? '前' : '后'}`;
    } else if (Math.abs(diffDays) < 30) {
        return `${Math.abs(diffDays)}天${diffDays > 0 ? '前' : '后'}`;
    } else {
        const diffMonths = Math.floor(diffDays / 30);
        if (Math.abs(diffMonths) < 12) {
            return `${Math.abs(diffMonths)}个月${diffMonths > 0 ? '前' : '后'}`;
        } else {
            const diffYears = Math.floor(diffMonths / 12);
            return `${Math.abs(diffYears)}年${diffYears > 0 ? '前' : '后'}`;
        }
    }
}

// 使用当前时间戳
function useCurrentTimestamp() {
    const now = new Date();
    const timestamp = Math.floor(now.getTime() / 1000);
    document.getElementById('timestampInput').value = timestamp;
    convertTimestampToDate();
    showMessage('已使用当前时间戳', 'info');
}

// 使用当前日期时间
function useCurrentDateTime() {
    const now = new Date();
    const dateString = now.toISOString().split('T')[0];
    const timeString = now.toTimeString().split(' ')[0];
    
    document.getElementById('dateInput').value = dateString;
    document.getElementById('timeInput').value = timeString;
    convertDateToTimestamp();
    showMessage('已使用当前日期时间', 'info');
}

// 清空时间戳输入
function clearTimestampInput() {
    document.getElementById('timestampInput').value = '';
    clearTimestampResults();
    showMessage('时间戳输入已清空', 'info');
}

// 清空日期输入
function clearDateInput() {
    document.getElementById('dateInput').value = '';
    document.getElementById('timeInput').value = '';
    clearDateResults();
    showMessage('日期时间输入已清空', 'info');
}

// 清空时间戳转换结果
function clearTimestampResults() {
    document.getElementById('timestampToDateResult').textContent = '-';
    document.getElementById('timestampToUtcResult').textContent = '-';
    document.getElementById('timestampToRelativeResult').textContent = '-';
}

// 清空日期转换结果
function clearDateResults() {
    document.getElementById('dateToTimestampSeconds').textContent = '-';
    document.getElementById('dateToTimestampMilliseconds').textContent = '-';
    document.getElementById('dateToTimestampMicroseconds').textContent = '-';
    document.getElementById('dateToTimestampNanoseconds').textContent = '-';
    document.getElementById('dateToFormattedResult').textContent = '-';
}

// 复制功能
async function copyCurrentTimestamp() {
    const timestamp = document.getElementById('currentTimestamp').textContent;
    await copyToClipboard(timestamp, '当前时间戳已复制');
}

async function copyCurrentDateTime() {
    const dateTime = document.getElementById('currentDateTime').textContent;
    await copyToClipboard(dateTime, '当前日期时间已复制');
}

async function copyTimestampResult() {
    const result = document.getElementById('timestampToDateResult').textContent;
    if (result !== '-') {
        await copyToClipboard(result, '转换结果已复制');
    } else {
        showMessage('没有可复制的内容', 'warning');
    }
}

async function copyUtcResult() {
    const result = document.getElementById('timestampToUtcResult').textContent;
    if (result !== '-') {
        await copyToClipboard(result, 'UTC时间已复制');
    } else {
        showMessage('没有可复制的内容', 'warning');
    }
}

async function copySecondsResult() {
    const result = document.getElementById('dateToTimestampSeconds').textContent;
    if (result !== '-') {
        await copyToClipboard(result, '秒级时间戳已复制');
    } else {
        showMessage('没有可复制的内容', 'warning');
    }
}

async function copyMillisecondsResult() {
    const result = document.getElementById('dateToTimestampMilliseconds').textContent;
    if (result !== '-') {
        await copyToClipboard(result, '毫秒级时间戳已复制');
    } else {
        showMessage('没有可复制的内容', 'warning');
    }
}

async function copyMicrosecondsResult() {
    const result = document.getElementById('dateToTimestampMicroseconds').textContent;
    if (result !== '-') {
        await copyToClipboard(result, '微秒级时间戳已复制');
    } else {
        showMessage('没有可复制的内容', 'warning');
    }
}

async function copyNanosecondsResult() {
    const result = document.getElementById('dateToTimestampNanoseconds').textContent;
    if (result !== '-') {
        await copyToClipboard(result, '纳秒级时间戳已复制');
    } else {
        showMessage('没有可复制的内容', 'warning');
    }
}

async function copyFormattedResult() {
    const result = document.getElementById('dateToFormattedResult').textContent;
    if (result !== '-') {
        await copyToClipboard(result, '格式化时间已复制');
    } else {
        showMessage('没有可复制的内容', 'warning');
    }
}

// 通用复制到剪贴板函数
async function copyToClipboard(text, successMessage) {
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
            showMessage(successMessage, 'success');
        } else {
            // 降级方案
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showMessage(successMessage, 'success');
        }
    } catch (error) {
        console.error('复制失败:', error);
        showMessage('复制失败，请手动复制', 'error');
    }
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

// 页面卸载时清理定时器
window.addEventListener('beforeunload', function() {
    if (currentTimestampInterval) {
        clearInterval(currentTimestampInterval);
    }
});

// 页面性能监控
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`时间戳转换工具加载完成，耗时: ${loadTime.toFixed(2)}ms`);
    
    // 检查浏览器特性支持
    const features = {
        'Clipboard API': 'clipboard' in navigator,
        'Date API': typeof Date !== 'undefined',
        'Intl API': typeof Intl !== 'undefined',
        'Local Storage': typeof localStorage !== 'undefined'
    };
    
    console.log('浏览器特性支持情况:', features);
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('⏰ 时间戳转换工具已加载完成');
    
    // 延迟初始化工具菜单，确保main.js已加载
    setTimeout(initializeToolsMenu, 100);
    
    // 启动实时时间更新
    startCurrentTimeUpdate();
    
    // 初始化事件监听器
    initializeEventListeners();
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
    // 这里可以添加其他事件监听器
    console.log('事件监听器初始化完成');
}