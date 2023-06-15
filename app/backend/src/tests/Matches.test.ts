import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { getAllMatchesMock, inProgressMatchesMock, finishMatchesMock, oneMatchMock, updatedOneMatchMock, validToken, updatedResponse } from './mocks/MatchesMocks';
import JwtUtils from '../utils/jwtUtils';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches EndPoints Tests', () => {
  beforeEach(() => {
    sinon.restore();
  })
  describe('GetAll Matches EndPoint', () => {
    it ('Deve retornar todos as partidas', async () => {
      sinon.stub(SequelizeMatches, 'findAll').resolves(getAllMatchesMock as any);

  
      const { status, body } = await chai.request(app).get('/matches');
  
      expect(status).to.equal(200);
      expect(body).to.deep.equal(getAllMatchesMock);
    })
  }),

  describe('GetInprogress Matches EndPoint', () => {
    it ('Deve retornar todas as partidas que estão em progresso', async () => {
      sinon.stub(SequelizeMatches, 'findAll').resolves(inProgressMatchesMock as any);
  
      const { status, body } = await chai.request(app).get('/matches?inProgress=true');
  
      expect(status).to.equal(200);
      expect(body).to.deep.equal(inProgressMatchesMock);
    })

    it ('Deve retornar todas as partidas que ja terminaram', async () => {
      sinon.stub(SequelizeMatches, 'findAll').resolves(finishMatchesMock as any);
  
      const { status, body } = await chai.request(app).get('/matches?inProgress=false');
  
      expect(status).to.equal(200);
      expect(body).to.deep.equal(finishMatchesMock);
    })
  })

  describe('Finish Matches EndPoint', () => {
    it ('Deve ser possível finalizar uma partida pelo id', async () => {
      sinon.stub(SequelizeMatches, 'update').resolves([1]);
      
      const { body } = await chai.request(app)
      .patch('/matches/1/finish').set('Authorization', validToken);
      
      expect(body).to.deep.equal({ message: "Finished" });
    })
    
    it('Deve retornar erro sem um token', async () => {
      sinon.stub(SequelizeMatches, 'update').resolves([0]);

      const { status, body } = await chai.request(app)
      .patch('/matches/1/finish')

      expect(status).to.equal(401);
      expect(body).to.be.deep.equal({ message: "Token not found" });
    })

    it('Deve retornar erro com um token invalido', async () => {
      sinon.stub(SequelizeMatches, 'update').resolves([0]);
  
      const { status, body } = await chai.request(app)
      .patch('/matches/1/finish').set('Authorization', 'tokenInvalido')

      expect(status).to.equal(401);
      expect(body).to.be.deep.equal({ message: "Token must be a valid token" });
    })
  })

  describe('Update Matches EndPoint', () => {
    it ('Deve ser possível atualizar uma partida pelo id', async () => {
      sinon.stub(SequelizeMatches, 'update').resolves([2]);

      // sinon.stub(JwtUtils, 'verify').returns(updatedOneMatchMock)

      const { status, body } = await chai.request(app)
      .patch('/matches/1').set('Authorization', validToken)
      .send({
        homeTeamGoals: 3,
        awayTeamGoals: 1
      });
      
      expect(status).to.equal(200);
      expect(body).to.deep.equal(updatedOneMatchMock);
    })
    
    it('Deve retornar erro sem um token', async () => {
      sinon.stub(SequelizeMatches, 'update').resolves([0]);

      const { status, body } = await chai.request(app).patch('/matches/1')

      expect(status).to.equal(401);
      expect(body).to.be.deep.equal({ message: "Token not found" });
    })

    it('Deve retornar erro com um token invalido', async () => {
      sinon.stub(SequelizeMatches, 'update').resolves([0]);
  
      const { status, body } = await chai.request(app)
      .patch('/matches/1').set('Authorization', 'tokenInvalido')

      expect(status).to.equal(401);
      expect(body).to.be.deep.equal({ message: "Token must be a valid token" });
    })
  })
});
