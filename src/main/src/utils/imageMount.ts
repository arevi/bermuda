import { spawn } from 'child_process';

/**
 * Attempt to mount a developer disk image on a connected iOS device
 * This will spawn the imagemounter executable and pass the provided parameters
 * @param deviceUDID - Device UDID (String)
 * @param diskImagePath - XCode Developer Disk Image path (String)
 * @param diskImageSignaturePath - XCode Developer Disk Image Signature path (String)
 * @param executablePath - Executable path for imagemounter (String)
 * @returns Promise<boolean> whether the mount failed/succeeded
 */
export const mountDiskImage = async (
  deviceUDID: string,
  diskImagePath: string,
  diskImageSignaturePath: string,
  executablePath: string
): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    // Spawn imagemounter with parameters of UDID, disk image path, and disk image signature path
    const child = spawn(executablePath, [
      '-u',
      deviceUDID,
      diskImagePath,
      diskImageSignaturePath,
    ]);

    for await (const chunk of child.stdout) {
      // Convert buffered output to string
      const message: string = chunk.toString();

      // Check if output included "Device is locked", return with an error informing the user the device is locked
      if (message.includes('Device is locked')) {
        return reject('Device is locked, unlock and try again.');
      }

      // If the device is locked message did not occur, the mount was more than likely successful so we can resolve the promise
      return resolve(true);
    }

    // Read stderr once closed
    for await (const chunk of child.stderr) {
      // Reject with the output from stderr
      return reject(chunk.toString());
    }

    // Fail through case where something really weird must have happened
    return reject(false);
  });
