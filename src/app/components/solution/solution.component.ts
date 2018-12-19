import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { 
    dayOne, dayOneInput,
    dayTwo, dayTwoInput,
    dayThree, dayThreeInput,
    dayFour, dayFourInput, 
    dayFive, dayFiveInput, 
    daySix, daySixInput,
    daySeven, daySevenInput
} from "./../../days";
import { IDaySolution } from 'src/app/day-solution';

@Component({
    selector: 'app-solution',
    templateUrl: './solution.component.html',
    styleUrls: ['./solution.component.css']
})
export class SolutionComponent implements OnInit {

    public day: number;
    public solution: IDaySolution = null;

    constructor(
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            if ( params.id != this.day ) {
                this.solution = null;
                this.day = Number( params.id );
            }
        });
    }

    showDayResult( dayIndex ) {
        switch ( dayIndex ) {
            case 1:
                this.solution = dayOne( dayOneInput );
                break;
            case 2:
                this.solution = dayTwo( dayTwoInput );
                break;
            case 3:
                this.solution = dayThree( dayThreeInput );
                break;
            case 4:
                this.solution = dayFour( dayFourInput );
                break;
            case 5:
                this.solution = dayFive( dayFiveInput );
                break;
            case 6:
                this.solution = daySix( daySixInput );
                break;
            case 7:
                this.solution = daySeven( daySevenInput );
                break;
        
            default:
                break;
        }
    }

}
