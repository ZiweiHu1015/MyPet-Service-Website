import fs from 'fs';

import path from 'path';

import { sign, verify, SignOptions } from 'jsonwebtoken';

import { ObjectID } from 'mongodb';

import { Router } from 'express';

import Models from './models';

/**
 * Connected mongo
 */

const model = new Models();

/**
 * Json web token.
 */
const privateKey = fs.readFileSync(path.join(__dirname, './secret.key'));
console.log('>> The private key has been read!');

const generateToken = (name: string): string | null => {
  try {
      return sign({
        sub: name,
        iat: new Date().getTime()
      },
      privateKey,
      {
        issuer: 'sha',
        expiresIn: '1h'
      });
  } catch (err) {
      console.error(err);
      return null;
  }
}

const verifyToken = (token: string): Boolean | Object => {
  try {
      return verify(token, privateKey);
  } catch (err) {
      console.error('>> Invalid token!');
  }
  return false;
}

/**
 * Router
 */
const router = Router();

/**
 * Restful api for auth.
 */
const userCollection = 'User';
router.post('/sign-in', async (req, res, next) => {
  const signInData = req.body;
  try {
      const userRecord = await model.getUserByName(userCollection, 'username', signInData.username);
      if (signInData.password === userRecord.password) {
          userRecord.token = generateToken(userRecord.username);
          res.status(200).json({
            data: userRecord,
            msg: 'sign-in success.'
          });
      } else {
        res.status(401).json({
          msg: 'Your account does not exist or password error, please try again!'
        });
      }
  } catch (err) {
    res.status(401).json({
      msg: 'Your account does not exist or password error, please try again!'
    });
  }
});

router.post('/sign-up', async (req, res, next) => {
  const signUpData = req.body;
  const existUser = await model.getUserByName(userCollection, 'username', signUpData.username);
  if (existUser) {
    res.status(200).json({
      msg: 'The account has been registered!'
    });
  } else {
      const newUserResult = await model.put(userCollection, signUpData);
      const newUser = newUserResult.ops[0];
      newUser.token = generateToken(newUser.username);
      res.status(200).json({
        data: newUser,
        msg: 'sign-up success.'
      });
  }
});

/**
 * Verify authorization
 */
router.use(async (req, res, next) => {

  if (req.method === 'OPTIONS') {
    res.send(204);
  } else {
    const token = req.headers.authorization;
    if (token) {
      const allow = verifyToken(token);
      if (!allow) {
        res.status(401).json({
          msg: 'Unauthorized access!'
        });
      }
      next();
    } else {
      res.status(401).json({
        msg: 'Unauthorized access!'
      });
    }
  }
})

/**
 * Restful api for User.
 */
router.get('/users', async (req, res, next) => {
  const allRecords = await model.fetch(userCollection);
  res.status(200).json({
      data: allRecords,
      msg: `Fetch success!`
  });
});

router.post('/users', async (req, res, next) => {
  const putData = req.body;
  try {
      const record = await model.put(userCollection, putData);
      res.status(200).json({
          data: record.ops[0],
          msg: `Put success ${putData.firstname}`
      });
  } catch (err) {
      res.status(200).json({
          msg: `Put failed!`,
          error: err
      });
  }
});

router.patch('/users', async (req, res, next) => {
  const updateDate = req.body;
  try {
      if (updateDate._id) {
          const record = await model.patch(userCollection, updateDate);
          res.status(200).json({
              data: record,
              msg: `Edit success ${record._id}`
          });
      } else {
          throw new Error('No _id field');
      }
  } catch (err) {
      res.status(200).json({
          msg: `Edit failed!`,
          error: err
      });
  }
});

router.delete('/users/:id', async (req, res, next) => {
  const delId = req?.params?.id;
  try {
      await model.del(userCollection, delId);
      res.status(200).json({
          msg: `Delete success!`
      });
  } catch(err) {
      res.status(200).json({
          msg: `Delete failed!`,
          error: err
      });
  }
});

router.get('/users/:id', async (req, res, next) => {
  const searchId = req?.params?.id;
  try {
      const record = await model.get(userCollection, searchId);
      res.status(200).json({
          data: record,
          msg: `Get success!`
      });
  } catch(err) {
      res.status(200).json({
          msg: `Get failed!`,
          error: err
      });
  }
});

/**
 * Restful api for pet.
 */
const petCollection = 'Pet'
router.get('/pets', async (req, res, next) => {
  const allRecords = await model.fetch(petCollection);
  res.status(200).json({
      data: allRecords,
      msg: `Fetch success!`
  });
});

router.post('/pets', async (req, res, next) => {
  const putData = req.body;
  try {
    if (putData.userId) {
      putData.userId = new ObjectID(putData.userId);
    }
    const record = await model.put(petCollection, putData);
    res.status(200).json({
        data: record.ops[0],
        msg: `Put success ${putData.name}`
    });
  } catch (err) {
    res.status(200).json({
        msg: `Put failed!`,
        error: err
    });
  }
});

router.patch('/pets', async (req, res, next) => {
  const updateDate = req.body;
  try {
    if (updateDate._id) {
      if (updateDate.userId) {
        updateDate.userId = new ObjectID(updateDate.userId);
      }
      const record = await model.patch(petCollection, updateDate);
      res.status(200).json({
          data: record,
          msg: `Edit success ${record._id}`
      });
    } else {
      throw new Error('No _id field');
    }
  } catch (err) {
    res.status(200).json({
        msg: `Edit failed!`,
        error: err
    });
  }
});

