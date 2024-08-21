import styled from "styled-components";

export const Container = styled.div`
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  bottom: 0;
  display: none;
  justify-content: center;
  left: 0;
  overflow: hidden;
  overscroll-behavior: contain;
  padding: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1000;
  &.active {
    display: flex;
  }
  @media screen and (max-width: 600px) {
    padding: 8px;
  }
`;

export const Wrapper = styled.section`
  align-items: center;
  align-self: center;
  background-color: ${props => props.theme.colors.quaternary};
  border-radius: 8px;
  display: flex;
  height: ${(props) => props.hasHeight ? props.height : "100%"};
  justify-content: center;
  padding: 1.5rem;
  width: ${(props) => props.hasWidth ? props.width : "100%"};
`
