import React from 'react'

import { Container, Wrapper } from "./Modal.styles";

export default function Modal(
    { children,
        visible,
        width = "100%",
        height = "100%",
        hasHeight = false,
        hasWidth = false,
        ...rest
    }) {
    return (
        <Container className={visible ? 'active no-scroll' : ''}>
            <Wrapper {...rest} width={width} height={height} hasWidth={hasWidth} hasHeight={hasHeight}>
                {visible && children}
            </Wrapper>
        </Container>
    )
}
