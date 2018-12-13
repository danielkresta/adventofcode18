import { IDaySolution } from "../day-solution";

export function dayFive( input: string ): IDaySolution {
    const inputArr: string[] =  input.split('');
    let minPolymerLength: number;
    while ( removePairedUnits( inputArr ) ) {
    }
    minPolymerLength = inputArr.length;

    for (let charCode = 65; charCode <= 90; charCode++) {
        const lowerCaseLetterRegex = new RegExp( String.fromCharCode( charCode ), 'g' );
        const upperCaseLetterRegex = new RegExp( String.fromCharCode( charCode + 32 ), 'g' );
        const reducedPolymer = input
            .replace( lowerCaseLetterRegex, "")
            .replace( upperCaseLetterRegex, "")
            .split('');
        while ( removePairedUnits( reducedPolymer ) ) {
        }
        minPolymerLength = minPolymerLength < reducedPolymer.length ? minPolymerLength : reducedPolymer.length;
    }

    return {
        firstPart: inputArr.length,
        secondPart: minPolymerLength
    }
}

function removePairedUnits( polymer: string[] ): boolean {
    let removed: boolean = false;
    polymer.forEach( ( char, index ) => {
        if ( index === polymer.length - 1 ) {
            return;
        }
        const firstLetter = polymer[index].charCodeAt(0);
        const secondLetter = polymer[index+1].charCodeAt(0);
        if ( firstLetter >= 65 && firstLetter < 91 && secondLetter === firstLetter + 32 ) {
            polymer.splice( index, 2 );
            removed = true;
        }
        if ( firstLetter >= 97 && firstLetter < 123 && secondLetter === firstLetter - 32 ) {
            polymer.splice( index, 2 );
            removed = true;
        }
    });
    return removed
}