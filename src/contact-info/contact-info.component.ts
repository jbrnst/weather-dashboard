import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalonServicesService } from '../salon-services.service';

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [SalonServicesService],
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent {
  currentStep = 1;
  showConfirmation = false;
  submittedData: any = null;
  
  referralSources = [
    'Google Search',
    'Social Media',
    'Friend/Family Recommendation',
    'Walk-by',
    'Advertisement',
    'Other'
  ];

  formData = {
    referralSource: '',
    serviceInterest: '',
    contactInfo: ''
  };

  constructor(private salonServices: SalonServicesService) {}

  get services() {
    return this.salonServices.getServices();
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  isStepValid(): boolean {
    switch (this.currentStep) {
      case 1:
        return !!this.formData.referralSource;
      case 2:
        return !!this.formData.serviceInterest;
      case 3:
        return this.isValidContact();
      default:
        return false;
    }
  }

  isValidContact(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    return emailRegex.test(this.formData.contactInfo) || phoneRegex.test(this.formData.contactInfo);
  }

  startOver() {
    this.showConfirmation = false;
    this.currentStep = 1;
    this.formData = {
      referralSource: '',
      serviceInterest: '',
      contactInfo: ''
    };
  }

  onSubmit() {
    if (this.isStepValid()) {
      this.submittedData = { ...this.formData };
      this.showConfirmation = true;
      console.log('Form submitted:', this.formData);
    }
  }
}