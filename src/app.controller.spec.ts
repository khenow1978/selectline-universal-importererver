// import { Test, TestingModule } from '@nestjs/testing';
// import { AppController } from './app.controller';
// import mocks from 'node-mocks-http'

// describe('AppController', () => {
//   let appController: AppController;

//   beforeEach(async () => {
//     const mockAppController = {
//       addProduct: jest.fn(dto => {
//         return {
//           response: true
//         }
//       })
//     }
//     const app: TestingModule = await Test.createTestingModule({
//       controllers: [AppController],
//       providers: [],
//     }).compile();

//     appController = app.get<AppController>(AppController);
//   });
//   //const req: Request = mocks.createRequest();

//   describe('root', () => {
//     it('should return "On"', () => {
//       expect(appController.getHello()).toBe(`On`);
//     });
    
//   });
// });
