import {Table, Column, Model, BelongsTo, ForeignKey} from 'sequelize-typescript';
import Author from './Author';

@Table({
  timestamps: true
})
class Video extends Model<Video> {
  @Column
  name: string;

  @Column
  videoId: string;

  @Column
  slug: string;

  @Column
  previewImageUrl: string;

  @ForeignKey(() => Author)
  @Column
  authorId: number;

  @BelongsTo(() => Author, 'authorId')
  author: Author;
};

export default Video;
