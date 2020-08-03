import React, { useRef, useState } from "react";
import { animated, useTrail, useSpring } from "react-spring";
import { connect } from "react-redux";
import styled from "styled-components";
import { OpenModalAction, ModalNames } from "../homeTiles/reducers";
import { TileSpring } from "../homeTiles/homeTile";
import { useMediaQuery } from "react-responsive";
import { BigOleRoute, Item } from "../globalStyles";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { useHistory } from "react-router-dom";

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};

export const Grid = styled(animated.div)`
  display: flex;
  flex-flow: row wrap;
`;

const IntroTileNonAb = styled(animated.div)`
  flex: 2;
  display: flex;
  // justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 400px;
`;
const config = { mass: 5, tension: 2000, friction: 350 };
export const Guttering = ({ render }) =>
  render && (
    <Item>
      <div style={{ height: 100 }}></div>
    </Item>
  );

const Main = ({ tileRef }) => {
  const scene = useRef();
  const { camera } = useThree();
  const parentRef = useRef();
  useFrame(({ gl }) => {
    // console.log(gl)
    const {
      left,
      right,
      top,
      bottom,
      width,
      height,
    } = tileRef.current.getBoundingClientRect();
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    const positiveYUpBottom = gl.domElement.height - bottom;
    gl.setViewport(left, positiveYUpBottom, width, height);
    gl.autoClear = true;
    gl.render(scene.current, camera);
  }, 100);

  return (
    <scene ref={scene}>
      <ambientLight color={"#282c34"} />
      <pointLight position={[0, -10, 15]} />
      <BodyToOrbit ref={parentRef} position={[0, 0, 0]} />
      <OrbitingChild position={[3, 0, 0]} />
    </scene>
  );
};

const Intro = ({ openModal }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  let history = useHistory();
  const TileRef = useRef();
  return (
    <BigOleRoute>
      <Canvas style={{ position: "absolute" }}>
        <Main tileRef={TileRef} />
      </Canvas>
      <Guttering render={isDesktop} />
      <IntroTileNonAb>
        <div
          style={{ color: "white", borderStyle: "solid", borderWidth: "thin" }}
        >
          <div
            ref={TileRef}
            className="Fruit"
            style={{ width: 300, height: 300 }}
          ></div>
          <div style={{ width: 300 }}>
            <div style={{ margin: 30 }}>
              Vince is working on some stuff with you guys in north london
            </div>
          </div>
          <div style={{ margin: 30 }}></div>
          <TileSpring
            onClick={() => history.push("/cards")}
            style={{ width: "100%", opacity: 0 }}
          >
            GO !
          </TileSpring>
        </div>
      </IntroTileNonAb>

      <Guttering render={isDesktop} />
    </BigOleRoute>
  );
};

const BodyToOrbit = ({ props }) => {
  const ref = useRef();
  useFrame(
    (state, delta) =>
      (ref.current.rotation.x = ref.current.rotation.y += 0.3 * delta)
  );
  return (
    <mesh ref={ref} {...props} scale={[1, 1, 1]}>
      <icosahedronBufferGeometry attach="geometry" />
      <meshStandardMaterial attach="material" color={"white"} />
    </mesh>
  );
};
const moveOnCircle = (t) => {
  const x = 2 * Math.cos(t) + 0;
  const y = 3 * Math.sin(t) + 0;
  return { x, y };
};
let angle = 0;
const OrbitingChild = ({ props }) => {
  const ref = useRef();

  useFrame((state, delta) => {
    angle += delta * 0.9;
    const { x, y } = moveOnCircle(angle);

    ref.current.position.x = x;
  });

  return (
    <mesh ref={ref} scale={[0.2, 0.2, 0.2]} rotation={[0, 45, 0, "XYZ"]}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={"white"} />
    </mesh>
  );
};
const mapStateToProps = (state) => ({
  selectedTile: state.SelectedTile,
});
const mapDispatchToProps = (dispatch) => ({
  openModal: () => dispatch(OpenModalAction(ModalNames.HOME)),
});
export const IntroMain = connect(mapStateToProps, mapDispatchToProps)(Intro);
