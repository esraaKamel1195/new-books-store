import { Injectable } from '@angular/core';
import { SharedHTTPService } from './shared-http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChaptersService {
  constructor(private readonly sharedHttpServices: SharedHTTPService) {}

  // chapter_index
  chapterIndex(story: number | string): Observable<any> {
    return this.sharedHttpServices.get(`stories/${story}/chapters`);
  }

  // chapter_store
  chapterStore(data: {}): Observable<any> {
    return this.sharedHttpServices.post(`Chapters`, { data });
  }

  // chapter_update
  chapterUpdate(chapter_id: number | string, chapter: {}): Observable<any> {
    return this.sharedHttpServices.put(`Chapters/${chapter_id}`, { chapter });
  }

  // chapter_show
  chapterShow(
    story: number | string,
    chapter: number | string
  ): Observable<any> {
    return this.sharedHttpServices.get(`stories/${story}/chapters/${chapter}`);
  }

  // chapter_destroy
  chapterDestroy(
    story: number | string,
    chapter: number | string
  ): Observable<any> {
    return this.sharedHttpServices.delete(
      `stories/${story}/chapters/${chapter}`
    );
  }
}
