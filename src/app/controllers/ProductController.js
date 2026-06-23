import * as Yup from 'yup';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

class ProductController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category_id: Yup.number().required(),
      offer: Yup.boolean(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (error) {
      return response.status(400).json(error.errors);
    }

    const { name, price, category_id, offer } = request.body; // pegando A informação do nosso produto para salva no banco de dados
    const { filename } = request.file;

    const newProduct = await Product.create({
      name,
      price,
      category_id,
      path: filename,
      offer,
    });

    return response.status(201).json(newProduct);
  }
  async update(request, response) {
    const schema = Yup.object({
      name: Yup.string(),
      price: Yup.number(),
      category_id: Yup.number(),
      offer: Yup.boolean(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (error) {
      return response.status(400).json(error.errors);
    }

    const { name, price, category_id, offer } = request.body; // pegando A informação do nosso produto para salva no banco de dados

    const { id } = request.params;

    let path;
    if (request.file) {
      const { filename } = request.file;

      path = filename;
    }

    await Product.update(
      {
        name,
        price,
        category_id,
        path,
        offer,
      },
      {
        where: {
          id,
        },
      },
    );

    return response.status(200).json();
  }
  async index(_request, response) {
    const products = await Product.findAll({
      include: {
        model: Category,
        as: 'category',
        attributes: ['id', 'name'], // tras alguns atributos, No caso so O Name e o ID, se quiser trazer tudo é so tirar essa opção
      },
    });

    return response.status(200).json(products);
  }
}

export default new ProductController();
