import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextListPipe } from './text-list.pipe';
import { FilterPipe } from './filter.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [FilterPipe, TextListPipe],
  exports: [FilterPipe, TextListPipe]
})
export class PipesModule {}
