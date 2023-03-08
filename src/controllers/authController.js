import authServices from "../services/authService.js";

async function signInUser(req, res) {
  const data = req.body;

  const userData = await authServices.signInUser(data);

  return res.status(200).send(userData);
}

async function signUpUser(req, res) {
  const data = req.body;

  await authServices.signUpUser(data);

  res.status(201).send("Usuário registrado com sucesso!");
}

export { signInUser, signUpUser };
