import React from "react";
import { FocusScope, useFocusManager } from "react-aria";

export const MenuAccess = (props) => {
  return (
    <div role="toolbar">
      <FocusScope contain autoFocus restoreFocus>
        {props.children}
      </FocusScope>
    </div>
  );
};

export const MenuItemAccess = (props) => {
  let focusManager = useFocusManager();
  let onKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        focusManager.focusNext({ wrap: true });
        break;
      case "ArrowUp":
        focusManager.focusPrevious({ wrap: true });
        break;
      default:
        return null;
    }
  };

  return <button onKeyDown={onKeyDown}>{props.children}</button>;
};
