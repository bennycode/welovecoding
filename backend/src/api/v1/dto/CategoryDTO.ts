import BaseDTO from './BaseDTO';
import PlaylistDTO from './PlaylistDTO';

// https://github.com/bennyn/wlc-webapp/blob/wlc-webapp/0.0.36/src/
// main/java/com/welovecoding/tutorial/api/v1/dto/CategoryDTO.java
// http://www.welovecoding.com/rest/service/v1/categories
export default class CategoryDTO extends BaseDTO {
  public color: string;
  public playlists: PlaylistDTO[] = [];

  constructor(id: number, name: string) {
    super(id, name);
  }

  public addPlaylist(playlist: PlaylistDTO) {
    this.playlists.push(playlist);
  }

  get availableLanguages(): string[] {
    return [...new Set(this.playlists.map(playlist => playlist.language))];
  }

  get numberOfVideos(): number {
    let numberOfVideos: number = 0;

    this.playlists.forEach(function(playlist: PlaylistDTO) {
      numberOfVideos += playlist.numberOfVideos;
    });

    return numberOfVideos;
  }

  toJSON(): object {
    return {
      id: this.id,
      name: this.name,
      color: this.color,
      numberOfVideos: this.numberOfVideos,
      availableLanguages: this.availableLanguages,
    };
  }
}
