```js id="6r2s1v"
import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.NODE_ENV === 'production'
    ? '/webos_5-main/'
    : '/'
})
```
