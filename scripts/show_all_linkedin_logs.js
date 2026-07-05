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
    if (line.includes('linkedin') && (line.includes('write_to_file') || line.includes('run_command'))) {
      const obj = JSON.parse(line);
      console.log(`=== Line ${lineCount} ===`);
      if (obj.tool_calls) {
        obj.tool_calls.forEach(tc => {
          if (JSON.stringify(tc).includes('linkedin')) {
            console.log(JSON.stringify(tc, null, 2));
          }
        });
      }
    }
  }
}

main();
