import { Token } from '@/classes/Token';
import { Product } from '@/interfaces/interfaces';
import { Controller, Get, HttpException, HttpStatus, Logger, Param, Post, Put, Req } from '@nestjs/common';
import {ignoreArticleForPriceList} from './../../utilities/ignorePriceArticleList'

@Controller()
export class SelectlineUniversalImporterController {
  private _url: string;
  private _token: Token;
  private readonly logger = new Logger(
    SelectlineUniversalImporterController.name,
  );

  constructor() {
    this._url = 'https://slmobile.absturzsicherung.de/slmobileabsApi/';
    this._token = new Token();
  }

  @Get()
  getHello() {
    return `On`;
  }

  getToken() {
    return this._token;
  }

  private getUrl() {
    return this._url;
  }

  private getBaseUrl(orderId: string) {
    return `${this.getUrl()}Documents/a${orderId}`;
  }

  async prepare() {
    if (this._token.getAccessToken() == '') {
      this.login();
    }
    return;
  }

  @Post('Documents/:id/orderConfig')
  async addConfig(
    @Req() req: Request,
    @Param() reqParam,
  ) {
    await new Promise<void>(async (resolve) => {
      if(!reqParam['id'] || !req.body['memo']){
        return {
          message: `OrderConfig cant be saved in Selectline.`,
          status: HttpStatus.BAD_REQUEST,
        };
      }
      const orderId = reqParam['id'];
      const orderConfig = {
        DiscountGroupNumber: req.body['DiscountGroupNumber'],
        PriceGroupNumber: req.body['PriceGroupNumber'],
        DiscountAmount: req.body['DiscountAmount'],
      };
      await selectlineAPI.postOrderConfig(orderId, orderConfig).then(() => {
        resolve();
      });
    })
  }

  @Post('Documents/:id/ArticleItem')
  async addProduct(
    @Req() req: Request,
    @Param() reqParam,
  ) {
    await new Promise<void>(async (resolve) => {
      if(!reqParam['id']){
        return {
          message: 'ID parameter is missing',
          status: HttpStatus.BAD_REQUEST,
        };
      }
      const orderId = reqParam['id'];
      
      let alternate: Product = Object.create(req.body)
      Object.keys(req.body).forEach((key: string, index: number) => {
        alternate[key] = Object.values(req.body)[index];
      })
      
      await selectlineAPI.postAddProduct(orderId, alternate).then(() => {
        resolve();
      });
    })
  }

  @Post('Documents/:id/CommentPosition')
  async addComment(@Req() req: Request, @Param() reqParam) {
    await new Promise<void>(async (resolve) => {
      if(!reqParam['id'] || !req.body['memo']){
        return {
          message: 'ID parameter is missing',
          status: HttpStatus.BAD_REQUEST,
        };
      }
      const orderId = reqParam['id'];
      const comment = req.body['memo'];
      await selectlineAPI.postAddComment(orderId, comment).then(() => {
        resolve();
      });
    })
  }

  @Post('Documents/:id/SubTotalPosition')
  async addSubTotal(@Req() req: Request, @Param() reqParam) {
    await new Promise<void>(async (resolve) => {
      if(!reqParam['id']){
        return {
          message: 'ID parameter is missing',
          status: HttpStatus.BAD_REQUEST,
        };
      }
      const orderId = reqParam['id'];
      const discount = req.body['DiscountPercent'];
      await selectlineAPI.postAddPartialSum(orderId).then(() => {
        resolve();
      });
    })
  }

  @Put('Documents/:id')
  async addDocumentData(@Req() req: Request, @Param() reqParam) {
    await new Promise<void>(async (resolve) => {
      if(!reqParam['id']){
        return {
          message: 'ID parameter is missing',
          status: HttpStatus.BAD_REQUEST,
        };
      }
      const orderId = reqParam['id'];
      const lockBookDrawId = req.body['lockBookDrawId'];
      await selectlineAPI.putOrderConfigDrawID(orderId, lockBookDrawId).then(() => {
        resolve();
      });
    })
  }

