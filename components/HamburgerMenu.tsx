const HamburgerMenu = () => {
  return (
    <button
      type="button"
      className="relative overflow-hidden w-12 h-4 cursor-pointer"
    >
      <div className="absolute top-0 left-0 h-0.5 w-full bg-dark"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-0.5 w-full bg-dark"></div>
      <div className="absolute bottom-0 right-0 h-0.5 w-full bg-dark"></div>
    </button>
  );
};

export default HamburgerMenu;
