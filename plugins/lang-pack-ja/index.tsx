import { PluginAPI } from '../types';

const JA = {
  UI: {
    GAME_TITLE: "シティーパルス",
    GAME_SUBTITLE: "ミニマリスト物理ガスシミュレーター",
    NEW_GAME: "新しいゲーム",
    LOAD_GAME: "ゲームをロード",
    SETTINGS: "設定",
    PAUSE: "一時停止",
    RESUME: "再開する",
    SAVE_PROGRESS: "進捗を保存",
    QUIT_TO_MENU: "メインメニューに戻る",
    CONFIRM: "確認",
    CANCEL: "キャンセル",
    BACK: "戻る",
    VOLUME: "マスター音量",
    THEME_MODE: "テーマモード",
    THEME_LIGHT: "ライト",
    THEME_DARK: "ダーク",
    THEME_AUTO: "自動",
    LANGUAGE: "言語",
    SMART_BUILD: "スマートビルドモード",
    GPU_ACCEL: "GPUアクセラレーション",
    KEYBINDINGS_PC: "キーバインド（PC）",
    MOVE_VIEW: "視点を移動",
    ZOOM_VIEW: "視点をズーム",
    KEYBIND_PIPE: "パイプ/接続",
    KEYBIND_WATER: "水道/建物",
    KEYBIND_POWER: "電力/建物",
    KEYBIND_GAS: "ガス/建物",
    CANCEL_SELECTION: "選択をキャンセル",
    PAUSE_GAME: "一時停止",
    START_TUTORIAL: "チュートリアル開始",
    SETTINGS_TAB_GENERAL: "一般",
    SETTINGS_TAB_CONTROLS: "操作",
    SETTINGS_TAB_PLUGINS: "プラグイン",
    LOGIN_MICROSOFT: "Microsoftでログイン",
    LOGGED_IN_AS: "ログイン中: ",
    LOGOUT: "ログアウト",
    PLUGIN_MANAGER_TITLE: "プラグイン管理",
    PLUGIN_MANAGER_DESC: "インストールされたゲーム拡張機能を管理",
    PLUGIN_ENABLED: "有効",
    PLUGIN_DISABLED: "無効",
    PLUGIN_AUTHOR: "作成者",
  },
  BUILDINGS: {
    SOURCE: { NAME: "浄水場", DESC: "都市の命の源。" },
    SINK: { NAME: "コミュニティ配水センター", DESC: "安定した供給を求めています。" }
  }
};

export default {
  id: "com.citypulse.lang.ja",
  name: "日语包",
  version: "1.0.0",
  init: (api: PluginAPI) => {
    api.registerLanguagePack('ja', '日本語', JA);
    console.log("Japanese language pack loaded.");
  }
};
