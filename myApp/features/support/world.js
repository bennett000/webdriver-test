(function (module) {
  var World;

  // cucumber world
  World = function () {
    this.World = function () {

      // this.whatever becomes available as this.whatever in cucumber steps
      this.address = 'http://localhost:8100';
    };
  };

  module.exports = World;
}(module));
