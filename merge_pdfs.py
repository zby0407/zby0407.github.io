files = [
    ("/tmp/memory-struct.md", "记忆体概述 — 站在 OpenClaw 的时代回顾记忆体的发展"),
    ("/tmp/magma-deep-dive.md", "MAGMA 深度解读 — 多图正交解耦的智能体记忆架构"),
    ("/tmp/fademem-deep-dive.md", "FadeMem 深度解读 — 教 AI 学会遗忘的生物启发记忆架构"),
    ("/tmp/evermemos-deep-dive.md", "EverMemOS 深度解读 — 自组织记忆操作系统与印迹启发的长程推理"),
    ("/tmp/mem0-deep-dive.md", "Mem0 深度解读 — 生产级记忆层的工程哲学与 CRUD 之道"),
]

with open("/tmp/merged.md", "w") as out:
    out.write("---\ntitle: \"AI 智能体记忆系统深度解读系列\"\nauthor: \"技术博客精选\"\ndate: \"2026\"\n---\n\n\\newpage\n\n")
    for i, (path, title) in enumerate(files):
        if i > 0:
            out.write("\n\\newpage\n\n")
        out.write(f"# {title}\n\n")
        with open(path) as f:
            out.write(f.read())
        out.write("\n")

print("Done")
