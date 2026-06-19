module.exports = {
  dialect: 'postgres', // tipo do Banco
  host: 'localhost', // Onde vai rodar, No caso minha maquina
  port: 5432, // qual a porta
  username: 'admin', // Login do Usuario para entrar no banco
  password: '123456', // senha do Usuário
  database: 'dev-burguer-db', // Nome do Nosso Banco de Dados
  define: {
    timestamps: true, // Ele serve para colocar data e horário no banco de dados quando o usuário for cadastrado ou atualizado
    underscored: true,
    underscoredAll: true,
  },
};

// Esse arquivo é para o sequelize poder acessar o banco de Dados
