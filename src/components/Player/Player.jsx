import { Square } from '../Board/Board.styles'

class Player {
    constructor(amount) {
        this.amount = amount
        this.position = 0
    }

    add(amount) {
        this.amount += amount
    }

    getPosition() {
        return this.position
    }

    setPosition(position) {
        this.position = position;
    }

    toString() {
        return `Moeda: ${this.amount}`;
    }

    render(position) {
        return <Square position={position} />
    }
}

export default Player;