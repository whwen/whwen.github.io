---
title: Java 简介
description: 详细介绍 Java 编程语言的发展历史及主要特性
sidebar:
  order: 1
---

## Java 简介

Java 是一种广泛使用的计算机编程语言，拥有跨平台、面向对象、泛型编程的特性，广泛应用于企业级 Web 应用开发和移动应用开发。

## Java 发展历史

- 1991 年：James Gosling 等人开始开发 Oak 语言
- 1995 年：正式更名为 Java，并发布 Java 1.0
- 1998 年：发布 Java 2，包含 J2SE、J2EE 和 J2ME
- 2004 年：发布 Java 5，引入泛型、注解等特性
- 2014 年：发布 Java 8，引入 Lambda 表达式
- 2018 年：发布 Java 11，成为新的长期支持版本
- 2021 年：发布 Java 17，最新的长期支持版本

## Java 主要特性

### 1. 跨平台性
Java 通过 Java 虚拟机（JVM）实现 "Write Once, Run Anywhere" 的理念。Java 源代码被编译成字节码，可以在任何安装了 JVM 的平台上运行。这种特性使得 Java 程序具有极高的可移植性，无需针对不同操作系统进行重新编译。

### 2. 面向对象
Java 是纯粹的面向对象编程语言，支持以下核心概念：
- 封装：通过访问修饰符（public、private、protected）控制类的可见性
- 继承：支持单继承，通过 extends 关键字实现类继承
- 多态：通过方法重写和接口实现实现运行时多态
- 抽象：通过抽象类和接口实现抽象编程

### 3. 自动内存管理
Java 通过垃圾回收（Garbage Collection）机制自动管理内存，开发者无需手动分配和释放内存。JVM 中的垃圾回收器会定期检查并回收不再使用的对象，有效防止内存泄漏。

### 4. 丰富的类库
Java 提供了庞大的标准类库（Java Standard Library），包括：
- 集合框架（Collections Framework）
- 并发编程工具（java.util.concurrent）
- 输入输出流（java.io）
- 网络编程（java.net）
- 数据库连接（JDBC）
此外，还有大量成熟的第三方库，如 Spring、Hibernate 等。

### 5. 多线程支持
Java 内置对多线程编程的支持，提供了：
- Thread 类和 Runnable 接口
- 线程池（Executor Framework）
- 同步机制（synchronized、volatile）
- 并发工具类（CountDownLatch、CyclicBarrier）
这些特性使得 Java 能够高效处理并发任务。

### 6. 安全性
Java 提供了多层次的安全机制：
- 字节码验证器：确保字节码符合 Java 规范
- 安全管理器：控制代码的访问权限
- 加密 API：支持各种加密算法
- 数字签名：验证代码来源的可靠性

### 7. 动态性
Java 支持动态特性，包括：
- 反射（Reflection）：运行时获取类信息并操作对象
- 动态代理：运行时创建代理对象
- 注解（Annotation）：为代码添加元数据
- 动态类加载：运行时加载和使用类

## 参考资料

- [Java 官方文档](https://docs.oracle.com/javase/)
- [Java 编程思想](https://book.douban.com/subject/2130190/)
- [Effective Java](https://book.douban.com/subject/30412517/)

