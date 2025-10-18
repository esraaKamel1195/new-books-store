import { Category } from './category';
import { User } from './user';
import { Tag } from './tag';

export interface Story {
  id: number;
  title: string;
  publication_status?: string;
  status?: string;
  description?: string;
  language?: string;
  copyright?: string;
  cover_image?: string;
  advertisement_image?: string;
  content_type?: string;
  category?: Category;
  created_at?: Date;
  updated_at?: Date;
  user?: User;
  main_characters?: any[];
  tags?: Tag[];
  comments?: Comment[];
  readers_count?: number;
  comments_count?: number;
  votes_count?: number;
  chapters_count?: number;
}
