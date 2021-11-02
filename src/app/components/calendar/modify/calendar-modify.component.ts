import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MusicInterface } from 'src/app/services/music.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface CalendarModifyInterface {
  date?: Date;
  song?: MusicInterface;
}

@Component({
  selector: 'app-calendar-modify',
  templateUrl: './calendar-modify.component.html',
  styleUrls: ['./calendar-modify.component.scss'],
  providers: [DatePipe]
})
export class CalendarModifyComponent implements OnInit {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  dateString = '';
  artistList: string[] = [];

  public songFormGroup: FormGroup = this.formBuilder.group({
    songTitleControl: ['', []],
    albumNameControl: ['', []],
    dateControl: ['', []]
  });
  dialogTitle = 'Modify Song';

  constructor(
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<CalendarModifyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CalendarModifyInterface,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    const formatted = this.datePipe.transform(this.data.date, 'yyyy-MM-dd');
    this.dateString = formatted ? formatted : '';
    if (this.data && this.data.song) {
      this.songFormGroup.controls['songTitleControl'].setValue(this.data.song.title);
      this.songFormGroup.controls['albumNameControl'].setValue(this.data.song.album);
      this.songFormGroup.controls['dateControl'].setValue(this.data.song.release_date);
      this.artistList = this.data.song.artist ? this.data.song.artist : [];
    } else {
      this.songFormGroup.controls['dateControl'].setValue(this.dateString);
    }
  }

  dismissDialog() {
    this.dialogRef.close();
  }

  removeArtist(artist: string) {
    const currentArtist = this.artistList;
    const foundIndex = currentArtist.findIndex(a => a === artist);
    currentArtist.splice(foundIndex, 1);
    this.artistList = [...[], ...currentArtist];
  }

  addArtist(inputEvent: MatChipInputEvent) {
    const newValue = inputEvent.value;
    if (newValue && newValue !== '') {
      this.artistList.push(newValue);
      inputEvent.chipInput!.clear();
    }
  }

  modifySong(event: Event) {
    if (this.data.song) {
      this.data.song.title = this.songFormGroup.controls['songTitleControl'].value;
      this.data.song.album = this.songFormGroup.controls['albumNameControl'].value;
      this.data.song.release_date = this.dateString;
      this.data.song.artist = this.artistList;
    }
  }
}
