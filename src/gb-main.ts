import "./main.css";

import { Plugin } from "obsidian";
import { BlinkSettings, BlinkSettingTab, DEFAULT_SETTINGS } from "settings";

const BLINK_CLASS = "alx-graph-blink";

export default class Blink extends Plugin {
  settings: BlinkSettings = DEFAULT_SETTINGS;

  _intervalId: number | null = null;
  get intervalId() {
    return this._intervalId;
  }
  set intervalId(val: Blink["_intervalId"]) {
    if (val) this.registerInterval(val);
    if (this._intervalId) window.clearInterval(this._intervalId);
    this._intervalId = val;
  }

  private _enable = false;

  startBlink = () => {
    this.intervalId = window.setInterval(() => {
      this._enable = !this._enable;
      document.body.toggleClass(BLINK_CLASS, this._enable);
      this.app.workspace.trigger("css-change");
    }, this.settings.interval);
  };

  stopBlink = () => {
    this.intervalId = null;
    this._enable = false;
    document.body.toggleClass(BLINK_CLASS, this._enable);
  };

  handleChange = () => {
    const { workspace } = this.app;
    const arr = workspace.getLeavesOfType("graph");
    const isGraphFocus = arr.some((leaf) => leaf === workspace.activeLeaf);
    console.log(isGraphFocus);

    if (arr.length > 0 && !isGraphFocus && this.intervalId === null)
      this.startBlink();
    else if ((arr.length === 0 || isGraphFocus) && this.intervalId !== null)
      this.stopBlink();
  };

  async onload() {
    console.log("loading Blink");
    const { workspace } = this.app;
    workspace.onLayoutReady(this.handleChange);
    workspace.on("layout-change", this.handleChange);
    workspace.on("active-leaf-change", this.handleChange);

    await this.loadSettings();

    this.addSettingTab(new BlinkSettingTab(this.app, this));
  }

  // onunload() {
  //   console.log("unloading Blink");
  // }

  async loadSettings() {
    this.settings = { ...this.settings, ...(await this.loadData()) };
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
