# nuxt-size

ultrafast get folder size after build

<br />

## Features

- ultrafast，power by
  [go-get-folder-size](https://github.com/markthree/go-get-folder-size)

## Usage

### install

```shell
npm i nuxt-size -D
```

### setup

```ts
// nuxt.config.ts

export default defineNuxtConfig({
  modules: ["nuxt-size"],
});
```

### result

```shell
npx nuxi build
```

The console will output

```shell
The output size is xx
```

<br />

## License

Made with [markthree](https://github.com/markthree)

Published under [MIT License](./LICENSE).
