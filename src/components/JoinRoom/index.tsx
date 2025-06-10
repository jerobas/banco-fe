import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'

import { Column } from '../../pages/Rooms/styles'
import { Container, ErrorMessage } from './styles'
import { IconContext } from 'react-icons/lib'
import { useNavigate } from "react-router-dom";

import { useSocket, socket } from "../../hooks/useSocket";
import { SocketEvent, Room } from "../../interfaces";
import ModalWrapper from '../../styles/ModalWrapper.styles';
import { useModal } from "../../hooks/useModals";

import RoomsPageButton from "../../styles/RoomsPageButton.styles";

const CustomColumn = ({ children }) => (
    <Column
        style={{
            alignItems: 'flex-start',
            width: '100%',
            gap: '10px',
            marginBottom: '20px',
        }}
    >
        {children}
    </Column>
)

function JoinRoomModal({ roomName, roomId, toggle }) {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { emitAsync } = useSocket();
    const navigate = useNavigate();

    const handleJoinRoom = async (e) => {
        e.preventDefault()
        if (!password.trim()) {
            setError('A senha é obrigatória!')
            return
        }

        const { flag } = await emitAsync(SocketEvent.JOIN, { name: roomName, password });
        if (flag) {
            navigate(`/room/${roomId}`);
        }
    }

    return (
        <ModalWrapper
            hasHeight={true}
            height="min-content"
            hasWidth={true}
            width="400px"
        >
            <Container>
                <header
                    style={{
                        padding: '1rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <div style={{ height: '36px', width: '36px' }} />
                    <h1>{roomName}</h1>
                    <button onClick={toggle}>
                        <IconContext.Provider value={{ size: '20px', color: '#ff0000' }}>
                            <FaTimes />
                        </IconContext.Provider>
                    </button>
                </header>
                <main>
                    <form onSubmit={handleJoinRoom}>
                        <Column>
                            <CustomColumn>
                                <label>Senha da sala: </label>
                                <input
                                    type="password"
                                    autoComplete="off"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                        setError('')
                                    }}
                                />
                                {error && <ErrorMessage>{error}</ErrorMessage>}
                            </CustomColumn>
                            <button type="submit">Entrar</button>
                        </Column>
                    </form>
                </main>
            </Container>
        </ModalWrapper>
    )
}

const JoinRoom = ({ disabled, roomName, roomId }) => {
    const { modal, toggle } = useModal(() => <JoinRoomModal toggle={toggle} roomId={roomId} roomName={roomName} />)

    const JoinRoomButton = () => (
        <RoomsPageButton
            disabled={disabled}
            onClick={toggle}
        >
            Entrar na sala
        </RoomsPageButton>
    );

    return <>
        <JoinRoomButton />
        {modal}
    </>
}

export default JoinRoom;