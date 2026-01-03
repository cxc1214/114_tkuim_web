# 庫存管理系統 (Inventory Management System) 程式碼詳解

這份文件將帶您一步步理解整個專案的程式碼架構與邏輯，非常有助於您的**期末報告**與**Demo 影片講解**。

---

## 1. 後端 (Backend) - 核心邏輯

後端負責處理資料的儲存、讀取與邏輯運算。

### A. 入口點 (`backend/server.js`)
這是伺服器啟動的地方。

```javascript
// 引入必要的套件
const express = require('express');
const dotenv = require('dotenv').config(); // 讀取 .env 設定檔
const mongoose = require('mongoose');      // MongoDB 連線工具
const cors = require('cors');              // 允許跨域請求 (前端連後端必備)

const app = express(); // 建立 Express 應用程式

// 中介軟體 (Middleware)
app.use(cors());                 // 開放跨域限制
app.use(express.json());         // 讓伺服器看得懂 JSON 格式的請求內容

// 資料庫連線
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected')) // 連線成功
    .catch(err => console.log(err));              // 連線失敗

// 設定路由 (API 路徑)
// 只要網址是 /api/items 開頭的請求，都交給 itemsRoutes 處理
app.use('/api/items', require('./routes/items'));

// 啟動伺服器
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### B. 資料模型 (`backend/models/Item.js`)
定義資料庫長什麼樣子 (Schema)。

```javascript
const mongoose = require('mongoose');

// 定義一個物品 (Item) 該有哪些欄位
const itemSchema = mongoose.Schema({
    name: { type: String, required: true },       // 品名 (必填)
    quantity: { type: Number, required: true },   // 數量 (必填)
    price: { type: Number, required: true },      // 價格 (必填)
    category: { type: String, required: true },   // 分類 (必填)
    description: { type: String },                // 描述 (選填)
}, {
    timestamps: true // 自動產生 createdAt (建立時間) 和 updatedAt (更新時間)
});

module.exports = mongoose.model('Item', itemSchema);
```

### C. 控制器 (`backend/controllers/itemController.js`)
這裡是真正的**商業邏輯 (CRUD)** 所在。

*   **getItems (Read)**: 使用 `Item.find()` 抓取所有資料。
*   **createItem (Create)**: 接收前端傳來的 JSON (包含圖片的 Base64 字串)，使用 `Item.create()` 新增到資料庫。
*   **updateItem (Update)**: 使用 `Item.findByIdAndUpdate()` 根據 ID 更新資料。
*   **deleteItem (Delete)**: 使用 `Item.findByIdAndDelete()` 根據 ID 刪除資料。

### D. 圖片儲存策略 (Image Storage)
在這個專案中，我們採用 **Base64** 方式儲存圖片。
1.  **前端**: 使用 `FileReader` 將使用者上傳的圖片檔案轉成一串很長的文字 (Base64 String)。
2.  **傳輸**: 這串文字會跟著 Name, Price 等資料一起打包成 JSON 送到後端。
3.  **後端**: 直接將這串文字存入 MongoDB 的 `image` 欄位。
4.  **優點**: 實作簡單，不需要額外的檔案伺服器 (如 AWS S3) 或處理檔案上傳路徑。
5.  **缺點**: 資料庫體積會變大，適合小型專案。

---

## 2. 前端 (Frontend) - 使用者介面

前端負責顯示畫面並與使用者互動。

### A. API 服務層 (`frontend/src/services/api.js`)
這是前端與後端的「橋樑」。我們使用 `axios` 來發送網路請求。

```javascript
import axios from 'axios';

// 設定基礎網址，指向後端 API
const API_URL = '/api/items'; // 透過 Vite Proxy 轉發到 http://localhost:5000

// 定義四個 CRUD 函式供 React 元件呼叫
export const getItems = () => axios.get(API_URL);             // 取得列表
export const createItem = (item) => axios.post(API_URL, item); // 新增
export const updateItem = (id, item) => axios.put(`${API_URL}/${id}`, item); // 更新
export const deleteItem = (id) => axios.delete(`${API_URL}/${id}`); // 刪除
```

### B. 主程式 (`frontend/src/App.jsx`)
這是整個網頁的核心畫面。

#### 1. 狀態管理 (State)
我們使用 React `useState` 來記住畫面的資料：
```javascript
const [items, setItems] = useState([]);           // 記住所有物品清單
const [isModalOpen, setIsModalOpen] = useState(false); // 記住「新增/編輯視窗」有沒有打開
const [currentItem, setCurrentItem] = useState(null);  // 記住現在正在編輯哪一個物品 (null 代表是新增模式)
const [searchTerm, setSearchTerm] = useState('');      // 記住搜尋關鍵字
```

#### 2. 初始化 (useEffect)
```javascript
useEffect(() => {
    fetchItems(); // 畫面一載入，馬上跟後端要資料
}, []);
```

#### 3. 關鍵功能函式
*   **fetchItems**: 呼叫 `api.getItems()`，拿到資料後放入 `setItems`，畫面就會自動更新。
*   **handleSubmit**:
    *   這是一個「表單送出」的函式。
    *   如果 `currentItem` 有值，代表是**編輯模式** -> 呼叫 `updateItem`。
    *   如果 `currentItem` 是空，代表是**新增模式** -> 呼叫 `createItem`。
    *   完成後，重新抓取資料 (`fetchItems`) 並關閉視窗。
*   **handleDelete**: 跳出確認視窗，使用者點「確定」後呼叫 `deleteItem`。

#### 4. 畫面渲染 (Render / JSX)
*   **搜尋過濾**: `filteredItems` 會根據您的搜尋關鍵字即時篩選顯示的物品。
*   **列表顯示**: 使用 `.map()` 迴圈將每一個 `item` 轉成 HTML 卡片顯示出來。
*   **模態框 (Modal)**: 根據 `isModalOpen` 決定是否顯示彈出視窗。

---

## 3. 架構總結 (適合報告用)

1.  **使用者操作 Frontend (React)**：點擊按鈕或輸入資料。
2.  **發送請求 (Axios)**：Frontend 透過 API (`/api/items`) 發送 HTTP 請求 (GET/POST/PUT/DELETE)。
3.  **後端接收 (Express)**：Backend 收到請求，Router 分派給對應的 Controller。
4.  **資料庫操作 (Mongoose)**：Controller 對 MongoDB 進行資料存取。
5.  **回傳結果**：資料庫回傳結果 -> Backend 回傳 JSON -> Frontend 更新畫面。

這就是完整的 **MERN Stack (MongoDB, Express, React, Node.js)** 運作流程！
