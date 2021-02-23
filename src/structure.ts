export interface Cell {
    x: number;
    y: number;
    pos: number; //Relative position on tic-tac-toe-board. Value vary between(0-8)
    empty: boolean;
}

export interface emptyCellArray {
    cells: Array<Cell>;
    length: number;
}

export interface Move {
    x: number;
    y: number;
    score: number;
}
export interface Result {
    game_ended: boolean;
    winner: number;
}