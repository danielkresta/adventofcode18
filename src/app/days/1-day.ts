import { IDaySolution } from "../day-solution";

export function dayOne( input:string ): IDaySolution {
    const inputArray: number [] = input.split('\n').map(Number);
    const endFrequency = inputArray.reduce( ( total, current ) => total + current );

    let firstReachedTwice: number = null;
    let frequency: number = 0;
    let uniqueList: boolean[] = [];

    while ( firstReachedTwice == null ) {
        for ( let shift of inputArray ) {
            if ( uniqueList[frequency] && firstReachedTwice == null ) {
                firstReachedTwice = frequency;
                break;
            } else {
                uniqueList[frequency] = true;
            }
            frequency += Number(shift);
        };
    }
    return {
        firstPart: endFrequency,
        secondPart: firstReachedTwice
    }
}