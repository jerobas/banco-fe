import styled from 'styled-components'

import background from '../../assets/temporaryWallpaper.webp';

export const Styles = {
    Container: styled.main`
        align-items: center;
        background-image: url(${background});
        background-size: cover;
        display: flex;
        height: 100vh;
        justify-content: center;
        overflow: hidden;
        width: 100vw;
    `,
    Section: styled.section`
        align-items: center;
        display: flex;
        height: 100vh;
        justify-content: center;
        width: 100vw;
    `
}