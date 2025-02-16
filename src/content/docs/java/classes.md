---
title: Java 类与面向对象
description: 详细介绍 Java 类的使用，包括面向对象、继承、多态、权限修饰符、内部类等
sidebar:
  order: 5
---

## Java 类与面向对象

### 1. 类定义

类是 Java 面向对象编程的基本构建块，它封装了数据（字段）和行为（方法）。一个类通常包含以下部分：

- **字段**：用于存储对象的状态
- **构造方法**：用于创建和初始化对象
- **方法**：定义对象的行为

```java
// 定义一个简单的类
public class Person {
    // 字段（属性）
    private String name;
    private int age;

    // 构造方法
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // 方法
    public void introduce() {
        System.out.println("我叫" + name + "，今年" + age + "岁。");
    }
}
```

### 2. 权限修饰符

Java 提供了四种访问权限修饰符，用于控制类、字段和方法的可见性：

| 修饰符     | 类内部 | 同包 | 子类 | 其他包 |
|------------|--------|------|------|--------|
| public     | ✔      | ✔    | ✔    | ✔      |
| protected  | ✔      | ✔    | ✔    | ✖      |
| default    | ✔      | ✔    | ✖    | ✖      |
| private    | ✔      | ✖    | ✖    | ✖      |

### 3. 继承

继承是面向对象编程的重要特性，它允许一个类（子类）继承另一个类（父类）的属性和方法。继承的主要目的是实现代码重用和扩展。

```java
// 父类
class Animal {
    public void eat() {
        System.out.println("动物在吃东西");
    }
}

// 子类继承父类
class Dog extends Animal {
    public void bark() {
        System.out.println("狗在叫");
    }
}
```

### 4. 多态

多态是指同一个接口或方法在不同情况下表现出不同的行为。在 Java 中，多态主要通过方法重写和接口实现来实现。

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

### 5. 内部类

内部类是指定义在另一个类内部的类，它可以帮助我们更好地组织代码，实现更复杂的逻辑。

#### 5.1 成员内部类
成员内部类可以访问外部类的所有成员，包括私有成员。

```java
class Outer {
    private int num = 10;

    class Inner {
        void display() {
            System.out.println("num = " + num);
        }
    }
}
```

#### 5.2 静态内部类
静态内部类不依赖于外部类的实例，可以直接通过外部类名访问。

```java
class Outer {
    private static int num = 10;

    static class Inner {
        void display() {
            System.out.println("num = " + num);
        }
    }
}
```

#### 5.3 局部内部类
局部内部类定义在方法或代码块中，只能在该方法或代码块中使用。

```java
class Outer {
    void method() {
        class Inner {
            void display() {
                System.out.println("局部内部类");
            }
        }
        Inner inner = new Inner();
        inner.display();
    }
}
```

#### 5.4 匿名内部类
匿名内部类用于创建一次性使用的类实例，通常用于实现接口或继承类。

```java
interface Greeting {
    void greet();
}

Greeting greeting = new Greeting() {
    @Override
    public void greet() {
        System.out.println("Hello, World!");
    }
};
greeting.greet();
```

### 6. 抽象类与接口

#### 6.1 抽象类
抽象类是不能被实例化的类，通常包含抽象方法（没有实现的方法）和具体方法。

```java
abstract class Shape {
    abstract void draw();
}

class Circle extends Shape {
    @Override
    void draw() {
        System.out.println("绘制圆形");
    }
}
```

#### 6.2 接口
接口是 Java 中实现多继承的方式，它定义了一组方法的规范，但不提供具体实现。

```java
interface Drawable {
    void draw();
}

class Circle implements Drawable {
    @Override
    public void draw() {
        System.out.println("绘制圆形");
    }
}
```

## 参考资料

- [Java 官方文档 - 类与对象](https://docs.oracle.com/javase/tutorial/java/javaOO/index.html)
- [Effective Java - 第 16 条：优先考虑静态成员类](https://book.douban.com/subject/30412517/)
