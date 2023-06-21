# mongodb新增
```js
// 新增一条数据
db.tours.insertOne({name: "The Forest Hiker", price: 297, rating: 4.7 })
// 新增多条数据
db.tours.insertMany([{ name: "The Sea Explorer", price: 497, rating: 4.8 }, { name: "The Snow Adventurer", price: 997, rating: 4.9, difficulty: "easy" }])
```
# mongodb查找
```js
// 查找所有
db.tours.find()
// 按name值查找
db.tours.find({name: "The Forest Hiker"})
// 查找price值小于等于500
db.tours.find({price: {$lte: 500}})
// 查找price小于500并且评分大于等于4.8
db.tours.find({ price: {$lt:500}, rating: {$gte: 4.8} } )
// 查找price小于500或者评分大于等于4.8
db.tours.find({ $or: [ { price: { $lt: 500}}, { rating: {$gte: 4.8}}] })
// 查找price大于500或者评分大于等于4.8
db.tours.find({ $or: [ {price: {$gt: 500}}, {rating: {$gte: 4.8}} ] })
// 查找price大于500或者评分大于等于4.8 并且只显示name字段
db.tours.find({ $or: [ {price: {$gt:500}}, {rating: {$gte: 4.8}} ] }, { name: 1})
```

# mongodb更新
```js
// 查找到name="The Snow Adventurer"的数据，并更改price为597
db.tours.updateOne( { name: "The Snow Adventurer"}, { $set: {price: 597} })
// 找到{ price: {$gt: 500}, rating: {$gte: 4.8}}，增加premium字段
db.tours.updateMany({ price: {$gt: 500}, rating: {$gte: 4.8}}, { $set: {premium: true}})
```

# mongodb删除
```js
// 删除rating小于4.8的
db.tours.deleteMany({ rating: {$lt: 4.8} })
// 删除所有
db.tours.deleteMany({})
```
// duration[gte]=5 表示duration <= 5
127.0.0.1:3000/api/v1/tours?duration[gte]=5&difficulty=easy&page=2