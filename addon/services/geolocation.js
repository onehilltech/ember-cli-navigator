import Service from '@ember/service';

/**
 * Wrapper class for the watch id returned from navigator.geolocation.watchPosition. The
 * PositionWatcher class makes to easy to manage the watch.
 */
class PositionWatcher {
  constructor (watchId) {
    this.watchId = watchId;
  }

  clear () {
    navigator.geolocation.clearWatch (this.watchId);
  }
}

export default class GeolocationService extends Service {
  /**
   * Get the current position.
   *
   * @param opts
   */
  getCurrentPosition (opts) {
    return new Promise ((resolve, reject) => navigator.geolocation.getCurrentPosition (resolve, reject, opts));
  }

  /**
   * Watch for changes to the current position.
   *
   * @param success
   * @param failure
   * @param opts
   */
  watchPosition (success, failure, opts) {
    let watchId = navigator.geolocation.watchPosition (success, failure, opts);
    return new PositionWatcher (watchId);
  }
}
