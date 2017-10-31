import Ember from 'ember';

/**
 * Wrapper class for the watch id returned from navigator.geolocation.watchPosition. The
 * PositionWatcher class makes to easy to manage the watch.
 */
const PositionWatcher = Ember.Object.extend({
  clear () {
    let {geolocation, watchId} = this.getProperties (['geolocation', 'watchId']);
    geolocation.clearWatch (watchId);
  }
});

export default Ember.Service.extend({
  /**
   * Initialize the service.
   */
  init () {
    this._super (...arguments);

    this.set ('geolocation', navigator.geolocation);
  },

  /**
   * Test if the client support geolocation.
   */
  isSupported: Ember.computed.bool ('geolocation'),

  /**
   * Get the current position.
   *
   * @param opts
   */
  getCurrentPosition (opts) {
    let geolocation = this.get ('geolocation');

    return new Ember.RSVP.Promise ((resolve, reject) => {
      geolocation.getCurrentPosition (resolve, reject, opts);
    });
  },

  /**
   * Watch for changes to the current position.
   *
   * @param success
   * @param failure
   * @param opts
   */
  watchPosition (success, failure, opts) {
    let geolocation = this.get ('geolocation');
    let watchId = geolocation.watchPosition (success, failure, opts);

    return PositionWatcher.create ({ watchId, options: opts, geolocation});
  }
});
