---
title: Java 安装指南
description: 详细介绍 Java 在不同操作系统上的下载、安装和配置环境变量的步骤
sidebar:
  order: 2
---

## Java 安装指南

本指南将详细介绍如何在 Windows、macOS 和 Linux 系统上安装 Java 并配置环境变量。

### 1. 下载 Java

访问 [Oracle JDK 下载页面](https://www.oracle.com/java/technologies/downloads/archive/)，这个存档页面所有版本都有，选择适合您操作系统的版本进行下载。

### 2. Windows 系统安装

#### 2.1 安装步骤
1. 运行下载的安装程序（.exe 文件）
2. 按照安装向导提示进行操作
3. 选择安装路径（建议使用默认路径）
4. 完成安装

#### 2.2 配置环境变量
1. 右键点击 "此电脑" -> "属性" -> "高级系统设置"
2. 点击 "环境变量"
3. 在 "系统变量" 部分，点击 "新建" 创建 JAVA_HOME 变量：
   - 变量名：JAVA_HOME
   - 变量值：Java 安装路径（例如：C:\Program Files\Java\jdk-17）
4. 在 "系统变量" 部分，找到并选择 "Path"，点击 "编辑"
5. 点击 "新建"，添加以下路径：
   - %JAVA_HOME%\bin
6. 点击 "确定" 保存所有更改

### 3. macOS 系统安装

#### 3.1 安装步骤
1. 打开下载的 .dmg 文件
2. 将 JDK 图标拖拽到 Applications 文件夹
3. 打开终端，输入以下命令确认安装：
   ```bash
   /usr/libexec/java_home -V
   ```

#### 3.2 配置环境变量
1. 打开终端
2. 编辑 ~/.zshrc 文件：
   ```bash
   vi ~/.zshrc
   ```
3. 添加以下内容：
   ```bash
   export JAVA_HOME=$(/usr/libexec/java_home)
   export PATH=$JAVA_HOME/bin:$PATH
   ```
4. 保存并退出
5. 使更改生效：
   ```bash
   source ~/.zshrc
   ```

### 4. Linux 系统安装

#### 4.1 安装步骤
1. 解压下载的 .tar.gz 文件：
   ```bash
   tar -xzf jdk-17_linux-x64_bin.tar.gz
   ```
2. 将解压后的文件夹移动到 /usr/local/ 目录：
   ```bash
   sudo mv jdk-17 /usr/local/
   ```

#### 4.2 配置环境变量
1. 打开终端
2. 编辑 ~/.bashrc 文件：
   ```bash
   nano ~/.bashrc
   ```
3. 添加以下内容：
   ```bash
   export JAVA_HOME=/usr/local/jdk-17
   export PATH=$JAVA_HOME/bin:$PATH
   ```
4. 保存并退出（Ctrl + X，然后按 Y 确认）
5. 使更改生效：
   ```bash
   source ~/.bashrc
   ```

### 5. 验证安装

在终端或命令提示符中输入以下命令，验证 Java 是否安装成功：
```bash
java -version
javac -version
```

如果显示 Java 版本信息，则说明安装成功。

## 参考资料

- [Oracle JDK 官方安装指南](https://docs.oracle.com/en/java/javase/17/install/overview-jdk-installation.html)
- [OpenJDK 官方文档](https://openjdk.java.net/install/)

