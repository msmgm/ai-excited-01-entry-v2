/**
 * The Mailbox Rocket - make.fun ai-excited-01 competition entry.
 * 
 * Description: A white rocket blasting vertically out of a small red mailbox at dawn, 
 * envelopes flying like confetti, with a shocked uniformed mailman beside it.
 * 
 * The image is held in this repo as entry.png (JPEG bytes, 1024x1024, 166121 bytes)
 * and is copied byte-for-byte after strict gate validation. 100% deterministic, 
 * no network requests, no randomness.
 * 
 * Usage:
 *   mkdir -p /tmp/out && MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const MAX_SIZE = 1048576; // 1 MiB
const MAX_DIM = 1024;

/**
 * Detect image format and parse dimensions from buffer (PNG or JPEG).
 * Throws clear errors if format is unsupported, size exceeds 1 MiB, or dimensions exceed 1024x1024.
 */
function validateAndInspectImage(buffer: Buffer) {
  if (buffer.length > MAX_SIZE) {
    throw new Error(`Image size ${buffer.length} bytes exceeds maximum allowed 1 MiB (${MAX_SIZE} bytes)`);
  }

  let format: 'PNG' | 'JPEG';
  let width = 0;
  let height = 0;

  // Check PNG magic bytes: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer.length >= 24 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4E &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    format = 'PNG';
    // IHDR chunk starts at offset 8. Length (4 bytes) = 13, Type (4 bytes) = 'IHDR' (49 48 44 52)
    // Width is 4 bytes at offset 16, Height is 4 bytes at offset 20
    if (buffer.readUInt32BE(12) !== 0x49484452) {
      throw new Error('Invalid PNG: IHDR chunk not found at expected offset');
    }
    width = buffer.readUInt32BE(16);
    height = buffer.readUInt32BE(20);
  } else if (buffer.length >= 2 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    format = 'JPEG';
    // Scan JPEG markers for SOF0-SOF3 (C0-C3)
    let offset = 2;
    while (offset < buffer.length) {
      if (buffer[offset] !== 0xff) {
        throw new Error('Invalid JPEG structure: expected marker');
      }
      const marker = buffer[offset + 1];
      // SOF0 (baseline), SOF1 (extended sequential), SOF2 (progressive)
      if (marker >= 0xc0 && marker <= 0xc3) {
        // Height is 2 bytes big-endian at offset + 5, Width is 2 bytes big-endian at offset + 7 from marker start (offset)
        height = buffer.readUInt16BE(offset + 5);
        width = buffer.readUInt16BE(offset + 7);
        break;
      }
      if (marker === 0xd9 || marker === 0xda) {
        // EOI or SOS
        break;
      }
      const length = buffer.readUInt16BE(offset + 2);
      offset += 2 + length;
    }
    if (width === 0 || height === 0) {
      throw new Error('Could not parse JPEG dimensions from SOF marker');
    }
  } else {
    throw new Error('Unsupported image format: must be PNG or JPEG');
  }

  if (width > MAX_DIM || height > MAX_DIM) {
    throw new Error(`Image dimensions ${width}x${height} exceed maximum allowed ${MAX_DIM}x${MAX_DIM}`);
  }

  return { format, width, height, size: buffer.length };
}

/**
 * Main pipeline: validate image, resolve output directory, copy byte-for-byte, and verify.
 */
function main() {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const srcPath = join(__dirname, 'entry.png');
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  const destPath = join(outDir, 'entry.png');

  console.log(`Reading entry image from ${srcPath}...`);
  const buffer = readFileSync(srcPath);

  const info = validateAndInspectImage(buffer);
  console.log(`Gate validation passed: format=${info.format}, size=${info.size} bytes, dimensions=${info.width}x${info.height}`);

  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
  }

  console.log(`Copying entry.png to ${destPath}...`);
  writeFileSync(destPath, buffer);

  console.log(`Verifying copied output...`);
  const writtenBuffer = readFileSync(destPath);
  if (Buffer.compare(buffer, writtenBuffer) !== 0) {
    throw new Error('Verification failed: output file bytes differ from input file bytes!');
  }

  console.log(`Success! The Mailbox Rocket entry.png successfully validated, copied, and verified.`);
}

main();



