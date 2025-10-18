import { Injectable } from '@angular/core';
import { SharedHTTPService } from './shared-http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  constructor(private readonly sharedHttp: SharedHTTPService) {}

  // toggle Vote
  toggleVote(storyId: number | string, has_voted: string): Observable<any> {
    return this.sharedHttp.post(`stories/${storyId}/vote`, { has_voted: has_voted });
  }

  // add Feedback
  addFeedback(storyId: number | string, feedback: string): Observable<any> {
    return this.sharedHttp.post(`stories/${storyId}/feedback`, {
      feedback: feedback
    });
  }

  // delete Feedback
  deleteFeedback(storyId: number | string): Observable<any> {
    return this.sharedHttp.delete(`reviews/story/${storyId}`);
  }

  // get All Reviews
  getAllReviews(storyId: number | string): Observable<any> {
    return this.sharedHttp.get(`reviews/story/${storyId}`);
  }

  // block Feedback
  blockFeedback(reviewId: number | string): Observable<any> {
    return this.sharedHttp.post(`reviews/${reviewId}/block`, {});
  }

  // get Feedback Active
  getFeedbackActive(storyId: number | string): Observable<any> {
    return this.sharedHttp.get(`stories/${storyId}/feedback`);
  }
}
