import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MusicInterface, MusicService } from 'src/app/services/music.service';
import { CalendarModifyComponent } from './modify/calendar-modify.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [MusicService, DatePipe],
})
export class CalendarComponent implements OnInit {
  songs: MusicInterface[] = [];
  dateFilter = '';
  displayDate: Date | null = null;
  hasSongs = false;

  constructor(
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private musicService: MusicService
  ) {}

  ngOnInit() {
    this.musicService.getMusic().subscribe((songs) => {
      this.songs = songs.sort((a, b) =>
        a.release_date.localeCompare(b.release_date)
      );
    });
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const date = this.datePipe.transform(cellDate, 'yyyy-MM-dd');
      const match = this.songs.find((song) => song.release_date === date);
      return match ? 'date-hilite' : '';
    }
    return '';
  };

  filterSongs(selectedDate: Date | null): void {
    if (selectedDate) {
      this.displayDate = selectedDate;
      const dateString = this.datePipe.transform(selectedDate, 'yyyy-MM-dd');
      this.dateFilter = dateString ? dateString : '';
      this.hasSongs =
        this.songs.filter((song) => song.release_date === dateString).length >
        0;
    }
  }

  modifySong(song: MusicInterface | null) {
    const dialogRef = this.dialog.open(CalendarModifyComponent, {
      width: '500px',
      data: { song: song },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  deleteSong(event: Event, song: MusicInterface) {
    if (event) {
      event.stopPropagation();
    }
    if (song) {
      const foundIndex = this.songs.findIndex(
        (s) => s.title === song.title && s.release_date === song.release_date
      );
      console.log(foundIndex);
      if (foundIndex > -1) {
        this.songs.splice(foundIndex, 1);
      }
    }
  }
}
