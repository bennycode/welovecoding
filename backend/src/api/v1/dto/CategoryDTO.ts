import BaseDTO from "src/api/v1/dto/BaseDTO";
import PlaylistDTO from "src/api/v1/dto/PlaylistDTO";

// https://github.com/bennyn/wlc-webapp/blob/wlc-webapp/0.0.36/src/main/java/com/welovecoding/tutorial/api/v1/dto/CategoryDTO.java
// http://www.welovecoding.com/rest/service/v1/categories
export default class CategoryDTO extends BaseDTO {
  public color: string;
  private _playlists: Array<PlaylistDTO> = [];
  public availableLanguages: Array<string> = [];

  constructor(id: number, name: string) {
    super(id, name);
  }

  set playlists(value: Array<PlaylistDTO>) {
    this._playlists = value;
  }

  get numberOfVideos(): number {
    let numberOfVideos: number = 0;

    this._playlists.forEach(function (playlist: PlaylistDTO) {
      numberOfVideos += playlist.numberOfVideos;
    });

    return numberOfVideos;
  }

  toJSON(): Object {
    return {
      id: this.id,
      name: this.name,
      color: this.color,
      numberOfVideos: this.numberOfVideos,
      availableLanguages: this.availableLanguages
    }
  }
}
