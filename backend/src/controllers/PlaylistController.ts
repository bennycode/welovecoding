import Bluebird = require('bluebird');
import Category from 'src/models/Category';
import Playlist from 'src/models/Playlist';
import Video from 'src/models/Video';
import PlaylistDTO from 'src/legacy/dto/PlaylistDTO';

export function getLegacyPlaylists(categoryId: number): Bluebird<PlaylistDTO[]> {
  return Category.findById(categoryId)
    .then((category: Category) => {
      return category.$get('playlists', {include: [{model: Video}]})
        .then((playlists: Playlist[]) => {

        const legacayPlaylists = playlists.map((playlist: Playlist) => {
          const legacyPlaylist = new PlaylistDTO(playlist.id, playlist.slug);
          legacyPlaylist.videos = playlist.videos;
          legacyPlaylist.categoryName = category.name;
          legacyPlaylist.description = playlist.description;
          legacyPlaylist.difficulty = playlist.level;
          legacyPlaylist.language = playlist.languageCode;
          legacyPlaylist.providerName = playlist.provider;
          return legacyPlaylist;
        });
        return legacayPlaylists;
      });
    });
}

export function getPlaylists(categoryId: number): Bluebird<Playlist[]> {
  return Category.findById(categoryId)
  .then((category: Category) => {
    return category.$get('playlists', {include: [{model: Video}]})
      .then((playlists: Playlist[]) => {
        return playlists;
      });
    });
}
