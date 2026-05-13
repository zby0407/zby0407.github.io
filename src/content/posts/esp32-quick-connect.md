---
title: deepmem ESP32 连接方法
date: 2026-05-13
description: ESP32 连接 deepmem 服务器进行实时语音对话的完整指南。
tags: [ESP32, WebSocket, 物联网]
categories: [技术]
---

# deepmem ESP32 连接方法

这份文档只说明 ESP32 如何连接当前服务器并进行实时语音对话。

## 1. 创建 ESP32 设备

打开管理页面：

```text
https://deepmem.top
```

进入 **ESP32 设备** 页面，点击创建设备。

创建成功后保存两项配置：

```text
DEVICE_ID = 页面返回的设备 ID
TOKEN     = 页面返回的 token
```

## 2. WebSocket 连接地址

ESP32 固件连接：

```text
wss://deepmem.top/esp32/ws/DEVICE_ID?token=TOKEN
```

把 `DEVICE_ID` 和 `TOKEN` 替换成页面生成的实际值。

本地开发环境连接格式是：

```text
ws://HOST:7860/esp32/ws/DEVICE_ID?token=TOKEN
```

生产环境必须使用 `wss://`。

## 3. 音频格式

ESP32 麦克风上行音频格式：

```text
PCM16LE
16000 Hz
mono
WebSocket binary frame
```

建议每帧 40ms：

```text
16000 * 2 * 0.04 = 1280 bytes
```

也就是 ESP32 每 40ms 发送一个 1280 字节的二进制音频帧。

服务器返回的 TTS 音频也是：

```text
PCM16LE
16000 Hz
mono
WebSocket binary frame
```

ESP32 收到二进制帧后直接送到播放链路。

## 4. 连接成功后服务器消息

连接成功后，服务器会先返回 `ready`：

```json
{
  "type": "ready",
  "protocol": "esp32-audio-v1",
  "sample_rate": 16000,
  "audio_format": "pcm16le",
  "channels": 1,
  "frame_ms_recommended": 40
}
```

随后服务器会下发记忆快照：

```json
{
  "type": "profile_sync",
  "user_id": "DEVICE_ID",
  "local_snapshot": {
    "protocol": "local-memory-snapshot-v1"
  }
}
```

ESP32 可以先只保存或打印这条消息。实时对话功能不依赖 ESP32 本地解析完整记忆内容。

## 5. ESP32 需要发送的 JSON 消息

连接后建议先发送设备状态：

```json
{
  "type": "status",
  "protocol": "esp32-audio-v1",
  "firmware": "1.0.0"
}
```

运行中定期发送心跳：

```json
{
  "type": "heartbeat",
  "protocol": "esp32-audio-v1",
  "firmware": "1.0.0"
}
```

建议每 15 到 30 秒发送一次。

## 6. 服务器命令 ACK

服务器可能下发命令，例如：

```json
{
  "type": "ping",
  "command_id": "xxx",
  "payload": {}
}
```

ESP32 收到后回复：

```json
{
  "type": "command_ack",
  "protocol": "esp32-audio-v1",
  "command_id": "xxx",
  "command": "ping",
  "ok": true
}
```

## 7. 最小流程

ESP32 固件最小实现顺序：

```text
1. 从配置中读取 DEVICE_ID 和 TOKEN
2. 连接 wss://deepmem.top/esp32/ws/DEVICE_ID?token=TOKEN
3. 等待服务器 ready
4. 发送 status
5. 定期发送 heartbeat
6. 采集麦克风 PCM16LE 16k mono
7. 每 40ms 发送 1280 bytes 二进制音频帧
8. 收到服务器二进制音频帧后播放
9. 收到服务器 JSON 命令后回复 command_ack
```

## 8. 电脑端模拟测试

不用真 ESP32 时，可以用仓库里的 mock 客户端测试连接：

```bash
python3 tools/esp32_mock_client.py 'wss://deepmem.top/esp32/ws/DEVICE_ID?token=TOKEN'
```

发送一段 PCM 测试音频：

```bash
python3 tools/esp32_mock_client.py 'wss://deepmem.top/esp32/ws/DEVICE_ID?token=TOKEN' \
  --pcm /path/to/audio.pcm \
  --out /tmp/tts-output.pcm
```

`audio.pcm` 必须是：

```text
PCM16LE 16000 Hz mono
```

## 9. 判断是否连接成功

设备管理页里看到：

```text
status = online
firmware = ESP32 上报的版本
last_seen 有更新时间
```

发送语音后还应看到：

```text
last_audio_at 有更新时间
last_audio_bytes 大于 0
```

如果 ESP32 能收到服务器返回的二进制音频帧，就说明实时语音对话链路已经跑通。
