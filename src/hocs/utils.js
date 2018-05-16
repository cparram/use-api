/**
 * Get the display name of component.
 *
 * @param {object} Component - The component to get display name.
 */
const getDisplayName = Component => {
  return Component.displayName || Component.name || 'Component';
};

export {
  getDisplayName
};