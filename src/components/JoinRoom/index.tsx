import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'

import Modal from '../Modal'
import { Column } from '../../pages/Rooms/styles'
import { Container, ErrorMessage } from './styles'
import { IconContext } from 'react-icons/lib'

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

export default function JoinRoom({ handleClose, isOpen, roomName }) {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleJoinRoom = (e) => {
        e.preventDefault()
        if (!password.trim()) {
            setError('A senha é obrigatória!')
            return
        }

        handleClose(password)
    }

    return (
        <Modal
            visible={isOpen}
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
                    <button onClick={() => handleClose()}>
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
        </Modal>
    )
}
