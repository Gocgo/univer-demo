/**
 * Copyright 2023-present DreamNum Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { LocaleService, Plugin, UniverInstanceType } from '@univerjs/core';
import type { Dependency } from '@wendellhu/redi';
import { Inject, Injector } from '@wendellhu/redi';

/**
 * The ability to import locales from virtual modules and automatically import styles is provided by Univer Plugins. For more details, please refer to: https://univer.ai/guides/sheet/advanced/univer-plugins.
 * If you encounter issues while using the plugin or have difficulty understanding how to use it, please disable Univer Plugins and manually import the language packs and styles.
 *
 * 【从虚拟模块导入语言包】以及【自动导入样式】是由 Univer Plugins 提供的能力，详情参考：https://univer.ai/zh-CN/guides/sheet/advanced/univer-plugins
 * 如果您在使用该插件的时候出现了问题，或者无法理解如何使用，请禁用 Univer Plugins，并手动导入语言包和样式
 */
import { zhCN, enUS } from './locale';
import { CustomMenuController } from './controllers/custom-menu.controller';

const SHEET_CUSTOM_MENU_PLUGIN = 'SHEET_CUSTOM_MENU_PLUGIN';

export class UniverSheetsCustomMenuPlugin extends Plugin {
  static override type = UniverInstanceType.UNIVER_SHEET;
  static override pluginName = SHEET_CUSTOM_MENU_PLUGIN;

  constructor(
    @Inject(Injector) protected readonly _injector: Injector,
    @Inject(LocaleService) private readonly _localeService: LocaleService
  ) {
    super();

    console.log('_injector', this._injector);
    console.log('_localeService', this._localeService);

    _localeService.load({
      zhCN,
      enUS
    });
  }

  override onStarting(injector: Injector): void {
    ([
      [CustomMenuController],
    ] as Dependency[]).forEach((d) => injector.add(d));
  }
}
