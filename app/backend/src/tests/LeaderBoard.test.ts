import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { allMatches, leaderBoard } from './mocks/LeaderBoardMocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('LeaderBoard EndPoints Tests', () => {
  beforeEach(() => {
    sinon.restore();
  })
  describe('GetLeaderBoard LeaderBoard EndPoint', () => {
    it ('Deve retornar a leaderBoard', async () => {
      sinon.stub(SequelizeMatches, 'findAll').resolves(allMatches as any);
  
      const { status, body } = await chai.request(app).get('/leaderboard/home');
  
      expect(status).to.equal(200);
      expect(body).to.deep.equal(leaderBoard);
    })
  })
});
