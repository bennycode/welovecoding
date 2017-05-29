import {Table, Column, Model, DataType} from 'sequelize-typescript';

const levels = {
  'beginner': 'beginner',
  'intermediate': 'intermediate',
  'expert': 'expert'
}

type Level = keyof typeof levels;

/**
 * Initially this table had the fields:
 * - ID            (BIGINT(20))
 * - CODE          (VARCHAR(255))
 * - CREATED       (Datetime)
 * - DESCRIPTION   (Varchar(1024))
 * - DIFFICULTY    (Varchar(255))
 * - ENABLED       (TINYINT(1))
 * - LANGUAGECODE  (VARCHAR(255))
 * - LASTMODIFIED  (Datetime)
 * - NAME          (Varchar(255))
 * - PROVIDER      (VARCHAR(255))
 * - SLUG          (Varchar(255))
 * - AUTHOR_ID     (BIGINT(20))
 * - CATEGORY_ID   (BIGINT(20))
 * - CREATOR_ID    (BIGINT(20))
 * - LASTEDITOR_ID (BIGINT(20))
 */

@Table({
  timestamps: true
})
class Playlist extends Model<Playlist> {
  @Column
  slug: string;

  @Column
  description: string;

  @Column(DataType.ENUM(...Object.keys(levels)))
  level: Level;

  @Column
  languageCode: string;

  @Column
  provider: string;

};

export default Playlist;
