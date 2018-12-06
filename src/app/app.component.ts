import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'adventofcode18';
    decemberDays = Array.from({length: 25}, (v, k) => k + 1);
    currentCompleted = 10;
}
