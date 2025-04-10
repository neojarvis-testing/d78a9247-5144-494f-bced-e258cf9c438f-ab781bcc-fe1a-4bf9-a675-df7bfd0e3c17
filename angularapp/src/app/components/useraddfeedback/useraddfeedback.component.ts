import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit {
  feedbackForm: FormGroup;

  constructor(private fb: FormBuilder, private feedbackService: FeedbackService) {
    this.feedbackForm = this.fb.group({
      userName: ['', Validators.required],
      feedback: ['', Validators.required],
      ratings: ['', [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  ngOnInit(): void {}

  addFeedback(): void {
    if (this.feedbackForm.valid) {
      const newFeedback: Feedback = this.feedbackForm.value;
      this.feedbackService.createFeedback(newFeedback).subscribe(
        (response) => {
          console.log('Feedback submitted successfully', response);
          this.feedbackForm.reset();
        },
        (error) => {
          console.error('Error submitting feedback:', error);
        }
      );
    }
  }
}