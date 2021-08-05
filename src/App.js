import "./index.css";
import { ReactComponent as BellIcon } from "./icons/bell.svg";
import { ReactComponent as MessengerIcon } from "./icons/messenger.svg";
import { ReactComponent as CaretIcon } from "./icons/caret.svg";
import { ReactComponent as PlusIcon } from "./icons/plus.svg";
import { ReactComponent as CogIcon } from "./icons/cog.svg";
import { ReactComponent as ChevronIcon } from "./icons/chevron.svg";
import { ReactComponent as ArrowIcon } from "./icons/arrow.svg";
import { ReactComponent as BoltIcon } from "./icons/bolt.svg";

import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { MenuAccess, MenuItemAccess } from "./accesibility/AccessWrapper";

function App() {
  return (
    <Navbar>
      <MenuAccess>
        <NavItem icon={<PlusIcon />} />
        <NavItem icon={<BellIcon />} />
        <NavItem icon={<MessengerIcon />}>
          <DropdownMenu></DropdownMenu>{" "}
        </NavItem>
        <NavItem icon={<CaretIcon />}>
          <DropdownMenu></DropdownMenu>
        </NavItem>
      </MenuAccess>
    </Navbar>
  );
}

function Navbar(props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <button href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </button>

      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const [link, setLink] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <button
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </button>
    );
  }

  const handleGoToMenu = (goToMenu) => {
    goToMenu && setActiveMenu(goToMenu);
  };

  const handleClick = (link) => {
    link && setLink(link);
  };

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <MenuAccess>
            <MenuItemAccess>
              <DropdownItem>My Profile</DropdownItem>
            </MenuItemAccess>
            <MenuItemAccess goToMenu="settings" handleGoToMenu={handleGoToMenu}>
              <DropdownItem
                leftIcon={<CogIcon />}
                rightIcon={<ChevronIcon />}
                goToMenu="settings"
              >
                Settings
              </DropdownItem>
            </MenuItemAccess>
            <MenuItemAccess goToMenu="animals" handleGoToMenu={handleGoToMenu}>
              {" "}
              <DropdownItem
                leftIcon="🦧"
                rightIcon={<ChevronIcon />}
                goToMenu="animals"
              >
                Animals
              </DropdownItem>{" "}
            </MenuItemAccess>
          </MenuAccess>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "settings"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <MenuAccess>
            <MenuItemAccess goToMenu="main" handleGoToMenu={handleGoToMenu}>
              <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
                <h2>My Tutorial</h2>
              </DropdownItem>
            </MenuItemAccess>
            <MenuItemAccess link="url" handleClick={handleClick}>
              <DropdownItem leftIcon={<BoltIcon />}>HTML</DropdownItem>
            </MenuItemAccess>
            <MenuItemAccess>
              <DropdownItem leftIcon={<BoltIcon />}>CSS</DropdownItem>
            </MenuItemAccess>
            <MenuItemAccess>
              <DropdownItem leftIcon={<BoltIcon />}>CSS</DropdownItem>
            </MenuItemAccess>
            <MenuItemAccess>
              <DropdownItem leftIcon={<BoltIcon />}>JavaScript</DropdownItem>
            </MenuItemAccess>
          </MenuAccess>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "animals"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <MenuAccess>
            <MenuItemAccess goToMenu="main" handleGoToMenu={handleGoToMenu}>
              <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
                <h2>Animals</h2>
              </DropdownItem>
            </MenuItemAccess>
            <MenuItemAccess>
              <DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
            </MenuItemAccess>
            <MenuItemAccess>
              <DropdownItem leftIcon="🐸">Frog</DropdownItem>
            </MenuItemAccess>
            <MenuItemAccess>
              <DropdownItem leftIcon="🦋">Horse?</DropdownItem>
            </MenuItemAccess>
            <MenuItemAccess>
              <DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>
            </MenuItemAccess>
          </MenuAccess>
        </div>
      </CSSTransition>
    </div>
  );
}

export default App;
