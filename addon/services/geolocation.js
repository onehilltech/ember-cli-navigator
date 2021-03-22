import Service from '@ember/service';
import { getOwner } from '@ember/application';

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
  constructor () {
    super (...arguments);

    let config = getOwner (this).resolveRegistration ('config:environment');

    if (config.CORBER) {
      this._configured = this._configureForMobileDevice ();
    }
    else {
      this._configured = Promise.resolve ();
    }
  }

  _configureForMobileDevice () {
    let cordovaEvents = getOwner (this).lookup ('service:ember-cordova/events');

    return new Promise ((resolve) => {
      cordovaEvents.on ('deviceready', this, function () {
        resolve ();
      });
    });
  }

  /**
   * Get the current position.
   *
   * @param opts
   */
  getCurrentPosition (opts) {
    return this._configured.then (() => new Promise ((resolve, reject) => navigator.geolocation.getCurrentPosition (resolve, reject, opts)));
  }

  /**
   * Watch for changes to the current position.
   *
   * @param success
   * @param failure
   * @param opts
   */
  watchPosition (success, failure, opts) {
    return this._configured.then (() => {
      let watchId = navigator.geolocation.watchPosition (success, failure, opts);
      return new PositionWatcher (watchId);
    });
  }
}
