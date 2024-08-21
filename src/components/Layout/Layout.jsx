import React from 'react'

import { Styles } from './Layout.styles'

export default function Layout(props) {
    const { children, ...rest } = props;
    return (
        <Styles.Container>
                <Styles.Section {...rest}>
                    {children}
                </Styles.Section>
        </Styles.Container>
    )
}