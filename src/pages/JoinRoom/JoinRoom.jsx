import { useForm } from 'react-hook-form'
import { FaTimes } from 'react-icons/fa';

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import Modal from '../../components/Modal/Modal';
import { Column } from '../Rooms/Rooms.styles';
import { Container, ErrorMessage } from './JoinRoom.styles'


const joinRoomSchema = z.object({
    password: z.string().nonempty('A senha é obrigatória!'),
})

const CustomColumn = ({ children }) => <Column style={{
    alignItems: 'flex-start',
    width: '100%',
    gap: '10px',
    marginBottom: '20px',
}}>{children}</Column>

export default function JoinRoom({
    handleClose, isOpen, roomName
}) {


    const {
        register,
        handleSubmit,
        formState: { errors } } = useForm({
            mode: 'onChange',
            shouldFocusError: true,
            reValidateMode: 'onChange',
            resolver: zodResolver(joinRoomSchema)
        })


    const handleJoinRoom = (data) => {
        if (data.password) {
            handleClose(data.password)
        }
    }


    return (
        <Modal
            visible={isOpen}
            hasHeight={true}
            height='min-content'
            hasWidth={true}
            width='400px'
        >
            <Container>
                <header style={{
                    padding: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',

                }}>
                    <div style={{
                        height: '36px',
                        width: '36px',
                    }} />
                    <h1>{roomName}</h1>
                    <button onClick={() => handleClose()}>
                        <FaTimes
                            style={{
                                fontSize: '20px',
                                color: '#ff0000'
                            }}
                        />
                    </button>
                </header>
                <main>
                    <form onSubmit={handleSubmit(handleJoinRoom)}>
                        <Column>
                            <CustomColumn>
                                <label>Senha da sala: </label>
                                <input
                                    type="password"
                                    autoComplete="off"
                                    {...register('password')}
                                />
                                {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                            </CustomColumn>
                            <button onClick={handleJoinRoom}>Entrar</button>
                        </Column>
                    </form>
                </main>
            </Container>
        </Modal>
    )
}
