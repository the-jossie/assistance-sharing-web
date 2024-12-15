import ctl from "@netlify/classnames-template-literals";

interface MenuButtonProps {
  isMenuOpen: boolean;
  onClick: () => void;
}

const MenuButton = ({ isMenuOpen, onClick }: MenuButtonProps) => {
  return (
    <button onClick={onClick} className={toggleStyle}>
      <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
        {isMenuOpen ? (
          <path
            fillRule="evenodd"
            d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
          />
        ) : (
          <path
            v-if="!isOpen"
            fillRule="evenodd"
            d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
          />
        )}
      </svg>
    </button>
  );
};

const toggleStyle = ctl(`flex flex-col space-y-[6px] md:hidden`);

export default MenuButton;
