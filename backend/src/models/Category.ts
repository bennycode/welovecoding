import {Table, Column, Model, HasMany} from 'sequelize-typescript';
import Playlist from './Playlist';

/**
 * Initially this table had the fields:
 * - ID            (BIGINT(20))
 * - COLOR         (Varchar(255))
 * - CREATED       (Datetime)
 * - LASTMODIFIED  (Datetime)
 * - NAME          (Varchar(255))
 * - SLUG          (Varchar(255))
 * - CREATOR_ID    (BIGINT(20))
 * - LASTEDITOR_ID (BIGINT(20))
 */

@Table({timestamps: true})
class Category extends Model<Category> {
  @Column({
    allowNull: false,
  })
  name: string;

  @Column slug: string;

  @Column color: string;

  @Column description: string;

  @HasMany(() => Playlist)
  playlists: Playlist[];
}

export default Category;
