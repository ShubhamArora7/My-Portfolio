import fs from 'fs';
import readline from 'readline';

async function main() {
  const file = 'C:/Users/shubh/.gemini/antigravity/brain/7c07f471-79e6-4508-83b2-3202a009b675/.system_generated/logs/transcript.jsonl';
  const rl = readline.createInterface({
    input: fs.createReadStream(file),
    crlfDelay: Infinity
  });

  let lineCount = 0;
  for await (const line of rl) {
    lineCount++;
    if (line.includes('resume') && (line.includes('sharp') || line.includes('node') || line.includes('command') || line.includes('jimp') || line.includes('composite') || line.includes('make_') || line.includes('write_to_file'))) {
      const obj = JSON.parse(line);
      if (obj.tool_calls) {
        console.log(`--- Line ${lineCount} Tool Calls ---`);
        console.log(JSON.stringify(obj.tool_calls, null, 2));
      } else if (obj.content && obj.content.includes('write_to_file')) {
        console.log(`--- Line ${lineCount} Content ---`);
        console.log(obj.content);
      }
    }
  }
}

main();
