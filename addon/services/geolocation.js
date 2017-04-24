import Ember from 'ember';


/**
 * Wrapper class for the watch id returned from navigator.geolocation.watchPosition. The
 * PositionWatcher class makes to easy to manage the watch.
 */
const PositionWatcher = Ember.Object.extend({
  clear () {
    this.get ('geolocation').clearWatch (this.get ('watchId'));
  }
});

export default Ember.Service.extend({
  /**
   * Initialize the service.
   */
  init () {
    this._super (...arguments);

    this.set ('_instance', navigator.geolocation);
  },

  /**
   * Test if the client support geolocation.
   */
  isSupported: Ember.computed ('_instance', function () {
    return !Ember.isEmpty (this.get ('_instance'));
  }),

  /**
   * Get the current position.
   *
   * @param opts
   */
  getCurrentPosition (opts) {
    return new Ember.RSVP.Promise (function (resolve, reject) {
      this.get ('_instance').getCurrentPosition (resolve, reject, opts);
    }.bind (this));
  },

  /**
   * Watch for changes to the current position.
   *
   * @param success
   * @param failure
   * @param opts
   */
  watchPosition (success, failure, opts) {
    let geolocation = this.get ('_instance');
    let watchId = geolocation.watchPosition (success, failure, opts);

    return PositionWatcher.create ({
      watchId: watchId,
      options: opts,
      geolocation: geolocation
    });
  }
});
