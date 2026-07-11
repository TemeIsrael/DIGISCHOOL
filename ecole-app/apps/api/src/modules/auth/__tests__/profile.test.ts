/**
 * Tests unitaires – route PUT /auth/profile (gestion du champ idALNYA)
 */
import request from 'supertest';
import express from 'express';

// ─── Mocks ──────────────────────────────────────────────────────────────────
jest.mock('../../../db/models', () => ({
  Personne: {
    update: jest.fn().mockResolvedValue([1]),
    findByPk: jest.fn().mockResolvedValue({
      idPers: 1,
      nom: 'Test',
      email: 'test@test.com',
      photoURL: null,
      idALNYA: '123456',
    }),
  },
  Admin: {
    update: jest.fn().mockResolvedValue([1]),
    findByPk: jest.fn().mockResolvedValue({
      ID: 1,
      nom: 'Admin',
      email: 'admin@test.com',
      photoUrl: null,
    }),
  },
}));

jest.mock('../../../middlewares/auth', () => ({
  authenticate: (req: any, _res: any, _next: any) => {
    req.user = { id: 1, login: 'TESTUSER', role: 'PARENT', typePersonne: 2 };
    _next();
  },
}));

// ─── Import après mocks ──────────────────────────────────────────────────────
import authRouter from '../index';
import { Personne } from '../../../db/models';

const app = express();
app.use(express.json());
app.use('/auth', authRouter);

// ─── Tests ──────────────────────────────────────────────────────────────────
describe('PUT /auth/profile – champ idALNYA', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('✅ accepte un idALNYA composé de chiffres valides (≤ 15)', async () => {
    const res = await request(app)
      .put('/auth/profile')
      .send({ nom: 'Test', email: 'test@test.com', idALNYA: '0694123456789' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Personne.update).toHaveBeenCalledWith(
      expect.objectContaining({ idALNYA: '0694123456789' }),
      expect.any(Object)
    );
  });

  it('✅ stocke un idALNYA vide lorsqu\'il n\'est pas fourni', async () => {
    const res = await request(app)
      .put('/auth/profile')
      .send({ nom: 'Test', email: 'test@test.com' });

    expect(res.status).toBe(200);
    expect(Personne.update).toHaveBeenCalledWith(
      expect.objectContaining({ idALNYA: '' }),
      expect.any(Object)
    );
  });

  it('✅ accepte un idALNYA de 15 chiffres (longueur maximale)', async () => {
    const res = await request(app)
      .put('/auth/profile')
      .send({ idALNYA: '123456789012345' });

    expect(res.status).toBe(200);
    expect(Personne.update).toHaveBeenCalledWith(
      expect.objectContaining({ idALNYA: '123456789012345' }),
      expect.any(Object)
    );
  });
});
