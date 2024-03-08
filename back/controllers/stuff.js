const fs = require('fs');

const Thing = require('../models/thing');

exports.createThing = (req, res, next) => {
  req.body.sauce= JSON.parse(req.body.sauce);
  const url = req.protocol + '://' + req.get('host');
  const thing = new Thing({
    userId: req.body.sauce.userId,
    name: req.body.sauce.name,
    manufacturer: req.body.sauce.manufacturer,
    description: req.body.sauce.description,
    mainPepper: req.body.sauce.mainPepper,
    imageUrl: url + '/images/' + req.file.filename,
    heat: req.body.sauce.heat,
    // likes: req.body.thing.likes,
    // dislikes: req.body.thing.dislikes,
    // usersLiked: req.body.thing.usersLiked,
    // usersDisliked: req.body.thing.usersDisliked,
  });
  thing.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getOneThing = (req, res, next) => {
  Thing.findOne({
    _id: req.params.id
  }).then(
    (thing) => {
      res.status(200).json(thing);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyThing = (req, res, next) => {
  let thing = new Thing({ _id: req.params._id });
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    req.body.thing = JSON.parse(req.body.thing);
  thing = {
    _id: req.params.id,
    name: req.body.thing.name,
    manufacturer: req.body.thing.manufacturer,
    description: req.body.thing.description,
    mainPepper: req.body.thing.mainPepper,
    imageUrl: url + '/images/' + req.file.filename,
    heat: req.body.thing.heat,
    // likes: req.body.thing.likes,
    // dislikes: req.body.thing.dislikes,
    // usersLiked: req.body.thing.usersLiked,
    // usersDisliked: req.body.thing.usersDisliked,
  };
} else {
  thing = {
    _id: req.params.id,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    mainPepper: req.body.mainPepper,
    imageUrl: req.body.imageUrl,
    heat: req.body.heat,
    // likes: req.body.likes,
    // dislikes: req.body.dislikes,
    // usersLiked: req.body.usersLiked,
    // usersDisliked: req.body.usersDisliked
  }
}
  Thing.updateOne({_id: req.params.id}, thing).then(
    () => {
      res.status(201).json({
        message: 'Sauce updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteThing = (req, res, next) => {
  Thing.findOne({_id: req.params.id}).then(
    (thing) => {
      const filename = thing.imageUrl.split('/images/')[1];
      fs.unlink('images/' + filename, () => {
        Thing.deleteOne({_id: req.params.id}).then(
          () => {
            res.status(200).json({
              message: 'Deleted!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      });
    }
  );
};

// exports.deleteThing = (req, res, next) => {
//   Thing.findOne({ _id: req.params.id }).then(
//     (thing) => {
//       if (!thing) {
//         return res.status(404).json({
//           error: new Error('Objet non trouvé !')
//         });
//       }
//       if (thing.userId !== req.auth.userId) {
//         return res.status(401).json({
//           error: new Error('Requête non autorisée !')
//         });
//       }
//       Thing.deleteOne({_id: req.params.id}).then(
//         () => {
//           res.status(200).json({
//             message: 'Deleted!'
//           });
//         }
//       ).catch(
//         (error) => {
//           res.status(400).json({
//             error: error
//           });
//         }
//       );
//     }
//   );
// };

exports.getAllStuff = (req, res, next) => {
  Thing.find().then(
    (things) => {
      res.status(200).json(things);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.likeThing = (req, res, next) => {
  Thing.findByIdAndUpdate(req.body.id, {
    $push:{likes:req.user._id}
  }, {
    new: true
  }).exec((err, result) => {
    if (err) {
      return res.status(422).json({error:err})
    } else {
      res.json(result)
    }
  })
}