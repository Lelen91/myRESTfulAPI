const express = require('express');
const router = express.Router();
const couriers = require('../../Couriers');
const Joi = require('joi');

function validateCourier(courier) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(courier, schema);
};

function findCourierById(couriers, courierId) {
  return couriers.find(c => c.id === parseInt(courierId));
};

// GET REQUESTS
router.get('/', (req, res) => {
  res.send(couriers);
});

router.get('/:id', (req, res) => {
  const courier = findCourierById(couriers, req.params.id);
  if(!courier) return res.status(404).send(`No matching couriers with service ID ${req.params.id}`);

  res.send(courier);
});

router.get('/:couriersId/:serviceId', (req, res) => {
  res.send(req.params); // => requesting route parameters === required
  // /api/couriers/1800/101
  // {"couriersId":"1800","serviceId":"101"}

  // res.send(req.query); => requesting query parameters === optional
  // /api/couriers/1800/101?sortBy=name
  // {"sortBy":"name"}
});

// POST REQUESTS
router.post('/', (req, res) => {
  const { error } = validateCourier(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const courier = {
    id: couriers.length + 1,
    name: req.body.name
  };

  couriers.push(courier);
  res.send(courier);
});

// UPDATE REQUESTS
router.put('/:id', (req, res) => {
  const courier = findCourierById(couriers, req.params.id);
  if(!courier) res.status(404).send(`No matching couriers with service ID ${req.params.id}`);

  const { error } = validateCourier(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  courier.name = req.body.name;
  res.send(courier);
});

// DELETE REQUESTS
router.delete('/:id', (req, res) => {
  const courier = couriers.find(c => c.id === parseInt(req.params.id));
  if(!courier) return res.status(404).send(`No matching couriers with service ID ${req.params.id}`);

  const index = couriers.indexOf(courier);
  couriers.splice(index, 1);

  res.send(courier);
});

module.exports = router;
