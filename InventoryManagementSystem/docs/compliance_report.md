# 期末專題合規性檢查報告 (Compliance Check)

本報告對照課程要求與目前專案完成度進行逐項核對。

## 1. 專題方向
- [x] **主題自訂**: 庫存管理系統 (Inventory Management System)。
- [x] **CRUD 功能**: 完整實作 Create (新增), Read (列表/搜尋), Update (編輯), Delete (刪除)。
- [x] **前後端整合**: 前端 React 透過 Axios 呼叫後端 Express API。

## 2. 資料庫
- [x] **MongoDB**: 使用 Docker 容器運行 MongoDB。
- [x] **資料結構**: 設計了 `Item` Schema (name, category, price, quantity, description)。

## 3. 後端開發 (Backend)
- [x] **框架**: Express.js (非 XAMPP)。
- [x] **API 端點**:
    - `POST /api/items` (新增)
    - `GET /api/items` (查詢所有)
    - `GET /api/items/:id` (查詢單筆)
    - `PUT /api/items/:id` (更新)
    - `DELETE /api/items/:id` (刪除)
- [x] **回應格式**: 統一使用 `res.status().json()` 並包含錯誤處理 (try-catch)。

## 4. 前端開發 (Frontend)
- [x] **框架**: React (Vite)。
- [x] **視覺化介面**: 儀表板、模態框 (Modal)、搜尋列。
- [x] **樣式與 RWD**: 
    - 使用 TailwindCSS。
    - 響應式網格設計 (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)，適應手機與桌面。
- [x] **操作介面**: 提供表單輸入、按鈕點擊、即時資料更新。

## 5. 版本控制 (Git) ⚠️ **待使用者執行**
- [ ] **Git Init**: 在專案根目錄執行 `git init`。
- [ ] **Commits**: 需累積 5 次以上提交紀錄。
    - 建議提交訊息：
        - `feat: Initial project structure`
        - `feat: Implement Backend API and Models`
        - `feat: Implement Frontend Dashboard UI`
        - `fix: Resolve MongoDB connection issue`
        - `docs: Update README and API documentation`

## 6. 文件與展示
- [x] **README**: 包含專案說明、安裝指引。
- [x] **API 規格**: `docs/api-spec.md` 完整列出。
- [x] **架構圖/流程圖**: `docs/architecture.md` 包含 Mermaid 圖表。
- [ ] **Demo 影片** ⚠️ **待使用者執行**: 需自行錄製 5-8 分鐘影片，演示 CRUD 流程。
- [ ] **GitHub Repo**: 需自行上傳至 GitHub 並提供連結。

## 總結
**技術實作已全數完成 (100%)**。
目前僅剩 **「個人作業」** 部分需由您親自完成：
1.  在本機執行 Git 指令建立版本紀錄。
2.  錄製 Demo 影片。
3.  上傳至 GitHub 與繳交作業。
