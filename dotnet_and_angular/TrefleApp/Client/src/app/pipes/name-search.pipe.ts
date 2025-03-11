import { Pipe, PipeTransform } from '@angular/core';
import { Plant } from '../models/plant';

@Pipe({
  name: 'nameSearch',
  standalone: true
})
export class NameSearchPipe implements PipeTransform {

  transform(
    plantList: Plant[] | null,
    searchQuery: string | null
  ): Plant[] {
    if(!plantList) {
      // If plant list is empty or null, then return empty array
      return [] as Plant[];
    }

    if(!searchQuery?.trim()) {
      //If no search query, return the original list
      return plantList;
    }

    // Return the filtered list
    return plantList.filter((plant) => 
      plant.commonName?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

}
