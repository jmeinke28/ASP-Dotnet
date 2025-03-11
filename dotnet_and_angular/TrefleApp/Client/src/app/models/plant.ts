export interface Plant {
  id: number;
  commonName: string | null;
  slug: string | null;
  scientificName: string | null;
  year: number;
  author: string | null;
  genusId: number;
  imageUrl: string | null;
}
