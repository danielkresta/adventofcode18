import { IDaySolution } from "../day-solution";

interface IGuardData {
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number,
    status: string,
    id?: number,
}

interface IGuard {
    id: number,
    sleepTime: number,
    sleepGraph: number[],
}

export function dayFour( input: string ): IDaySolution {
    const inputParseRegex = /\[([0-9]{4})-([0-9]{2})-([0-9]{2})\s([0-9]{2}):([0-9]{2})\]\s(Guard\s#([0-9]+)\sbegins\sshift|falls\sasleep|wakes\sup)/;
    const data = [] as IGuardData[];
    const guards = [] as IGuard[];
    let currentGuard;
    let currentGuardSleepStart: number;

    input.split('\n').forEach( row => {
        const processedRow = inputParseRegex.exec( row ).slice(1);
        inputParseRegex.lastIndex = 0; // reset the regex
        data.push({
            year: +processedRow[0],
            month: +processedRow[1],
            day: +processedRow[2],
            hour: +processedRow[3],
            minute: +processedRow[4],
            status: processedRow[5],
            id: processedRow[6] != null ? +processedRow[6] : null,
        });
    });
    data.sort( ( a, b ) => { 
        if ( a.year !== b.year ) {
            return a.year - b.year;
        }
        if ( a.month !== b.month ) {
            return a.month - b.month;
        }
        if ( a.day !== b.day ) {
            return a.day - b.day;
        }
        if ( a.hour !== b.hour ) {
            return a.hour - b.hour;
        }
        if ( a.minute !== b.minute ) {
            return a.minute - b.minute;
        }
        return 0;
    }).forEach( row => {
        if ( row.id != null ) {
            currentGuard = guards.findIndex( guard => guard.id === row.id );
            if ( currentGuard === -1 ) {
                currentGuard = guards.length;
                guards.push({ id: row.id, sleepTime: 0, sleepGraph: new Array(60).fill(0) });
            }
        } else if ( row.status === "falls asleep" ) {
            currentGuardSleepStart = row.minute;
        } else if ( row.status === "wakes up" ) {
            guards[currentGuard].sleepTime += row.minute - currentGuardSleepStart;
            guards[currentGuard].sleepGraph = guards[currentGuard].sleepGraph.map( ( minute, index ) => { 
                if ( currentGuardSleepStart <= index && index < row.minute ) {
                    return minute + 1;
                }
                return minute;
            });
        }
    });

    const biggestSleeper = guards.reduce( (prev, current) => (prev.sleepTime > current.sleepTime) ? prev : current );
    const chosenMinute = biggestSleeper.sleepGraph.indexOf( Math.max( ...biggestSleeper.sleepGraph ) );

    const sameMinuteGuard = guards.reduce( ( selectedGuard, guard ) => {
        return Math.max( ...selectedGuard.sleepGraph ) > Math.max( ...guard.sleepGraph ) ? selectedGuard : guard;
    });
    const mostFrequentMinute = sameMinuteGuard.sleepGraph.indexOf( Math.max( ...sameMinuteGuard.sleepGraph ) );
    return {
        firstPart: biggestSleeper.id * chosenMinute,
        secondPart: sameMinuteGuard.id * mostFrequentMinute
    }
}