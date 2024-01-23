import { Id } from "../../../modules/user/domain/valueObject/id.valueObject";

describe('Id value object', () => {
    it(`
        GIVEN a valid id
        WHEN the id is created
        THEN it should be created without errors
    `, () => {
        // GIVEN 
        const id = 'valid-id';

        // WHEN
        const idVo = new Id({value: id});

        // THEN
        expect(idVo).toBeDefined();
        expect(idVo.props.value).toEqual(id);
    });

    it(`
        GIVEN an empty id
        WHEN id is being created
        THEN it should create an uuid id
    `, () => {
        // GIVEN 
        const id = '';

        // WHEN
        const idVo = new Id({value: id});
        
        // THEN
        expect(idVo).toBeDefined();
        expect(idVo.props.value).not.toEqual(id);
    });
    
});