import AuthorDTO from './AuthorDTO';
import BaseDTO from './BaseDTO';

export default class PlaylistDTO extends BaseDTO {
  public categoryName: string;
  public code: string;
  public description: string;
  public difficulty: string;
  public language: string;
  public owner: AuthorDTO;
  public providerName: string;
  public videos: any[];

  constructor(id: number, name: string) {
    super(id, name);
  }

  get numberOfVideos(): number {
    return this.videos.length;
  }

  toJSON(): object {
    return {
      id: this.id,
      name: this.name,
      language : this.language,
      categoryName: this.categoryName,
      providerName: this.providerName,
      numberOfVideos: this.numberOfVideos,
      description : this.description,
      owner: {
        name: "Lars Vogel",
        website: "http://www.vogella.com/",
        description: null,
      },
      status: {
        playable: true,
        errorless: true,
        embeddable: true,
      },
    };
  }
}
