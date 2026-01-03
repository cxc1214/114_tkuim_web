# Inventory Management System (庫存管理系統)

一個基於 MERN Stack (MongoDB, Express, React, Node.js) 的全端庫存管理系統。本專案為「網路程式設計期末專題」作品，展示了完整的前後端整合與 CRUD 功能。

## 功能特色
- **儀表盤**: 視覺化庫存列表，支援即時搜尋與過濾。
- **管理功能**: 新增、編輯、刪除 (CRUD) 庫存物品。
- **現代化介面**: 使用 TailwindCSS 打造的高級深色模式 (Dark Mode)。
- **響應式設計**: 支援各種裝置瀏覽。

## 專案結構
```
/
├── frontend/     # 前端應用 (React + Vite)
├── backend/      # 後端 API (Express + MongoDB)
├── docs/         # 設計文件 (API 規格, 架構圖)
└── README.md     # 專案說明
```

## 安裝與執行指引 (Installation Guide)

### 前置需求
- Node.js (v14+)
- MongoDB (本機服務需開啟 或 使用雲端 URI)

### 1. 啟動資料庫 (Database)
**選項 A：使用 Docker (推薦)**
如果您已安裝 Docker，這是最快速的方式：
```bash
docker-compose up -d
# 這會啟動 MongoDB 在背景運行 (port 27017)
```

**選項 B：本地安裝 MongoDB**
請確保您的 MongoDB Service 已啟動。

### 2. 啟動後端 (Backend)
```bash
cd backend
npm install
# 確保 .env 檔案已設定 MONGO_URI=mongodb://localhost:27017/inventory
npm run dev
# 伺服器將運行於 http://localhost:5000
```

### 2. 啟動前端 (Frontend)
```bash
cd frontend
npm install
npm run dev
# 瀏覽器將開啟 http://localhost:5173
```

## 技術選型
- **前端**: React, TailwindCSS, Lucide Icons, Axios
- **後端**: Node.js, Express, Mongoose
- **資料庫**: MongoDB

## 專案展示
請參考 `docs/` 目錄下的架構圖與 API 規格文件。
