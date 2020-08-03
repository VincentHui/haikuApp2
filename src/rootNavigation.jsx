import React from "react";
import { animated, useSpring, config } from "react-spring";
import { connect } from "react-redux";
import { Modal } from "./modal/modal";
import styled from "styled-components";

const RootContainer = styled(animated.div)`
  // width:200vw;
  display: flex;
  flex-direction: column;
`;

export const NavContainer = ({ selectedTile }) => {
  const { x, opacity } = useSpring({
    x: selectedTile === null ? 0 : -window.innerWidth,
    opacity: selectedTile === null ? 1 : 0,
    config: { ...config.slow, clamp: true },
    from: { x: -window.innerWidth, opacity: 0 },
  });
  return <Modal />;
};
const mapStateToProps = (state) => ({
  selectedTile: state.SelectedTile,
});
export const RootNavigation = connect(mapStateToProps)(NavContainer);
