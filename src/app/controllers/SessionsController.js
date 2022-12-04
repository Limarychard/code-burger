// resolve eslint
/* eslint-disable class-methods-use-this */
// finished

import * as Yup from 'yup';
import User from '../models/User';

class SessionsController {
  async store(request, response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    const userEmailOrPasswordIncorrect = () => response.status(400).json({ error: 'Make sure your password or email are correct' });

    if (!(schema.isValid(request.body))) userEmailOrPasswordIncorrect();

    const { email, password } = request.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) userEmailOrPasswordIncorrect();

    if (!(await user.checkPassword(password))) userEmailOrPasswordIncorrect();

    return response.json(user);
  }
}

export default new SessionsController();
