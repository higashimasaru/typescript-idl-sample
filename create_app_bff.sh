#!/bin/bash

if [ -z "$(which jq)" ]; then
  echo "error: There is no 'jq' command." >&2
  echo "Please install 'jq' command (brew install jq)." >&2
  exit 1
fi
if [ ! -e 'ui' ]; then
  echo "error: There is no 'ui' directory." >&2
  echo "Please execute './create_app_ui.sh'." >&2
  exit 1
fi

mkdir bff
cd bff
cp ../ui/.gitignore .

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
# package.json
#
cat << EOS > package.json
{
  "name": "bff",
  "version": "0.1.0",
  "private": true
}
EOS

#
# typescript
#
npm install express node-fetch
npm install --save-dev typescript ts-node ts-node-dev @types/node @types/express @types/node-fetch

# tsconfig.json
cat << EOS > tsconfig.json
{
  "compilerOptions": {
    "target": "ESNEXT",
    "module": "commonjs",
    "outDir": "./build",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": [
    "src"
  ]
}
EOS

addPackage scripts build '"tsc"'
addPackage scripts start '"node build/app.js"'
addPackage scripts dev   '"ts-node-dev src/app.ts"'

#
# ts-node-dev
#
cat << EOS > .node-dev.json
{
  "notify": false
}
EOS

#
# eslint, prettier
#
npm install --save-dev eslint eslint-plugin-prettier eslint-config-prettier prettier \
                       @typescript-eslint/eslint-plugin @typescript-eslint/parser

addPackage scripts lint '"eslint src/**/*.ts"'
setPackage eslintConfig '{
    "env": {
      "node": true,
    },
    "extends": [
      "plugin:prettier/recommended"
    ],
    "plugins": [
      "@typescript-eslint"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "sourceType": "module"
    },
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

#
# app.ts
#
mkdir src
touch src/app.ts

ln -s ../../ui/src/types src/
ln -s ../../ui/src/bff.types src/
