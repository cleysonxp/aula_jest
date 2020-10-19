// subir o servidor no supertest
//crair variavel de ambiente para rodar o teste no bd de teste

const request = require("supertest");
const app = require('../../src/app');
const connection = require('../../src/database');
const { cpf } = require('cpf-cnpj-validator');
const truncate = require('./truncate');

describe("MENAGERS", () => {
    afterAll(() => {
        connection.close();
    });

    beforeEach(async (done) => {
        await truncate(connection.models);
        done();
    })

    it("é possível ciar um novo gerente", async () => {
        const response = await request(app).post("/menagers").send({
            name: "Cleyson Ribeiro",
            cpf: cpf.generate(),
            email: "teste@gmail.com",
            cellphone: "5501196587092",
            password: "123456"
        });

        expect(response.ok).toBeTruthy();
        expect(response.body).toHaveProperty("id");

        it("Não é possivel cadastrar um gerente com um cpf existente", async () => {
            let cpfGerente = cpf.generate();
            let response = await request(app).post("/menagers").send({
                name: "Cleyson Ribeiro",
                cpf: cpfGerente,
                email: "teste@gmail.com",
                cellphone: "5501196587094",
                password: "123456"
            });

            response = await request(app).post("/menagers").send({
                name: "Ribeiro",
                cpf: cpfGerente,
                email: "teste123@gmail.com",
                cellphone: "5501196587099",
                password: "123456"
            });

            expect(response.ok).toBeFalsy();
            expect(response.body).toHaveProperty("error");
            expect(response.body.error).toEqual("cpf already exists");
        })
    });
});