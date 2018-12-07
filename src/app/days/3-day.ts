import { IDaySolution } from "../day-solution";

export function dayThree( input: string ): IDaySolution {
    const inputParseRegex = /#([0-9]+)\s@\s([0-9]+),([0-9]+):\s([0-9]+)x([0-9]+)/
    let field: number[][] = [];
    let fieldOfIds: number[][] = [];
    let overlapCount: number = 0;
    let overlap: boolean[] = [];
    input.split('\n').forEach( element => {
        let index, xStart, yStart, xWidth, yWidth: number;
        const parameters = inputParseRegex.exec( element );
        [, index, xStart, yStart, xWidth, yWidth] = parameters.map( val => +val );
        inputParseRegex.lastIndex = 0; // reset the regex
        overlap[index] = false;

        for (let x = xStart; x < ( xStart + xWidth ); x++) {
            for (let y = yStart; y < ( yStart + yWidth ); y++) {
                if ( field[x] == null ) {
                    field[x] = [];
                    fieldOfIds[x] = [];
                }
                field[x][y] = field[x][y] == null ? 1 : field[x][y] + 1;
                if ( field[x][y] === 1 ) {
                    fieldOfIds[x][y] = index;
                } else if ( field[x][y] === 2 ) {
                    overlapCount++;
                    overlap[fieldOfIds[x][y]] = true;
                    overlap[index] = true;
                } else if ( field[x][y] > 2 ) {
                    overlap[index] = true;
                }
            }
        }
    });
    return {
        firstPart: overlapCount,
        secondPart: overlap.indexOf( false )
    }
}