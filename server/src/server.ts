import 'dotenv/config';

import app from "./app";

app.listen(process.env.PORT, () => console.log('> Servidor rodando na porta: "3333"'));
