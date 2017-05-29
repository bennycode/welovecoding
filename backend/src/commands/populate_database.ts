import sequelize from 'src/models';
sequelize;
import User from 'src/models/User';
import Category from 'src/models/Category';
import Video from 'src/models/Video';
import Author from 'src/models/Author';

const NAMES = ['tom', 'benny', 'roland'];

function populateUsers () {
  console.log('POPULATING USERS');
  NAMES.forEach(name => {
    const user = new User({username: name, email: `${name}@welovecoding.com`});
    User.register(user, 'mypassword', (err, user) => {
      console.log('err', err);
      if (err) {
        // TODO: error handling
        return;
      }
      user.save();
    });
  });
}

const CATEGORIES = ['java', 'python', 'elm'];

function populateCategories () {
  console.log('POPULATING CATEGORIES');
  CATEGORIES.forEach(name => {
    const category = new Category({name});
    category.save();
  });
}

const AUTHORS = ['gronkh', 'coolyoutubeguy', 'thecomputerchannel'];

function populateAuthors () {
  console.log('POPULATING AUTHORS');
  AUTHORS.forEach(name => {
    const author = new Author({username: name, channelUrl: `https://youtube.com/u/${name}`});
    author.save();
  });
}

const VIDEOS = ['Java Tutorial 1', 'Turing Machine', 'Lambda Calculus', 'Badass Math'];

function populateVideos () {
  console.log('POPULATING VIDEOS');
  VIDEOS.forEach(name => {
    const video = new Video({
      name,
      slug: name
    });
    video.save();
    Author.all().then(authors => {
      const author: Author = authors[0] as any;
      video.$set('author', author);
      video.save();
    });
  });
}

populateUsers();
populateCategories();
populateAuthors();
populateVideos();
