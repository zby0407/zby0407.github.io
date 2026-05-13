---
title: Astro 博客搭建指南
date: 2026-05-12
description: 记录从选型到部署的完整过程，分享一些踩坑经验。
tags: [Astro, 博客, 前端]
categories: [技术]
image: /assets/img/2.jpg
---

最近用 Astro 搭建了这个博客，想记录一下整个过程。

## 为什么选择 Astro

Astro 的 Islands Architecture 让页面加载极快，默认零 JavaScript，非常适合内容型网站。

## 部署到 GitHub Pages

配合 GitHub Actions，每次推送 main 分支即可自动构建部署。

## 一些坑

- Tailwind v4 需要 Node 24+，降级到 v3 更稳定
- 中文搜索需要 Pagefind 1.0+
