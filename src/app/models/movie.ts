export class Movie {
  constructor(
    public adult: boolean,
    public backdrop_path: string,
    public id: number,
    public original_title: string,
    public overview: string,
    public popularity: number,
    public poster_path: string,
    public release_date: string,
    public title: string,
    public vote_average: number
  ) {}
}
