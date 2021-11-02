import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import music from '../../assets/data/music.json';

export interface MusicInterface {
  album: string;
  artist: string[] | [];
  release_date: string;
  title: string;
}

@Injectable()
export class MusicService {
  constructor() {}

  getMusic(): Observable<MusicInterface[]> {
    // this should make a get request to an endpoint
    return observableOf(music);
  }
}
