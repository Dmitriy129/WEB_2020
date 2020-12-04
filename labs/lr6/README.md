# lr6

## default ports

- front: 3000

- back: 3001/443

> todo: change ports

## npm

### dev

```JSon
{
    "dev": "run front and back with realtime update",
    "dev:front": "run only front with realtime update",
    "dev:back": "run only back with realtime update",
}
```

### prod

```JSon
{
    "start": "run front (only after build) and back",
    "start:front": "run front (only after build)",
    "start:back": "run back",
}
```

# other

```json
{
  "build": "build front",
  "i:all": "npm i for ./back and ./front"
}
```
