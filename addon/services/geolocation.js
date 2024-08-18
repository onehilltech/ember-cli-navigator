import Service from '@ember/service';
import { Geolocation } from '@capacitor/geolocation';

/**
 * Wrapper class for the watch id returned from navigator.geolocation.watchPosition. The
 * PositionWatcher class makes to easy to manage the watch.
 */
class PositionWatcher {
  constructor (watchId) {
    this.watchId = watchId;
  }

  clear () {
    Geolocation.clearWatch ({ id: this.watchId });
  }
}

export default class GeolocationService extends Service {
  /**
   * Get the current position.
   *
   * @param options
   */
  async getCurrentPosition (options) {
    return Geolocation.getCurrentPosition (options);
  }

  /**
   * Watch for changes to the current position.
   *
   * @param callback
   * @param options
   */
  async watchPosition (options, callback) {
    const watchId = await Geolocation.watchPosition (options, callback);
    return new PositionWatcher (watchId);
  }

  async requestPermissions (permissions) {
    return Geolocation.requestPermissions ({ permissions });
  }

  async checkPermissions () {
    return Geolocation.checkPermissions ();
  }
}
