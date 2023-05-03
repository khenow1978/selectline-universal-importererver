## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).




## jobServer
# Bash Service in NestJS

This code demonstrates how to run a bash script as a child process in a NestJS application. The `BashService` class is responsible for running the bash script.

## Usage

The `BashService` class provides a `runBashScript` method that takes the path to a bash script as an argument and runs it as a child process. The method returns a Promise that resolves or rejects based on the exit code of the bash script.

```javascript
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
Additionally, the childProcess.stdout.on('data', (data) => { ... }) and childProcess.stderr.on('data', (data) => { ... }) handlers allow you to capture the standard output and error of the bash script, respectively. These outputs are logged to the console using console.log and console.error.

Finally, the childProcess.on('close', (code) => { ... }) handler is used to detect when the bash script has completed. The exit code of the script is passed to the handler as the code argument, and this code is used to determine whether the Promise returned by runBashScript resolves or rejects. A exit code of 0 indicates success, and any other code indicates an error.

This code provides a basic foundation for running bash scripts in a NestJS application. Depending on your specific needs, you may want to modify this code to better fit your use case.





## Usage


The `BashService` class provides a `runBashScript` method that takes the path to a bash script as an argument and runs it as a child process. The method returns a Promise that resolves or rejects based on the exit code of the bash script.

```javascript
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
```

Additionally, the `childProcess.stdout.on('data', (data) => { ... })` and `childProcess.stderr.on('data', (data) => { ... })` handlers allow you to capture the standard output and error of the bash script, respectively. These outputs are logged to the console using `console.log` and `console.error`.

Finally, the `childProcess.on('close', (code) => { ... })` handler is used to detect when the bash script has completed. The exit code of the script is passed to the handler as the code argument, and this code is used to determine whether the Promise returned by `runBashScript` resolves or rejects. A exit code of 0 indicates success, and any other code indicates an error.

This code provides a basic foundation for running bash scripts in a NestJS application. Depending on your specific needs, you may want to modify this code to better fit your use case.