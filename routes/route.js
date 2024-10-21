const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dataFile = path.join(__dirname, '../data/data.json');

const readData = () => {
  const data = fs.readFileSync(dataFile);
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};

router.post('/', (req, res) => {
  const items = readData();
  const newItem = req.body;
  newItem.id = items.length + 1;  
  items.push(newItem);
  writeData(items);
  res.status(201).json({ message: "item Added !!!!!", newItem });
});

router.get('/', (req, res) => {
  const items = readData();
  res.status(200).json(items);
});

router.get('/:id', (req, res) => {
  const items = readData();
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).json({ message: 'item  not found by this id !' });
  }
});

router.put('/:id', (req, res) => {
  const items = readData();
  const index = items.findIndex(i => i.id === parseInt(req.params.id));

  if (index !== -1) {
    items[index] = { ...items[index], ...req.body };
    writeData(items);
    res.status(200).json({ message: 'item has been updated successfully', updatedItem: items[index] });
  } else {
    res.status(404).json({ message: 'there is no items by this id ' });
  }
});

router.delete('/:id', (req, res) => {
  const items = readData();
  const filteredItems = items.filter(i => i.id !== parseInt(req.params.id));

  if (filteredItems.length !== items.length) {
    writeData(filteredItems);
    res.status(200).json({ message: 'item deleted successfully' });
  } else {
    res.status(404).json({ message: "there is no item by this id !!"});
  }
});


module.exports = router;
