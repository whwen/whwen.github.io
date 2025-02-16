---
title: Java List 实现类比较
description: 详细介绍 Vector、ArrayList 和 LinkedList 的用法、区别及适用场景
sidebar:
  order: 7
---

## Java List 实现类比较

### 1. ArrayList

#### 特点
- 基于动态数组实现
- 随机访问速度快（O(1)）
- 插入和删除元素较慢（O(n)）
- 非线程安全
- 默认初始容量为 10
- 扩容机制：当容量不足时，新容量为旧容量的 1.5 倍

#### 扩容流程
1. 检查当前容量是否足够
2. 如果不足，计算新容量（通常为旧容量的 1.5 倍）
3. 创建新数组，将原数组元素复制到新数组
4. 更新内部数组引用

#### 示例
```java
// 指定初始容量为 20
List<String> list = new ArrayList<>(20);

// 添加元素，触发扩容
for (int i = 0; i < 100; i++) {
    list.add("Item " + i);
}
System.out.println(list.size());  // 输出：100
```

#### 适用场景
- 需要频繁随机访问元素
- 数据量较大，但插入和删除操作较少

#### 示例
```java
List<String> list = new ArrayList<>();
list.add("Java");
list.add("Python");
System.out.println(list.get(0));  // 输出：Java
```

### 2. LinkedList

#### 特点
- 基于双向链表实现
- 插入和删除元素快（O(1)）
- 随机访问速度慢（O(n)）
- 非线程安全
- 实现了 Deque 接口，可用作队列或栈

#### 适用场景
- 需要频繁插入和删除元素
- 需要实现队列或栈的功能

#### 示例
```java
List<String> list = new LinkedList<>();
list.add("Java");
list.add("Python");
list.addFirst("C++");  // 在列表开头添加元素
System.out.println(list.getFirst());  // 输出：C++
```

### 3. Vector

#### 特点
- 基于动态数组实现
- 线程安全（方法使用 synchronized 修饰）
- 性能较 ArrayList 差
- 支持枚举遍历

#### 适用场景
- 需要线程安全的 List 实现
- 需要枚举遍历功能

#### 示例
```java
Vector<String> vector = new Vector<>();
vector.add("Java");
vector.add("Python");
Enumeration<String> e = vector.elements();
while (e.hasMoreElements()) {
    System.out.println(e.nextElement());
}
```

### 4. 性能比较

| 操作         | ArrayList | LinkedList | Vector   |
|--------------|-----------|------------|----------|
| 随机访问     | O(1)      | O(n)       | O(1)     |
| 插入/删除    | O(n)      | O(1)       | O(n)     |
| 内存占用     | 较少      | 较多       | 较少     |
| 线程安全     | 不安全    | 不安全     | 安全     |
| 扩容机制     | 1.5 倍    | 无         | 2 倍     |

### 5. 选择建议

- **ArrayList**：适合读多写少的场景，需要快速随机访问
- **LinkedList**：适合频繁插入和删除的场景，或需要实现队列/栈
- **Vector**：需要线程安全的 List 实现时使用，但通常建议使用 Collections.synchronizedList() 或 CopyOnWriteArrayList

## 高频面试题

1. **ArrayList 和 LinkedList 的区别是什么？**
   - 数据结构：ArrayList 基于数组，LinkedList 基于双向链表
   - 访问速度：ArrayList 随机访问快（O(1)），LinkedList 慢（O(n)）
   - 插入删除：ArrayList 慢（O(n)），LinkedList 快（O(1)）
   - 内存占用：ArrayList 较少，LinkedList 较多

2. **ArrayList 的扩容机制是怎样的？**
   - 默认初始容量为 10
   - 当容量不足时，新容量为旧容量的 1. 5 倍
   - 扩容过程包括创建新数组和复制元素

3. **Vector 和 ArrayList 的区别是什么？**
   - 线程安全：Vector 是线程安全的，ArrayList 不是
   - 性能：Vector 性能较差，因为方法使用 synchronized 修饰
   - 扩容：Vector 默认扩容 2 倍，ArrayList 扩容 1. 5 倍

4. **什么时候应该使用 LinkedList？**
   - 需要频繁在列表中间插入和删除元素
   - 需要实现队列或栈的功能
   - 不需要频繁随机访问元素

5. **如何实现线程安全的 List？**
   - 使用 Vector
   - 使用 Collections.synchronizedList() 包装 ArrayList
   - 使用 CopyOnWriteArrayList

## 参考资料

- [Java 官方文档 - List](https://docs.oracle.com/javase/8/docs/api/java/util/List.html)
- [Effective Java - 第 47 条：优先使用集合而不是数组](https://book.douban.com/subject/30412517/)


