import express, { Router } from 'express';
import cors from 'cors';
import { uniqBy, sortBy } from 'lodash';
import logger from './middleware/logger';
import userById from './userById';
import userByUsername from './userByUsername';

export default (log, data) => {
  const app = express();
  const router = new Router();

  const populatePet = (pet, users) => {
    const user = users.filter(u => u.id === pet.userId)[0];
    return { ...pet, user };
  };

  const populateUser = (user, pets) => {
    const userPets = pets.filter(pet => user.id === pet.userId);
    return { ...user, pets: userPets };
  };

  // const idRegExp = /^\/(\d+)$/;
  router.get('/users/:id(-?[0-9]+)', (req, res) => {
    // log.debug(`param: ${req.params.id}`);
    const param = req.params.id;
    const id = Number(param);
    const user = userById(data.users, id);
    return user ? res.json(user) : res.sendStatus(404);
  });

  router.get('/users/:id(-?[0-9]+)/populate', (req, res) => {
    // log.debug(`param: ${req.params.id}`);
    const param = req.params.id;
    const id = Number(param);
    const user = userById(data.users, id);
    return user ? res.json(populateUser(user, data.pets)) : res.sendStatus(404);
  });

  router.get('/users/:id(-?[0-9]+)/pets', (req, res) => {
    // log.debug(`param: ${req.params.id}`);
    const param = req.params.id;
    const id = Number(param);
    const user = userById(data.users, id);
    const { pets } = populateUser(user, data.pets);
    return pets ? res.json(pets) : res.sendStatus(404);
  });

  router.get('/users/populate', (req, res) => {
    const populatedUsers = data.users.map(u => populateUser(u, data.pets));
    const havePet = req.query.havePet;
    if (havePet) {
      const usersWithPet = data.pets.filter(p => p.type === havePet)
        .map(p => populatePet(p, data.users))
        .map(p => p.user)
        .map(u => populateUser(u, data.pets));
      const uniq = uniqBy(usersWithPet, 'id');
      const sorted = sortBy(uniq, 'id');
      res.json(sorted);
    } else {
      res.json(sortBy(populatedUsers, 'id'));
    }
  });

  // const usernameRegExp = /^\/(\w+)$/;
  router.get('/users/:username([\\w]+)', (req, res) => {
    // log.debug(`param: ${req.params.username}`);
    const username = req.params.username;
    const user = userByUsername(data.users, username);
    return user ? res.json(user) : res.sendStatus(404);
  });

  router.get('/users/:username([\\w]+)/populate', (req, res) => {
    // log.debug(`param: ${req.params.username}`);
    const username = req.params.username;
    const user = userByUsername(data.users, username);
    return user ? res.json(populateUser(user, data.pets)) : res.sendStatus(404);
  });

  router.get('/users/:username([\\w]+)/pets', (req, res) => {
    // log.debug(`param: ${req.params.username}`);
    const username = req.params.username;
    const user = userByUsername(data.users, username);
    const { pets } = populateUser(user, data.pets);
    return pets ? res.json(sortBy(pets, 'id')) : res.sendStatus(404);
  });

  router.get('/users', (req, res) => {
    const pet = req.query.havePet;
    if (pet) {
      const usersWithPet = data.pets.filter(p => p.type === pet)
        .map(p => populatePet(p, data.users))
        .map(p => p.user);
      const uniq = uniqBy(usersWithPet, 'id');
      const sorted = sortBy(uniq, 'id');
      res.json(sorted);
    } else {
      res.json(sortBy(data.users, 'id'));
    }
  });

  router.get('/pets', (req, res) => {
    const type = req.query.type;
    const ageGt = req.query.age_gt;
    const ageLt = req.query.age_lt;

    if (type || ageGt || ageLt) {
      let filteredPet = data.pets;
      if (type) {
        filteredPet = filteredPet.filter(p => p.type === type);
      }
      if (ageGt) {
        filteredPet = filteredPet.filter(p => p.age > Number(ageGt));
      }
      if (ageLt) {
        filteredPet = filteredPet.filter(p => p.age < Number(ageLt));
      }
      const uniq = uniqBy(filteredPet, 'id');
      const sorted = sortBy(uniq, 'id');
      res.json(sorted);
    } else {
      res.json(sortBy(data.pets, 'id'));
    }
  });

  router.get('/pets/populate', (req, res) => {
    const populatedPets = data.pets.map(p => populatePet(p, data.users));
    const type = req.query.type;
    const ageGt = req.query.age_gt;
    const ageLt = req.query.age_lt;

    if (type || ageGt || ageLt) {
      let filteredPet = populatedPets;
      if (type) {
        filteredPet = filteredPet.filter(p => p.type === type);
      }
      if (ageGt) {
        filteredPet = filteredPet.filter(p => p.age > Number(ageGt));
      }
      if (ageLt) {
        filteredPet = filteredPet.filter(p => p.age < Number(ageLt));
      }
      const sorted = sortBy(filteredPet, 'id');
      res.json(sorted);
    } else {
      res.json(sortBy(populatedPets, 'id'));
    }
  });

  router.get('/pets/:id(-?[0-9]+)', (req, res) => {
    // log.debug(`param: ${req.params.id}`);
    const param = req.params.id;
    const id = Number(param);
    const pet = userById(data.pets, id);
    return pet ? res.json(pet) : res.sendStatus(404);
  });

  router.get('/pets/:id(-?[0-9]+)/populate', (req, res) => {
    // log.debug(`param: ${req.params.id}`);
    const param = req.params.id;
    const id = Number(param);
    const pet = userById(data.pets, id);
    return pet ? res.json(populatePet(pet, data.users)) : res.sendStatus(404);
  });

  router.get('/', (req, res) => {
    res.json(data);
  });

  app.use(cors());
  app.use(logger(log));
  app.use('/', router);

  return app;
};
