import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';

@Injectable()
export class BashService {

  async runBashScript(scriptPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const childProcess = spawn('bash', [scriptPath]);

      childProcess.stdout.on('data', (data) => {
        console.log(`Bash script output: ${data}`);
      });

      childProcess.stderr.on('data', (data) => {
        console.error(`Bash script error: ${data}`);
      });

      childProcess.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Bash script exited with code ${code}`));
        }
      });
    });
  }
  
}