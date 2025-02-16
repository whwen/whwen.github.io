---
title: Java 集合类型
description: 详细介绍 Java 集合框架，包括 List、Set、Map 等常用集合接口及其实现类
sidebar:
  order: 6
---

## Java 集合类型

Java 集合框架（Java Collections Framework）提供了一套用于存储和操作对象组的接口和类。它主要包括以下核心接口：

### 1. List 接口

List 是有序集合，允许重复元素。常用实现类：

#### 1.1 ArrayList
```java
List<String> list = new ArrayList<>();
list.add("Java");
list.add("Python");
list.add("C++");
System.out.println(list.get(0));  // 输出：Java
```

#### 1.2 LinkedList
```java
List<String> list = new LinkedList<>();
list.add("Java");
list.add("Python");
list.addFirst("C++");  // 在列表开头添加元素
System.out.println(list.getFirst());  // 输出：C++
```

### 2. Set 接口

Set 是无序集合，不允许重复元素。常用实现类：

#### 2.1 HashSet
```java
Set<String> set = new HashSet<>();
set.add("Java");
set.add("Python");
set.add("Java");  // 重复元素不会被添加
System.out.println(set.size());  // 输出：2
```

#### 2.2 TreeSet
```java
Set<String> set = new TreeSet<>();
set.add("Java");
set.add("Python");
set.add("C++");
System.out.println(set);  // 输出：[C++, Java, Python]，自动排序
```

### 3. Map 接口

Map 存储键值对，键不能重复。常用实现类：

#### 3.1 HashMap
```java
Map<String, Integer> map = new HashMap<>();
map.put("Java", 1995);
map.put("Python", 1991);
System.out.println(map.get("Java"));  // 输出：1995
```

#### 3.2 TreeMap
```java
Map<String, Integer> map = new TreeMap<>();
map.put("Java", 1995);
map.put("Python", 1991);
map.put("C++", 1985);
System.out.println(map);  // 输出：{C++=1985, Java=1995, Python=1991}，按键排序
```

### 4. 集合工具类 Collections

Collections 类提供了许多操作集合的静态方法：

```java
List<Integer> numbers = Arrays.asList(3, 1, 4, 1, 5, 9);
Collections.sort(numbers);  // 排序
System.out.println(numbers);  // 输出：[1, 1, 3, 4, 5, 9]

Collections.reverse(numbers);  // 反转
System.out.println(numbers);  // 输出：[9, 5, 4, 3, 1, 1]

int frequency = Collections.frequency(numbers, 1);  // 统计元素出现次数
System.out.println(frequency);  // 输出：2
```

### 5. 并发集合

Java 提供了线程安全的并发集合类：

#### 5.1 CopyOnWriteArrayList
```java
List<String> list = new CopyOnWriteArrayList<>();
list.add("Java");
list.add("Python");
// 线程安全，适合读多写少的场景
```

#### 5.2 ConcurrentHashMap
```java
Map<String, Integer> map = new ConcurrentHashMap<>();
map.put("Java", 1995);
map.put("Python", 1991);
// 线程安全，性能优于 Hashtable
```

## 参考资料

- [Java 官方文档 - 集合](https://docs.oracle.com/javase/tutorial/collections/)
- [Effective Java - 第 47 条：优先使用集合而不是数组](https://book.douban.com/subject/30412517/)
