import { motion } from "framer-motion";

const HamburgerMenu = ({
  isActive,
  clickEvent,
}: {
  isActive: boolean;
  clickEvent: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={clickEvent}
      className="relative overflow-hidden w-8 h-4 cursor-pointer"
    >
      <motion.div
        animate={{
          rotate: isActive ? 45 : 0,
          y: isActive ? 6 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="absolute top-0 left-0 h-0.5 w-full bg-dark"
      />
      <motion.div
        animate={{
          width: isActive ? 0 : "100%",
        }}
        transition={{ duration: 0.3 }}
        className="absolute top-1/2 right-0 -translate-y-1/2 h-0.5 w-full bg-dark"
      />
      <motion.div
        animate={{
          rotate: isActive ? -45 : 0,
          y: isActive ? -6 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 right-0 h-0.5 w-full bg-dark"
      />
    </button>
  );
};

export default HamburgerMenu;
