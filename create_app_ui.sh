#!/bin/bash

if [ -z "$(which jq)" ]; then
  echo "error: There is no 'jq' command." >&2
  echo "Please install 'jq' command (brew install jq)." >&2
  exit 1
fi

npx create-react-app ui --typescript
cd ui

#
# 準備
#
function addPackage() {
  local base=$1
  local key=$2
  local value=$3
  local file=$(mktemp)
  cat package.json | jq ".${base} |= .+ {\"${key}\": ${value}}" > ${file}
  if [ $? -eq 0 ]; then
      cp ${file} package.json
  fi
  rm ${file}
}
function setPackage() {
  local key=$1
  local value=$2
  local file=$(mktemp)
  cat package.json | jq ".${key} |= .+ ${value}" > ${file}
  if [ $? -eq 0 ]; then
      cp ${file} package.json
  fi
  rm ${file}
}

#
# eslint, prettier
#
npm install --save-dev eslint-plugin-prettier eslint-config-prettier prettier
addPackage scripts lint '"eslint src/ --ext .ts,.tsx"'
setPackage eslintConfig '{
    "extends": [
      "react-app",
      "plugin:prettier/recommended"
    ],
    "plugins": [
      "@typescript-eslint"
    ],
    "parser": "@typescript-eslint/parser",
    "rules": {
      "prettier/prettier": [
        "error",
        {
          "singleQuote": true,
          "trailingComma": "es5"
        }
      ]
    }
  }'
setPackage eslintIgnore '["*.d.ts", "*/serviceWorker.ts"]'

#
# proxy
#
setPackage proxy '"http://localhost:1337"'

#
# vscode
#
mkdir -p .vscode
cat << 'EOS' > .vscode/settings.json
{
  // for eslint
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {"language": "typescript", "autoFix": true },
    {"language": "typescriptreact", "autoFix": true }
  ]
}
EOS
