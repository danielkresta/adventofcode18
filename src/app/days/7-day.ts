import { IDaySolution } from "../day-solution";

interface IStep {
    name: string;
    before: string[];
    after: string[];
    completable: boolean;
}

class Worker {
    private _task: IStep;
    private _timeSpentOnTask: number;
    private _timeToFinish: number;
    private _isIdle: boolean = true;

    constructor( 
        readonly id: number,
        readonly timeOffset: number,
    ) {
    }

    get isIdle(): boolean {
        return this._isIdle;
    }

    assignTask( task: IStep ) {
        this._task = task;
        this._isIdle = false;
        this._timeSpentOnTask = 0;
        this._timeToFinish = this.timeOffset + task.name.charCodeAt(0) - 64;
    }

    work( timeInSeconds: number ): IStep {
        if ( this._isIdle ) {
            return null;
        }
        this._timeSpentOnTask += timeInSeconds;
        if ( this._timeSpentOnTask >= this._timeToFinish ) {
            this._timeSpentOnTask = 0;
            this._isIdle = true;
            return this._task;
        } else {
            return null;
        }
    };
}

export function daySeven( input: string ): IDaySolution {
    const inputRegex = /Step ([A-Z]) must be finished before step ([A-Z]) can begin./;
    let steps: IStep[] = [];
    let stepOrder: string[] = [];
    input.split('\n').forEach( row => {
        const instruction = inputRegex.exec( row ).splice(1);
        inputRegex.lastIndex = 0; // reset the regex
        const stepId = steps.findIndex( step => step.name === instruction[0] );
        if ( stepId === -1 ) {
            steps.push({
                name: instruction[0],
                before: [],
                after: [instruction[1]],
                completable: false,
            });
        } else if ( stepId > -1 ) {
            steps[stepId].after.push( instruction[1] );
        }
        const nextId = steps.findIndex( step => step.name === instruction[1] );
        if ( nextId === -1 ) {
            steps.push({
                name: instruction[1],
                before: [instruction[0]],
                after: [],
                completable: false,
            });
        } else if ( nextId > -1 ) {
            steps[nextId].before.push( instruction[0] );
        }
    });
    const originalSteps = steps.filter( step => step.before.length === 0 );
    doStep( originalSteps, steps, stepOrder );
    const firstPart = stepOrder.join('');

    // ----------------------------------------------------------------------------------
    // Part Two
    steps = stepOrder.map( currentStep => steps.find( step => step.name === currentStep ) );
    const stepsToFinish = steps.length;
    let finished: string[] = [];
    let second: number = 0;

    const workers: Worker[] = [];
    for (let workerId = 0; workerId < 5; workerId++) {
        workers.push( new Worker( workerId, 60 ) );
    }
    while ( finished.length < stepsToFinish && second < 1000000 ) {
        const finishedThisSecond = workers.reduce( ( finishedThisSecond, worker, index ) => {
            const stepToProcess = steps.find( availableStep => stepIsReady( availableStep, finished ) );
            if ( worker.isIdle && stepToProcess != undefined ) {
                console.log( "+ " + second + " - Assigning step " + stepToProcess.name + " to worker " + index );
                worker.assignTask( stepToProcess );
                steps = steps.filter( step => step.name !== stepToProcess.name );
            }
            const workResult: IStep = worker.work( 1 );
            if ( workResult != null ) {
                console.log( "- " + second + " - Worker " + index + " finished task " + workResult.name );
                finishedThisSecond.push( workResult.name );
            }
            return finishedThisSecond;
        }, [] as string[] );
        finished = finished.concat( finishedThisSecond );
        second++;
    }

    return {
        firstPart: firstPart,
        secondPart: second
    }
}


function doStep( availableSteps: IStep[], allSteps: IStep[], stepOrder: string[] ): void {
    availableSteps = availableSteps
        .sort( ( a, b ) => a.name.charCodeAt(0) - b.name.charCodeAt(0) )
        .reduce( ( a, b ) => {
            // remove duplicates
            if ( a.indexOf( b ) < 0 )
                { a.push( b ); 
            }
            return a;
        },[]);
    availableSteps.map( step => step.completable = stepIsReady( step, stepOrder ) );
    const selectedStep = availableSteps.splice( availableSteps.findIndex( step => step.completable ), 1 )[0];
    stepOrder.push( selectedStep.name );
    availableSteps = availableSteps.concat( 
        selectedStep.after
            .map( stepAfter => allSteps.find( step => step.name === stepAfter ) )
    );
    if ( availableSteps.length === 0 ) {
        return;
    } else {
        doStep( availableSteps, allSteps, stepOrder );
    }
}


function stepIsReady( currentStep: IStep, stepOrder: string[] ): boolean {
    let ready: boolean = true;
    currentStep.before.forEach( stepBefore => {
        ready = ready && stepOrder.findIndex( step => stepBefore === step ) !== -1;
    });
    return ready;
}