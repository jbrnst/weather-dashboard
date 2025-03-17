import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface UnitType {
  squareFootage: number;
  count: number;
}

@Component({
  selector: 'app-percentage-interest',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './percentage-interest.component.html',
  styleUrls: ['./percentage-interest.component.css']
})
export class PercentageInterestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  userSquareFootage: number = 1;
  unitTypes: UnitType[] = [
    { squareFootage: 100, count: 10 },
    { squareFootage: 120, count: 15 },
    { squareFootage: 80, count: 8 },
    { squareFootage: 150, count: 12 }
  ];
  percentageInterest: number | null = 1;
  errorMessage: string = '';

  calculateInterest(): void {
    const totalCommunitySquareFootage = this.unitTypes.reduce((total, unitType) => total + (unitType.squareFootage * unitType.count), 0);

    if (isNaN(this.userSquareFootage) || isNaN(totalCommunitySquareFootage)) {
      this.errorMessage = 'Please enter valid numerical values for square footages and counts.';
      this.percentageInterest = null;
    } else if (this.userSquareFootage < 0 || totalCommunitySquareFootage < 0) {
      this.errorMessage = 'Square footages and counts cannot be negative.';
      this.percentageInterest = null;
    } else if (totalCommunitySquareFootage === 0) {
      this.errorMessage = 'Total community square footage cannot be zero.';
      this.percentageInterest = null;
    } else {
      this.percentageInterest = (this.userSquareFootage / totalCommunitySquareFootage) * 100;
      this.errorMessage = '';
    }
  }
}
