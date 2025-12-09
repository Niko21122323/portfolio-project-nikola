import ButtonPrimary from "./ButtonPrimary";
import HamburgerMenu from "./HamburgerMenu";

const Navbar = () => {
  return (
    <nav>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-8">
          <div className="bg-primary rounded-full size-10"></div>
          <div className="flex items-center justify-between gap-2">
            <div className="w-fit">
              <ButtonPrimary
                title="stojanovski21n@gmail.com"
                link="mainto:stojanovski21n@gmail.com"
              />
            </div>
            <div className="w-fit">
              <ButtonPrimary title="Linkedin" link="linkedin.com" />
            </div>
            <div className="w-fit">
              <ButtonPrimary title="Github" link="github.com" />
            </div>
            <div className="ml-2">
              <HamburgerMenu />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
