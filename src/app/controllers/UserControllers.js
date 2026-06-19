/* Metodos que O controller usa:
store: para criar,
index: Lista todos os dados,
show: para busca um dado espeficio, 
update: atualiza dados

*/
import bcrypt from 'bcrypt';
import * as Yup from 'yup';
import { v4 } from 'uuid';
import User from '../models/User.js';

class UserController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      admin: Yup.boolean(),
    });
    try {
      schema.validateSync(request.body, { abortEarly: false, strict: true });
    } catch (error) {
      return response.status(400).json(error.errors);
    }

    const { name, email, password, admin } = request.body;

    // verificação Se já existe o Usuário
    const existingUser = await User.findOne({
      where: {
        email,
      },
    });

    if (existingUser) {
      response.status(400).json('Email  already taken!');
    }

    // Onde: busca usuário pelo e-mail (FindOne + Where) para checar duplicidade antes de cadastrar.

    const password_hash = await bcrypt.hash(password, 10); // Cripitografano a senha do Usuário

    const user = await User.create({
      id: v4(),
      name,
      email,
      password_hash,
      admin,
    });

    return response.status(201).json({
      id: user.id,
      name: user.name, // Oq vai retornar é so isso para não da falha de segurança
      email: user.email,
      admin: user.admin,
    });
  }
}

export default new UserController();
