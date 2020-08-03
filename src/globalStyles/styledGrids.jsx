import styled from "styled-components";
export const Item = styled.div`
  flex: ${(props) => (props.col ? props.col : 1)};
  color: white;
`;
export const CenterFlex = styled(Item)`
  flex-grow: 4;
  display: flex;
  flex-direction: column;
`;
