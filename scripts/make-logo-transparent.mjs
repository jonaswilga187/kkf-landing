/**
 * Entfernt den homogenen Bildhintergrund anhand der Eckfarben (weiche Kanten).
 * Aufruf: node scripts/make-logo-transparent.mjs
 */
import sharp from 'sharp'
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const logoPath = join(root, 'public', 'logo-kirchenkreis-celle.png')

const inputBuf = readFileSync(logoPath)
const { data, info } = await sharp(inputBuf).ensureAlpha().raw().toBuffer({
  resolveWithObject: true,
})

const { width: w, height: h } = info
const corners = [
  [0, 0],
  [w - 1, 0],
  [0, h - 1],
  [w - 1, h - 1],
]
let sr = 0,
  sg = 0,
  sb = 0
for (const [x, y] of corners) {
  const i = (y * w + x) * 4
  sr += data[i]
  sg += data[i + 1]
  sb += data[i + 2]
}
const n = corners.length
const bgR = sr / n
const bgG = sg / n
const bgB = sb / n

const feather = 52

for (let i = 0; i < data.length; i += 4) {
  const r = data[i]
  const g = data[i + 1]
  const b = data[i + 2]
  const aIn = data[i + 3]
  const dist = Math.hypot(r - bgR, g - bgG, b - bgB)
  const aOut =
    dist >= feather ? aIn : Math.round((dist / feather) * aIn)
  data[i + 3] = aOut
}

const outBuf = await sharp(Buffer.from(data), {
  raw: { width: w, height: h, channels: 4 },
})
  .png({ compressionLevel: 9 })
  .toBuffer()

writeFileSync(logoPath, outBuf)
console.log('OK: transparent →', logoPath)
