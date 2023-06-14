import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import { userMock, validEmail, validPassword } from './mocks/UserMocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login POST EndPoint Test', () => {
  beforeEach(() => {
    sinon.restore();
  })

  describe('Login EndPoint', () => {
    it ('Deve ser possível fazer login com sucesso', async () => {
      const buildUserMock = SequelizeUser.build(userMock);
      sinon.stub(SequelizeUser, 'findOne').resolves(buildUserMock);
  
      const { status, body } = await chai.request(app)
      .post('/login')
      .send({validEmail, validPassword})
  
      expect(status).to.equal(200);
      expect(body.token).not.to.be.undefined;
    })

    it ('O login não deve permitir o acesso sem informar um email', async () => {
      const buildUserMock = SequelizeUser.build(userMock);
      sinon.stub(SequelizeUser, 'findOne').resolves(buildUserMock);
  
      const { status, body } = await chai.request(app)
      .post('/login')
      .send({ validPassword });
  
      expect(status).to.equal(400);
      expect(body).to.be.deep.equal({ message: "All fields must be filled" });
    })
    
    it ('O login não deve permitir o acesso sem informar uma senha', async () => {
      const buildUserMock = SequelizeUser.build(userMock);
      sinon.stub(SequelizeUser, 'findOne').resolves(buildUserMock);
  
      const { status, body } = await chai.request(app)
      .post('/login')
      .send({ validEmail });
  
      expect(status).to.equal(400);
      expect(body).to.be.deep.equal({ message: "All fields must be filled" });
    })
  })
});
