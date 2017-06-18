import 'src/models';
import User from 'src/models/User';
import Category from 'src/models/Category';
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

export function populateVideos() {
  console.log('POPULATING VIDEOS');
  return bluebird.all(
    VIDEOS.map(name => {
      const video = new Video({
        name,
        slug: name,
      });
      video.save();
      Author.all().then(authors => {
        const author: Author = authors[0] as any;
        video.$set('author', author);
        return video.save();
      });
    }),
  );
}

export function populateAll() {
  return bluebird.all([
    populateUsers(),
    populateCategories(),
    populateAuthors(),
    populateVideos(),
  ]);
}
