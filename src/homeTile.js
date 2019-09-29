import React, {useState } from 'react';
import styled from 'styled-components'
import { animated } from 'react-spring'
export const TILE_HEIGHT = 300;
export const TITLE_HEIGHT = 50;
const HomeTile = styled(animated.div)`
  width: 200px;
  color: white;
  border-style: solid;
  border-width: thin;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 20px
`

const Content =styled.div`
  flex-grow: 3;
`

const Title = styled.div`
  height: ${TITLE_HEIGHT}px;
  line-height: 50px;
  border-top: thin solid white;
  text-align: center;
  vertical-align: middle;
`

export const InitialTile = (title,content, height)=>{
  const [toggle, set] = useState(false);
  return(
    <HomeTile style={{height}}>
      <Content>{content}</Content>
      <Title>{title}</Title>
    </HomeTile>)
}


