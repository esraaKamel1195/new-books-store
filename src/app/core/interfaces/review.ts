import { Story } from "./story";
import { User } from "./user";

export interface Review {
  review_id: number;
  has_voted: any;
  feedback: any;
  story: Story;
  user: User;
  updated_at: string;
  created_at: string;
}
