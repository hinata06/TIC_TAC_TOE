import { emptyCellArray, Move, Result } from "@/structure"
import { Vue, Component } from "vue-property-decorator";

@Component({
})
export class Utils extends Vue {
    static empty_cells: emptyCellArray = { cells: [], length: 0 };
    static readonly MAX = 1;
    static readonly MIN = -1;
    static result: Result = { game_ended: false, winner: 0 };
    static count = 0;
    static row = -1;
    static column = -1;
    static diagonal = -1;
    xScore: number = 0;
    oScore: number = 0;
    displayCard: String = 'Start game';
    static winner: number = 0;

    static clearState() {
        Utils.row = -1;
        Utils.column = -1;
        Utils.diagonal = -1;
        Utils.result.winner = 0;
        Utils.result.game_ended = false;
        Utils.winner = 0;
    }

    start(state: number[], value: String[]) {
        let move: Move
        Utils.initializeEmptyCell(state);
        let eCells = { ...Utils.empty_cells }
        let board = [...state]
        if (Utils.empty_cells.length <= 0 || Utils.gameOver(board))
            return;
        move = Utils.minimax(board, eCells, 1)
        let pos = move.x * 3 + move.y;
        state.splice(move.x * 3 + move.y, 1, 1);
        value.splice(pos, 1, 'O')
        Utils.clearState();
        this.displayResults(state);
        return;
    }

    displayResults(state: number[]) {
        if (Utils.gameOver(state)) {
            if (Utils.row !== -1) {
                for (let i = 0; i < 3; i++) {
                    let cell = document.getElementById(Utils.row + "" + i);
                    if (cell) cell.style.color = "red";
                }
            }
            else if (Utils.column !== -1) {
                for (let i = 0; i < 3; i++) {
                    let cell = document.getElementById(i + "" + Utils.column);
                    if (cell) cell.style.color = "red";
                }
            }
            else if (Utils.diagonal != -1) {
                if (Utils.diagonal == 1)
                    for (let i = 0; i < 3; i++) {
                        let cell = document.getElementById(i + "" + i);
                        if (cell) cell.style.color = "red";
                    }
                else {
                    let cell = document.getElementById("02");
                    if (cell) cell.style.color = "red";
                    cell = document.getElementById("11");
                    if (cell) cell.style.color = "red";
                    cell = document.getElementById("20");
                    if (cell) cell.style.color = "red";
                }
            }
            if (Utils.result.winner === -1) {
                this.xScore++;
                Utils.winner = -1;
            }
            else if (Utils.result.winner === 1) {
                this.oScore++;
                Utils.winner = 1;
            }
        }
    }

    static initializeEmptyCell(state: number[]) {
        let pos = 0;
        Utils.empty_cells.length = 0;
        Utils.empty_cells.cells.length = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                Utils.empty_cells.cells.push({ x: i, y: j, pos: pos, empty: state[i * 3 + j] == 0 ? true : false });
                pos++;
                Utils.empty_cells.length += state[i * 3 + j] === 0 ? 1 : 0;
            }
        }
    }

    static evaluateScores(): number {
        if (Utils.result.winner == 1)
            return 1;
        if (Utils.result.winner == -1)
            return -1;
        else return 0;
    }

    static gameOver(state: number[]): boolean {
        let flag = false;
        Utils.result.winner = 0;
        for (let i = 0; i < 3; i++) {
            let j = 0;
            if (state[i * 3 + j] == state[i * 3 + j + 1] && state[i * 3 + j] == state[i * 3 + j + 2] && state[i * 3 + j] != 0) {
                flag = true;
                Utils.result.winner = state[i * 3 + j];
                Utils.row = i;
            }
            else {
                if (state[j * 3 + i] == state[(j + 1) * 3 + i] && state[j * 3 + i] == state[(j + 2) * 3 + i] && state[j * 3 + i] != 0) {
                    flag = true;
                    Utils.result.winner = state[j * 3 + i];
                    Utils.column = i;
                }
            }
            if (flag == true)
                break;
        }
        if (!flag) {
            if (state[0] == state[4] && state[4] == state[8] && state[4] != 0) {
                flag = true;
                Utils.result.winner = state[0];
                Utils.diagonal = 1;
            }
            else {
                if (state[2] == state[4] && state[4] == state[6] && state[4] != 0) {
                    flag = true;
                    Utils.result.winner = state[2];
                    Utils.diagonal = 2;
                }
            }
        }
        Utils.result.game_ended = flag;
        return flag;
    }

    static minimax(state: number[], empty_cells: emptyCellArray, player: number) {
        Utils.count++;
        let evaluatedScore: number;
        let best: Move;
        let score: Move;
        if (player == Utils.MAX)
            best = { x: -1, y: -1, score: Number.NEGATIVE_INFINITY };
        else
            best = { x: -1, y: -1, score: Number.POSITIVE_INFINITY };
        if (Utils.gameOver(state) || empty_cells.length <= 0) {
            evaluatedScore = Utils.evaluateScores();
            return { x: -1, y: -1, score: evaluatedScore } as Move;
        }
        empty_cells.cells.forEach(cell => {
            if (cell.empty === true) {
                let x = cell.x;
                let y = cell.y;
                state[x * 3 + y] = player;
                cell.empty = false;
                empty_cells.length--;
                let returnedScore = Utils.minimax(state, empty_cells, -player)
                state[x * 3 + y] = 0;
                cell.empty = true;
                empty_cells.length++;
                score = { x: x, y: y, score: returnedScore.score }
                if (player == Utils.MAX) {
                    if (score.score > best.score)
                        best = score;
                }
                else
                    if (score.score < best.score)
                        best = score;
            }
        });
        return best;
    }
}