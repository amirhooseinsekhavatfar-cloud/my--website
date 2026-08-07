#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
generate-rss.py
──────────────────────────────────────────────
یه اسکریپت کوچیک محلی (بدون بک‌اند/سرور) که فایل
js/data/blog-posts.js رو می‌خونه و از روش یه فایل
rss.xml معتبر می‌سازه.

استفاده:
    python3 tools/generate-rss.py

هر وقت js/data/blog-posts.js رو ویرایش کردی (پست جدید
اضافه/حذف/ویرایش کردی)، همین اسکریپت رو دوباره اجرا کن
تا rss.xml آپدیت بشه. لازم نیست کد این فایل رو تغییر بدی.

اگه دامنه‌ی سایتت رو داری/عوض شده، متغیر SITE_URL پایین رو
با آدرس واقعی سایتت جایگزین کن.
"""
import re
import os
import sys
from datetime import datetime, timezone
from email.utils import format_datetime
from xml.sax.saxutils import escape

# ── تنظیمات — این‌ها رو در صورت نیاز عوض کن ──────────────
SITE_URL = "https://your-domain.example"
FEED_TITLE = "Amir Hosin Sekhavatfar — Blog"
FEED_DESC = "Latest articles on PLC, IoT, embedded systems and industrial automation."

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BLOG_DATA_PATH = os.path.join(ROOT, "js", "data", "blog-posts.js")
OUTPUT_PATH = os.path.join(ROOT, "rss.xml")


def extract_array_body(js_text):
    """محتوای داخل window.SiteData.blogPosts = [ ... ]; رو با شمارش آکولاد/کروشه استخراج می‌کنه."""
    marker = "window.SiteData.blogPosts"
    idx = js_text.find(marker)
    if idx == -1:
        raise ValueError("window.SiteData.blogPosts not found in blog-posts.js")
    start = js_text.find("[", idx)
    if start == -1:
        raise ValueError("Could not find opening [ for blogPosts array")
    depth = 0
    for i in range(start, len(js_text)):
        c = js_text[i]
        if c == "[":
            depth += 1
        elif c == "]":
            depth -= 1
            if depth == 0:
                return js_text[start + 1:i]
    raise ValueError("Could not find matching ] for blogPosts array")


def split_top_level_objects(array_body):
    """آرایه رو به بلوک‌های {...} در سطح بالا می‌شکنه (بدون توجه به براکت‌های تو در تو)."""
    objects = []
    depth = 0
    buf = []
    in_obj = False
    for c in array_body:
        if c == "{":
            depth += 1
            in_obj = True
        if in_obj:
            buf.append(c)
        if c == "}":
            depth -= 1
            if depth == 0 and in_obj:
                objects.append("".join(buf))
                buf = []
                in_obj = False
    return objects


FIELD_RE = re.compile(r"(\w+)\s*:\s*'((?:[^'\\]|\\.)*)'")


def parse_object(obj_str):
    fields = {}
    for m in FIELD_RE.finditer(obj_str):
        key, val = m.group(1), m.group(2)
        val = val.replace("\\'", "'").replace('\\"', '"')
        fields[key] = val
    return fields


def guess_pubdate(date_str):
    if not date_str:
        return datetime.now(timezone.utc)
    for fmt in ("%b %Y", "%Y-%m-%d", "%B %Y", "%Y/%m/%d"):
        try:
            dt = datetime.strptime(date_str.strip(), fmt)
            return dt.replace(tzinfo=timezone.utc)
        except ValueError:
            continue
    return datetime.now(timezone.utc)


def build_rss(posts):
    now = format_datetime(datetime.now(timezone.utc))
    items_xml = []
    for p in posts:
        title = escape(p.get("titleEn") or p.get("titleFa") or "Untitled")
        desc = escape(p.get("excerptEn") or p.get("excerptFa") or "")
        link = p.get("url") or (SITE_URL + "/#blog")
        link = escape(link)
        pub = format_datetime(guess_pubdate(p.get("date", "")))
        guid = escape(link + "#" + re.sub(r"\W+", "-", title.lower())[:60])
        items_xml.append(f"""    <item>
      <title>{title}</title>
      <link>{link}</link>
      <guid isPermaLink="false">{guid}</guid>
      <pubDate>{pub}</pubDate>
      <description>{desc}</description>
    </item>""")

    items_joined = "\n".join(items_xml)
    return f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>{escape(FEED_TITLE)}</title>
    <link>{escape(SITE_URL)}</link>
    <description>{escape(FEED_DESC)}</description>
    <language>en</language>
    <lastBuildDate>{now}</lastBuildDate>
{items_joined}
  </channel>
</rss>
"""


def main():
    if not os.path.exists(BLOG_DATA_PATH):
        print("ERROR: js/data/blog-posts.js not found.", file=sys.stderr)
        sys.exit(1)

    with open(BLOG_DATA_PATH, "r", encoding="utf-8") as f:
        js_text = f.read()

    array_body = extract_array_body(js_text)
    objects = split_top_level_objects(array_body)
    posts = [parse_object(o) for o in objects]

    rss = build_rss(posts)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        f.write(rss)

    print(f"rss.xml generated with {len(posts)} post(s) -> {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
