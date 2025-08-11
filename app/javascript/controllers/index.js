import { application } from "./application"

// 手動でコントローラーをインポート
import HelloController from "./hello_controller"

// コントローラーを手動登録
application.register("hello", HelloController)

