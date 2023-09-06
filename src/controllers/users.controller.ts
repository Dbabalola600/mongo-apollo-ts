import { Context } from '../models/context';
import { buildErrorResponse } from '../utils/buildErrorResponse';
import { successResponse } from '../utils/successResponse'
const Users = require('../models/users');


export class UsersController {
  async addUser(inputObject: any, ctx: Context) {
    try {
      const result = await Users.create(inputObject.input);
      return successResponse(result, 'created');
    } catch (error) {
      return buildErrorResponse(error)
    }
  }


  async SignIn(inputObject: any, ctx: Context) {
    try {
      const IsUser = await Users.findOne({ email: inputObject.email })
      if (IsUser) {
        if (inputObject.password === IsUser.password) {
          return successResponse(IsUser, 'signed in');
        }else{
          return successResponse({}, 'wrong password');
        }
      } else {
        const IsUser2 = await Users.findOne({ name: inputObject.email })
        if (inputObject.password === IsUser2.password) {
          return successResponse(IsUser2, 'signed it');
        }else{
          return successResponse({}, 'wrong password');
        }
      }

    } catch (error) {
      return buildErrorResponse(error)
    }
  }



  async getUsers(inputObject: any, ctx: Context) {
    try {
      let contactType = []
      if (inputObject.contactType) {
        contactType.push(inputObject.contactType)
      }
      const result = await Users.find({ contactType: contactType });
      return successResponse(result, 'fetch');
    } catch (error) {
      return buildErrorResponse(error)
    }
  }
  async updateUser(inputObject: any, ctx: Context) {
    try {
      const result = await Users.findOneAndUpdate({ _id: inputObject.id }, inputObject.input);
      if (result) {
        return successResponse(result, 'updated');
      }
      return successResponse(result, 'notUpdated');
    } catch (error) {
      return buildErrorResponse(error)
    }
  }

  async deleteUser(inputObject: any, ctx: Context) {
    try {
      const result = await Users.findOneAndDelete({ _id: inputObject.id })
      return successResponse(result, 'deleted');
    } catch (error) {
      return buildErrorResponse(error)
    }
  }

  async findByUserId(inputObject: any, ctx: Context) {
    try {
      const result = await Users.findById(inputObject.id)
      console.log(result)
      return successResponse(result, 'deleted');
    } catch (error) {
      return buildErrorResponse(error)
    }
  }
}

