import {Sequelize} from 'sequelize-typescript';
import db from 'config/database';
import Author from './Author';
import Category from './Category';
import Comment from './Comment';
import Playlist from './Playlist';
import User from './User';
import Video from './Video';

// connect to the database
const sequelize = new Sequelize(db);

sequelize.addModels([Author, Category, Comment, Playlist, User, Video]);

export default sequelize;
