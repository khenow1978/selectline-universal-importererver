// import { Controller, Get, Req, Body, Post, Param } from '@nestjs/common';
// import selectlineAPI from './controller/selectline-universal-importer.controller';

// @Controller()
// export class AppController {
//   constructor() {
//   }

//   @Get()
//   getHello() {
//     return `On`;
//   }

//   @Post('Documents/:id/ArticleItem')
//   async addProduct(
//     @Req() req: Request,
//     @Param() reqParam,
//   ) {
//     await new Promise<void>(async (resolve) => {
//       const orderId = reqParam['id'];
//       const product = {
//         ArticleNumber: req.body['ArticleNumber'],
//         CalculatedQuantityValue: req.body['CalculatedQuantityValue'],
//       };
//       await selectlineAPI.postAddProduct2(orderId, product).then(() => {
//         resolve();
//       });
//     })
//   }

//   @Post('Documents/:id/CommentPosition')
//   async addComment(@Req() req: Request, @Param() reqParam) {
//     await new Promise<void>(async (resolve) => {
//       const orderId = reqParam['id'];
//       const comment = req.body['memo'];
//       await selectlineAPI.postAddComment2(orderId, comment).then(() => {
//         resolve();
//       });
//     })
//   }

//   @Post('Documents/:id/SubTotalPosition')
//   async addSubTotal(@Req() req: Request, @Param() reqParam) {
//     await new Promise<void>(async (resolve) => {
//       const orderId = reqParam['id'];
//       const discount = req.body['DiscountPercent'];
//       await selectlineAPI.postAddPartialSum2(orderId).then(() => {
//         resolve();
//       });
//     })
//   }
// }
