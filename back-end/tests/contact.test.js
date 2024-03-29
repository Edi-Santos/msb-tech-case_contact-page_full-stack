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

  describe('Testa quando a requisição é mal sucedida - Não é passado "email" ou "email" inválido', () => {
    let response1 = {};
    let response2 = {};
    
    before(async () => {
      const DBServer = await MongoMemoryServer.create();
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
        {useNewUrlParser: true, useUnifiedTopology: true},
      );

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

      response1 = await chai.request(server)
        .post('/contact')
        .send({
          "name": "Eren Yeager",
          "email": "",
          "cellphone": "(21) 99999-9999",
          "message": "Teste de qualidade"
        });

        response2 = await chai.request(server)
        .post('/contact')
        .send({
          "name": "Eren Yeager",
          "email": "erengmail.com",
          "cellphone": "(21) 99999-9999",
          "message": "Teste de qualidade"
        });

      await DBServer.stop();
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('retorna o código de status 400', () => {
      expect(response1).to.have.status(400);
      expect(response2).to.have.status(400);
    });

    it('retorna um objeto', () => {
      expect(response1.body).to.be.a('object');
      expect(response2.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response1.body).to.have.property('message');
      expect(response2.body).to.have.property('message');
    });

    it('a propriedade "message" precisa ter o texto "\"email\" is not allowed to be empty" ou \"email\" must be a valid email', () => {
      expect(response1.body.message).to.be.equal('"email" is not allowed to be empty');
      expect(response2.body.message).to.be.equal('"email" must be a valid email');
    });
  });

  describe('Testa quando a requisição é mal sucedida - Não é passado "cellphone" ou "cellphone" inválido', () => {
    let response1 = {};
    let response2 = {};
    
    before(async () => {
      const DBServer = await MongoMemoryServer.create();
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
        {useNewUrlParser: true, useUnifiedTopology: true},
      );

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

      response1 = await chai.request(server)
        .post('/contact')
        .send({
          "name": "Eren Yeager",
          "email": "eren@gmail.com",
          "cellphone": "",
          "message": "Teste de qualidade"
        });

        response2 = await chai.request(server)
        .post('/contact')
        .send({
          "name": "Eren Yeager",
          "email": "eren@gmail.com",
          "cellphone": "(21) 999-9999",
          "message": "Teste de qualidade"
        });

      await DBServer.stop();
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('retorna o código de status 400', () => {
      expect(response1).to.have.status(400);
      expect(response2).to.have.status(400);
    });

    it('retorna um objeto', () => {
      expect(response1.body).to.be.a('object');
      expect(response2.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response1.body).to.have.property('message');
      expect(response2.body).to.have.property('message');
    });

    it('a propriedade "message" precisa ter o texto "\"cellphone\" is not allowed to be empty" ou \"cellphone\" with value...', () => {
      const expectedValueRes2 = "\"cellphone\" with value \"(21) 999-9999\" fails to match the required pattern: /^(?:(?:\\+|00)?(55)\\s?)?(?:\\(?([1-9][0-9])\\)?\\s?)?(?:((?:9\\d|[2-9])\\d{3})-?(\\d{4}))$/"
  
      expect(response1.body.message).to.be.equal('"cellphone" is not allowed to be empty');
      expect(response2.body.message).to.be.equal(expectedValueRes2);
    });
  });

  describe('Testa quando a requisição é mal sucedida - Não é passado "message"', () => {
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
          "message": ""
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

    it('a propriedade "message" precisa ter o texto "\"message\" is not allowed to be empty"', () => {
      expect(response.body.message).to.be.equal('"message" is not allowed to be empty');
    });
  });
});
