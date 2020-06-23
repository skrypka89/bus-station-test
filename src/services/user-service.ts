import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { UserDto } from './dto/user-dto';
import ApiError from '../common/api-error';
import { TokenPayload } from '../common/token-payload';

async function findUser(users: User[], password: string): Promise<User | undefined> {
  return Promise.all(
    users.map(async user => {
      const comparison = await bcrypt.compare(password, user.password);

      if (comparison) return user;
    })
  ).then(
    result => result.find(user => user),
    () => { throw ApiError.internal(); }
  );
}

export default class UserService {
  private model: typeof User = User;

  async create(dto: UserDto): Promise<User> {
    const users = await this.model.query().where('username', dto.username);
    const existedUser = await findUser(users, dto.password);

    if (existedUser) {
      throw ApiError.badRequest('Используйте другое имя и/или пароль');
    }

    dto.password = await bcrypt
      .hash(dto.password, 10)
      .catch(() => { throw ApiError.internal(); });

    return this.model.query().insert(dto).returning('*');
  }

  async login(username: string, password: string): Promise<string> {
    const users = await this.model.query().where('username', username);
    const foundUser = await findUser(users, password);

    if (!foundUser) throw ApiError.unauthorized('Неверный ввод имени и/или пароля');

    return jwt.sign(
      { id: foundUser.id, admin: false } as TokenPayload, 'secret'
    );
  }
}
