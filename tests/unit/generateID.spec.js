const generatedId = require("../../src/utils/generateUUID");

// Se é possivel geral um uuid único
// se está vindo o id
// se esse id é uma string
// se o tamanho da string é o que eu espero, 36 caracteres

describe("generateUUID", () =>{
    it("Se é possivel geral um uuid único", () =>{
        const id = generatedId();

        expect(id).toBeDefined();
        expect(typeof id).toBe("string");
        expect(id).toHaveLength(36);
    })
})