  async postAddProduct(orderId: string, product: Product) {
    if(ignoreArticleForPriceList.includes(product.ArticleNumber)){
      product.UnitPrice = 0;
    }
    return new Promise<void>((resolve, reject) => {
      try {
        this.login().then(() => {
          fetch(`${this.getUrl()}Documents/${orderId}/ArticleItem`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${this.getToken().getTokenType()} ${this.getToken().getAccessToken()}`,
              'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(product),
          }).then((response) => {
            if (!response.ok) {
              return {
                message: `Product cant be saved in Selectline. ${JSON.stringify(product)}`,
                status: HttpStatus.BAD_REQUEST,
              };
            }
            resolve()
          });
        });
      } catch (error) {
        reject()
        return {
          message: product.ArticleNumber,
          status: HttpStatus.BAD_REQUEST,
        };
      }
    })
    }

    async postOrderConfig(orderId: string, config:any){
      return new Promise<void>((resolve, reject) => {
       try {
        this.login().then(() => {
          fetch(`${this.getUrl()}Documents/${orderId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${this.getToken().getTokenType()} ${this.getToken().getAccessToken()}`,
              'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(config)
          }).then((response) => {
            if (!response.ok) {
              return {
                message: `Config cant be saved in Selectline. ${response.statusText}`,
                status: HttpStatus.BAD_REQUEST,
              };
            }
            resolve()
          });
        })
       } catch (error) {
        reject()
        return {
          message: `Config cant be saved in Selectline.`,
          status: HttpStatus.BAD_REQUEST,
        };
       } 
      })
    }

  async postAddPartialSum(orderId: string) {
    return new Promise<void>((resolve, reject) => {
      try {
        this.login().then(() => {
          fetch(`${this.getUrl()}Documents/${orderId}/SubTotalPosition`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${this.getToken().getTokenType()} ${this.getToken().getAccessToken()}`,
              'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
              DiscountPercent: '0',
            }),
          }).then((reqResponse) => {
            if (!reqResponse.ok) {
              return {
                message: `PartialSum cant be saved in Selectline. ${reqResponse.statusText}`,
                status: HttpStatus.BAD_REQUEST,
              };
            }
            resolve();
          });
        });
      } catch (error) {
        reject()
      }
    })

  }

  async postAddComment(orderId: string, comment: string) {
    return new Promise<void>((resolve, reject) => {
      try {
        this.login().then(() => {
          fetch(`${this.getUrl()}Documents/${orderId}/CommentPosition`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${this.getToken().getTokenType()} ${this.getToken().getAccessToken()}`,
              'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
              memo: comment,
            }),
          }).then((response) => {
            if (!response.ok) {
              return {
                message: `Comment cant be saved in Selectline. ${response.statusText}`,
                status: HttpStatus.BAD_REQUEST,
              };
            }
            resolve();
          });
        });
      } catch (error) {
        reject()
      }
    })
  }

  
  async login() {
    if (this.getToken().getAccessToken() == '') {
      await fetch(`${this.getUrl()}login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          UserName: 'apig',
          Password: 'safety!qweasd!',
          AppKey: 'PIM',
        }),
      }).then(async (response) => {
        if (!response.ok) {
          return {
            message: `Cant Login. ${response.statusText}`,
            status: HttpStatus.BAD_REQUEST,
          };
        }
        const result = await response.json();
        this.getToken().setAccessToken(result.AccessToken);
        this.getToken().setTokenType(result.TokenType);
      });
    }
  }



  async checkOrderActive(orderId: string){
    return new Promise<void>((resolve) => {
        this.login().then(() => {
          fetch(`${this.getUrl()}Documents/${orderId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${this.getToken().getTokenType()} ${this.getToken().getAccessToken()}`,
              'Access-Control-Allow-Origin': '*',
            },
          }).then((response) => {
            if (!response.ok) {
              return {
                message: `Oder is active. Please save before saving order.`,
                status: HttpStatus.BAD_REQUEST,
              };
            }
            resolve();
          });
        });
    })
  }
  
  async putOrderConfigDrawID(orderId: string, lockBookDrawID: string){
    return new Promise<void>((resolve, reject) => {
     try {
      this.login().then(() => {
        fetch(`${this.getUrl()}Documents/${orderId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${this.getToken().getTokenType()} ${this.getToken().getAccessToken()}`,
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({
            "ExtraFields": {
              "_QSBEMERKUNG": lockBookDrawID
            }
          })
        }).then((response) => {
          if (!response.ok) {
            return {
              message: `Config cant be saved in Selectline. ${response.statusText}`,
              status: HttpStatus.BAD_REQUEST,
            };
          }
          resolve()
        });
      })
     } catch (error) {
      reject()
      return {
        message: `Config cant be saved in Selectline.`,
        status: HttpStatus.BAD_REQUEST,
      };
     } 
    })
  }
}
const selectlineAPI = new SelectlineUniversalImporterController();
export default selectlineAPI;
