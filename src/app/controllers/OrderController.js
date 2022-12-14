import * as Yup from 'yup';
import Category from '../models/Category';
import Product from '../models/Product';
import Order from '../schemas/Order';

class OrderController {
  async store(request, response) {
    const schema = Yup.object().shape({
      products: Yup.array().required().of(
        Yup.object().shape({
          id: Yup.number().required(),
          quantity: Yup.number().required(),
        }),
      ),
    });

    try {
      await schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const productsId = request.body.products.map(p => p.id);

    const orderProducts = await Product.findAll({
      where: { id: productsId },
      include: [{ model: Category, as: 'category', attributes: ['name'] }],
    });

    const orderProductsMap = orderProducts.map(p => {
      const productsIndex = request.body.products.findIndex(v => v.id === p.id);

      const newProduct = {
        id: p.id,
        name: p.name,
        price: p.price,
        category: p.category.name,
        url: p.url,
        quantity: request.body.products[productsIndex].quantity,
      };

      return newProduct;
    });

    const order = {
      user: {
        id: request.userId,
        name: request.userName,
      },
      products: orderProductsMap,
      status: 'Pedido realizado',
    };

    const orderResponse = await Order.create(order);

    return response.status(201).json(orderResponse);
  }
}

export default new OrderController();
