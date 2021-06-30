export class ConfigHelper {
  public static stringToBoolean(boolean: string): boolean {
    switch (boolean.toLocaleLowerCase()) {
      case 'true':
        return true;
      case 'false':
        return false;
    }
  }
}
