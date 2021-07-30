import "./main.css";

import { Plugin } from "obsidian";
import {
  _MyPlugin_Settings,
  _MyPlugin_SettingTab,
  DEFAULT_SETTINGS,
} from "settings";

export default class _MyPlugin_ extends Plugin {
  settings: _MyPlugin_Settings = DEFAULT_SETTINGS;

  async onload() {
    console.log("loading _MyPlugin_");

    await this.loadSettings();

    this.addSettingTab(new _MyPlugin_SettingTab(this.app, this));
  }

  onunload() {
    console.log("unloading _MyPlugin_");
  }

  async loadSettings() {
    this.settings = { ...this.settings, ...(await this.loadData()) };
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
