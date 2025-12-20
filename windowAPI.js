export default (win) => {
  return {
    getSize: () => win.getSize(),
    setSize: (width, height) => win.setSize(width, height),
    getPosition: () => win.getPosition(),
    setPosition: (x, y) => win.setPosition(x, y),
    minimize: () => win.minimize(),
    maximize: () => win.maximize(),

    id: win.id,
    isDestroyed: win.isDestroyed(),
    isFocused: win.isFocused(),
  };
};