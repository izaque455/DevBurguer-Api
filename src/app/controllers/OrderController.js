import * as Yup from 'yup';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Order from '../schemas/Order.js';

class OrdertController {
  async store(request, response) {
    const schema = Yup.object({
      products: Yup.array().of(
        Yup.object({
          id: Yup.number().required(),
          quantity: Yup.number().required(),
        }),
      ),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false, strict: true });
    } catch (error) {
      return response.status(400).json(error.errors);
    }

    const { userId, userName } = request;
    const { products } = request.body;

    const productsIds = products.map((products) => products.id);

    const findedProducts = await Product.findAll({
      where: {
        id: productsIds,
      },
      include: {
        model: Category,
        as: 'category',
        attributes: ['name'],
      },
    });

    const mapedProducts = findedProducts.map((product) => {
      const quantity = products.find((p) => p.id === product.id).quantity;
      const newProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        url: product.url,
        category: product.category.name,
        quantity,
      };

      return newProduct;
    });

    const onder = {
      user: {
        id: userId,
        name: userName,
      },
      products: mapedProducts,
      status: 'Pedido Realizado',
    };

    const newOrder = await Order.create(onder);

    return response.status(201).json(newOrder);
  }
  async update(request, response) {
    const schema = Yup.object({
      status: Yup.string().required(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false, strict: true });
    } catch (error) {
      return response.status(400).json(error.errors);
    }

    const { status } = request.body;
    const { id } = request.params;
    try {
      await Order.updateOne({ _id: id }, { status });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }

    return response
      .status(200)
      .json({ menssage: 'Status successfully updated' });
  }
  async index(_request, response) {
    const orders = await Order.find();

    return response.status(201).json(orders);
  }
}

export default new OrdertController();
