import React, { useRef } from "react";
import { FocusScope, useFocusManager } from "react-aria";
//import { useHistory } from "react-router-dom";

export const MenuAccess = (props) => {
  //need to put this in
  return (
    <FocusScope contain autoFocus restoreFocus>
      <div>{props.children}</div>
    </FocusScope>
  );
};

export const MenuItemAccess = (props) => {
  //const history = useHistory();
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
        typeof handleGoToMenu === "function" &&
          handleGoToMenu(goToMenu && goToMenu);
        break;
      case "Enter":
        //history.push(link);
        console.log("Enter clicked");
        break;
      default:
        return null;
    }
  };

  return <div onKeyDown={onKeyDown}>{props.children}</div>;
};
