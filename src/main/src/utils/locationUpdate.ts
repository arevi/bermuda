import { spawn } from 'child_process';

/**
 * Executes the idevicesetlocation executable with the provided device UDID and location coordinates
 * @param deviceUDID - Device UDID (string)
 * @param location - Geolocation (string)
 * @param executablePath - idevicesetlocation executable path (string)
 * @returns void
 */
export const updateLocation = async (
  deviceUDID: string,
  location: string,
  executablePath: string
): Promise<void> =>
  new Promise(async (resolve, reject) => {
    const locationArgs = location.split(',');

    // Spawn the idevicesetlocation serice with UDID and location parameters
    const child = spawn(executablePath, [
      '-u',
      deviceUDID,
      '--',
      locationArgs[0].trim(),
      locationArgs[1].trim(),
    ]);

    // Assume error is false
    let error: boolean = false;

    // Check for error and set error state if stderr has output
    for await (const chunk of child.stderr) {
      console.log(chunk.toString());
      error = true;
    }

    // Resolve/reject based on error state
    return error ? reject() : resolve();
  });
