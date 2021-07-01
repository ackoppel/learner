export class ConfigHelper {
  public static stringToBoolean(boolean: string): boolean {
    return boolean.toLowerCase() === 'true';
  }
}
