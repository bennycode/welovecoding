import {Table, Column, Model, DataType} from 'sequelize-typescript';

const levels = {
  'beginner': 'beginner',
  'intermediate': 'intermediate',
  'expert': 'expert'
}

type Level = keyof typeof levels;

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
