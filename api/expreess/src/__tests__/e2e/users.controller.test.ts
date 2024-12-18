import request from 'supertest';
import { faker } from '@faker-js/faker';

import { app } from '../../server';

// para executar o teste, primeiro exportar as vairavies de ambiente
 
describe("API Endpoints user", () => {
    
    it('POST /users - should create a new user', async () => {
        const newUser = { name: faker.person.fullName(), email: faker.internet.email() };
        const res = await request(app).post('/users').send(newUser);
        
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe(newUser.name);

    });

    it('GET /users - should return all users', async () => {
        const res = await request(app).get('/users?porPagina=10&pagina=1&ordenarAsc=false&ordenarPor=name');
        
        expect(res.status).toBe(200);
        expect(res.body.data).toBeInstanceOf(Array);
    });

})