import { IDaySolution } from "../day-solution";

export function dayTwo( input:string ): IDaySolution {
    const letterAppearance: number[] = [0, 0, 0, 0];
    const inputArray = input.split('\n');
    let secondPart: string;
    inputArray.forEach( ( element, index ) => {
        const elementArray = element.split('');
        const unique = elementArray.filter( (item, i, ar) => ar.indexOf(item) === i );
        let appearsTwice, appearsThreeTimes;
        unique.forEach( uniqueLetter => {
            const numOfAppearances = elementArray.filter( element => element === uniqueLetter ).length;
            appearsTwice = appearsTwice || numOfAppearances === 2;
            appearsThreeTimes = appearsThreeTimes || numOfAppearances === 3;
        } )
        if ( appearsTwice ) {
            letterAppearance[2]++;
        }
        if ( appearsThreeTimes ) {
            letterAppearance[3]++
        }

        let common: string;
        for (let i = 0; i < inputArray.length; i++) {
            if ( inputArray[i] !== element ) {
                common = findCommonChars( element, inputArray[i] );
                if ( common.length === element.length - 1 ) {
                    secondPart = common;
                }
            }
        }
    });
    return {
        firstPart: letterAppearance[2]*letterAppearance[3],
        secondPart
    }
}

function findCommonChars( first: string, second: string ): string {
    let common: string = "";
    if ( first.length !== second.length ) {
        return null;
    }
    for (let i = 0; i < first.length; i++) {
        if ( first.charAt( i ) === second.charAt( i ) ) {
            common += first.charAt( i );
        }
    }
    return common;
}