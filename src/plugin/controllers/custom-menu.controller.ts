import { Disposable, ICommandService, LifecycleStages, OnLifecycle } from '@univerjs/core';
import { ComponentManager } from '@univerjs/ui';
import type { IMenuItemFactory } from '@univerjs/ui';
import { IMenuService } from '@univerjs/ui';
import { Inject, Injector } from '@wendellhu/redi';

import { CustomMenuItemSingleButtonFactory } from './menu/single-button.menu';
import { SingleButtonOperation } from '../commands/operations/single-button.operation.tsx';
import { ButtonIcon } from '../components/button-icon/ButtonIcon';
import { MainButtonIcon } from '../components/main-button-icon/MainButtonIcon';
import { ItemIcon } from '../components/item-icon/ItemIcon';
import { CustomMenuItemDropdownListFirstItemFactory, CustomMenuItemDropdownListMainButtonFactory, CustomMenuItemDropdownListSecondItemFactory } from './menu/dropdown-list.menu';
import { DropdownListFirstItemOperation, DropdownListSecondItemOperation } from '../commands/operations/dropdown-list.operation';

@OnLifecycle(LifecycleStages.Steady, CustomMenuController)
export class CustomMenuController extends Disposable {
  constructor(
    @Inject(Injector) private readonly _injector: Injector,
    @ICommandService private readonly _commandService: ICommandService,
    @IMenuService private readonly _menuService: IMenuService,
    @Inject(ComponentManager) private readonly _componentManager: ComponentManager,
  ) {
    super();

    this._initCommands();
    this._registerComponents();
    this._initMenus();
  }

  /**
   * register commands
   */
  private _initCommands(): void {
    [
      SingleButtonOperation,
      // DropdownListFirstItemOperation,
      // DropdownListSecondItemOperation,
    ].forEach((c) => {
      this.disposeWithMe(this._commandService.registerCommand(c));
    });
  }

  /**
   * register icon components
   */
  private _registerComponents(): void {
    const componentManager = this._componentManager;
    this.disposeWithMe(componentManager.register("ButtonIcon", ButtonIcon));
    this.disposeWithMe(componentManager.register("MainButtonIcon", MainButtonIcon));
    this.disposeWithMe(componentManager.register("ItemIcon", ItemIcon));
  }

  /**
   * register menu items
   */
  private _initMenus(): void {
    (
      [
        CustomMenuItemSingleButtonFactory,
        // CustomMenuItemDropdownListMainButtonFactory,
        // CustomMenuItemDropdownListFirstItemFactory,
        // CustomMenuItemDropdownListSecondItemFactory
      ] as IMenuItemFactory[]
    ).forEach((factory) => {
      this.disposeWithMe(this._menuService.addMenuItem(this._injector.invoke(factory)));
    });
  }
}
