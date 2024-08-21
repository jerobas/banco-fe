import { motion } from 'framer-motion';
import styled from "styled-components";

export const Styles = {
  Container: styled.div`
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    justify-self: center;
    padding: 1rem;
    width: 100%;
    
  `,
  Content: styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 2;
    max-width: 0 1200px;

    form{
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      input{
        background-color: ${props => props.theme.colors.White_400};
        border: none;
        border-radius: 8px;
        height: 1.75rem;
        margin-bottom: 0.5rem;
        outline: solid;
        outline-color: ${props => props.theme.dark.blue};
        outline-width: 0.1rem;
        padding: 0 .8rem;
        width: 100%;

        &::placeholder{
          color: black;
          opacity: 0.2
        }
      }
    }
  `,
  TypingText: styled.span`
    color: ${props => props.theme.colors.White};
    cursor: default;
    display: flex;
    flex-wrap: wrap;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 0.075rem;
    margin: 2rem;
    text-align: center;
    @media (max-width: 768px) {
      line-height: 2rem;
    }
  `,
   Line: styled.div`
    background-color:  ${props => props.theme.colors.White};;
    border: 8px; 
    height: 0.05rem;
    left: 0;
    margin-top: 0.17rem;
    transition: width 1s ease-in-out;
    width: ${props  => props.progress}%;
    @media (max-width: 768px) {
        display: none;
    }
  `,
  StyledButton: styled(motion.button)`
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    letter-spacing: 0.0755rem;
    padding: 10px 20px;
  `
}

export const buttonVariants = {
  hover: {
    backgroundColor: '#0056b3',
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
}