import { spawn } from 'child_process';

export const getConnectedDeviceIds = async (
  executablePath: string
): Promise<string[]> =>
  new Promise(async (resolve, reject) => {
    const child = spawn(executablePath, ['--list']);

    for await (const chunk of child.stdout) {
      child.kill();
      return resolve(chunk.toString());
    }

    for await (const chunk of child.stderr) {
      return reject(chunk);
    }

    return reject([]);
  });
