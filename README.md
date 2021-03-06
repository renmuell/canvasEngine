# cEngine.js

Lightweight JavaScript canvas engine with plugin capability.

## Features

- small core engine with
  - start()
  - stop()
  - step(count)
  - clear()
  - destroy()
- plugin support
- predefined plugins
  - fill
  - filter
  - file
  - frameRate
  - input
  - stats

## Usage

### Basic

```html
<script src="cEnginen.js"></script>
<script>

  cEngine.create({
    step: (context) => {
      context.fillStyle = 'red'
      context.fillRect(10, 10, 10, 10)
    }
  }).step() 

</script>
```

### Tiny game with input plugin

```html
<script src="cEngine.js"></script>
<script src="cEngine.input.js"></script>
<script>
    
  let player = {
        x: 0,
        y: 0
      },
      engine = cEngine.create({
        autoClear: true,
        plugins: {
            input: cEngine.input.create()
        },
        step: (context) => {
          if (engine.plugins.input.keys.W) player.y--
          if (engine.plugins.input.keys.A) player.x--
          if (engine.plugins.input.keys.S) player.y++
          if (engine.plugins.input.keys.D) player.x++

          context.fillStyle = 'red'
          context.fillRect(player.x, player.y, 10, 10)
        }
      })

  engine.start()
      
</script>
```

## Examples

Browse them on http://renmuell.github.io/cEngine/

## License

The [MIT](http://opensource.org/licenses/MIT) license. See LICENSE file.
