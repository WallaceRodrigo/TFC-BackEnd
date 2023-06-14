import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeams from '../database/models/SequelizeTeams';
import { getAllMock, getByIdMock } from './mocks/TeamsMocks';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams EndPoints Tests', () => {
  beforeEach(() => {
    sinon.restore();
  })

  it ('GetAll Teams EndPoint - Deve retornar todos os times', async () => {
    sinon.stub(SequelizeTeams, 'findAll').resolves(getAllMock as any);

    // const chaiResponse: Response = await chai.request(app).get('/teams');

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(getAllMock);
  })

  describe('GetById Teams EndPoint', () => {
    it ('Deve retornar o time que corresponde ao id desejado', async () => {
      sinon.stub(SequelizeTeams, 'findOne').resolves(getByIdMock as any);
  
      const { status, body } = await chai.request(app).get('/teams/5');
  
      expect(status).to.equal(200);
      expect(body).to.deep.equal(getByIdMock);
    })
  
    it ('Deve retornar erro 404 caso o id do time não exista', async () => {
      sinon.stub(SequelizeTeams, 'findOne').resolves(null);
  
      const { status, body } = await chai.request(app).get('/teams/5');
  
      expect(status).to.equal(404);
      expect(body).to.deep.equal({ message: 'Team not found' });
    })
  })
});
