import Blink from "gb-main";
import { App, debounce, Notice, PluginSettingTab, Setting } from "obsidian";

export interface BlinkSettings {
  interval: number;
}

export const DEFAULT_SETTINGS: BlinkSettings = {
  interval: 500,
};

export class BlinkSettingTab extends PluginSettingTab {
  plugin: Blink;

  constructor(app: App, plugin: Blink) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    this.containerEl.empty();
    new Setting(this.containerEl).setName("Blink Interval").addText((txt) =>
      txt.setValue(this.plugin.settings.interval.toString()).onChange((val) => {
        const save = debounce(
          () => {
            this.plugin.settings.interval = +val;
            this.plugin.saveSettings();
            this.plugin.stopBlink();
            this.plugin.handleChange();
          },
          1e3,
          true,
        );
        if (Number.isInteger(+val)) save();
        else new Notice("invaild interval: must be integer");
      }),
    );
  }
}
