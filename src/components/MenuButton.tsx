import React from "react";

interface MenuButtonProps {
  menuIsOpen: boolean;
  toggleMenu: any;
}

const MenuButton: React.FC<MenuButtonProps> = ({ menuIsOpen, toggleMenu }) => {
  return (
    <button
      onClick={toggleMenu}
      className="absolute flex justify-center items-center w-16 h-16 bg-red-300 z-50 border focus:outline-none border-red-50 rounded-full shadow-2xl lg:hidden right-4 bottom-4 text-white"
    >
      {menuIsOpen ? (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      ) : (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7"
          ></path>
        </svg>
      )}
    </button>
  );
};

export default MenuButton;
