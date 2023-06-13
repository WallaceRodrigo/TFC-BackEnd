import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../../app';
import SequelizeTeams from '../../database/models/SequelizeTeams';
import { getAllMock } from '../mocks/TeamsMocks';

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
});
