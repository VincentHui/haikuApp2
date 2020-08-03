import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { animated, useSpring, config, useTransition } from "react-spring";
import { ConnectedHome } from "../homeTiles/homeContainer";
import { SelectedTileMain } from "../SelectedTile/selectedTile";
import { IntroMain } from "../intro/intro";
import { ModalNames } from "../homeTiles/reducers";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
const ModalOverlay = styled(animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const ModalChild = ({ children, open }) => {
  const { x, opacity } = useSpring({
    x: open ? 0 : -window.innerWidth,
    opacity: open ? 1 : 0,
    config: { ...config.slow, clamp: true },
    from: { x: window.innerWidth, opacity: 0 },
  });
  return (
    <animated.div
      style={{
        pointerEvents: open ? "auto" : "none",
        opacity: opacity,
        transform: x.interpolate((x) => `translate3d(${x}px,0,0)`),
      }}
    >
      {children}
    </animated.div>
  );
};
// const Modals=[
//     {name:ModalNames.SELECTED, toRender:()=><SelectedTileMain/>},
//     {name:ModalNames.HOME, toRender:()=><ConnectedHome/>},
//     {name:ModalNames.INTRO, toRender:()=><IntroMain/>}]

const ModalSwitch = ({ modalName }) => {
  const location = useLocation();
  const transitions = useTransition(location, (location) => location.pathname, {
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-50%,0,0)" },
  });
  return transitions.map(({ item: location, props, key }) => (
    <animated.div key={key} style={props}>
      <Switch location={location}>
        <Route path="/" exact>
          <IntroMain />
        </Route>
        <Route path="/cards">
          <ConnectedHome />
        </Route>
      </Switch>
    </animated.div>
  ));
};

const ModalRoot = ({ modalName }) => {
  return (
    <Router>
      <ModalSwitch modalName={modalName} />
    </Router>
  );
};

const mapStateToProps = (state) => ({
  modalName: state.Modal.name,
});
export const Modal = connect(mapStateToProps)(ModalRoot);
