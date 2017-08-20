import 'src/models';
import User from 'src/models/User';
import Category from 'src/models/Category';
import Playlist from 'src/models/Playlist';
import Video from 'src/models/Video';
import Author from 'src/models/Author';
import * as bluebird from 'bluebird';

const NAMES = ['tom', 'benny', 'roland'];

export function populateUsers() {
  console.log('POPULATING USERS');
  return bluebird.all(
    NAMES.map(name => {
      const user = new User({
        username: name,
        email: `${name}@welovecoding.com`,
        provider: User.PROVIDERS.local,
      });
      return User.register(user, 'mypassword', (err, newUser) => {
        console.log('err', err);
        if (err) {
          // TODO: error handling
          return;
        }
        newUser.save();
      });
    }),
  );
}

const CATEGORIES = ['java', 'python', 'elm'];

export function populateCategories() {
  console.log('POPULATING CATEGORIES');
  return bluebird.all(
    CATEGORIES.map(name => {
      const category = new Category({name});
      return category.save();
    }),
  );
}

const AUTHORS = ['gronkh', 'coolyoutubeguy', 'thecomputerchannel'];

export function populateAuthors() {
  console.log('POPULATING AUTHORS');
  return bluebird.all(
    AUTHORS.map(name => {
      const author = new Author({
        username: name,
        channelUrl: `https://youtube.com/u/${name}`,
      });
      return author.save();
    }),
  );
}

const VIDEOS = [
  'Java Tutorial 1',
  'Turing Machine',
  'Lambda Calculus',
  'Badass Math',
];

const PLAYLISTS = [
  'Super nice playlist',
  'Hacker playlist',
  'Good videos',
];

export function populatePlaylists() {
  console.log('POPULATING PLAYLISTS');
  return Category.all().then(categories => {
    return categories.map(category => {
      return bluebird.all(
        PLAYLISTS.map(name => {
          const playlist = new Playlist({
            slug: name,
            name,
            languageCode: 'de',
            provider: 'Youtube',
            description: 'test',
            level: 'intermediate',
            categoryId: category.id,
          });
          return playlist.save().then((playlist: Playlist) => {
            return populateVideos(playlist);
          });
        }),
      );
    });
  });
}

export function populateVideos(playlist: Playlist) {
  console.log('POPULATING VIDEOS');
  return bluebird.all(
    VIDEOS.map(name => {
      const video = new Video({
        name,
        slug: name,
      });
      video.save().then(() => {
        return Author.all()
          .then(authors => {
            const author: Author = authors[0] as any;
            return video.$set('author', author.id);
          })
          .then(() => video.$set('playlist', playlist.id));
      });
    }),
  );
}

export function populateAll() {
  return populateUsers()
    .then(populateCategories)
    .then(populateAuthors)
    .then(populatePlaylists)
    .then(() => {
      console.log('POPULATING DONE');
    });
}
