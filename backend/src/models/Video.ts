import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import Author from './Author';

/**
 * Initially this table had the fields:
 * - ID              (BIGINT(20))
 * - CHANNELURL      (Varchar(255))
 * - CREATED         (Datetime)
 * - DESCRIPTION     (Varchar(1024))
 * - DOWNLOADURL     (Varchar(255))
 * - LASTMODIFIED    (Datetime)
 * - NAME            (Varchar(255))
 * - PERMALINK       (Varchar(255))
 * - PREVIEWIMAGEURL (Varchar(255))
 * - SLUG            (Varchar(255))
 * - WEBSITE         (Varchar(255))
 * - CREATOR_ID      (BIGINT(20))
 * - LASTEDITOR_ID   (BIGINT(20))
 * - PLAYLIST_ID     (BIGINT(20))
 * - ORDERING        (INT(11))
 */

@Table({timestamps: true})
class Video extends Model<Video> {
  @Column name: string;

  @Column videoId: string;

  @Column slug: string;

  @Column previewImageUrl: string;

  @ForeignKey(() => Author)
  @Column
  authorId: number;

  @BelongsTo(() => Author, 'authorId')
  author: Author;
}

export default Video;
