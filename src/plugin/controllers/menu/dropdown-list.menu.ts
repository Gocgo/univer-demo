import type { IMenuButtonItem, IMenuSelectorItem } from '@univerjs/ui';
import { MenuItemType, MenuPosition } from '@univerjs/ui';

import { DropdownListFirstItemOperation, DropdownListSecondItemOperation } from '../../commands/operations/dropdown-list.operation';

const CUSTOM_MENU_DROPDOWN_LIST_OPERATION_ID = 'custom-menu.operation.dropdown-list';

export function CustomMenuItemDropdownListMainButtonFactory(): IMenuSelectorItem<string> {
  return {
    // When type is MenuItemType.SUBITEMS, this factory serves as a container for the drop-down list, and you can set any unique id
    id: CUSTOM_MENU_DROPDOWN_LIST_OPERATION_ID,
    // The type of the menu item, in this case, it is a subitems
    type: MenuItemType.SUBITEMS,
    icon: 'MainButtonIcon',
    tooltip: 'customMenu.dropdownList',
    title: 'customMenu.dropdown',
    positions: [MenuPosition.TOOLBAR_START, MenuPosition.CONTEXT_MENU],
  };
}


export function CustomMenuItemDropdownListFirstItemFactory(): IMenuButtonItem<string> {
  return {
    id: DropdownListFirstItemOperation.id,
    type: MenuItemType.BUTTON,
    title: 'customMenu.itemOne',
    icon: 'ItemIcon',
    positions: [CUSTOM_MENU_DROPDOWN_LIST_OPERATION_ID],
  };
}

export function CustomMenuItemDropdownListSecondItemFactory(): IMenuButtonItem<string> {
  return {
    id: DropdownListSecondItemOperation.id,
    type: MenuItemType.BUTTON,
    title: 'customMenu.itemTwo',
    icon: 'ItemIcon',
    positions: [CUSTOM_MENU_DROPDOWN_LIST_OPERATION_ID],
  };
}
