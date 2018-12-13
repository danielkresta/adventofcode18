import { IDaySolution } from "../day-solution";

interface coordinate {
    id: number,
    xCoord: number,
    yCoord: number,
    area: number,
    toInfinite: boolean;
}

export function daySix( input: string ): IDaySolution {
    let coordinates: coordinate[] = [];
    const coordRegex = /([0-9]+),\s([0-9]+)/
    let areaWithMinimalDistance: number = 0;

    input.split('\n').forEach( ( element, index ) => {
        const coords = coordRegex.exec( element ).splice(1);
        coordRegex.lastIndex = 0; // reset the regex
        coordinates.push({
            id: index,
            xCoord: +coords[0],
            yCoord: +coords[1],
            area: 0,
            toInfinite: false,
        });
    });
    const maxX = coordinates.reduce( ( maximum, current ) => maximum.xCoord > current.xCoord ? maximum : current ).xCoord;
    const maxY = coordinates.reduce( ( maximum, current ) => maximum.yCoord > current.yCoord ? maximum : current ).yCoord;

    for (let y = 0; y <= maxY; y++) {
        for (let x = 0; x <= maxX; x++) {
            const nearestId = findLowestDistance( x, y, coordinates ).id;
            if ( nearestId != null ) {
                coordinates[nearestId].area++;
                coordinates[nearestId].toInfinite = ( x === 0 || x === maxX || y === 0 || y === maxY ) ? true : coordinates[nearestId].toInfinite;
            }

            if ( sumAllDistances( x, y, coordinates ) < 10000 ) {
                areaWithMinimalDistance++;
            }
        }
    }
    const minimalFinite = coordinates.reduce( ( maximal, current ) => { 
        return ( maximal.area < current.area && !current.toInfinite ) ? current : maximal 
    }, { area: 0 } as coordinate );
    return {
        firstPart: minimalFinite.area,
        secondPart: areaWithMinimalDistance
    }
}

function findLowestDistance( x: number, y: number, coordinates: coordinate[] ): coordinate {
    let lowestDistance: number = 100000000;
    let nearestCoordinate: coordinate;
    coordinates.forEach( current => {
        const currentDistance = getManthattandDistance( x, y, current.xCoord, current.yCoord );
        if ( currentDistance < lowestDistance ) {
            lowestDistance = currentDistance;
            nearestCoordinate = current;
        } else if ( currentDistance === lowestDistance ) {
            nearestCoordinate = {} as coordinate;
            return;
        }
    });
    return nearestCoordinate;
}

function sumAllDistances( x: number, y: number, coordinates: coordinate[] ): number {
    let sum: number = 0;
    coordinates.forEach( current => {
        sum += getManthattandDistance( x, y, current.xCoord, current.yCoord );
    });
    return sum;
}

function getManthattandDistance( aX: number, aY: number, bX: number, bY: number ): number {
    return Math.abs( aX - bX ) + Math.abs( aY - bY );
}