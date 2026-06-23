import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.INTEGER,
        path: Sequelize.STRING,
        offer: Sequelize.BOOLEAN,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3001/product-file/${this.path}`;
          },
        },
      },
      {
        sequelize,
        tableName: 'products',
      },
    );

    return this;
  }

  static associate(models) {
    // essa model agente recebe lá do Index.js
    this.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category', // aqui ela vai retorna as informação da categoria no campo category
    });
  }

  /* O método associate serve para dizer ao Sequelize que essa model (Product)
     possui uma coluna category_id, que é uma foreign key apontando para
     a tabela de Category — ou seja, guarda o id da categoria à qual
     esse produto pertence.

     "as: 'category'" é o apelido usado quando eu quiser incluir essa
     relação numa query.
  */
}

export default Product;
