import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { SharedHTTPService } from './shared-http.service';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  //1 adding api url  (comments by asmaa)
  // private apiUrl = 'http://127.0.0.1:8000/api/categories';
  private readonly apiUrl = 'https://whitesmoke-coyote-648419.hostingersite.com/api';

  //2 get all categories
  constructor(
    private readonly http: HttpClient,
    private readonly sharedHttp: SharedHTTPService
  ) {}

  // get All Categories
  getAllCategories(): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/categories`)
      .pipe(map((response) => response.data));
  }

  // get category by id
  showCategory(categoryId: number | string): Observable<any> {
    return this.sharedHttp.get(`categories/${categoryId}`);
  }

  // add category
  addCategory(category: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/categories/`, {
      category_name: category,
    });
  }

  // update category
  updateCategory(id: number, category: string) {
    return this.http.put(`${this.apiUrl}/categories/${id}`, {
      category_name: category,
    });
  }

  // delete category
  deleteCategory(id: number) {
    return this.http.delete(`${this.apiUrl}/categories/${id}`);
  }

  //
  sendSelectedUserCategory(categories: any[]): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/users/select-categories-and-get-stories`,
      { categories: categories }
    );
  }

  // Tags section

  // get Tags By Category
  getTagsByCategory(categoryId: number | string): Observable<any> {
    return this.sharedHttp.get(`category/${categoryId}/tags`);
  }

  // add tag
  addTagStore(story: string): Observable<any> {
    return this.sharedHttp.post(`Tags`, { name: story });
  }

  // store story tag
  storeStoryTags(storyId: number | string, tagId: []): Observable<any> {
    return this.sharedHttp.post(`stories/${storyId}/tags`, { tag_id: tagId });
  }

  // edit tag
  editTag(tag_id: number | string, story: string): Observable<any> {
    return this.sharedHttp.put(`Tags/${tag_id}`, { name: story });
  }

  // update Story Tags
  updateStoryTags(
    story_id: number | string,
    old_tag_id: [],
    new_tag_id: []
  ): Observable<any> {
    return this.sharedHttp.put(`stories/${story_id}/tags`, {
      old_tag_id: old_tag_id,
      new_tag_id: new_tag_id,
    });
  }

  // delete tag
  deleteTag(tag_id: number | string): Observable<any> {
    return this.sharedHttp.delete(`Tags/${tag_id}`);
  }

  // delete tags from story
  removeTagsFromStory(story_id: number | string, tag_id: []): Observable<any> {
    return this.sharedHttp.post(`stories/${story_id}/tags/remove`, {
      tag_id: tag_id,
    });
  }
}
