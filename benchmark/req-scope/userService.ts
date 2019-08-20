import {provide, scope, ScopeEnum} from '../../dist';

@provide()
@scope(ScopeEnum.Request)
export class UserService {

  async getUsers() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(['harry', 'jiakun.du']);
      }, 100);
    });
  }
}
