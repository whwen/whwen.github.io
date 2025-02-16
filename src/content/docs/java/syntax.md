---
title: Java 语法指南
description: 详细介绍 Java 编程语言的基础语法，包含代码示例
sidebar:
  order: 3
---

## Java 语法指南

本指南将详细介绍 Java 编程语言的基础语法，并通过代码示例帮助理解。

### 1. 基础语法

#### 1.1 Hello World 程序
```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

#### 1.2 注释
```java
// 单行注释

/*
多行注释
可以跨越多行
*/

/**
 * 文档注释
 * 用于生成 API 文档
 */
```

### 2. 数据类型

#### 2.1 基本数据类型
```java
int num = 10;          // 整数
double pi = 3.14;      // 浮点数
boolean flag = true;   // 布尔值
char letter = 'A';     // 字符
```

#### 2.2 引用数据类型
```java
String name = "Java";  // 字符串
int[] numbers = {1, 2, 3};  // 数组
```

### 3. 控制结构

#### 3.1 条件语句
```java
int score = 85;

if (score >= 90) {
    System.out.println("优秀");
} else if (score >= 60) {
    System.out.println("及格");
} else {
    System.out.println("不及格");
}
```

#### 3.2 循环语句
```java
// for 循环
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}

// while 循环
int i = 0;
while (i < 5) {
    System.out.println(i);
    i++;
}

// do-while 循环
int j = 0;
do {
    System.out.println(j);
    j++;
} while (j < 5);
```

### 4. 运算符

Java 提供了多种运算符，用于执行各种操作。

#### 4.1 算术运算符
```java
int a = 10;
int b = 3;

System.out.println(a + b);  // 13，加法
System.out.println(a - b);  // 7，减法
System.out.println(a * b);  // 30，乘法
System.out.println(a / b);  // 3，除法
System.out.println(a % b);  // 1，取模
System.out.println(a++);    // 10，后置递增
System.out.println(++b);    // 4，前置递增
```

#### 4.2 关系运算符
```java
int x = 5;
int y = 10;

System.out.println(x == y);  // false，等于
System.out.println(x != y);  // true，不等于
System.out.println(x > y);   // false，大于
System.out.println(x < y);   // true，小于
System.out.println(x >= y);  // false，大于等于
System.out.println(x <= y);  // true，小于等于
```

#### 4.3 逻辑运算符
```java
boolean p = true;
boolean q = false;

System.out.println(p && q);  // false，逻辑与
System.out.println(p || q);  // true，逻辑或
System.out.println(!p);      // false，逻辑非
```

#### 4.4 位运算符
```java
int m = 5;  // 0101
int n = 3;  // 0011

System.out.println(m & n);  // 1，按位与
System.out.println(m | n);  // 7，按位或
System.out.println(m ^ n);  // 6，按位异或
System.out.println(~m);     // -6，按位取反
System.out.println(m << 1); // 10，左移
System.out.println(m >> 1); // 2，右移
System.out.println(m >>> 1);// 2，无符号右移
```

#### 4.5 赋值运算符
```java
int num = 10;
num += 5;  // 等同于 num = num + 5
System.out.println(num);  // 15
```

#### 4.6 三元运算符
```java
int score = 75;
String result = score >= 60 ? "及格" : "不及格";
System.out.println(result);  // 及格
```

### 5. 面向对象编程

#### 4.1 类和对象
```java
class Person {
    // 字段
    String name;
    int age;

    // 方法
    void introduce() {
        System.out.println("我叫" + name + "，今年" + age + "岁。");
    }
}

// 创建对象
Person person = new Person();
person.name = "张三";
person.age = 25;
person.introduce();
```

#### 4.2 继承
```java
class Animal {
    void eat() {
        System.out.println("动物在吃东西");
    }
}

class Dog extends Animal {
    void bark() {
        System.out.println("狗在叫");
    }
}

Dog dog = new Dog();
dog.eat();  // 继承自 Animal 类
dog.bark();
```

#### 4.3 多态
```java
class Shape {
    void draw() {
        System.out.println("绘制形状");
    }
}

class Circle extends Shape {
    @Override
    void draw() {
        System.out.println("绘制圆形");
    }
}

Shape shape = new Circle();
shape.draw();  // 输出：绘制圆形
```

### 5. 异常处理
```java
try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("发生算术异常：" + e.getMessage());
} finally {
    System.out.println("无论是否发生异常，都会执行");
}
```

### 6. 集合框架
```java
import java.util.ArrayList;

ArrayList<String> list = new ArrayList<>();
list.add("Java");
list.add("Python");
list.add("C++");

for (String language : list) {
    System.out.println(language);
}
```

### 7. 文件操作
```java
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

try {
    File file = new File("test.txt");
    FileWriter writer = new FileWriter(file);
    writer.write("Hello, Java!");
    writer.close();
} catch (IOException e) {
    e.printStackTrace();
}
```

## 参考资料

- [Java 官方文档](https://docs.oracle.com/javase/tutorial/)
- [Java 编程思想](https://book.douban.com/subject/2130190/)
- [Effective Java](https://book.douban.com/subject/30412517/)


