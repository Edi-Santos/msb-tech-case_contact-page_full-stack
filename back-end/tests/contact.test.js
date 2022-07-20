const chai = require('chai');
const chaiHTTP = require('chai-http');
const sinon = require('sinon');

const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const server = require('../src/api/app');

chai.use(chaiHTTP);

const { expect } = chai;

describe('POST /contact', () => {
  describe('Testa quando a requisição é bem sucedida', () => {
    let response = {};
    
    before(async () => {
      const DBServer = await MongoMemoryServer.create();
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
        {useNewUrlParser: true, useUnifiedTopology: true},
      );

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

      response = await chai.request(server)
        .post('/contact')
        .send({
          "name": "Eren Yeager",
          "email": "eren@gmail.com",
          "cellphone": "(21) 99999-9999",
          "message": "Teste de qualidade"
        });

      await DBServer.stop();
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('retorna o código de status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" precisa ter o texto "Contato enviado com sucesso"', () => {
      expect(response.body.message).to.be.equal('Contato enviado com sucesso');
    });
  });

  describe('Testa quando a requisição é mal sucedida - Não é passado "name"', () => {
    let response = {};
    
    before(async () => {
      const DBServer = await MongoMemoryServer.create();
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
        {useNewUrlParser: true, useUnifiedTopology: true},
      );

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

      response = await chai.request(server)
        .post('/contact')
        .send({
          "name": "",
          "email": "eren@gmail.com",
          "cellphone": "(21) 99999-9999",
          "message": "Teste de qualidade"
        });

      await DBServer.stop();
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('retorna o código de status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" precisa ter o texto "\"name\" is not allowed to be empty"', () => {
      expect(response.body.message).to.be.equal('"name" is not allowed to be empty');
    });
  });
});
