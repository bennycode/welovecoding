import BaseDTO from './BaseDTO';

export default class AuthorDTO extends BaseDTO {
  public id: number;
  public name: string;

  public channelUrl: string;
  public description: string;
  public website: string;

  constructor(id: number, name: string) {
    super(id, name);
  }
}
