import { Controller, Get, Param, Req } from '@nestjs/common';
import { BashService } from './bashService';
const filePath = 'C:/Talend_Job/' //PSQL/PSQL_SystemNumbers_Prod_1.1/PSQL_SystemNumbers_Prod'

@Controller()
export class BashController {
    private bashService = new BashService();
    @Get('bashScript/:name')
    async runBash(
      @Req() req: Request,
      @Param() reqParam,): Promise<void> {
        const name = reqParam['name'];
      await this.bashService.runBashScript(filePath + name);
    }
}
const selectlineAPI = new BashController();
export default selectlineAPI;
