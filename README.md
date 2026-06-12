# 認証付き タスク管理アプリケーション

## １. 概要

- ### 本アプリは、タスクを効率的に管理するために設計されたモダンなタスク管理Webアプリケーションです。フロントエンドにReact・TypeScript、バックエンドにRuby on Rails(API)を採用し、ビジネスロジックとUIを分離した構成となっております。また、より実践的なスキルを身に着けるため、本プロジェクトでは、GitHub ActionsによるCI/CDの自動化、Vitestによるテスト環境を構築した開発プロセスとなっております。さらに、Vercel・Render・Neonを利用してクラウド環境へデプロイし、アプリケーションの運用まで含めた一連の開発フローとなっています。

## ２. 主な機能

- ### 認証機能
  - #### サインアップ(アカウント新規登録)
  - #### サインイン(ログイン)
  - #### サインアウト(ログアウト)
  - #### パスワード変更

- ### タスク管理機能
  - #### タスクの新規作成 / 追加
  - #### タスクのステータス別表示　※ステータス: 完了済、未完了、削除済のいずれか
  - #### タスクの名称変更 / ステータス更新
  - #### タスクの削除

## ３. 公開アプリケーション

- ### デモURL
  - https://webapp-six-indol.vercel.app/ ※Vercel環境の仕様上、初回アクセスや一定時間アクセスがない場合、起動（コールドスタート）に約15〜30秒の遅延が生じます。

- ### githubリポジトリ　
  - https://github.com/kkurokawa0123/webapp

- ### デモ動画(チュートリアル) ※注意:YouTubeへ移動します
  - https://www.youtube.com/watch?v=fUcwXQcnlJk

## ４. 技術スタック

| カテゴリ       | 技術                               |
| :------------- | :--------------------------------- |
| フロントエンド | React 19 / TypeScript              |
| バックエンド   | Node.js / Ruby on Rails(Rails API) |
| データベース   | PostgreSQL(本番環境) / MySQL       |
| インフラ       | Vercel / Render / Neon / Docker    |
| CI/CD          | GitHub Actions                     |
| テスト         | Vitest                             |

- ### その他 導入ライブラリ / 開発サポートツール
  - #### ESLint(品質チェック)

  - #### Prettier(コード整形)

  - #### Copilot

## ５. 設計 / 開発において意識した点　目的など

- ### 保守性
  - #### インフラ(API)、 ビジネスロジック、UI それぞれを分離した実務寄りのアーキテクチャ
    - #### バックエンド
      - #### APIはREST APIの設計思想に基づく作りとする。
      - #### 認証のコアとなる部分はdevise_token_authを採用する。

    - #### フロントエンド
      - #### UI層、ドメイン層、インフラ層の構成に分離することで、各層の責務を明確化し、それぞれの依存度を低くする。
      - #### ビジネスの業務ルール（ドメイン）はドメイン層をまとめることで 仕様変更時の修正漏れを防ぐ。また、テストコードも書きやすくなるなどのメリットもある。
      - #### 保守性の観点からUse caseとAPIを切り離す実装し、React Query + Axios で API 通信を管理する。

- ### セキュリティ
  - #### アクセストークンによる認証を行うことで、リソースに対しての不正アクセスなどを防ぐ。
  - #### devise_token_authによるトークンベースの認証を標準でサポートしているため、安全なAPI通信を実現できる。また、ReactなどのSPAやモバイルアプリとの相性も良い。

- ### 性能 / 品質
  - #### React Queryによるサーバーからのフェッチング、データキャッシュを実現することで、サーバー状態管理の最適化し、アプリ全体のパフォーマンス向上を実現する。また、ローディング処理やメッセージ表示などを処理の間にはさむことで、UX向上につながる。

  - #### GitHub Actionsを使ったCI/CDの自動化を採用することで、コードの品質を担保し、デプロイ時の手順漏れなどのヒューマンエラーを防ぐ。

- ### 再利用性
  - #### Context APIを活用し、①認証情報、②ローディング状態、③メッセージ表示をアプリ全体で一元管理することで、再利用が容易になる。

## ６．ディレクトリ構成（一部抜粋）

```
.
backend/
  ├── .env.local
  ├── app/
  │     ├── models/
  │     └── controllers/
frontend/src
  ├── domain/
  │    ├── services/
  │    ├── entity/
  │    └── value_object/
  ├── infrastructure/
  │    ├── api/
  │    ├── api_services/
  │    └── lib/
  ├── presentation/
  │    ├── contexts/
  │    ├── hooks/
  │    └── views
  └──  test/

```

## ７．セットアップ方法

## 前提

- gitがインストール済み
- Docker Desktop & Docker Composeがインストール済み

```bash
# リポジトリをクローン
git clone https://github.com/kkurokawa0123/webapp
cd webapp

# backendファルダ直下に.env.localを追加　※中身は空でOK
touch .env.local

# 以下のコマンドを入力して各コンテナを起動
docker-compose up --build -d

# DBの作成
docker-compose run back rake db:create

# テーブルの作成
docker-compose run back rake db:migrate
```

## ８．バージョン

- Node.js v22.19.0
- React 19.2
- Material-UI v5
- Rails >= 7.1.6
- Ruby 3.2.11
- Mysql:8.0
