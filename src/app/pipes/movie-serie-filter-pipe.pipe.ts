import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieSerieFilterPipe',
})
export class MovieSerieFilterPipePipe implements PipeTransform {
  transform(items: any[], searchFilter: string): any[] {
    const filter = searchFilter.length > 0 ? searchFilter.toLowerCase() : null;
    if (filter) {
      return items.filter((item) => {
        return (
          item.title?.toLowerCase().includes(filter) ||
          item.name?.toLowerCase().includes(filter) ||
          item.release_date?.toLowerCase().includes(filter) ||
          item.first_air_date?.toLowerCase().includes(filter)
        );
      });
    }
    return items
  }
}
