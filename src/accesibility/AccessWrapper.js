import React, { useRef } from "react";
import { FocusScope, useFocusManager } from "react-aria";
import { useOverlay } from "react-aria";

export const MenuAccess = (props) => {
  const overlayRef = useRef();
  const { overlayProps } = useOverlay(props, overlayRef);
  return (
    <FocusScope contain autoFocus restoreFocus>
      <div ref={overlayRef} {...overlayProps}>
        {props.children}
      </div>
    </FocusScope>
  );
};

export const MenuItemAccess = (props) => {
  const { goToMenu, handleGoToMenu, link, handleClick } = props;
  let focusManager = useFocusManager();
  let onKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        focusManager.focusNext({ wrap: true });
        break;
      case "ArrowUp":
        focusManager.focusPrevious({ wrap: true });
        break;
      case "ArrowLeft":
        //hangle the crash error here
        handleGoToMenu(goToMenu && goToMenu);
        break;
      case "Enter":
        handleClick(link);
        break;
      default:
        return null;
    }
  };

  return <button onKeyDown={onKeyDown}>{props.children}</button>;
};
