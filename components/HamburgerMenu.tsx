import { motion } from "framer-motion";

const HamburgerMenu = ({
  isActive,
  clickEvent,
}: {
  isActive: boolean;
  clickEvent: () => void;
}) => {
  return <button type="button" onClick={clickEvent}></button>;
};

export default HamburgerMenu;
