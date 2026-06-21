import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database.cjs';
import User from '../app/models/User.js';
import Product from '../app/models/Product.js';
import Category from '../app/models/Category.js';

const models = [User, Product, Category];
class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models), // envia as models para o arquivo Products.js
        // para podemos usar o associate
      );

    /* 
   Função responsável por conectar a aplicação ao banco de dados.
   É chamada uma única vez quando o servidor sobe.

   1. Cria a conexão com o banco usando o Sequelize (databaseConfig).
   2. Inicializa cada model, registrando suas colunas/tabela na conexão.
   3. Depois que TODOS os models já estão inicializados, cria as
      associações (relacionamentos) entre eles — por isso é feito
      em dois .map() separados: não dá pra associar um model que
      ainda não foi registrado na conexão.

   No final, os models já ficam prontos para fazer queries
   (Product.findAll(), por exemplo) e incluir relações
   (include: 'category') sem precisar escrever SQL manual.
*/
  }
}

export default new Database();

//Esse código faz isso:

// 👉 conecta no banco
// 👉 pega os modelos (User etc.)
// 👉 registra eles no banco
// 👉 e já inicia tudo automaticamente
