---
title: Java 基本数据类型
description: 详细介绍 Java 的基本数据类型，包括类型大小、类型转换、自动拆装箱等
sidebar:
  order: 4
---

## Java 基本数据类型

Java 是一种强类型语言，提供了八种基本数据类型，分为四类：整数、浮点数、字符和布尔。

### 1. 基本数据类型及其大小

| 数据类型 | 大小（位） | 取值范围 | 默认值 |
|----------|------------|----------|--------|
| byte     | 8          | -128 到 127 | 0 |
| short    | 16         | -32,768 到 32,767 | 0 |
| int      | 32         | -2^31 到 2^31-1 | 0 |
| long     | 64         | -2^63 到 2^63-1 | 0L |
| float    | 32         | 单精度浮点数 | 0.0f |
| double   | 64         | 双精度浮点数 | 0.0d |
| char     | 16         | '\u0000' 到 '\uffff' | '\u0000' |
| boolean  | 1          | true 或 false | false |

### 2. 类型转换

#### 2.1 自动类型转换（隐式转换）
```java
int i = 100;
long l = i;  // 自动将 int 转换为 long
double d = l;  // 自动将 long 转换为 double
```

#### 2.2 强制类型转换（显式转换）
```java
double d = 100.04;
long l = (long)d;  // 强制将 double 转换为 long
int i = (int)l;  // 强制将 long 转换为 int
```

### 3. 自动装箱与拆箱

#### 3.1 自动装箱
```java
Integer i = 10;  // 自动将 int 转换为 Integer
Double d = 3.14; // 自动将 double 转换为 Double
```

#### 3.2 自动拆箱
```java
int i = new Integer(10);  // 自动将 Integer 转换为 int
double d = new Double(3.14); // 自动将 Double 转换为 double
```

### 4. 注意事项

1. **精度丢失**：在类型转换时，可能会发生精度丢失，特别是在将浮点数转换为整数时。
   ```java
   double d = 3.99;
   int i = (int)d;  // i 的值为 3，小数部分丢失
   ```

2. **溢出问题**：当数值超出目标类型的范围时，会发生溢出。
   ```java
   int i = 2147483647;  // int 的最大值
   i = i + 1;  // 发生溢出，i 的值变为 -2147483648
   ```

3. **自动拆装箱的性能影响**：频繁的自动拆装箱操作可能会影响性能，特别是在循环中。

4. **null 值处理**：自动拆箱时，如果包装类对象为 null，会抛出 NullPointerException。
   ```java
   Integer i = null;
   int j = i;  // 抛出 NullPointerException
   ```

5. **比较操作**：使用 == 比较包装类对象时，比较的是引用而不是值。
   ```java
   Integer a = 100;
   Integer b = 100;
   System.out.println(a == b);  // true，因为 -128 到 127 之间的整数会被缓存

   Integer c = 200;
   Integer d = 200;
   System.out.println(c == d);  // false，因为超出了缓存范围
   ```

6. **缓存池**：
   - **Integer Cache**：
     - Java 对 -128 到 127 之间的 Integer 对象进行了缓存，以提高性能和减少内存使用。
     - 当使用自动装箱或 Integer.valueOf() 方法时，如果值在缓存范围内，会返回缓存的对象。
     - 可以通过 JVM 参数 `-XX:AutoBoxCacheMax=<size>` 来调整缓存的上限。
   - **Boolean Cache**：
     - Boolean 类缓存了 TRUE 和 FALSE 两个对象。
   - **Character Cache**：
     - Character 类缓存了 0 到 127 之间的字符对象。
   - **Byte Cache**：
     - Byte 类缓存了所有可能的值（-128 到 127）。
   - **Short Cache**：
     - Short 类缓存了 -128 到 127 之间的值。
   - **Long Cache**：
     - Long 类缓存了 -128 到 127 之间的值。

7. **new 和 valueOf 的区别**：
   - `new` 关键字总是创建新的对象，即使值在缓存范围内。
   - `valueOf()` 方法会优先使用缓存对象，如果值在缓存范围内。
   - 示例：
     ```java
     Integer a = new Integer(100);  // 总是创建新对象
     Integer b = Integer.valueOf(100);  // 使用缓存对象
     System.out.println(a == b);  // false，因为 a 是新创建的对象
     ```

## 参考资料

- [Java 官方文档 - 基本数据类型](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html)
- [Effective Java - 第 49 条：基本类型优先于装箱基本类型](https://book.douban.com/subject/30412517/)

