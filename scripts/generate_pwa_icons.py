"""Generate crisp PNG icons for PWA (192x192, 512x512) and Android APK (mdpi..xxxhdpi) using pure Python."""
import os
import struct
import zlib


def write_png(path: str, width: int, height: int, rgba_bytes: bytes):
    os.makedirs(os.path.dirname(path), exist_ok=True)

    def chunk(chunk_type: bytes, data: bytes) -> bytes:
        c = chunk_type + data
        return struct.pack(">I", len(data)) + c + struct.pack(">I", zlib.crc32(c) & 0xFFFFFFFF)

    raw = bytearray()
    stride = width * 4
    for y in range(height):
        raw.append(0)
        raw.extend(rgba_bytes[y * stride : (y + 1) * stride])

    ihdr = struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)
    png = (
        b"\x89PNG\r\n\x1a\n"
        + chunk(b"IHDR", ihdr)
        + chunk(b"IDAT", zlib.compress(bytes(raw), 9))
        + chunk(b"IEND", b"")
    )
    with open(path, "wb") as f:
        f.write(png)


def render_ecreation_icon(size: int) -> bytes:
    buf = bytearray(size * size * 4)
    r_outer = size * 0.22
    pad = size * 0.06
    border = max(2.0, size * 0.045)

    for y in range(size):
        for x in range(size):
            # Rounded square mask
            dx = max(pad + r_outer - x, 0.0, x - (size - 1 - pad - r_outer))
            dy = max(pad + r_outer - y, 0.0, y - (size - 1 - pad - r_outer))
            dist = (dx * dx + dy * dy) ** 0.5
            idx = (y * size + x) * 4

            if dist > r_outer:
                buf[idx : idx + 4] = b"\x00\x00\x00\x00"
                continue

            # Gold border ring
            if dist > r_outer - border:
                # 24K Gold gradient
                t = (x + y) / (2.0 * size)
                r = int(217 + (250 - 217) * t)
                g = int(119 + (204 - 119) * t)
                b = int(6 + (21 - 6) * t)
                buf[idx : idx + 4] = bytes([r, g, b, 255])
                continue

            # Dark obsidian interior
            nx = x / size
            ny = y / size

            # Draw bold stylized 'E' in 24K Gold
            in_left_bar = 0.28 <= nx <= 0.41 and 0.24 <= ny <= 0.76
            in_top_bar = 0.28 <= nx <= 0.73 and 0.24 <= ny <= 0.35
            in_mid_bar = 0.28 <= nx <= 0.66 and 0.445 <= ny <= 0.555
            in_bot_bar = 0.28 <= nx <= 0.73 and 0.65 <= ny <= 0.76

            if in_left_bar or in_top_bar or in_mid_bar or in_bot_bar:
                t = (nx + ny) / 2.0
                r = int(245 + (253 - 245) * t)
                g = int(158 + (224 - 158) * t)
                b = int(11 + (71 - 11) * t)
                buf[idx : idx + 4] = bytes([r, g, b, 255])
            else:
                # Subtle obsidian sheen
                v = int(16 + 14 * (1.0 - ny))
                buf[idx : idx + 4] = bytes([v, v - 1, v - 2, 255])

    return bytes(buf)


targets = [
    ("public/icons/icon-192.png", 192),
    ("public/icons/icon-512.png", 512),
    ("android-admin-app/res/mipmap-mdpi/ic_launcher.png", 48),
    ("android-admin-app/res/mipmap-hdpi/ic_launcher.png", 72),
    ("android-admin-app/res/mipmap-xhdpi/ic_launcher.png", 96),
    ("android-admin-app/res/mipmap-xxhdpi/ic_launcher.png", 144),
    ("android-admin-app/res/mipmap-xxxhdpi/ic_launcher.png", 192),
]

for path, sz in targets:
    write_png(path, sz, sz, render_ecreation_icon(sz))
    print(f"Generated {path} ({sz}x{sz})")
