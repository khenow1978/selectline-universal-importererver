import { Test, TestingModule } from '@nestjs/testing';
import selectlineAPI from './selectline-universal-importer.controller';

describe('SelectlineUniversalImporterController', () => {

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
    }).compile();
  });

  it('should be defined', () => {
    expect(selectlineAPI).toBeDefined();
  });
  it('postArticle need to be defined', () => {
    //expect(appController.addProduct).toBeInstanceOf('function')
    expect(selectlineAPI.postAddProduct2).toBeDefined();
  })
  
  it('postComment need to be defined', () => {
    expect(selectlineAPI.postAddComment2).toBeDefined();
  })
  
  it('postPartial need to be defined', () => {
    expect(selectlineAPI.postAddPartialSum2).toBeDefined();
  })
});
