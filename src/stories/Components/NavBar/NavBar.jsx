import cntl from "cntl";
import React, { useState } from "react";
import PropTypes from "prop-types";
import ESLogo from "../../assets/images/es-logo.png";
import Chevron from "../Chevron/Chevron";

const containerCN = cntl`
  flex
  width-full
  bg-gray-500
  items-center
  justify-between
  px-3
`;

const logoContainerCN = cntl`
  m-3
  ml-0
  flex
  items-center
  cursor-pointer
`;

const logoCN = cntl`
  rounded
  h-12
`;

const estatespaceTextCN = cntl`
  font-semibold
  ml-2
`;

const actionIconContainerCN = cntl`
  hidden
  lg:flex
  ml-2
  flex-initial
  items-center
  justify-between
`;

const avatarCN = cntl`
  bg-brandGreen
  rounded
  w-10
  h-10
  flex
  items-center
  justify-center
`;

const menuButtonCN = cntl`
  pr-10
  pl-2
  py-2
`;

const NavBar = ({ onLogoutClick, onLogoClick, avatar }) => {
  const [showMenu, setShowMenu] = useState(false);

  const onLogoKeyDown = (event) => {
    if (event.key === "Enter") {
      // on enter
      onLogoClick();
    }
  };

  const closeMenu = () => {
    setShowMenu(false);
    document.removeEventListener("click", closeMenu);
  };

  const onShowMenuClick = () => {
    setShowMenu(true);
    document.addEventListener("click", closeMenu);
  };

  return (
    <div className={containerCN}>
      <div
        className={logoContainerCN}
        onClick={onLogoClick}
        onKeyDown={onLogoKeyDown}
        role="button"
        tabIndex={0}
      >
        <img className={logoCN} alt="ESLogo" src={ESLogo} />
        <p className={estatespaceTextCN}>ESTATESPACE</p>
      </div>
      <div className={actionIconContainerCN} />
      <div className={actionIconContainerCN}>
        <button onClick={onShowMenuClick} type="button">
          {avatar?.image ? null : (
            <div className="flex items-center mr-2">
              <div className={avatarCN}>
                <p className="font-semibold uppercase">{avatar?.initials}</p>
              </div>
              <Chevron className="w-2 transform rotate-90 ml-2" />
            </div>
          )}
        </button>
        {showMenu && (
          <div className="absolute top-16 right-2 z-50 bg-gray-300 flex flex-col">
            <button
              className={menuButtonCN}
              type="button"
              onClick={onLogoutClick}
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

NavBar.propTypes = {
  /**
   * temp way to logout during dev
   */
  onLogoutClick: PropTypes.func,
  /**
   * function called when the estatespace logo is clicked
   */
  onLogoClick: PropTypes.func,
  /**
   * object containing avatar image or initials
   */
  avatar: PropTypes.shape({
    image: PropTypes.string,
    initials: PropTypes.string,
  }),
};

NavBar.defaultProps = {
  onLogoutClick: null,
  onLogoClick: null,
  avatar: undefined,
};

export default NavBar;
