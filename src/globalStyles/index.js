import styled from 'styled-components'
export {CenterFlex, Item} from './styledGrids'
export const BigOleRoute = styled.div`
position: absolute;
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
will-change: transform, opacity;

`
export const BigOleRouteWithBigOleText = styled(BigOleRoute)`
color: white;
font-weight: 800;
font-size: 15em;
text-shadow: 0px 2px 40px #00000020, 0px 2px 5px #00000030;
`