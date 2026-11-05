#!/usr/bin/env python3
"""Build the code-display font for the browser UI from UDEV Gothic.

The upstream font reserves the name "UDEV Gothic" under SIL OFL 1.1. A subset is a
Modified Version, so the output is renamed "Amon-C Code" and keeps the original
copyright and license strings. Usage:

    python3 tools/subset-font.py /path/to/UDEVGothic_v2.2.0.zip

Requires fontTools and brotli. The archive hash is checked before use.
"""
import hashlib, io, json, pathlib, sys, zipfile
from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
SOURCE = {
    "url": "https://github.com/yuru7/udev-gothic/releases/download/v2.2.0/UDEVGothic_v2.2.0.zip",
    "sha256": "c104c171f6ed8922ca52d74cd915a271e427f1e884e51431aae71d99e8b3b47b",
    "member": "UDEVGothic_v2.2.0/UDEVGothic-Regular.ttf",
    "tag": "v2.2.0",
    "commit": "ca8d6f0a66a3ce39e1e5a6cab27a214d0990630d",
}
# ASCII and Latin-1, general punctuation, CJK symbols, hiragana/katakana,
# full-width forms and half-width katakana. CJK ideographs are left to system fonts.
RANGES = [(0x20, 0x7E), (0xA0, 0xFF), (0x2010, 0x205E), (0x3000, 0x303F),
          (0x3040, 0x30FF), (0xFF01, 0xFF60), (0xFF61, 0xFF9F)]
FAMILY = "Amon-C Code"
OUT = ROOT / "fonts" / "amon-c-code-subset.woff2"

def main(archive):
    data = pathlib.Path(archive).read_bytes()
    digest = hashlib.sha256(data).hexdigest()
    if digest != SOURCE["sha256"]:
        sys.exit(f"archive hash mismatch: {digest}")
    # Keep the upstream head.modified timestamp so the output is byte-reproducible.
    font = TTFont(io.BytesIO(zipfile.ZipFile(io.BytesIO(data)).read(SOURCE["member"])), recalcTimestamp=False)
    unicodes = [c for a, b in RANGES for c in range(a, b + 1)]
    options = subset.Options()
    options.flavor = "woff2"
    options.layout_features = ["*"]
    options.name_IDs = ["*"]
    options.name_languages = ["*"]
    options.notdef_outline = True
    options.hinting = False
    sub = subset.Subsetter(options)
    sub.populate(unicodes=unicodes)
    sub.subset(font)
    # Rename: the Reserved Font Name must not be used by a Modified Version.
    names = font["name"]
    for rec in list(names.names):
        if rec.nameID in (1, 16):
            names.setName(FAMILY, rec.nameID, rec.platformID, rec.platEncID, rec.langID)
        elif rec.nameID == 4:
            names.setName(f"{FAMILY} Regular", 4, rec.platformID, rec.platEncID, rec.langID)
        elif rec.nameID == 6:
            names.setName("AmonCCode-Regular", 6, rec.platformID, rec.platEncID, rec.langID)
        elif rec.nameID == 3:
            names.setName(f"{FAMILY} Regular; Amon-C browser subset", 3, rec.platformID, rec.platEncID, rec.langID)
    leftover = [str(r) for r in names.names if "UDEV Gothic" in str(r) and r.nameID in (1, 3, 4, 6, 16, 17)]
    if leftover:
        sys.exit(f"reserved name still present: {leftover}")
    OUT.parent.mkdir(exist_ok=True)
    font.flavor = "woff2"
    font.save(OUT)
    result = {
        "source": SOURCE,
        "family": FAMILY,
        "ranges": [f"U+{a:04X}-{b:04X}" for a, b in RANGES],
        "output": str(OUT.relative_to(ROOT)),
        "outputSha256": hashlib.sha256(OUT.read_bytes()).hexdigest(),
        "outputBytes": OUT.stat().st_size,
        "glyphs": len(font.getGlyphOrder()),
        "license": "SIL Open Font License 1.1; see LICENSES/fonts/",
        "reservedFontName": "UDEV Gothic (not used by this Modified Version)",
    }
    (ROOT / "compliance" / "font-subset.json").write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps(result, ensure_ascii=False))

if __name__ == "__main__":
    main(sys.argv[1])
