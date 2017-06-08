import {Table, Column, Model} from 'sequelize-typescript';

/**
 * Initially this table had the fields:
 * - ID            (BIGINT(20))
 * - CHANNELURL    (Varchar(255))
 * - CREATED       (Datetime)
 * - DESCRIPTION   (Varchar(1024))
 * - LASTMODIFIED  (Datetime)
 * - NAME          (Varchar(255))
 * - SLUG          (Varchar(255))
 * - WEBSITE       (Varchar(255))
 * - CREATOR_ID    (BIGINT(20))
 * - LASTEDITOR_ID (BIGINT(20))
 */

@Table({
  timestamps: true,
})
class Author extends Model<Author> {
  @Column({allowNull: false})
  username: string;

  @Column({allowNull: false})
  channelUrl: string;

  @Column name: string;

  @Column website: string;
}

export default Author;
