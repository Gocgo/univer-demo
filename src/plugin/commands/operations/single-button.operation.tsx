import type { ICommand } from '@univerjs/core';
import { CommandType } from '@univerjs/core';
import type { IAccessor } from '@wendellhu/redi';
// import store from '../../../utils/store'

export const SingleButtonOperation: ICommand = {
  id: 'custom-menu.operation.single-button',
  type: CommandType.OPERATION,
  handler: async (accessor: IAccessor) => {
    // const tmp = store.getState('openEntity');
    // const tmp1 = tmp.openEntity
    alert("tmp1");
    // const action = {
    //   type: 'change_entity_state',
    //   openEntity: true
    // };
    // store.dispatch(action);

    // const tmp2 = store.getState('openEntity');
    // const tmp3 = tmp2.openEntity
    // console.log('tmp3=',tmp3);
    return true;
  },
};