router.delete('/pets/:id', async (req, res, next) => {
  const delId = req?.params?.id;
  try {
      await model.del(petCollection, delId);
      res.status(200).json({
          msg: `Delete success!`
      });
  } catch(err) {
      res.status(200).json({
          msg: `Delete failed!`,
          error: err
      });
  }
});

router.get('/pets/:id', async (req, res, next) => {
  const searchId = req?.params?.id;
  try {
      const record = await model.get(petCollection, searchId);
      res.status(200).json({
          data: record,
          msg: `Get success!`
      });
  } catch(err) {
      res.status(200).json({
          msg: `Get failed!`,
          error: err
      });
  }
});

router.get('/pets/user/:userid', async (req, res, next) => {
  const userid = req?.params?.userid;
  try {
      const records = await model.getUserDatas(petCollection, userid);
      res.status(200).json({
          data: records,
          msg: `Get records success!`
      });
  } catch(err) {
      res.status(200).json({
          msg: `Get records failed!`,
          error: err
      });
  }
});

/**
 * Restful api for article.
 */
const articleCollection = 'Article'
router.get('/articles', async (req, res, next) => {
  const allRecords = await model.fetch(articleCollection);
  res.status(200).json({
      data: allRecords,
      msg: `Fetch success!`
  });
});

router.post('/articles', async (req, res, next) => {
  const articleData = req.body;
  try {
    if (articleData.userId) {
      articleData.userId = new ObjectID(articleData.userId);
    }
    const record = await model.put(articleCollection, articleData);
    res.status(200).json({
        data: record.ops[0],
        msg: `Put success ${articleData.title}`
    });
  } catch (err) {
    res.status(200).json({
        msg: `Put failed!`,
        error: err
    });
  }
});

router.patch('/articles', async (req, res, next) => {
  const updateDate = req.body;
  try {
    if (updateDate._id) {
      if (updateDate.userId) {
        updateDate.userId = new ObjectID(updateDate.userId);
      }
      const record = await model.patch(articleCollection, updateDate);
      res.status(200).json({
          data: record,
          msg: `Edit success ${record._id}`
      });
    } else {
        throw new Error('No _id field');
    }
  } catch (err) {
    res.status(200).json({
        msg: `Edit failed!`,
        error: err
    });
  }
});

router.delete('/articles/:id', async (req, res, next) => {
  const delId = req?.params?.id;
  try {
      await model.del(articleCollection, delId);
      res.status(200).json({
          msg: `Delete success!`
      });
  } catch(err) {
      res.status(200).json({
          msg: `Delete failed!`,
          error: err
      });
  }
});

router.get('/articles/:id', async (req, res, next) => {
  const searchId = req?.params?.id;
  try {
      const record = await model.get(articleCollection, searchId);
      res.status(200).json({
          data: record,
          msg: `Get success!`
      });
  } catch(err) {
      res.status(200).json({
          msg: `Get failed!`,
          error: err
      });
  }
});

router.get('/articles/user/:userid', async (req, res, next) => {
  const userid = req?.params?.userid;
  try {
      const records = await model.getUserDatas(articleCollection, userid);
      res.status(200).json({
          data: records,
          msg: `Get records success!`
      });
  } catch(err) {
      res.status(200).json({
          msg: `Get records failed!`,
          error: err
      });
  }
});

 /**
 * Restful api for pet-service.
 */
const petServiceCollection = 'PetService';
router.get('/pet-services', async (req, res, next) => {
  const allRecords = await model.fetch(petServiceCollection);
  res.status(200).json({
      data: allRecords,
      msg: `Fetch success!`
  });
});

router.post('/pet-services', async (req, res, next) => {
  const putServiceData = req.body;
  try {
    if (putServiceData.userId) {
      putServiceData.userId = new ObjectID(putServiceData.userId);
    }
    const record = await model.put(petServiceCollection, putServiceData);
    res.status(200).json({
        data: record.ops[0],
        msg: `Put success ${putServiceData.title}`
    });
  } catch (err) {
    res.status(200).json({
        msg: `Put failed!`,
        error: err
    });
  }
});

router.patch('/pet-services', async (req, res, next) => {
  const updateDate = req.body;
  try {
    if (updateDate._id) {
      if (updateDate.userId) {
        updateDate.userId = new ObjectID(updateDate.userId);
      }
      const record = await model.patch(petServiceCollection, updateDate);
      res.status(200).json({
          data: record,
          msg: `Edit success ${record._id}`
      });
    } else {
        throw new Error('No _id field');
    }
  } catch (err) {
    res.status(200).json({
        msg: `Edit failed!`,
        error: err
    });
  }
});

router.delete('/pet-services/:id', async (req, res, next) => {
  const delId = req?.params?.id;
  try {
      await model.del(petServiceCollection, delId);
      res.status(200).json({
          msg: `Delete success!`
      });
  } catch(err) {
      res.status(200).json({
          msg: `Delete failed!`,
          error: err
      });
  }
});

router.get('/pet-services/:id', async (req, res, next) => {
  const searchId = req?.params?.id;
  try {
      const record = await model.get(petServiceCollection, searchId);
      res.status(200).json({
          data: record,
          msg: `Get success!`
      });
  } catch(err) {
      res.status(200).json({
          msg: `Get failed!`,
          error: err
      });
  }
});

router.get('/pet-services/user/:userid', async (req, res, next) => {
  const userid = req?.params?.userid;
  try {
      const records = await model.getUserDatas(petServiceCollection, userid);
      res.status(200).json({
          data: records,
          msg: `Get records success!`
      });
  } catch(err) {
      res.status(200).json({
          msg: `Get records failed!`,
          error: err
      });
  }
});

export default router;
