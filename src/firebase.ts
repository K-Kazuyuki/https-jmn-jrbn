import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebaseConfig from "./firebaseConfig";

if (firebaseConfig.apiKey === "" || firebaseConfig.authDomain === "") {
  throw new Error("環境変数が設定されていません．");
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // 名前付きエクスポートに変更
export default app; // appのみデフォルトエクスポート
