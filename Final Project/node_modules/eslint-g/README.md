# eslint-g
快速生成常用 .eslintrc.json 配置文件，同时安装相应的 npm 依赖包。

## Install

```base
npm i -g eslint-g
```

## Usage

```bash
$ cd my-project   # 进入项目根目录
$ esg             # 生成默认 eslint.json 配置，同时安装依赖包
```

同时可以进一步的配置

```bash
$ esg -r vue -i yarn   # 使用 vue 的 eslint.json 配置，使用 yarn 安装依赖
```

## Options

### **-r [rule]**

根据项目环境不同来生成不同的 eslintrc 规则文件，rule 有以下可选项：

- `node` 或 `n`: 生成 nodejs 的 eslint 配置 （默认使用 node 配置）
- `vue` 或 `v`: 生成 vue 的 eslint 配置
- `react` 或 `r`: 生成 react 的 eslint 配置
- `browser` 或 `b`: 生成浏览器环境通用的 eslint 配置

example：
```bash
$ esg -r react  # 生成 react 的 eslint 配置
```

### **-i [installer]**

根据项目包管理工具的不同来选择不同的包管理器来安装依赖，installer 有以下可选项：

- `npm`: 使用 npm 安装相关依赖（默认使用 npm）
- `yarn`: 使用 yarn 安装相关依赖
- `cnpm`: 使用 cnpm 安装相关依赖

example: 
```bash
$ esg -i yarn # 使用 yarn 来安装相关依赖
```

### **--no-plugins**

禁止自动安装 npm 相关依赖包，仅仅生成 `.eslintrc` 规则文件。
