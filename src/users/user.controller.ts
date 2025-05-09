import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private service: UserService) {}
  @Get()
  async getAllUsersController() {
    return await this.service.getAllUsers();
  }
  @Get('/:id')
  async getOneUserController(@Param('id') id: string) {
    return await this.service.getOneUser(+id);
  }
  @Put('/:id/role')
  async updateUserRoleController(@Param('id') id: string, @Body() { role }) {
    return await this.service.updateUserRole(+id, role);
  }
  @Delete('/:id')
  async deleteUserController(@Param('id') id: string) {
    return await this.service.deleteUser(+id);
  }
}
