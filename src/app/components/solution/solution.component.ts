import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { 
    dayOne, dayOneInput,
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
        
            default:
                break;
        }
    }

}