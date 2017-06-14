import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import User from './User';
import Video from './Video';
import Playlist from './Playlist';

/**
 * Initially this looked different, there was a commentbag, TODO explain more
 */

@Table({timestamps: true})
class Comment extends Model<Comment> {
  @Column text: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Video)
  @Column
  videoId: number;

  @ForeignKey(() => Playlist)
  @Column
  playlistId: number;

  @BelongsTo(() => User, 'userId')
  user: User;

  @BelongsTo(() => Video, 'videoId')
  video: Video;

  @BelongsTo(() => Playlist, 'playlistId')
  playlist: Playlist;
}

export default Comment;
