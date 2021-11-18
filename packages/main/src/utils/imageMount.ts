import { spawn } from 'child_process';

export const mountDiskImage = async (
  deviceUDID: string,
  diskImagePath: string,
  diskImageSignaturePath: string,
  executablePath: string
): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const child = spawn(executablePath, [
      '-u',
      deviceUDID,
      diskImagePath,
      diskImageSignaturePath,
    ]);

    for await (const chunk of child.stdout) {
      const message: string = chunk.toString();

      if (message.includes('Device is locked')) {
        return reject('Device is locked, unlock and try again.');
      }

      console.log(chunk.toString());
      return resolve(true);
    }

    // Read stderr once closed
    for await (const chunk of child.stderr) {
      return reject(chunk.toString());
    }

    // Fail through case where something really weird must have happened
    return reject(false);
  });
