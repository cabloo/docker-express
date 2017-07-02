exports = module.exports = coreLoader;
exports['@require'] = [
  // Sets up Application configuration variables.
  'src/core/core.config',

  // Guarantee certain functions will be available on certain types.
  'src/core/core.shims',

  // Load API router.
  'src/core/core.routes',

  // Load modules.
  'src/modules',

  // Process any errors that occurred.
  'src/errors',
];

function coreLoader() {}
